import React, { useContext } from "react";
import "./CartModal.scss";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { Button } from "react-bootstrap";
export default function CartModal(props) {
  const { items } = useContext(CartContext);
  const x = () => window.addEventListener("click", (e) => console.log(e));
  x();
  return (
    <div className="cartModal">
      <div className="items">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div className="item" style={{ width: "40px", height: "50px" }}>
              <h5>{item.name}</h5>
              <h6>{item.price}</h6>
              <h6>{item.quantity}</h6>
            </div>
          ))
        ) : (
          <strong>No Product in cart</strong>
        )}
      </div>

      <div className="menu">
        <Link to="/cart/">
          <Button>Cart</Button>
        </Link>
        <Link to="/checkout/">
          <Button>Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
