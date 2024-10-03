import React from 'react';
import { useGlobalState } from '../store';

const Loading = () => {
  const [loading] = useGlobalState('loading');
  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black 
bg-opacity-50 transform transition-transform duration-300  ${loading.show ? 'scale-100' : 'scale-0'}`}
    >
      <div
        className="bg-[#151c25] shadow-xl shadow-slate-400
  rounded-xl md:w-mix px-10 pd-0"
      >
        <div className="flex flex-col text-white">
          <div className="flex justify-center items-center">
            <div className="lds-dual-ring scale-50"></div>
            <p className="text-lg">Processing ...</p>
          </div>
          <small className="text-center pb-3">{loading.msg}</small>
        </div>
      </div>
    </div>
  );
};

export default Loading;
