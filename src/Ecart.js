import React, { useReducer } from "react";
import CartItems from "./CartItems";
import ProductList from "./ProductList";
import "./styles.css";
import { data } from "./productData";
import { cartReducerFn, INITIAL_STATE } from "./reducer/cartReducer";

function ECart() {
  const [state, dispatch] = useReducer(cartReducerFn, INITIAL_STATE);
  return (
    <div className="container">
      <ProductList productList={data} state={state} dispatch={dispatch} />
      <CartItems
        dispatch={dispatch}
        state={state}
        cartItems={state?.cartItems}
      />
    </div>
  );
}

export default React.memo(ECart);
