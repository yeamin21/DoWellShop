import { Component, useState } from "react";
import { CartContext } from "../../Contexts/CartContext";
import { retrieve } from "../../Services/ApiCalls";
import "./ItemList.css";
import SingleItem from "./SingleItem";

export default class ItemList extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      query: this.props.query,
    };
  }
  componentDidMount() {
    retrieve("/products/")
      .then((data) => this.setState({ list: data }))
      .catch((e) => console.log(e));
  }
  componentDidUpdate(prevProps) {
    this.props.query !== prevProps.query &&
      this.setState({ query: this.props.query });
  }

  render() {
    return (
      <div className="products">
        <h1>{this.state.query}</h1>
        {this.state.list
          // .filter((items) => items.name === this.state.query)
          .map((item, index) => (
            <SingleItem key={index} item={item} />
          ))}
      </div>
    );
  }
}
