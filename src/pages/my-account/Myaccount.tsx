import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/types';
import { Header } from '../../components'
import NFTs from '../../components/nfts'

const MyAccount = () => {
  const [isConnected, setIsConnected] = useState(false)
  const walletConnected = useSelector<RootState, boolean>((state) => state.user.walletConnected)

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
        <h1>My NFTs</h1>
        <NFTs isConnected={isConnected} />
      </div>
    </>
  )
}

export default MyAccount