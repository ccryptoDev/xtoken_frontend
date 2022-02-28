import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../utils/types';
import { Header } from '../../components'

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
        <h1>My account</h1>
      </div>
    </>
  )
}

export default MyAccount