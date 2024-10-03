import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  modal: 'scale-0',
  showModal: 'scale-0',
  updateModal: 'scale-0',
  account: '0xa5d66dcab3d4f9778cb07ce49bf5efb42af5641e',
  loading: { show: false, msg: 'Minting in progress...' },
  alert: { show: false, msg: '', color: '' },
  connectedAccount: '',
  nft: null,
  nftList: [],
  transactions: [],
  contract: null,
  productTotalPrice: ''
});

const setAlert = (msg, color = 'green') => {
  setGlobalState('loading', { show: false, msg: '' });
  setGlobalState('alert', { show: true, msg, color });
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg, color });
  }, 6000);
};

const setLoadingMessage = (msg) => {
  const loading = getGlobalState('loading');
  setGlobalState('loading', { ...loading, msg });
};

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);
    while (start.length + end.length < maxLength) {
      start = start + '.';
    }
    return start + end;
  }
  return text;
};

export {
  setGlobalState,
  useGlobalState,
  getGlobalState,
  setLoadingMessage,
  setAlert,
  truncate
};
