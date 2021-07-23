import axios from "axios";
import { Component } from "react";
import { createContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { axiosInstance } from "../Services/ApiCalls";

export const UserContext = createContext({
  username: "",
  access: "",
  refresh: "",

  authorized: false,
  signin: () => {},
  signout: () => {},
});

export default class UserContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      access: "",
      refresh: "",
      username: "",
      authorized: false,
      signin: this.signin,
      signout: this.signout,
    };

    this.signout = this.signout.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentDidMount() {
    localStorage.getItem("access") &&
      localStorage.getItem("refresh") &&
      this.retreive();
  }

  signin = async (username, password) => {
    await axiosInstance
      .post("/token/", { username, password })
      .then((response) => {
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        axiosInstance.defaults.headers[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("access")}`;
        this.setState(
          {
            access: response.data.access,
            refresh: response.data.refresh,
          },
          () => this.retreive()
        );
      });
  };
  signout = () => {
    this.setState({ username: "", access: "", refresh: "", authorized: false });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  retreive = async () => {
    axiosInstance
      .get("/user/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      })
      .then(
        (response) => {
          this.setState(
            {
              username: response.data.username,
              authorized: true,
            },
            () =>
              (document.cookie = `username = ${response.data.username}; expires= Thu, 18 Dec 2027 12:00:00 UTC`)
          );
        },
        (response) => {
          console.log(response);
        }
      );
    // .catch((error) => {
    //   console.log("error in user", error);
    // });
  };
  render() {
    return (
      <UserContext.Provider value={this.state}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
