import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);

  // we can not directly calculate the length of the item array
  //because we're increasing the quantity of  the items
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1></h1>
      </div>
      <nav>
        <Button textOnly>Cart {totalCartItems}</Button>
      </nav>
    </header>
  );
}
