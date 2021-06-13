import ManufacturerList from "./Manufacturers";
import CategoryList from "./Categories";
import ItemList from "./ItemList";
import "./Items.css";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { matchPath, useLocation } from "react-router-dom";
import { Component } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import queryString from "query-string";
import { CompoundPriceFilter, PriceFilter } from "./Filters";

export default class Items extends Component {
  constructor(props) {
    super(props);
    console.log(props, "here");
    const { category, manufacturer, search, price_min, price_max } =
      queryString.parse(props.location.search);
    this.state = {
      query: {
        category,
        manufacturer,
        search,
        price_min,
        price_max,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleMinChange = this.handleMinChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState) {
    prevState.query !== this.state.query &&
      this.props.history.push(`?${queryString.stringify(this.state.query)}`);
  }

  handleChange = (e) =>
    this.setState((prevState) => ({
      query: { ...prevState.query, search: e },
    }));
  handleMinChange = (e) =>
    this.setState((prevState) => ({
      query: { ...prevState.query, price_min: e },
    }));
  handleMaxChange = (e) =>
    this.setState((prevState) => ({
      query: { ...prevState.query, price_max: e },
    }));
  handleCategoryChange = (e) =>
    this.setState((prevState) => ({
      query: { ...prevState.query, category: e },
    }));

  handleManufacturerChange = (e) => {
    this.setState((prevState) => ({
      query: { ...prevState.query, manufacturer: e },
    }));
  };

  render() {
    const { price_min, price_max, search } = this.state.query;
    return (
      <div className="wrapper">
        <div className="back"></div>
        <div className="side-panel">
          <PriceFilter
            price_min={price_min}
            price_max={price_max}
            handleMinChange={this.handleMinChange}
            handleMaxChange={this.handleMaxChange}
          />
          {/* <CompoundPriceFilter></CompoundPriceFilter> */}
          <CategoryList handleCategoryChange={this.handleCategoryChange} />
          <ManufacturerList
            handleManufacturerChange={this.handleManufacturerChange}
          />
        </div>
        <div className="products-n-search">
          <Search search={search} handleChange={this.handleChange}></Search>
          <ItemList
            query={this.state.query}
            handleChange={this.handleChange}
            handleMinChange={this.handleMinChange}
            handleMaxChange={this.handleMaxChange}
            handleCategoryChange={this.handleCategoryChange}
            handleManufacturerChange={this.handleManufacturerChange}
          />
        </div>
      </div>
    );
  }
}

export function Search(props) {
  const [search, setsearch] = useState(props.search);
  useEffect(() => {
    setsearch(props.search);
  }, [props.search]);
  useEffect(() => {
    props.handleChange(search);
  }, [search]);
  return (
    <div className="search">
      <Form.Control
        value={search}
        type="search"
        onChange={(e) => {
          setsearch(e.target.value);
        }}
      />
      {/* <Button
        style={{ marginLeft: "5px" }}
        onClick={() => {
          props.handleChange(search);
        }}
      >
        Search
      </Button> */}
    </div>
  );
}
