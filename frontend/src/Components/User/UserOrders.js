import { Component, useEffect, useState } from "react";
import { Button, Modal, ModalBody, Tab, Table } from "react-bootstrap";
import { FaEye, FaWrench } from "react-icons/fa";
import { retrieve } from "../../Services/ApiCalls";
import "./UserOrder.css";
export default class UserOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      modalVisible: false,
      modalOrder: "",
    };
  }
  componentDidMount() {
    retrieve("/order/").then((data) =>
      this.setState({
        orders: data,
      })
    );
  }

  render() {
    return (
      <div className="user-orders">
        <Table>
          <tr>
            <th> Order </th> <th> Delivery Address </th> <th> Status </th>
            <th> Actions </th>
          </tr>
          <tbody>
            {this.state.orders.map((order, index) => (
              <tr key={index}>
                <td> {order.id} </td>
                <td> {order.delivery_address.address_line1} </td>
                {order.is_ordered ? <td> Y </td> : <td>N</td>}
                <td>
                  <span>
                    <FaWrench />
                  </span>
                  <span
                    onClick={() =>
                      this.setState({
                        modalVisible: true,
                        modalOrder: order.id,
                      })
                    }
                  >
                    <FaEye />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {this.state.modalVisible ? (
          <ShowModal
            show={this.state.modalVisible}
            onClose={() => {
              this.setState({ modalVisible: false, modalOrder: "" });
            }}
            order={this.state.modalOrder}
          ></ShowModal>
        ) : null}
      </div>
    );
  }
}
class ShowModal extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.order !== this.props.order) {
      this.getProducts();
    }
  }
  getProducts = () => {
    this.props.order &&
      retrieve(`/order/${this.props.order}/`).then((data) => {
        this.setState({ products: data.orderItem });
      });
  };
  render() {
    return (
      <>
        <Modal
          scrollable={true}
          show={this.props.show}
          onHide={this.props.onClose}
        >
          <Modal.Header closeButton onClick={this.props.onClose}>
            <Modal.Title>Order Details for ID: {this.props.order}</Modal.Title>
          </Modal.Header>

          <Table>
            <thead>
              <td>Product</td>
              <td>Quantity</td>
              <td>Unit Price</td>
              <td>Total</td>
            </thead>
            <tbody>
              {this.state.products.map((product, index) => (
                <tr key={index}>
                  <td> {product.product} </td>
                  <td> {product.quantity} </td>
                  <td>{product.unit_price}</td>
                  <td>
                    {parseFloat(product.unit_price * product.quantity).toFixed(
                      2
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </>
    );
  }
}
