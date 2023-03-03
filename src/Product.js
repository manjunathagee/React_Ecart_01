import React, { useId, useState } from "react";
import { CART_ACTION_TYPES } from "./reducer/cartReducer";
import "./styles.css";

function Product({ product, dispatch, state }) {
  const { title, price, description, image, coupons, id } = product;
  const [cuponCode, setCouponCode] = useState("");
  const formId = useId();
  const itemPresentInCart = state.cartItems.some((cart) => cart.id === id);
  const cartItem = state.cartItems.find((cart) => cart.id === id);
  const [invalidCouponEntered, setInvalidCouponEntered] = useState(false);

  function addToCart(ev, qty = null) {
    if (qty === 0) {
      dispatch({
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: { id }
      });
      return;
    }
    dispatch({
      type:
        qty === null
          ? CART_ACTION_TYPES.ADD_TO_CART
          : CART_ACTION_TYPES.SET_PRODUCT_QTY,
      payload: {
        id,
        title,
        price,
        image,
        coupons,
        cuponCode: !invalidCouponEntered ? cuponCode : null,
        qty: qty !== null ? qty : 1
      }
    });
  }

  function removeFromCart() {
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_CART,
      payload: { id }
    });
  }

  return (
    <div className="product">
      <h3>{title}</h3>
      <img src={image} style={{ width: "100%" }} alt={title} />
      <p>{`${description.substr(0, 30)}...`}</p>
      <p>
        Price: <b>${price}</b>
      </p>
      <div>
        <label htmlFor={`${formId}-couponcode`}>Coupon Code: </label>
        <input
          value={cuponCode}
          id={`${formId}-couponcode`}
          type="text"
          onChange={(e) => setCouponCode(e.target.value)}
          style={{ maxWidth: "50%" }}
          onBlur={() => {
            setInvalidCouponEntered(coupons[cuponCode] === undefined);
          }}
        />
        {invalidCouponEntered && <p>Invalid coupon Entered!</p>}
      </div>
      <div className="btn-container">
        {!itemPresentInCart && (
          <button className="primary" onClick={addToCart}>
            Add to Cart
          </button>
        )}
        {itemPresentInCart && (
          <button className="danger" onClick={removeFromCart}>
            Remove from Cart
          </button>
        )}
        {itemPresentInCart && (
          <>
            <button onClick={(ev) => addToCart(ev, ++cartItem.qty)}>+</button>
            {cartItem.qty}
            <button onClick={(ev) => addToCart(ev, --cartItem.qty)}>-</button>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Product);
