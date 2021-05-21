import { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
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
  handleChange = (e) => this.props.handleCategoryChange(e);
  render() {
    return (
      <div className="box-list">
        <h4>Categories</h4>
        {this.state.list.map((item, index) => (
          <div
            className="category"
            key={index}
            onClick={this.handleChange.bind(this, item.name)}
          >
            <span>{item.name}</span>

            {/* <a href={`/products/category/${item.name}`}>{item.name}</a> */}
          </div>
        ))}
      </div>
    );
  }
}
