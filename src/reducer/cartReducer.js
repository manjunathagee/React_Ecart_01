export const CART_ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  SET_PRODUCT_QTY: "SET_PRODUCT_QTY"
};

export const INITIAL_STATE = {
  productList: [],
  cartItems: []
};
/**
 *
 * {
 *  img, qty, coupons, id,
 * }
 */

export function cartReducerFn(state, action) {
  switch (action.type) {
    case CART_ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload }]
      };
    case CART_ACTION_TYPES.SET_PRODUCT_QTY: {
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((cart) => cart.id !== action.payload.id),
          { ...action.payload }
        ]
      };
    }
    case CART_ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (cart) => cart.id !== action.payload.id
        )
      };
    default:
      return state;
  }
}
