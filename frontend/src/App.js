import {
  BrowserRouter,
  Route,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import "./App.scss";
import Items from "./Components/Product/Items";
import Top from "./Components/Top/Top";
import { Cart } from "./Components/Checkout/Cart";
import CartContextProvider from "./Contexts/CartContext";
import UserContextProvider from "./Contexts/UserContext";
import Checkout from "./Components/Checkout/Checkout";
import UserPanel from "./Components/User/UserPanel";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import ItemDetails from "./Components/Product/ItemDetails";
import Home from "./Pages/Home";
import { useState } from "react";
import ItemList from "./Components/Product/ItemList";
import Products from "./Pages/Products";

export default function App() {
  return (
    <div className="app">
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

function Body() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <CartContextProvider>
          <Top />
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={Items} />
          <Route path="/cart" component={Cart} />
          <Route path="/products/:id" exact component={ItemDetails}></Route>
          <Route path="/checkout" component={Checkout}></Route>
        </CartContextProvider>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/user" component={UserPanel}></Route>
      </UserContextProvider>
    </BrowserRouter>
  );
}

function Footer() {
  return <footer>This is a footer</footer>;
}
