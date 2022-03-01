import React, { useState, useEffect } from 'react'
import { NFTtype } from '../../utils/types'
import './style.scss'
import {
  getTokenURIList,
  getMetadataFromTokenURI
} from '../../utils/useWeb3'
import NFT from './nft'

interface Props {
  userWallet: string;
}

const NFTs = (props: Props) => {
  const {userWallet} = props
  const [nfts, setNfts] = useState<Array<NFTtype>>([]);
  
  useEffect(() => {
    async function fetchData() {
      const tokenURI = await(getTokenURIList(userWallet))
      console.log(tokenURI)
      let nftData = [];
      for(let i=0; i<tokenURI.length; i++) {
        let metadata = await getMetadataFromTokenURI(tokenURI[i])
        nftData.push(metadata)
      }
      setNfts(nftData)
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>My NFTs</h1>
      <div className="my-nfts">
        {nfts.map((nftData: NFTtype) => (
          <NFT nftData={nftData} num={nftData.id} key={nftData.id} />
        ))}
      </div>
    </>
  )
}

export default NFTs