import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosEcommerce } from "../utils/configAxios";
import ProductCard from "../components/Home/ProductCard";
import { addProductCart } from "../store/slices/cart.slice";
import { useDispatch } from "react-redux";

const Product = () => {
  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const { id } = useParams();

  const handleLess = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const dispatch = useDispatch();

  const handleClickAddProduct = () => {
    const data = {
      quantity,
      productId: product.id,
    };
    dispatch(addProductCart(data));
  };

  useEffect(() => {
    axiosEcommerce
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (product) {
      axiosEcommerce
        .get(`/products?categoryId=${product?.categoryId}`)
        .then((res) => {
          const newSimilarProducts = res.data.filter(
            (productByCategory) => productByCategory.id != product.id
          );
          setSimilarProducts(newSimilarProducts);
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  return (
    <main>
      <section>
        <section>
          <div>
            <img src={product?.images[0].url} alt="" />
          </div>
        </section>

        <section>
          <h4>{product?.brand}</h4>
          <h3>{product?.title}</h3>

          <div>
            <div>
              <h4>Price:</h4>
              <h3>${product?.price}</h3>
            </div>
            <div>
              <h4>Quantity</h4>
              <div>
                <button onClick={handleLess}>
                  <i className="bx bxs-minus-circle"></i>
                </button>
                <h4>{quantity}</h4>
                <button onClick={handlePlus}>
                  <i className="bx bxs-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <button onClick={handleClickAddProduct}>
            Add to cart <i className="bx bx-cart"></i>
          </button>

          <p>{product?.description}</p>
        </section>
      </section>

      <h2>Discover similar items</h2>

      <section>
        {similarProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Product;
