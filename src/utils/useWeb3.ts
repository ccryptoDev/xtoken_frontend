import Web3 from 'web3';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import contractABI from './abi.json';
import { CONTRACT_ADDRESS, INFURA_KEY } from './constants'

let contract: any;

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

/** Connects to the contract at `CONTRACT_ADDRESS`. */
async function loadContract() {
  if (typeof contract === 'undefined') {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    contract = await new window.web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
  }
}

async function getCurrentIndex() {
  try {
    return (await contract.methods.getCurrentIndex().call()) - 1;
  } catch (err) {
    return -1;
  }
}

async function hasSaleStarted() {
  try {
    return (await contract.methods.hasSaleStarted().call());
  } catch (err) {
    console.log("Fail");
  }
}

const validateMinter = async() => {
  if (typeof contract === 'undefined') {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    const contract = await new window.web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    const walletAddr = await getUserAddress();
    const canMint = await contract.methods.canMint(walletAddr);
    return canMint;
  }
}

const mintNFT = async() => {
  if (typeof contract === 'undefined') {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    const contract = await new window.web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
    const walletAddr = await getUserAddress()
    try {
      let transaction: any = await contract.methods.mintNFT().send({
        from: walletAddr
      })
  
      return transaction
    } catch (err) {
      console.log(err)
      return err
    }
  }
}

async function purchaseToad(numBought: number, totalAmount: number) {
  const connection = await web3modal.connect();
  const provider = new ethers.providers.Web3Provider(connection);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  const price = ethers.utils.parseUnits(`${totalAmount}`, 'ether');
  
  let transaction = await contract.mintToad(numBought, {
    value: price
  });

  return transaction
}

export { connectWeb3, getCurrentIndex, getUserAddress, getMetaMaskInstalled, connectMetamask, purchaseToad, hasSaleStarted, loadContract, mintNFT, validateMinter };
