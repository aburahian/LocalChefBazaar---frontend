import { BsFingerprint, BsHeart, BsStar } from "react-icons/bs";

import MenuItem from "./MenuItem";


const CustomerMenu = () => {
  return (
    <>
      <MenuItem icon={BsFingerprint} label="My Orders" address="my-orders" />
      <MenuItem icon={BsStar} label="My Review" address="my-review" />
      <MenuItem icon={BsHeart} label="Favorite Meal" address="favorite-meal" />
    </>
  );
};

export default CustomerMenu;
