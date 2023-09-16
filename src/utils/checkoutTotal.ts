import { ProductDataForCart } from "../../Types";

export const checkoutData = (cartData:ProductDataForCart[], discountValue:number) => {
  const amount = cartData.reduce((acc, curr) => {
    return (acc = acc + curr.price * curr.quantity);
  }, 0);

  const discount = Number((amount * discountValue).toFixed(2));

  const grandTotal = Number((amount - discount).toFixed(2));

  const totalQuantity = cartData.reduce((acc, curr) => {
    acc = acc + curr.quantity;
    return acc;
  }, 0);

  return { amount, discount, grandTotal, totalQuantity };
};
