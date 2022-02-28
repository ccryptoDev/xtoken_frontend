import React, { useState, useEffect } from 'react'
import { NFTdata } from '../../pages/home/NFTdata'
import { NFTtype } from '../../utils/types'
import './style.scss'
import NFT from './nft'

interface Props {
  isConnected: boolean;
}

const NFTs = (props: Props) => {
  const {isConnected} = props
  const nfts: Array<NFTtype> = NFTdata;

  return (
    <div className="my-nfts">
      {nfts.map((nftData: NFTtype) => (
        <NFT nftData={nftData} num={nftData.id} key={nftData.id} />
      ))}
    </div>
  )
}

export default NFTs