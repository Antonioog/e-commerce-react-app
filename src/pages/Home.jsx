import { useEffect, useState } from "react";
import ProductCard from "../components/Home/ProductCard";
import { axiosEcommerce } from "../utils/configAxios";
import "./styles/Home.css"

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])
  const [nameFilter, setNameFilter] = useState("")
  const [filterProducts, setFilterProducts] = useState([])
  const [categoryFilter, setCategoryFilter] = useState(0)


  const handleSubmit = (e) => {
    e.preventDefault()
    const nameProduct = e.target.nameProduct.value
    console.log(nameProduct)
    setNameFilter(nameProduct)
  }

  useEffect(() => {
    axiosEcommerce
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosEcommerce.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err))
  },[])

  useEffect(() => {
    const newProductsByName = products.filter((product) => product.title.toLowerCase().includes(nameFilter.toLowerCase()))
    if(categoryFilter){
      const newProductsByCategory = newProductsByName.filter((product) => product.categoryId === categoryFilter)
      setFilterProducts(newProductsByCategory)
    }else{
      setFilterProducts(newProductsByName)

    }
  },[nameFilter, products, categoryFilter])

  return (
    <main className="home">
      <form onSubmit={handleSubmit}>
        <div>
          <input id="nameProduct" type="text" />
          <button><i className="bx bx-search"></i></button>
        </div>
        <div>
          <h3>Categories</h3>
          <ul>
            <li onClick={() => setCategoryFilter(0)}>All</li>
            {
              categories.map(category => <li onClick={() => setCategoryFilter(category.id)} key={category.name}>{category.name}</li>)
            }
          </ul>
        </div>

      </form>
      <section className="home__listProducts">
        {filterProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
