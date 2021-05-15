import { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { FaCartArrowDown, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import "./SingleItem.css";
import ReactImageZoom from "react-image-zoom";
export default class SingleItem extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
      cardStyle: {
        padding: ".5rem",
        height: "max-content",
        borderRadius: ".7rem",
        background: "rgba(246,246,246,0.5)",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      },
      inCart: false,
      initialButtonStyle: {},
      initialButtonIcon: <FaCartArrowDown />,
      changedButtonStyle: { background: "rgba(5, 209, 124, 0.89)" },
      changedButtonIcon: <FaCheck />,
    };
  }
  componentDidMount() {
    if (
      this.context.items.length > 0 &&
      this.context.items.find((item) => item.id === this.state.item.id)
    ) {
      this.setState({ inCart: true });
    }
  }

  componentDidUpdate() {}
  render() {
    const { id, name, price, image } = this.state.item;

    return (
      <CartContext.Consumer>
        {({ count, addToCart, removeFromCart }) => (
          <Card key={id} style={this.state.cardStyle}>
            <Link to={`/products/${id}`}>
              <Card.Img variant="top" src={image} />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>Price {price}</Card.Text>
              </Card.Body>
            </Link>
            <Button
              onClick={
                this.state.inCart
                  ? () => {
                      removeFromCart(this.state.item);
                      this.setState((prev) => ({ inCart: !prev.inCart }));
                    }
                  : () => {
                      addToCart(this.state.item);
                      this.setState((prev) => ({ inCart: !prev.inCart }));
                    }
              }
              style={
                this.state.inCart
                  ? this.state.changedButtonStyle
                  : this.state.initialButtonStyle
              }
            >
              {this.state.inCart
                ? this.state.changedButtonIcon
                : this.state.initialButtonIcon}
            </Button>
          </Card>
        )}
      </CartContext.Consumer>
    );
  }
}
