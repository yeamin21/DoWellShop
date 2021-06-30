import { Component, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CartContext } from "../../Contexts/CartContext";
import { axiosInstance, retrieve } from "../../Services/ApiCalls";
import "./ItemList.css";

import SingleItem from "./SingleItem";

export default class ItemList extends Component {
  static contextType = CartContext;

  constructor(props) {
    super(props);
    this.state = {
      list: [],
      query: props.query,
      isLoaded: false,
    };
    this.ret = this.ret.bind(this);
    this.removeSearch = this.removeSearch.bind(this);
    this.removeMin = this.removeMin.bind(this);
    this.remvoeCategory = this.remvoeCategory.bind(this);
    this.remvoeManufacturer = this.remvoeManufacturer.bind(this);
  }
  componentDidMount() {
    this.ret();
  }

  ret = () => {
    axiosInstance
      .get("products/", { params: this.state.query })
      .then((response) => {
        this.setState({ list: response.data, count: response.data.length });
      })
      .then(this.setState({ isLoaded: true }));
  };
  componentDidUpdate(prevProps, prevState) {
    this.props.query !== prevProps.query &&
      this.setState({
        query: this.props.query,
      });

    this.state.query !== prevState.query && this.ret();
  }

  removeSearch = () => this.props.handleChange("");
  removeMin = () => this.props.handleMinChange("");
  removeMax = () => this.props.handleMaxChange("");
  remvoeCategory = () => this.props.handleCategoryChange(undefined);
  remvoeManufacturer = () => this.props.handleManufacturerChange(undefined);
  render() {
    const { search, price_max, price_min, category, manufacturer } =
      this.state.query;
    const { isLoaded } = this.state;
    return (
      <>
        <>
          <div className="active-filters">
            {search && (
              <div className="active-filter text-center">
                <div className="item">search: {search} </div>
                <div className="close" onClick={this.removeSearch}></div>
              </div>
            )}

            {price_min && (
              <div className="active-filter text-center">
                <div className="item"> min: {price_min}</div>
                <div className="close" onClick={this.removeMin}></div>
              </div>
            )}

            {price_max && (
              <div className="active-filter text-center">
                <div className="item">max: {price_max} </div>
                <div className="close" onClick={this.removeMax}></div>
              </div>
            )}
            {category && (
              <div className="active-filter text-center">
                <div className="item">category: {category} </div>
                <div className="close" onClick={this.remvoeCategory}></div>
              </div>
            )}
            {manufacturer && (
              <div className="active-filter text-center">
                <div className="item">manufacturer: {manufacturer} </div>
                <div className="close" onClick={this.remvoeManufacturer}></div>
              </div>
            )}
          </div>
        </>
        {isLoaded ? (
          <div className="products">
            {this.state.list.map((item, index) => (
              <SingleItem addToCart={true} key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </>
    );
  }
}
