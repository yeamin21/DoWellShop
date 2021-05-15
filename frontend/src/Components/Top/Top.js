import React, { useState } from "react";
import "./Top.css";
import NavigationMenu from "./NavigationMenu";

import { Search } from "../Product/Items";
import { Redirect } from "react-router";
export default function Top() {
  return (
    <div className="top">
      <h1>DowellIT</h1>
      <NavigationMenu />
    </div>
  );
}
