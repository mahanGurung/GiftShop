import React, { useEffect, useState } from 'react';
import { BiTransfer } from 'react-icons/bi';
import { MdOpenInNew } from 'react-icons/md';
import { useGlobalState, truncate } from '../store';

const Transactions = () => {
  const [transactions] = useGlobalState('transactions');
  const [end, setEnd] = useState(3);
  const [count] = useState(3);
  const [txCollection, setTxCollection] = useState([]);

  const getTxCollection = () => {
    return transactions.slice(0, end);
  };

  useEffect(() => {
    setTxCollection(getTxCollection());
  }, [transactions, end]);

  return (
    <div className="bg-[#151c25]">
      <div className="w-4/5 py-10 mx-auto">
        <h4 className="text-white text-3xl font-bold uppercase text-gradient">
          {txCollection.length > 0
            ? 'Latest Transactions'
            : 'No Transaction yet'}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gaps-4 lg:gaps-2 py-2.5">
          {txCollection.map((tx, i) => (
            <Transaction key={i} tx={tx} />
          ))}
        </div>
        <div className="text-center my-5">
          {txCollection.length > 0 &&
          transactions.length > txCollection.length ? (
            <button
              className="shadow-sm shadow-slate-400 text-sm bg-blue-900 text-white hover:bg-blue-800 rounded-full px-1.5 py-2 pl-3 pr-3 mt-5"
              onClick={() => setEnd + count}
            >
              Load More
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Transaction = ({ tx }) => (
  <div className="flex justify-between items-center border border-white text-gray-400 w-full shadow-lg shadow-slate-400 rounded-md overflow-hidden bg-gray-800 mb-2 p-3">
    <div className="rounded-md shadow-sm shadow-slate-500 p-2">
      <BiTransfer />
    </div>
    <div>
      <h4 className="text-sm">Product Transfer</h4>
      <small className="flex justify-start items-center">
        <span className="mr-1">Received by</span>
        <a className="text-blue-400 mr-2" href="#" target="_blank">
          {truncate(tx.owner, 4, 4, 11)}
        </a>
        <span>
          <MdOpenInNew />
        </span>
      </small>
    </div>
    <p className="text-sm font-medium">{tx.salePrice} ETH</p>
  </div>
);

export default Transactions;
