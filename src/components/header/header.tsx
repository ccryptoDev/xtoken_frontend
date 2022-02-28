import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import WalletLogo from '../../assets/wallet-logo.png'
import {useSelector} from 'react-redux'
import wallet from '../../utils/wallet'
import { RootState } from '../../utils/types'

interface Props {
  isConnected: boolean;
}

const Header = (props: Props) => {
  const {isConnected} = props
  const [walletAddr, setWalletAddr] = useState('')

  const userAddress = useSelector<RootState, string>((state) => state.user.userAddress);

  const walletConnect = async() => {
    await wallet.setProvider('metamask');
    await wallet.login('metamask');
  }

  useEffect(() => {
    if(userAddress) {
      setWalletAddr(userAddress)
    } else {
      setWalletAddr('')
    }
  }, [isConnected, userAddress])

  return (
    <div className="header">
      <div className="container">
        <div className="header-inner">
          <a className="logo" href="/">
            xToken
          </a>
          <div className="menu">
            <div className="menu-item" style={{display: isConnected ? "block" : 'none'}}>
              <Link to="/my-account">My account</Link>
            </div>
            <div className="loginBtn" onClick={walletConnect}>
              <img src={WalletLogo} alt="" />
              {userAddress ? 
                <span>{walletAddr.replace(userAddress.substring(6, 38), "...")}</span> : <span>Connect</span>
              } 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header