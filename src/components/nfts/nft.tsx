import React from 'react'
import { NFTtype } from '../../utils/types'

interface Props {
  nftData: NFTtype;
  num: number;
}

const NFT = ({
  nftData,
  num
}:Props) => {
  return (
   <div className="nft">
    <div className="my-nft">
      <div className="nft-block">
        <div className="nft-block-inner">
          <div className="nft-image">
            <img src={nftData.img} alt="" />
          </div>
          {/* <div className="nft-price">
            10 ABC
          </div> */}
          <div className="nft-content">
            <p>{nftData.name}</p>
            <p>{nftData.desc}</p>
          </div>
        </div>
      </div>
    </div>
   </div>
  )
}

export default NFT