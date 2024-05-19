import LOG from "../Debug/Console";
import { GetFromLocalStorage } from "./utilities";

const getDiscountwithPercentege = (price, percentege) => {
  return (price / 100) * (100 - percentege);
};

export const CheckAndApplyOffer = (product, checkoutData) => {
  LOG("checkandapplyoffer", "orange");
  const activeOffers = GetFromLocalStorage("offers").filter(
    ({ activated }) => activated
  );
  let temp = { ...product, offer: undefined };

  activeOffers.map((offer) => {
    if (!offer.categoryID && !offer.productID) {
      console.log("for all " + offer.offerName);
    } else {
      switch (offer.type) {
        case "amount":
          if (offer.productID != null && product.id == offer.productID) {
            temp.price.cashout =
              temp.price.discounted * temp.count -
              temp.price.discounted *
                parseInt(temp.count / offer.discount.split(":")[0]);
            if (product.count >= parseInt(offer.discount.split(":")[0]))
              temp = {
                ...temp,
                offer: offer.offerName,
                offerApplied: parseInt(
                  temp.count / offer.discount.split(":")[0]
                ),
              };
            console.log(temp);
          } else if (
            offer.categoryID != null &&
            product.category == offer.categoryID
          ) {
            console.log(product);
            console.log(
              "offer for category : amount : " + product.attributes.name
            );
          }
          break;
        case "percentage":
          if (offer.productID != null && product.id == offer.productID) {
            temp.price.discounted = getDiscountwithPercentege(
              product.price.normal,
              offer.discount
            );
            temp.price.cashout = getDiscountwithPercentege(
              product.price.normal,
              offer.discount
            );
          } else if (
            offer.categoryID != null &&
            offer.categoryID == product.category
          )
            console.log(
              "offer for category : percentage : " + product.attributes.name
            );
          break;
      }
    }
  });
  return temp;
};
