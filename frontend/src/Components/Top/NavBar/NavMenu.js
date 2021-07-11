import { NavLink } from "react-router-dom";

export default function NavMenu() {
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
