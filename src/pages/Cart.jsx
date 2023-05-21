import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartProduct from "../components/Cart/CartProduct";
import { getAllCartProducts, purchaseCart } from "../store/slices/cart.slice";
import "./styles/Cart.css"

const Cart = () => {
  const { products } = useSelector((store) => store.cart);
  console.log(products);

  const dispatch = useDispatch();

  const totalPriceCart = products.reduce(
    (total, product) => total + product.quantity * product.product.price,
    0
  );

  const handlePurchasesCart = () => {
    dispatch(purchaseCart());
  };

  useEffect(() => {
    dispatch(getAllCartProducts());
  }, []);

  return (
    <main className="main__cart">
      <section className="section__cart">
        {products.map((product) => (
          <CartProduct key={product.id} product={product} />
        ))}
      </section>
    
      <section className="content__prduct-cart">
      <hr />
        <div className="total__product-cart">
          <h3>Total</h3>
          <h3>$ {totalPriceCart}</h3>
        </div>
        <button className="button__total-cart" onClick={handlePurchasesCart}>CheckOut</button>
      </section>
    </main>
  );
};

export default Cart;
