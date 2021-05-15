import { createContext } from "react";
import { Component } from "react";
export const CartContext = createContext({
  count: 0,
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  incrementByOne: () => {},
  decrementByOne: () => {},
  clearCart: () => {},
});

export default class CartContextProvider extends Component {
  constructor(props) {
    super(props);
    this.addToCart = (product) => {
      product.quantity = 1;
      this.setState({
        count: this.state.count + 1,
        items: [...this.state.items, product],
      });
    };
    this.removeFromCart = (product) => {
      this.setState({
        count: this.state.count - 1,
        items: this.state.items.filter((item) => item.id !== product.id),
      });
    };
    this.incrementByOne = (product) => {
      var x = this.state.items.findIndex((item) => item === product);
      this.state.items[x].quantity += 1;
      this.setState({ items: this.state.items });
    };
    this.decrementByOne = (product) => {
      var x = this.state.items.findIndex((item) => item === product);
      this.state.items[x].quantity -= 1;
      this.state.items[x].quantity === 0
        ? this.removeFromCart(product)
        : this.setState({ items: this.state.items });
    };

    this.clearCart = () => {
      this.setState(
        {
          count: 0,
          items: [],
        },
        () => {
          console.log("trigerred");
          localStorage.removeItem("cart");
        }
      );
    };

    this.state = {
      count: 0,
      items: [],
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      incrementByOne: this.incrementByOne,
      decrementByOne: this.decrementByOne,
      clearCart: this.clearCart,
    };
  }

  componentDidMount() {
    this.getCart();
  }
  componentDidUpdate() {
    localStorage.setItem("cart", JSON.stringify(this.state.items));
  }
  getCart = () => {
    const products = localStorage.getItem("cart");
    products !== null
      ? this.setState({
          count: Object.keys(JSON.parse(products)).length,
          items: JSON.parse(products),
        })
      : this.setState({ count: 0 });
  };

  render() {
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
