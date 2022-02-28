export const COIN_CONTRACT = "0x0Db65114C65C2452F726D8B1a850C4400EDb3078"
export const NFT_CONTRACT = "0xb7b1c4f383D1714767f013F97c739b0a99C0A8dF"
// export const NFT_CONTRACT = "0x72ECd8B6cc92a19aDe95440afCD4f5779f15C472"
export const baseURI = "https://ipfs.io/ipfs/"
export const imgURI = "https://ipfs.io/ipfs/QmPombBjkEXXYRsECMuLp6r5LjZf1Vfziw659TzxaXzRRC"
export const INFURA_KEY="e632a702eec64a4d867d65d8923d4309"

export const configNetwork = "kovan";

export const WalletTypes = {
  default: 0,
  metamask: 1,
  walletConnect: 2,
  authereum: 3,
  burnerConnect: 4,
  uniLogin: 5,
  mewWallet: 6,
};

export const Config = {
  ropsten: {
    etherscanLink: "https://ropsten.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "287b5d14c20f4b7d9411d165fac6a688",
  },
  mainnet: {
    etherscanLink: "https://etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "c7a95b91ffae44e3b7fb80d9fbb98939",
  },
  kovan: {
    etherscanLink: "https://kovan.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "e632a702eec64a4d867d65d8923d4309",
  },
  rinkeby: {
    etherscanLink: "https://rinkey.etherscan.io",
    defaultGasPrice: "15",
    transactionText: "Transaction Pending",
    coinGeckoApi: "https://api.coingecko.com/api/v3/coins",
    infuraId: "c7a95b91ffae44e3b7fb80d9fbb98939",
  },
};

export const getConfig = () => {
  return Config[configNetwork];
};