import React, { useEffect, useState } from 'react';
import GiftItem from '../assets/giftItems.jpg';
import { setGlobalState, useGlobalState } from '../store';
import { ethers } from 'ethers';

const Products = () => {
  const [nftLists] = useGlobalState('nftList');
  const [end, setEnd] = useState(4);
  const [count] = useState(4);
  const [collection, setCollection] = useState([]);

  const getCollection = () => {
    return nftLists.slice(0, end);
  };

  useEffect(() => {
    setCollection(getCollection());
  }, [nftLists, end]);

  return (
    <div className="bg-[#151c25] gradient-bg-products">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {collection.length > 0 ? 'Product' : 'No Product avialable'}
        </h4>
        <div
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6
         md:gap-4 lg:gap-3 py-2.5"
        >
          {collection.map((nft, i) => (
            <Card key={i} nft={nft} />
          ))}
        </div>
        <div className="text-center my-5">
          {collection.length > 0 && nftLists.length > collection.length ? (
            <button
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900
           text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5
           "
              onClick={() => setEnd(end + count)}
            >
              Load More
            </button>
          ) : (
            <button
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900
         text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5
         "
              onClick={() => setEnd(4)}
            >
              Show less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({ nft }) => {
  const setNFT = () => {
    setGlobalState('nft', nft);
    setGlobalState('showModal', 'scale-100');
  };

  return (
    <div
      className="w-full shadow-xl shadow-slate-400 rounded-md overflow-hidden
  bg-gray-800 my-2 p-3"
    >
      <img
        className="h-60 w-full object-cover shadow-lg shadow-black rounded-lg mb-3"
        src={nft.metadataURI}
        alt="Product image"
      />
      <h4 className="text-white font-semibold">{nft.Title}</h4>
      <p className="text-gray-400 text-sm my-1">{nft.description}</p>
      <div className="flex justify-between items-center mb-3 mt-5 text-white">
        <div className="flex flex-col">
          <small className="text-xs">Current Price</small>
          <p className="text-sm font-semibold">{nft.cost}</p>
        </div>
        <div className="flex flex-col">
          <small className="text-xs">Amount</small>
          <p className="text-sm font-semibold">{nft.amount}</p>
        </div>
        <button
          className="shadow-lg shadow-black text-sm bg-white text-black
       hover:bg-slate-50 rounded-full px-1.5 py-1"
          onClick={setNFT}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default Products;
