import LOG from "../Debug/Console";
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToSessionStorage,
} from "./utilities";

const getPriceWithPercentege = (price, percentege) => {
  return (price / 100) * (100 - percentege);
};

const offerUsed = (offer, payback) => {
  const usedOffers = GetFromSessionStorage("usedOffers");
  const index = usedOffers.indexOf(
    usedOffers.find((data) => data.id == offer.id)
  );
  if (index == -1) {
    usedOffers.push({
      ...offer,
      payback: payback,
    });
  } else {
    usedOffers[index].payback = payback;
  }
  SaveToSessionStorage("usedOffers", usedOffers);
};

const removeOffer = (id) => {
  const usedOffers = GetFromSessionStorage("usedOffers");
  const index = usedOffers.indexOf(usedOffers.find((data) => data.id == id));
  if (index != -1) usedOffers.splice(index, 1);
  SaveToSessionStorage("usedOffers", usedOffers);
};

const applyOfferToProduct = (offer, product) => {
  LOG("applyamounttoPRoduct", "blue");
  let test, discount;
  test = { ...product, offer: undefined };

  if (offer.discount.split(":")[2] != undefined) {
    discount =
      parseInt(test.count / offer.discount.split(":")[0]) *
      offer.discount.split(":")[1] *
      (test.price.discounted -
        getPriceWithPercentege(
          test.price.discounted,
          offer.discount.split(":")[2]
        ));
  } else {
    discount =
      test.price.discounted *
      (parseInt(test.count / offer.discount.split(":")[0]) *
        offer.discount.split(":")[1]);
  }
  test.price.cashout -= discount;

  if (product.count >= parseInt(offer.discount.split(":")[0])) {
    if (test.offer?.offerName != offer.offerName) {
      test.offer = {
        ...offer,
        offerApplied: parseInt(test.count / offer.discount.split(":")[0]),
      };
      console.log(test.offer);
    } else {
      test.offer.offerApplied++;
    }
    offerUsed(offer, discount);
  } else {
    test.offer = undefined;
    removeOffer(offer.id);
  }
  return test;
};

export const CheckAndApplyOffer = (product, checkoutData) => {
  LOG("checkandapplyoffer", "orange");
  let temp = { ...product };
  temp.price.cashout = temp.price.discounted * temp.count;
  const activeOffers = GetFromLocalStorage("offers").filter(
    ({ activated }) => activated
  );

  activeOffers.map((offer) => {
    if (!offer.categoryID && !offer.productID) {
      // console.log("for all " + offer.offerName);
      if (temp.offer == undefined || temp.offer?.length == 0)
        temp = { ...applyOfferToProduct(offer, product) };
    } else {
      if (offer.productID != null && product.id == offer.productID) {
        temp = { ...applyOfferToProduct(offer, product) };
      } else if (
        offer.categoryID != null &&
        product.category == offer.categoryID
      ) {
        // console.log(product);
      }
    }
  });
  console.log(temp);
  return temp;
};
