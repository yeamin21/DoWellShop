import ManufacturerList from "./Manufacturers";
import CategoryList from "./Categories";
import ItemList from "./ItemList";
import "./Items.css";
import { useState } from "react";
export default function Items(props) {
  const [query, setquery] = useState();
  const handleChange = (e) => setquery(e);

  return (
    <div className="wrapper">
      <div>
        <CategoryList />
        <ManufacturerList />
      </div>
      <div>
        <Search handleChange={handleChange}></Search>
        <ItemList query={query} />
      </div>
    </div>
  );
}

export function Search(props) {
  const x = (e) => {
    props.handleChange(e.target.value);
  };

  return (
    <div className="search">
      <input type="search" onChange={x}></input>
    </div>
  );
}
