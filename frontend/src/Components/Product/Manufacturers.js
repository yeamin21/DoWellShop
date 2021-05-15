import { Component } from "react";
import { Image } from "react-bootstrap";
import { retrieve } from "../../Services/ApiCalls";
import "./Manufacturers.css";
export default class ManufacturerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      imageStyle: { height: "30%", width: "30%", margin: ".5rem" },
    };
  }

  componentDidMount() {
    retrieve("/manufacturers/").then((data) => this.setState({ list: data }));
  }

  render() {
    return (
      <div className="manufacturer-list">
        <h4>Manufacturers</h4>
        {this.state.list.map((item, index) => (
          <div className="manufacturer" key={index}>
            <Image
              style={this.state.imageStyle}
              src={item.image}
              alt={item.name}
              roundedCircle
            ></Image>
            <a href={`?manufacturer=${item.name}`}>{item.name}</a>
          </div>
        ))}
      </div>
    );
  }
}
