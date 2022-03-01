import React from 'react'
import wallet from '../../utils/wallet'

interface Props {
  isConnected: boolean;
}

const Banner = (props: Props) => {
  const {isConnected} = props;

  const connectWallet = async() => {
    await wallet.setProvider('metamask');
    await wallet.login('metamask');
  }

  return (
    <div className="banner">
      <div className="banner-background"></div>
      <div className="banner-content">
        <h1 className="h1">xTokens</h1>
        {!isConnected ? 
          <>
            <p className="banner-desc">Connect your wallet to mint</p>
            <button className="main-btn" onClick={connectWallet}>Connect Wallet</button>
          </> : <></>
        }
      </div>
    </div>
  )
}

export default Banner