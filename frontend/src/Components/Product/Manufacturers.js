import { Component } from "react";
import { Image } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { retrieve } from "../../Services/ApiCalls";
import "./Manufacturers.css";

export default class ManufacturerList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      imageStyle: { height: "40px", width: "40px", margin: ".5rem" },
    };
  }

  componentDidMount() {
    retrieve("manufacturers/").then((data) => this.setState({ list: data }));
  }
  handleChange = (e) => this.props.handleManufacturerChange(e);

  render() {
    return (
      <div className="box-list">
        <h4>Manufacturers</h4>
        {this.state.list.map((item, index) => (
          <div
            className="manufacturer"
            key={index}
            onClick={this.handleChange.bind(this, item.name)}
          >
            <Image
              style={this.state.imageStyle}
              src={item.image}
              alt={item.name}
              roundedCircle
            ></Image>
            <span>{item.name}</span>

            {/* `${this.props.location.pathname}/manufacturers/${item.name}` */}
            {/* <Link to={(location) => location.search}>{item.name}</Link> */}
          </div>
        ))}
      </div>
    );
  }
}
