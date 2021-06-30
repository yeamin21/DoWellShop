import axios from "axios";
import { Component } from "react";
import { axiosInstance } from "../../Services/ApiCalls";
import SingleItem from "../Product/SingleItem";
export class RecentlyAddedItems extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    axiosInstance
      .get("/products/recent/")
      .then((res) => this.setState({ items: res.data }));
  }
  render() {
    const { items } = this.state;
    return (
      <div className="items">
        <div className="title">
          <h1>Recently Added Items</h1>
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
