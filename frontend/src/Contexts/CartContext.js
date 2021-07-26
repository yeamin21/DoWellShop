import { createContext } from "react";
import { Component } from "react";
export const CartContext = createContext({
  count: 0,
  items: [],
  subTotal: 0,
});

export default class CartContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      items: [],
      subTotal: 0,
      addToCart: this.addToCart,
      removeFromCart: this.removeFromCart,
      decrementByOne: this.decrementByOne,
      clearCart: this.clearCart,
    };
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.decrementByOne = this.decrementByOne.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.getSubTotal = this.getSubTotal.bind(this);
  }

  componentDidMount() {
    const products = localStorage.getItem("cart");
    products !== null
      ? this.setState(
          {
            count: Object.keys(JSON.parse(products)).length,
            items: JSON.parse(products),
          },
          () => this.getSubTotal()
        )
      : this.setState({ count: 0 });
  }

  componentDidUpdate(prevProps, prevState) {
    prevState.items !== this.state.items &&
      this.setState({ subTotal: this.getSubTotal() }, () =>
        localStorage.setItem("cart", JSON.stringify(this.state.items))
      );

    console.log(this.getSubTotal());
  }

  addToCart = (product, quantity = 1) => {
    let index = this.state.items.findIndex(({ id }) => id === product.id);
    if (index !== -1) {
      const newItems = [...this.state.items];
      newItems[index].quantity += quantity;
      this.setState({ items: newItems });
    } else {
      product.quantity = 1;
      this.setState({
        count: this.state.count + 1,
        items: [...this.state.items, product],
      });
    }
  };

  removeFromCart = (product) => {
    this.setState({
      items: this.state.items.filter((item) => item.id !== product.id),
      count: this.state.count - 1,
    });
  };
  decrementByOne = (product) => {
    const x = this.state.items.findIndex(({ id }) => id === product.id);
    const newItems = [...this.state.items];
    newItems[x].quantity--;
    this.state.items[x].quantity === 0
      ? this.removeFromCart(product)
      : this.setState({ items: this.state.items });
  };

  clearCart = () => {
    this.setState(
      {
        count: 0,
        items: [],
        subTotal: 0,
      },
      () => {
        localStorage.removeItem("cart");
      }
    );
  };

  getSubTotal = () =>
    this.state.items.reduce(
      (init, next) => init + next.price * next.quantity,
      0
    );

  render() {
    return (
      <CartContext.Provider value={this.state}>
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
