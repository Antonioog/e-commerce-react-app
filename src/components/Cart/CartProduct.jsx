import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProductCart,
  updateProductCart,
} from "../../store/slices/cart.slice";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(product.id));
  };

  const handleClickPlus = () => {
    const newQuantity = product.quantity + 1;
    const data = {
      quantity: newQuantity,
    };
    dispatch(updateProductCart(product.id, data));
  };

  const handleClickLess = () => {
    const newQuantity = product.quantity - 1;
    if (newQuantity <= 0) {
      dispatch(deleteProductCart(product.id));
    } else {
      const data = {
        quantity: newQuantity,
      };
      dispatch(updateProductCart(product.id, data));
    }
  };
  return (
    <article>
      <div>
        <img src={product.product.images[0].url} alt="" />
      </div>
      <section>
        <h3>{product.product.title}</h3>
        <div>
          <button onClick={handleClickLess}>-</button>
          <h3>{product.quantity}</h3>
          <button onClick={handleClickPlus}>+</button>
        </div>
      </section>
      <section>
        <i onClick={handleDeleteCartProduct} className="bx bx-trash"></i>
        <h3>Total</h3>
        <h3>${product.quantity * product.product.price}</h3>
      </section>
    </article>
  );
};

export default CartProduct;
