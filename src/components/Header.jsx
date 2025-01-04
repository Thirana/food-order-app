import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // we can not directly calculate the length of the item array
  //because we're increasing the quantity of  the items
  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="logo" />
        <h1></h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>
          Cart {totalCartItems}
        </Button>
      </nav>
    </header>
  );
}
