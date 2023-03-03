import React from "react";
import Product from "./Product";
import "./styles.css";

function ProductList({ productList, dispatch, state }) {
  return (
    <div className="product-container">
      {productList.map((product) => (
        <Product
          key={product.id}
          product={product}
          dispatch={dispatch}
          state={state}
        />
      ))}
    </div>
  );
}

export default React.memo(ProductList);
