import { Component } from "react";
import { retrieve } from "../../Services/ApiCalls";
import "./Categories.css";
export default class CategoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    retrieve("/categories/").then((data) => this.setState({ list: data }));
  }

  render() {
    return (
      <div className="category-list">
        <h4>Categories</h4>
        {this.state.list.map((item, index) => (
          <div className="category" key={index}>
            <a href={`?category=${item.name}`}>{item.name}</a>
          </div>
        ))}
      </div>
    );
  }
}
