import { Component } from "react";

export default class AdminDash extends Component {
  render() {
    return <SidePanel></SidePanel>;
  }
}

function SidePanel() {
  return (
    <div>
      <h1>SidePanel</h1>
    </div>
  );
}
