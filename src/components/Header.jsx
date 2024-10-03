import React from 'react';
import giftshop from '../assets/giftShop.png';
import { ethers } from 'ethers';
import { useGlobalState, truncate } from '../store';
import { useBlockchain } from '../useBlockchain';

// import { connectWallet, disconnectWallet } from '../BlockchainServices';

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount');
  const { connectWallet, disconnectWallet } = useBlockchain();
  return (
    <div className="w-4/5 flex justify-between md:justify-center item-center py-4 mx-auto">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img class="w-32 cursor-pointer" src={giftshop} alt="Logo" />
      </div>
      <ul className="md:flex-[0.4] text-white md:flex hidden justify-between items-center flex-initial">
        <li className="mx-4 cursor-pointer">Home</li>
        <li className="mx-4 cursor-pointer">Product</li>
        <li className="mx-4 cursor-pointer">feature</li>
      </ul>

      {/* <button
        className="shadow-xl shadow-black text-black bg-white hover:bg-slate-300 md:text-xs p-2 ml-2 rounded-md"
        onClick={connectWallet}
      >
        Connect Wallet
      </button> */}

      {connectedAccount ? (
        <div className="group relative">
          <button className="shadow-xl shadow-black text-black bg-white hover:bg-slate-300 md:text-xs p-2 ml-2 rounded-full cursor-pointer">
            <span className="group-hover:hidden">
              {truncate(connectedAccount, 4, 4, 11)}
            </span>
            <span
              className="hidden group-hover:flex"
              onClick={disconnectWallet}
            >
              Disconnect Wallet
            </span>
          </button>
          t
        </div>
      ) : (
        <button
          className="shadow-xl shadow-black text-black bg-white hover:bg-slate-300 md:text-xs p-2 ml-2 rounded-full"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Header;
