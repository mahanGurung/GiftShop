import React from 'react';
import GiftShop from '../assets/giftShop.png';

const Footer = () => {
  return (
    <div
      className="w-full flex flex-col md:justify-center
     justify-between items-center gradient-bg-footer p-4"
    >
      <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.25] justify-center items-center  ">
          <img className="w-32" src={GiftShop} alt="Logo of gift shop" />
        </div>
        <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full text-white text-base text-center">
          <p className="cursor-pointer">Home</p>
          <p className="cursor-pointer">Product</p>
          <p className="cursor-pointer">Feature</p>
          <p className="cursor-pointer">Profile</p>
        </div>
        <div className="flex flex-[0.25] justify-center items-center">
          <p className="text-white text-right text-sm">
            &copy;2022 All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
