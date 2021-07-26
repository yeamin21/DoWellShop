import React, { useContext } from "react";
import { Table, Button, Card, ListGroup } from "react-bootstrap";
import {
  FaMinus,
  FaMinusCircle,
  FaPlus,
  FaPlusCircle,
  FaRegTrashAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import "./Cart.css";
import Checkout from "./Checkout";

export function Cart() {
  const { items, removeFromCart, addToCart, subTotal, decrementByOne } =
    useContext(CartContext);

  return (
    <div className="cart">
      <div className="cart-items">
        <h4>Your Shopping Cart</h4>
        <Table striped>
          <thead>
            <tr>
              <th>Product</th>
              <th>Name</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
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
                <td>
                  <span>{item.name}</span>
                </td>
                <td>
                  <span>{item.price}</span>
                </td>
                <td>
                  <span
                    className="decrement"
                    onClick={() => decrementByOne(item)}
                  >
                    <FaMinusCircle />
                  </span>
                  <span>{item.quantity}</span>
                  <span className="increment" onClick={() => addToCart(item)}>
                    <FaPlusCircle />
                  </span>
                </td>
                <td>
                  <span>
                    {parseFloat(item.quantity * item.price).toFixed(2)}
                  </span>
                </td>
                <td>
                  <span className="remove" onClick={() => removeFromCart(item)}>
                    <FaRegTrashAlt />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Card className="cart-summary">
        <Card.Header>Summary</Card.Header>
        <ListGroup variant="flush">
          <ListGroup.Item>
            Sub Total: <span>{subTotal}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            Delivery Charge: <span>0</span>
          </ListGroup.Item>
          <ListGroup.Item>
            {items.length !== 0 ? (
              <Link to="/checkout">
                <Button>Continue to Checkout</Button>
              </Link>
            ) : (
              <Link to="/products">
                <Button style={{ background: "orange" }}>
                  Back to Products
                </Button>
              </Link>
            )}
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
}

export default Cart;
