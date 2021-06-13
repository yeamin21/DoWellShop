import React, { useState, useContext, useEffect } from "react";
import "./NavigationMenu.css";
import {
  NavLink,
  Redirect,
  useHistory,
  useLocation,
  useRouteMatch,
} from "react-router-dom";
import { CartContext } from "../../Contexts/CartContext";
import {
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { UserContext } from "../../Contexts/UserContext";
import CartModal from "../Checkout/CartModal";
import Items from "../Product/Items";
import ItemList from "../Product/ItemList";

export default function NavigationMenu(props) {
  const { pathname } = useLocation();
  return (
    <div className="nav-menu">
      <PrimaryNav />
      <div className="nav-user-cart">
        <UserMenu location={pathname} />
        <CartMenu />
      </div>
    </div>
  );
}

function PrimaryNav() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Cart", link: "/cart" },
    { name: "Checkout", link: "/checkout" },
    { name: "About", link: "/about" },
  ];
  return (
    <div className="nav-primary">
      {navItems.map((item, index) => (
        <NavLink key={index} to={{ pathname: item.link }} exact>
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

export function UserMenu(props) {
  return (
    <div className="nav-user">
      <UserContext.Consumer>
        {({ authorized, username, signout }) =>
          authorized ? (
            <>
              <NavLink to={{ pathname: "/user" }}>
                <FaUserAlt />
                <span>{username}</span>
              </NavLink>
              <FaSignOutAlt className="faicon" onClick={signout}></FaSignOutAlt>
            </>
          ) : (
            <NavLink
              to={{ pathname: "/login", search: `next=${props.location}` }}
            >
              <FaSignInAlt />
            </NavLink>
          )
        }
      </UserContext.Consumer>
    </div>
  );
}

export function CartMenu() {
  const [show, setShow] = useState(false);

  const toggleShow = () => {
    setShow(!show);
  };
  const onClose = () => setShow(false);
  const { count } = useContext(CartContext);
  return (
    <div className="nav-cart">
      {show ? (
        <FaShoppingCart className="faicon active" onClick={toggleShow} />
      ) : (
        <FaShoppingCart className="faicon" onClick={toggleShow} />
      )}

      <div className="counter">{count}</div>
      {show ? <CartModal></CartModal> : null}
    </div>
  );
}
