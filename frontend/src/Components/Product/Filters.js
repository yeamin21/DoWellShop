import "./Items.css";
import { useState, useEffect, Component } from "react";
import { Form } from "react-bootstrap";
import "./Filters.css";
import { FaArrowRight } from "react-icons/fa";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
export function PriceFilter(props) {
  const [min, setmin] = useState(props.price_min);
  const [max, setmax] = useState(props.price_max);
  useEffect(() => {
    setmin(props.price_min);
  }, [props.price_min]);
  useEffect(() => {
    setmax(props.price_max);
  }, [props.price_max]);

  const apply = () => {
    props.handleMaxChange(max);
    props.handleMinChange(min);
  };
  return (
    <div className="box-list">
      <h4>Filters</h4>
      <div className="filters">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          min={0}
          value={min}
          onChange={(e) => setmin(e.target.value)}
          placeholder="min"
        />
        <Form.Control
          type="number"
          min={0}
          value={max}
          onChange={(e) => {
            setmax(e.target.value);
          }}
          placeholder="max"
        />

        <div className="apply" onClick={apply}>
          <FaArrowRight></FaArrowRight>
        </div>
      </div>
    </div>
  );
}
//TODO: add compound price filter
export class CompoundPriceFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: { min: 2, max: 10 },
    };
  }

  render() {
    return (
      <div classNames="list-box">
        <Form>
          <InputRange
            maxValue={20}
            minValue={0}
            value={this.state.value}
            onChange={(value) => this.setState({ value })}
            onChangeComplete={(value) => console.log(value)}
          />
        </Form>
      </div>
    );
  }
}
