import Web3 from 'web3';
import { ethers, BigNumber } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import coinABI from './coinABI.json';
import nftABI from './nftABI.json';
import { 
  COIN_CONTRACT, 
  NFT_CONTRACT,
  baseURI,
  imgURI,
  INFURA_KEY 
} from './constants'
import * as IPFS from 'ipfs-core'

let coin_contract: any;
let nft_contract: any;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_KEY
    }
  }
};

const web3modal = new Web3Modal({
  cacheProvider: false, // optional
  providerOptions // required
});

/** @return connecting to web3 via modal */
async function connectWeb3() {
  try {
    const connection = await web3modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    // const signer = provider.getSigner();
    return connection
  } catch(err) {
    console.error(err)
    return false
  }
  
}

/** @return if browser is running MetaMask. */
function getMetaMaskInstalled() {
  return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
}

/** @return whether MetaMask connected successfuly. */
async function connectMetamask() {
  try {
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    return accounts[0];
  } catch (err) {
    console.error(err);
    return false;
  }
}

/** @return the first `userAddress` from the list of connected addresses. */
async function getUserAddress() {
  try{
    // @ts-ignore
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts[0] || "";
  } catch(err) {
    console.error(err);
    return false;
  }
}

/** Connects to the contract at `COIN_CONTRACT`. */
async function loadContract() {
  if (typeof coin_contract === 'undefined') {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    coin_contract = await new window.web3.eth.Contract(coinABI, COIN_CONTRACT);
  }
}

const validateMinter = async() => {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(coinABI, COIN_CONTRACT);
  const walletAddr = await getUserAddress();
  const canMint = await contract.methods.canMint(walletAddr);
  return canMint;
}

const uploadToIPFS = async(nftName: string, nftDesc: string) => {
  const lastTokenID = await getLastTokenID();
  const metadata = JSON.stringify({
    id: Number(lastTokenID) + 1,
    img: imgURI,
    name: nftName,
    desc: nftDesc
  })
  try {
    const ipfs = await IPFS.create()
    const { cid } = await ipfs.add(metadata)
    console.log(cid)
    return cid;
  } catch(error) {
    console.log('error to upload to ipfs', error)
    return false;
  }
}

const getMetadataFromTokenURI = async () => {
  let ipfsURI = ''
  const response = await fetch(ipfsURI);
  const jsonData = await response.json();
  return jsonData;
}

const getLastTokenID = async() => {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(nftABI, NFT_CONTRACT);
  const tokenID = await contract.methods.getLastTokenId().call()
  return tokenID;
}

const getTotalSupply = async() => {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(nftABI, NFT_CONTRACT);
  const totalSupply = await contract.methods.totalSupply().call()
  return totalSupply;
}

const getTotalCoin = async() => {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(nftABI, NFT_CONTRACT);
  let totalCoin = await contract.methods.getTotalABCAmount().call()
  totalCoin = ethers.utils.formatUnits(totalCoin, 'ether')
  return totalCoin;
}

const getTokenList = async(userWallet: string) => {
  // @ts-ignore
  window.web3 = new Web3(window.ethereum);
  const contract = await new window.web3.eth.Contract(nftABI, NFT_CONTRACT);
  const tokens = await contract.methods.getTokenURIListOwnedByUser(userWallet).call()
  return tokens;
}

const mintNFT = async(name: string, desc: string) => {
  // Upload metadata to IPFS
  const ipfsCID = await uploadToIPFS(name, desc)
  
  if(ipfsCID !== false) {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    const contract = await new window.web3.eth.Contract(nftABI, NFT_CONTRACT);
    const walletAddr = await getUserAddress();
    const tokens = await getTokenList(walletAddr)
    let price: BigNumber;
    if(tokens.length > 0)
      price = ethers.utils.parseUnits(String(10.3), 'ether')
    else 
      price = ethers.utils.parseUnits(String(10), 'ether')

    try {
      let transaction: any = await contract.methods.mintNFT(walletAddr, price, ipfsCID.toString()).send({
        from: walletAddr
      })
      return transaction
    } catch (err) {
      console.log(err)
      return false
    }
  }
}

export { 
  connectWeb3, 
  getUserAddress, 
  getMetaMaskInstalled, 
  connectMetamask, 
  loadContract, 
  mintNFT, 
  validateMinter,
  getTokenList,
  getLastTokenID,
  getTotalSupply,
  getTotalCoin,
  getMetadataFromTokenURI
};
