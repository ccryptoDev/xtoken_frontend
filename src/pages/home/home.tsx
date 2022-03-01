import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  Header,
} from '../../components';
import { RootState } from '../../utils/types';
import { 
  mintNFT,
  getTotalCoin,
  getTotalSupply
} from '../../utils/useWeb3'
import '../../style.css';
import nftImg from '../../assets/nft.png'

const HomePage = (): JSX.Element | null => {
  const [isConnected, setIsConnected] = useState(false)
  const walletConnected = useSelector<RootState, boolean>((state) => state.user.walletConnected)
  const [nftName, setNftName] = useState('')
  const [nftDesc, setNftDesc] = useState('')
  const [totalSupply, setTotalSupply] = useState('')
  const [totalCoin, setTotalCoin] = useState('')

  useEffect(() => {
    async function fetchTotalInfo() {
      const totalSupply = await getTotalSupply();
      setTotalSupply(totalSupply)
      const totalCoin = await getTotalCoin();
      setTotalCoin(parseFloat(totalCoin).toFixed(2))
    }
    fetchTotalInfo()
  }, [])

  useEffect(() => {
    if(walletConnected) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [walletConnected])

  const Mint = async() => {
    if(!isConnected) {
      toast.error("Please connect your wallet!");
      return;
    }
    if(nftName === '' || nftDesc === '') {
      toast.warning("Please enter name & description of NFT!");
      return;
    }
    const tx = await mintNFT(nftName, nftDesc);
    console.log('tx------: ', tx)
    if(tx !== false) {
      toast.success('NFT is minted sucessfully!')
    }
  }

  return (
    <>
      <Header isConnected={isConnected} />
      <div className="total-info">
        <div className="total-brick">
          <span className="title">Total number of Bricks: </span>
          <span>{totalSupply}</span>
        </div>
        <div className="total-coin">
          <span className="title">Total ABC: </span>
          <span>{totalCoin}</span>
        </div>
      </div>
      <div className="mint-block">
        <div className="mint-block-inner">
          <div className="nft-block">
            <div className="nft-block-inner">
              <div className="nft-image">
                <img src={nftImg} alt="" />
              </div>
              <div className="nft-price">
                10 ABC
              </div>
              <div className="nft-content">
                <input
                  name="nft-name"
                  placeholder="Name of NFT"
                  onChange={e => setNftName(e.target.value)}
                />
                <textarea 
                  name="nft-desc" 
                  placeholder="Descriptioin of NFT"
                  onChange={e => setNftDesc(e.target.value)}
                />
              </div>
              <div className="mint-button">
                <button 
                  className="main-btn"
                  name="mint-button" 
                  onClick={Mint}
                >
                  Mint NFT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default HomePage