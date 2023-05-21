import React from "react";
import { useDispatch } from "react-redux";
import "./styles/CartProduct.css"
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
    <article className="product__cart-main">
      <section className="product__cart-section">
        <div className="img__container">
      <div className="product__cart-img">
        <img src={product.product.images[0].url} alt="" />
        </div>
      </div>
      <section className="info-general">
      <section className="info__product">
        <h3 className="title__product">{product.product.title}</h3>
        <div className="button__product">
          <button className="buttons__product" onClick={handleClickLess}>-</button>
          <h3 className="title__total">{product.quantity}</h3>
          <button className="buttons__product" onClick={handleClickPlus}>+</button>
        </div>
      </section>
      <section className="info__total-product">
        <i onClick={handleDeleteCartProduct} className="bx bx-trash trash"></i>
        <section className="total">
        <h3 >Total</h3>
        <h3 >${product.quantity * product.product.price}</h3>
        </section>
      </section>
      </section>
      </section>
    </article>
  );
};

export default CartProduct;
