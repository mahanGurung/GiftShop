import React, { useState } from 'react';
import Blockies from 'react-blockies';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import GiftItems from '../assets/giftItems.jpg';
import {
  setGlobalState,
  useGlobalState,
  truncate,
  setLoadingMessage,
  setAlert
} from '../store/index';
import { useBlockchain } from '../useBlockchain';

const ShowNFT = () => {
  const [modal] = useGlobalState('showModal');
  const [connectedAccount] = useGlobalState('connectedAccount');
  const [account] = useGlobalState('account');
  const [nft] = useGlobalState('nft');
  const [amount, setAmount] = useState('');
  const { buyProduct } = useBlockchain();

  const onChangePrice = () => {
    setGlobalState('nft', nft);
    setGlobalState('showModal', 'scale-0');
    setGlobalState('updateModal', 'scale-100');
  };

  const handlePurchase = async () => {
    setLoadingMessage('Initiating purchase...');
    try {
      setLoadingMessage('Purchasing, awaiting MetaMask approval...');

      // const nftPriceInWei = ethers.utils.parseEther(nft?.cost;
      const productTotalPrice = amount * nft?.cost;

      console.log('productTotalPrice', productTotalPrice);
      console.log('Id: ', parseInt(nft?.id));
      console.log('amount ', parseInt(amount));

      await buyProduct({
        id: nft?.id,
        amount: amount,
        productTotalPrice: productTotalPrice
      });
      setAlert('Product Purchased...', 'green');
      window.location.reload();
    } catch (error) {
      console.log('Error updating file: ', error);
      setAlert('Purchase failed...', 'red');
    }
  };

  const closeModal = () => {
    setGlobalState('showModal', 'scale-0');
  };

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black 
    bg-opacity-50 transform transition-transform duration-300 ${modal}`}
    >
      <div
        className="bg-[#151c25] shadow-xl shadow-slate-400
      rounded-xl w-11/12 md:w-2/5 h-7/12 p-6"
      >
        <div className="flex flex-col ">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold ">Buy NFT</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-40 w-40 rounded-xl overflow-hidden ">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt={nft?.metadataURI}
              />
            </div>
          </div>

          <div className="flex flex-col justify-start rounded-xl mt-5">
            <h4 className="text-white font-semibold">{nft?.Title}</h4>
            <p className="text-gray-400 text-sm my-1">{nft?.description}</p>

            <div className="flex justify-between items-center mt-3 text-white">
              <div className="flex justify-start items-center">
                <Blockies
                  className="h-10 w-10 object-contain rounded-full mr-3"
                  seed={account}
                  size={10}
                  // scale={3}
                />
                <div className="flex flex-col justify-center items-center">
                  <small>@Ownerr</small>
                  <small className="text-blue-400">
                    {truncate(account, 4, 4, 11)}
                  </small>
                </div>
              </div>
              <div className="flex flex-col">
                <small className="text-xs">Current price</small>
                <p className="text-sm font-semibold">{nft?.cost}</p>
              </div>
            </div>
          </div>

          {account.toLowerCase() == connectedAccount ? (
            <button
              className=" flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white p-2 mt-5  w-full text-md hover:bg-blue-800
          rounded-full "
              onClick={onChangePrice}
            >
              Change price
            </button>
          ) : (
            <div>
              <div
                className="flex justify-between
            items-center bg-gray-800 rounded-xl mt-5"
              >
                <input
                  className="block w-full text-sm text-slate-500
                mr-4 py-2 px-4 focus:outline-none cursor-pointer 
                focus:ring-0
                bg-transparent border-0"
                  placeholder="amount"
                  name="amount"
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  required
                />
              </div>
              <button
                className=" flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white p-2 mt-5 w-full text-md hover:bg-blue-800
          rounded-full"
                onClick={handlePurchase}
              >
                Purchase
              </button>
            </div>
          )}
          {/* <div className="flex justify-between items-center space-x-2">
            

            
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ShowNFT;
