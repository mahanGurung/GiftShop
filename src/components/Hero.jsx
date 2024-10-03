import React from 'react';
import GiftItem from '../assets/giftItems.jpg';
import ProductManager from '../assets/productManager.jpg';
import { setGlobalState, truncate, useGlobalState } from '../store/index';
import Blockies from 'react-blockies';

const Hero = () => {
  const openCreateNft = () => {
    setGlobalState('modal', 'scale-100');
  };

  const [connectedAccount] = useGlobalState('connectedAccount');
  const [account] = useGlobalState('account');

  return (
    <div className="flex flex-col md:flex-row w-4/5 justify-between items-center mx-auto py-10 ">
      <div className="md:w-3/6 w-full">
        <div>
          {connectedAccount == account ? (
            <div>
              <h1 className="text-white text-5xl font-bold mt-12">
                Instruction for creating
                <br /> NFT
              </h1>
              <ul className="text-white text-md font-semibold pt-5">
                <li>
                  - In the file choose only a img/png, img/jpeg, img/gif,
                  img/jpg, img/webp
                </li>
                <li className="pt-1">- Choose a title for your NFT</li>
                <li className="pt-1">- Choose a category for your NFT</li>
                <li className="pt-1">- Choose a description for your NFT</li>
                <li className="pt-1">- Choose a price for your NFT</li>
                <li className="pt-1">
                  - Choose a amount of your NFT fractionalized
                </li>
              </ul>
            </div>
          ) : (
            <h1 className="text-white text-5xl font-bold">
              Buy special gift <br />
              for your <br />
              loved ones
            </h1>
          )}
        </div>
        <div className=" my-5">
          {connectedAccount == account ? (
            <button
              onClick={openCreateNft}
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5"
            >
              Create Nft
            </button>
          ) : (
            <button
              onClick={openCreateNft}
              className="invisible shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5"
            >
              Create Nft
            </button>
          )}
        </div>
        <div className="w-3/4 flex justify-between items-center mt-20">
          <div className="text-white">
            <p className="font-bold">8K</p>
            <small className="text-gray-300">Users</small>
          </div>
          <div className="text-white">
            <p className="font-bold">10K</p>
            <small className="text-gray-300">Users</small>
          </div>
          <div className="text-white">
            <p className="font-bold">9K</p>
            <small className="text-gray-300">Users</small>
          </div>
        </div>
      </div>

      <div className="shadow-xl shadow-slate-400 md:w-2/5 w-full mt-10 md:mt-0 rounded-md overflow-hidden bg-gray-800">
        <img
          className="h-60 w-full object-cover"
          src={GiftItem}
          alt="Gift image"
        />

        <div className="flex justify-start items-center py-3">
          {/* <img
            className="h-12 w-12 rounded-full object-cover mr-3"
            src={ProductManager}
            alt="Product Manager"
          /> */}
          <Blockies
            className="h-10 w-10 rounded-full object-contain mr-3 ml-2"
            seed={connectedAccount}
            size={9}
            // scale={3}
          />
          <div>
            <p className="text-white font-semibold">You</p>
            <small className="text-gray-100">
              {truncate(connectedAccount, 4, 4, 11)}
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
