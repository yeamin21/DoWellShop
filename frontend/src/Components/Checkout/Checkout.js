import { Component } from "react";
import { CartContext } from "../../Contexts/CartContext";
import "./Checkout.css";
import "./Cart.css";
import { Table, Button, Form } from "react-bootstrap";
import { axiosInstance, retrieve } from "../../Services/ApiCalls";
import { Redirect } from "react-router";

export default class Checkout extends Component {
  static contextType = CartContext;
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      addresses: [],
      delivery_address: "",
      success: false,
    };
    this.Checkout = this.doCheckOut.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.setState({ items: this.context.items });
    retrieve("/addresses/").then((data) => this.setState({ addresses: data }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.items !== prevState.items) {
      this.setState({ items: this.context.items });
    }
  }
  handleChange = (event) => {
    event.persist();
    console.log(event);
    this.setState({ delivery_address: event.target.value });
  };
  doCheckOut = () => {
    axiosInstance
      .post("/order/", {
        orderItem: this.context.items,
        delivery_address: this.state.delivery_address,
      })
      .then((_) => this.context.clearCart())
      .then((_) => this.setState({ success: true }))
      .catch((e) => console.log(e));
  };
  render() {
    const { items, success, addresses } = this.state;
    if (success) {
      return <Redirect to="/"></Redirect>;
    } else {
      return (
        <div className="checkout">
          <div className="cart-items">
            <Table striped>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr>
                    <td>
                      <img
                        style={{ width: "50px", height: "40px" }}
                        src={item.image}
                        alt={item.name}
                      />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{parseFloat(item.quantity * item.price).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div>
            <Form.Group>
              {addresses.map((address, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  name="address"
                  onChange={this.handleChange}
                  label={`${address.address_line1} ${address.address_line2} `}
                  value={address.id}
                ></Form.Check>
              ))}
            </Form.Group>

            <Button type="submit" onClick={this.Checkout}>
              Checkout
            </Button>
          </div>
        </div>
      );
    }
  }
}
