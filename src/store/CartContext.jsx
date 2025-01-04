import { createContext, useReducer } from "react";

// initiating a context
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
});

/**
 * * values for state and action are provided by React
 * * object of this function is to update the state based on given action
 * @param state 2nd param which passed in useReducer calling (array of item objects)
 * @param action object
 */
function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id,
    );

    // creating new array object in memory spreading existing state object
    // basically what happen in here is we are creating copy of existing state object
    const updateItems = [...state.items];

    // if the item is not in array, findIndex() will return -1
    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      updateItems[existingCartItemIndex] = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id,
    );
    const existingCartItem = state.items[existingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      // adding updated item to the new state array
      updatedItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
    }

    return { ...state, items: updatedItems };
  }

  // return unchanged state, if none of above conditions met
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item });
  }

  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", id });
  }

  const cartContext = {
    items: cart.items,
    addItem: addItem,
    removeItem: removeItem,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
