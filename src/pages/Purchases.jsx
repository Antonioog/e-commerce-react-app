import { useEffect, useState } from "react";
import { axiosEcommerce, getConfig } from "../utils/configAxios";
import PurchasesCard from "../components/purchases/purchasesCard";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axiosEcommerce
      .get("/purchases", getConfig())
      .then((res) => setPurchases(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <section>
        <section>
          <h3>My purchases</h3>
          <section>
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
