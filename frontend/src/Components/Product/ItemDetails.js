import { Component, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../../Contexts/CartContext";
import { axiosInstance } from "../../Services/ApiCalls";
import "./ItemDetails.scss";

export default class ItemDetails extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.id,
      product: {},
    };
    this.getDetails = this.getDetails.bind(this);
    this.toCart = this.toCart.bind(this);
  }
  componentDidMount() {
    this.getDetails();
  }
  toCart = () => this.context.addToCart(this.state.product);
  getDetails = async () => {
    axiosInstance
      .get(`/products/${this.state.id}/`)
      .then((response) => {
        this.setState({ product: response.data });
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { product } = this.state;
    return (
      <div className="item-details">
        <div className="image-main">
          <img src={product.image} alt={product.image}></img>
        </div>
        <div className="detail-basic">
          <h1>{product.name}</h1>
          <h3>{product.price}</h3>
          <Button onClick={this.toCart}>Add To Cart</Button>
        </div>
      </div>
    );
  }
}
