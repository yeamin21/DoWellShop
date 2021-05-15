import React, { useContext } from "react";
import "./CartModal.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import { Button } from "react-bootstrap";
export default function CartModal(props) {
  const { items } = useContext(CartContext);
  return (
    <div className="cartModal">
      {items.length > 0 ? (
        items.map((item, index) => (
          <div style={{ width: "40px", height: "50px" }}>{item.name}</div>
        ))
      ) : (
        <h1>NOOOOOOO</h1>
      )}
      <div>
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
