import { Component, useContext } from "react";
import { UserContext } from "../../Contexts/UserContext";
import { retrieve } from "../../Services/ApiCalls";

export default class UserAddress extends Component {
  static contextType = UserContext;
  constructor() {
    super();
    this.state = {
      addresses: [],
    };
  }
  componentDidMount() {
    retrieve("/addresses/").then((data) => this.setState({ addresses: data }));
  }
  // sendGetRequest() {
  //   axiosInstance
  //     .get("/addresses/", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
  //     })
  //     .then((response) => this.setState({ addresses: response.data }))
  //     .catch((err) => {
  //       if (err.response) {
  //         console.log("ress");
  //       }
  //     });
  // }

  render() {
    return this.context.authorized ? (
      <div>
        {this.state.addresses.map((e) => (
          <h3>{e.address_line1}</h3>
        ))}
      </div>
    ) : (
      <div>
        <h1>Not Authorized</h1>
      </div>
    );
  }
}
