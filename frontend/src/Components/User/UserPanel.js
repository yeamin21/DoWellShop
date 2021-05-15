import { Component } from "react";
import { Table } from "react-bootstrap";
import { Link, Redirect, Route } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { axiosInstance } from "../../Services/ApiCalls";
import Login from "./Login";
import "./UserPanel.css";
import UserAddress from "./UserAddress";
import UserOrders from "./UserOrders";
export default class UserPanel extends Component {
  static contextType = UserContext;

  render() {
    return (
      <div className="userpanel">
        <UserOrders></UserOrders>
        <UserInfo></UserInfo>
      </div>
    );
  }
}

function UserInfo() {
  return (
    <div className="user-info">
      <div className="circ">
        <h1>IMG</h1>
      </div>
      <div className="userDetails">
        <h1>Name</h1>
      </div>
      <div className="addresses">
        <UserAddress></UserAddress>
      </div>
    </div>
  );
}
