import React, { createContext, useState } from 'react';
import ABI from './constrants/ABI.json';
import { ethers } from 'ethers';
import { setAlert, setGlobalState, useGlobalState } from './store';
import { WiDayCloudy } from 'react-icons/wi';

export const BlockchainContext = createContext();

const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  // const [connectedAccount] = useGlobalState('connectedAccount');
  // const [productTotalPrice] = useGlobalState('productTotalPrice');

  // const [contractInstance1, setContractInstance1] = useState(null);

  const contractAddress = '0x5FDdf92E163994aCD409eF946097df725D761506';

  const initializeContract = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        setProvider(provider);
        setSigner(signer);
        setContractInstance(contract);

        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('ContractInstance', contractInstance);
        console.log('Contract initialized successfully');
        return true;
      } catch (error) {
        console.error('Error in initializing contract', error);
        return false;
      }
    } else {
      console.log("Ethereum object doesn't exist");
      return false;
    }
  };

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum === 'undefined')
        reportError('Please install MetaMask');
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      setGlobalState('connectedAccount', accounts[0].toLowerCase());
      window.location.reload();
    } catch (error) {
      reportError(error);
    }
  };

  // const mintNFT = async (metadataURI) => {
  //   try {
  //     const nftUri = `https://ipfs.io/ipfs/${metadataURI}`;
  //     console.log('Metadata URI:', nftUri);
  //     if (!nftUri || nftUri.length === 0) {
  //       throw new Error('Invalid metadataURI');
  //     }

  //     const initialized = await initializeContract();
  //     if (!initialized) {
  //       throw new Error('Contract initialization failed');
  //     } else {
  //       console.log('Provider:', provider);
  //       console.log('Signer:', signer);
  //       console.log('Contract Instance:', contractInstance);

  //       if (!contractInstance || !provider || !signer) {
  //         throw new Error('Contract instance, provider, or signer is not set');
  //       }

  //       const account = await signer.getAddress();
  //       const tx = await contractInstance.safeMint(account, nftUri);

  //       await tx.wait();
  //       console.log('NFT minted successfully!');
  //       return true;
  //     }
  //   } catch (error) {
  //     console.error('Error minting NFT:', error);
  //     return false;
  //   }
  // };

  const registerProduct = async ({
    title,
    description,
    category,
    priceInEther,
    amount,
    ipfs
  }) => {
    try {
      const nftUri = `https://ipfs.io/ipfs/${ipfs}`;
      console.log('Metadata URI:', nftUri);

      // if (!nftUri || nftUri == 'undefined') {
      //   throw new Error('Invalid metadataURI');
      // }

      const initialized = await initializeContract();
      if (!initialized) {
        throw new Error('Contract initialization failed');
      } else {
        console.log('Provider:', provider);
        console.log('Signer:', signer);
        console.log('Contract Instance:', contractInstance);

        if (!contractInstance || !provider || !signer) {
          throw new Error('Contract instance, provider, or signer is not set');
        }

        console.log('Product Title: ', title);
        console.log('description: ', description);
        console.log('category: ', category);
        console.log('price: ', priceInEther);
        console.log('amount: ', amount);

        // const account = await signer.getAddress();
        const tx = await contractInstance.registerProduct(
          title,
          description,
          category,
          priceInEther,
          amount,
          nftUri
        );

        await tx.wait();
        console.log('NFT minted successfully!');
        return true;
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
      return false;
    }
  };

  const getAllNFT = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const nft = await contract.getAllProduct();
    const transactions = await contract.getAllTransactions();
    setGlobalState('nftList', structuredNfts(nft));
    setGlobalState('transactions', structuredSaleProducts(transactions));

    console.log(structuredSaleProducts(transactions));

    return true;
  };

  const structuredNfts = (nfts) => {
    return nfts
      .map((nft) => {
        return {
          id: Number(nft.product_Id),
          Title: nft.product_Title,
          cost: ethers.utils.formatEther(nft.price),
          description: nft.desc,
          metadataURI: nft.nftUrl,
          category: nft.category,
          amount: parseInt(nft.amount)
        };
      })
      .reverse();
  };

  const structuredSaleProducts = (nfts) => {
    return nfts
      .map((nft) => {
        return {
          id: Number(nft.id),
          owner: nft.owner,
          Title: nft.title,
          salePrice: ethers.utils.formatEther(nft.salePrice),
          description: nft.description,
          metadataURI: nft.nftUrl,
          category: nft.category,
          amount: nft.amount
        };
      })
      .reverse();
  };

  const disconnectWallet = async () => {
    setGlobalState('connectedAccount', '');
    setContractInstance(null);
  };

  const updatePrice = async ({ productId, newPrice }) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, ABI, signer);

    const updateProPrice = await contract.updateProductPrice(
      productId,
      newPrice
    );
    console.log('Product Id: ', productId);
    console.log('new price ', newPrice);

    await updateProPrice.wait();
  };

  const buyProduct = async ({ id, amount, productTotalPrice }) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, ABI, signer);

      const buyRequiredProduct = await contract.buyProduct(id, amount, {
        value: ethers.utils.parseEther(productTotalPrice.toString())
      });

      await buyRequiredProduct.wait();
    } catch (error) {
      reportError(error);
    }
  };

  const isWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert('MetaMask not found');
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });

      window.ethereum.on('accountsChanged', async () => {
        setGlobalState('connectedAccount', accounts[0]?.toLowerCase() || '');
        await isWalletConnected();
      });

      if (accounts.length) {
        setGlobalState('connectedAccount', accounts[0].toLowerCase());
        // window.location.reload();
      } else {
        alert('Please connect wallet');
        console.log('No account found');
      }
    } catch (error) {}
  };

  const reportError = (error) => {
    setAlert(JSON.stringify(error), 'red');
    console.error('Error :', error);
    throw new Error('No Ethereum Object');
  };

  return (
    <BlockchainContext.Provider
      value={{
        provider,
        signer,
        contractInstance,
        initializeContract,
        connectWallet,
        disconnectWallet,
        registerProduct,
        getAllNFT,
        isWalletConnected,
        updatePrice,
        buyProduct
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainProvider;
