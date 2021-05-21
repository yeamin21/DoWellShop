import "./Items.css";
import { useState } from "react";
import { Form } from "react-bootstrap";
import "./Filters.css";
import { FaArrowRight } from "react-icons/fa";

export function PriceFilter(props) {
  const [min, setmin] = useState(props.price_min);
  const [max, setmax] = useState(props.price_max);
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
