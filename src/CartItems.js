import React from "react";
import { CART_ACTION_TYPES } from "./reducer/cartReducer";
import "./styles.css";

function getDiscountedPrice(total, cartItems) {
  let subTotal = total;
  cartItems.forEach((cartItem) => {
    let couponAmt = cartItem.coupons[cartItem.cuponCode];
    if (cartItem.cuponCode && couponAmt) {
      subTotal = subTotal - (couponAmt * subTotal) / 100;
    }
  });
  return subTotal.toFixed(2);
}

function CartItems({ dispatch, cartItems, state }) {
  const total = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.price * cartItem.qty,
    0
  );

  function addToCart(ev, qty, cart) {
    if (qty <= 0) {
      dispatch({
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: { id: cart.id }
      });
      return;
    }
    dispatch({
      type: CART_ACTION_TYPES.SET_PRODUCT_QTY,
      payload: {
        ...cart,
        qty: qty
      }
    });
  }
  return (
    <div>
      <p>Cart Items</p>
      {cartItems.map((cart) => {
        let { title, image, qty, price } = cart;
        return (
          <div key={cart.id} className="cart-container">
            <img alt={title} src={image} style={{ width: "30%" }} />
            <button onClick={(ev) => addToCart(ev, ++qty, cart)}>+</button>
            {qty}
            <button onClick={(ev) => addToCart(ev, --qty, cart)}>-</button>
            <p>$ {price * qty}</p>
          </div>
        );
      })}
      <hr />
      <p>Total: ${total}</p>
      <p>After Coupon: ${getDiscountedPrice(total, cartItems)}</p>
    </div>
  );
}

export default React.memo(CartItems);
