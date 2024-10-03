import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import GiftItems from '../assets/giftItems.jpg';
import { ethers } from 'ethers';

import {
  setGlobalState,
  useGlobalState,
  setAlert,
  setLoadingMessage
} from '../store/index';
import { useBlockchain } from '../useBlockchain';

const UpdateNFT = () => {
  const [modal] = useGlobalState('updateModal');
  const [nft] = useGlobalState('nft');
  const [price, setPrice] = useState('');
  const { updatePrice } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!price || price <= 0) return;

    setGlobalState('modal', 'scale-0');
    setGlobalState('loading', {
      show: true,
      msg: 'Initiating price update...'
    });
    try {
      setLoadingMessage('Price updating...');
      setGlobalState('updateModal', 'scale-0');
      const priceInEther = ethers.utils.parseEther(price);
      const id = nft?.id;

      console.log('Id: ', parseInt(nft?.id));
      console.log('new price ', parseInt(price));

      await updatePrice({ productId: nft?.id, newPrice: priceInEther });
      setAlert('Price updated...', 'green');
      window.location.reload();
    } catch (error) {
      console.log('Error updating file: ', error);
      setAlert('Update failed...', 'red');
    }
  };

  const closeModal = () => {
    setGlobalState('updateModal', 'scale-0');
    resetForm();
  };

  const resetForm = (e) => {
    setPrice('');
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
        <form className="flex flex-col ">
          <div className="flex justify-between items-center text-gray-400">
            <p className="font-semibold ">{nft?.Title}</p>
            <button
              type="button"
              onClick={closeModal}
              className="border-0 bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex justify-center items-center rounded-xl mt-5">
            <div className="shrink-0 h-20 w-20 rounded-xl overflow-hidden ">
              <img
                className="h-full w-full object-cover cursor-pointer"
                src={nft?.metadataURI}
                alt={nft?.metadataURI}
              />
            </div>
          </div>

          <div
            className="flex justify-between 
            items-center bg-gray-800 rounded-xl mt-5"
          >
            <span className="sr-only">Choose Profile Photo</span>
            <input
              type="number"
              className="block w-full text-sm text-slate-500
                mr-4 py-2 px-4 focus:outline-none cursor-pointer 
                focus:ring-0
                bg-transparent border-0"
              placeholder="Price (ETH)"
              min={0.01}
              step={0.01}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className=" flex justify-center items-center shadow-sm shadow-slate-400
          text-sm bg-blue-900 text-white w-full text-md hover:bg-blue-800
          rounded-full px-1.5 py-2 pl-3 pr-3 mt-5 my-5"
          >
            Update Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNFT;
