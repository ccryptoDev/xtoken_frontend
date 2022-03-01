import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/types';
import { Header } from '../../components'
import NFTs from '../../components/nfts'

const MyAccount = () => {
  const [isConnected, setIsConnected] = useState(false)
  const walletConnected = useSelector<RootState, boolean>((state) => state.user.walletConnected)
  const userWallet = useSelector<RootState, string>((state) => state.user.userAddress)

  useEffect(() => {
    if(walletConnected) {
      setIsConnected(true)
    } else {
      setIsConnected(false)
    }
  }, [walletConnected])

  return (
    <>
      <Header isConnected={isConnected} />
      <div className="my-account">
        <NFTs userWallet={userWallet} />
      </div>
    </>
  )
}

export default MyAccount