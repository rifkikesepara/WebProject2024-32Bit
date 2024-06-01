import LOG from "../Debug/Console";
import {
  GetFromLocalStorage,
  GetFromSessionStorage,
  SaveToSessionStorage,
} from "./utilities";

//returns the calculated price with discount precentage
const getPriceWithPercentege = (price, percentege) => {
  return (price / 100) * (100 - percentege);
};

//pushes the used offer to the storage with paramters
const offerUsed = (offer, payback) => {
  const usedOffers = GetFromSessionStorage("usedOffers");
  const index = usedOffers.indexOf(
    usedOffers.find((data) => data.id === offer.id)
  );
  if (index === -1) {
    usedOffers.push({
      ...offer,
      payback: payback,
    });
  } else {
    usedOffers[index].payback = payback;
  }
  SaveToSessionStorage("usedOffers", usedOffers);
};

//if offer is not being used anymore removes the offer from storage
const removeOffer = (id) => {
  const usedOffers = GetFromSessionStorage("usedOffers");
  const index = usedOffers.indexOf(usedOffers.find((data) => data.id === id));
  if (index !== -1) usedOffers.splice(index, 1);
  SaveToSessionStorage("usedOffers", usedOffers);
};

//applies the indicated offer to the product
const applyOfferToProduct = (offer, product) => {
  LOG("applyamounToPRoduct", "blue");
  let newProduct, discount;
  newProduct = { ...product, offer: undefined };

  //checking if there is any percentage discount in the offer if there is then applies
  if (offer.discount.split(":")[2] !== undefined) {
    discount =
      parseInt(newProduct.count / offer.discount.split(":")[0]) *
      offer.discount.split(":")[1] *
      (newProduct.price.discounted -
        getPriceWithPercentege(
          newProduct.price.discounted,
          offer.discount.split(":")[2]
        ));
  } else {
    //applying the offer as just amount not with the percentage
    discount =
      newProduct.price.discounted *
      (parseInt(newProduct.count / offer.discount.split(":")[0]) *
        offer.discount.split(":")[1]);
  }
  newProduct.price.cashout -= discount;

  //checking if the minimum amount is proper considering the offer
  if (product.count >= parseInt(offer.discount.split(":")[0])) {
    if (newProduct.offer?.offerName !== offer.offerName) {
      //offer is applied to the product first time
      newProduct.offer = {
        ...offer,
        offerApplied: parseInt(newProduct.count / offer.discount.split(":")[0]),
      };
      // console.log(test.offer);
    } else {
      //offer applied multiple times to the product
      newProduct.offer.offerApplied++;
    }
    offerUsed(offer, discount);
  } else {
    //offer is not being used anymore
    newProduct.offer = undefined;
    removeOffer(offer.id);
  }

  //returning the new product's data
  return newProduct;
};

//checks if there is an offer for the product and if there is then applies to the product
export const CheckAndApplyOffer = (product) => {
  LOG("checkandapplyoffer", "orange");
  let temp = { ...product };
  temp.price.cashout = temp.price.discounted * temp.count;
  const activeOffers = GetFromLocalStorage("offers").filter(
    ({ activated }) => activated
  );

  activeOffers.forEach((offer) => {
    if (!offer.categoryID && !offer.productID) {
      // console.log("for all " + offer.offerName);
      if (temp.offer === undefined || temp.offer?.length === 0)
        temp = { ...applyOfferToProduct(offer, product) };
    } else {
      if (offer.productID != null && product.id == offer.productID) {
        temp = { ...applyOfferToProduct(offer, product) };
      } else if (
        offer.categoryID != null &&
        product.category === offer.categoryID
      ) {
        // console.log(product);
      }
    }
  });
  // console.log(temp);
  return temp;
};
