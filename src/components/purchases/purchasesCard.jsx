import React from "react";
import { formatDateDDMMYYYY } from "../../utils/date";

const purchasesCard = ({ purchase }) => {
  return (
    <section className="purchase__card">
      {
        <article className="purcharse__card-container">
          <div className="purcharse__card-header">
            <div className="purchases__Card-img">
              <img src={purchase.product.images[0].url} alt="" />
            </div>
            <h4 className="purchases__card-title">{purchase.product.title}</h4>
          </div>
          <div className="purcharse__card-info">
            <h4 className="purcharse__card-date">{formatDateDDMMYYYY(purchase.createdAt)}</h4>
            <div>
              <h4 className="purcharse__card-quantity">{purchase.quantity}</h4>
            </div>
            <div>
              <h4>$ {purchase.product.price}</h4>
            </div>
          </div>
        </article>
      }
    </section>
  );
};

export default purchasesCard;
