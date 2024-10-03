import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import { ethers } from 'ethers';
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Transactions from './components/Transactions';
import Footer from './components/Footer';
import CreateNFT from './components/CreateNFT';
import ShowNFT from './components/ShowNFT';
import UpdateNFT from './components/UpdateNFT';
import Loading from './components/Loading';
import Alert from './components/Alert';
// import { isWalletConnected } from './BlockchainProvider';
import { useBlockchain } from './useBlockchain';
// import ABI from './constrants/ABI.json';
// import { setAlert } from './store';
// import { setGlobalState } from './store';

const App = () => {
  const { isWalletConnected, initializeContract, getAllNFT } = useBlockchain();

  useEffect(() => {
    const checkWalletConnection = async () => {
      await isWalletConnected();
    };

    checkWalletConnection();

    const checkinitializeContract = async () => {
      await initializeContract();
    };

    checkinitializeContract();

    const getAllProductNft = async () => {
      await getAllNFT();
    };
    getAllProductNft();
  }, []);

  return (
    <div>
      <div class="gradient-bg-hero">
        <Header />
        <Hero />
      </div>
      <Products />
      <Transactions />
      <Footer />
      <CreateNFT />
      <ShowNFT />
      <UpdateNFT />
      <Loading />
      <Alert />
    </div>
  );
};

export default App;
