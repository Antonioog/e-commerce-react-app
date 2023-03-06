import { useEffect, useState } from "react";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import PurchasesCard from "../components/purchases/purchasesCard";
import "./styles/Purchases.css"


const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then((res) => setPurchases(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="purchases__container">
      <section className="purchases__section">
        <section className="purchases__section-container">
          <h3 className="purchases__title">My purchases</h3>
          <section className="purchases__list">
            {purchases.map((purchase) => (
              <PurchasesCard key={purchase.id} purchase={purchase} />
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default Purchases;
