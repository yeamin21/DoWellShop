import axios from "axios";
import { Component } from "react";
import { axiosInstance } from "../../Services/ApiCalls";
import SingleItem from "../Product/SingleItem";
export class FeaturedItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    axiosInstance.get("/products/featured/").then((res) => {
      this.setState({ items: res.data });
    });
  }
  render() {
    const { items } = this.state;
    console.log(items, typeof items);
    return (
      <div className="items">
        <div className="title">
          <h1>Featured Items</h1>
        </div>
        <div className="contents">
          {items.map((item) => (
            <SingleItem key={item.id} item={item}></SingleItem>
          ))}
        </div>
      </div>
    );
  }
}
