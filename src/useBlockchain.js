import { useContext } from 'react';
import { BlockchainContext } from './BlockchainProvider';

export const useBlockchain = () => useContext(BlockchainContext);
