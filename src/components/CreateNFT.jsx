import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ethers } from 'ethers';
import GiftItems from '../assets/giftItems.jpg';
import { create } from 'ipfs-http-client';
import {
  setGlobalState,
  useGlobalState,
  setAlert,
  setLoadingMessage
} from '../store/index';
import { useBlockchain } from '../useBlockchain';
import axios from 'axios';

const pinataApiKey = 'bd453dd6988599e0af96';
const pinataSecretApiKey =
  '24ad34c84121903183b5c2337a9789d29e2401816c54ed70ac41200caf182b2d';

const uploadToPinata = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  let data = new FormData();
  data.append('file', file);

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey
      }
    });
    console.log('File uploaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};

// const auth =
//   'Basic ' +
//   Buffer.from(
//     '13ebc2b12b2a47eb9bae83b68dd49767' +
//       ':' +
//       'f7sNts+sptgZNQKRRdbmOashKgc8HSODrLksQGKEjk+L/TMKfHBevg'
//   ).toString('base64');

// const client = create({
//   host: 'ipfs.infura.io',
//   port: 5001,
//   protocol: 'https',
//   headers: {
//     authorization: auth
//   }
// });

const CreateNFT = () => {
  const [modal] = useGlobalState('modal');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [fileUrl, setFileUrl] = useState();
  const [imgBase64, setImgBase64] = useState(null);
  const { registerProduct } = useBlockchain();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setGlobalState('modal', 'scale-0');
    setGlobalState('loading', { show: true, msg: 'Uploading IPFS data...' });

    // if (!title || !discription || !price) return;

    // const created = await client.add(fileUrl);

    const result = await uploadToPinata(fileUrl);
    console.log('Uploaded file CID:', result.IpfsHash);

    // const metadataURI = `https://ipfs.io/ipfs/${result.IpfsHash}`;
    // console.log('MetadataURI', metadataURI);
    const ipfs = `${result.IpfsHash}`;
    try {
      setLoadingMessage('Intializing transaction...');
      const priceInEther = ethers.utils.parseEther(price);
      const nft = { title, description, category, priceInEther, amount, ipfs };
      if (!nft) {
        console.error('No file provided for upload.');
        return;
      }

      await registerProduct(nft);

      resetForm();
      setAlert('Minting completed...', 'green');
      // window.location.reload();
    } catch (error) {
      console.log('Error uploading file: ', error);
      setAlert('Minting failed...', 'red');
    }

    console.log('Minting...');
    closeModal();
  };

  const closeModal = () => {
    setGlobalState('modal', 'scale-0');
    resetForm();
  };

  const changeImage = async (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);

    reader.onload = (readerEvent) => {
      const file = readerEvent.target.result;
      setImgBase64(file);
      setFileUrl(e.target.files[0]);
    };
  };

  const resetForm = (e) => {
    setTitle('');
    setDescription('');
    setPrice('');
    setFileUrl('');
    setAmount('');
    setCategory('');
    setImgBase64(null);
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
            <p className="font-semibold ">Add NFT</p>
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
                src={imgBase64 || GiftItems}
                alt="Nft image"
              />
            </div>
          </div>
          <div className="flex justify-between items-center bg-gray-800 rounded-xl mt-5">
            <label className="block">
              <span className="sr-only">Choose Profile Photo</span>
              <input
                type="file"
                accept="img/png, img/jpeg, img/gif,img/jpg,img/webp"
                className="block w-full text-sm text-slate-500 
                file:mr-4 file:py-2 file:px-4 file:rounded-full 
                file:border-0 file:text-sm file:font-semibold 
                hover:file:bg-[#1d2631] focus:outline-none 
                cursor-pointer focus:ring-0"
                onChange={changeImage}
                required
              />
            </label>
          </div>

          <div
            className="flex justify-between 
            items-center bg-gray-800 rounded-xl mt-5"
          >
            <span className="sr-only">Choose Profile Photo</span>
            <input
              type="text"
              className="block w-full text-sm text-slate-500
                mr-4 py-2 px-4 focus:outline-none cursor-pointer 
                focus:ring-0
                bg-transparent border-0"
              placeholder="Title"
              name="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
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

          <div
            className="flex justify-between 
            items-center bg-gray-800 rounded-xl mt-5"
          >
            <span className="sr-only">Choose Profile Photo</span>
            <textarea
              type="text"
              className="block w-full text-sm text-slate-500
                mr-4 py-2 px-4 focus:outline-none cursor-pointer 
                focus:ring-0
                bg-transparent border-0 h-20 resize-none"
              placeholder="description"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div>

          <div
            className="flex justify-between 
            items-center bg-gray-800 rounded-xl mt-5"
          >
            <span className="sr-only">Choose Profile Photo</span>
            <input
              type="text"
              className="block w-full text-sm text-slate-500
                mr-4 py-2 px-4 focus:outline-none cursor-pointer 
                focus:ring-0
                bg-transparent border-0"
              placeholder="category"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            />
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
              placeholder="Amount"
              min={1}
              step={1}
              name="Amount"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
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
            Mint Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNFT;
