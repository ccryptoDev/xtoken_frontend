import React from 'react'
import { NFTtype } from '../../utils/types'
import limitLogo from '../../assets/mint_limit_logo.png'
import Img1 from '../../assets/1.png'
import Img2 from '../../assets/2.png'
import Img3 from '../../assets/3.png'
import Img4 from '../../assets/4.png'

interface Props {
  nftData: NFTtype;
  num: number;
}

const NFT = ({
  nftData,
  num
}:Props) => {
  const Image = [
    Img1,
    Img2,
    Img3,
    Img4
  ]

  return (
   <div className="nft">
    <div className="nft-image">
      <img src={Image[num-1]} alt={nftData.title} />
    </div>
    <div className="nft-info">
      <div className="nft-limit">
        <img src={limitLogo} alt="" />
        <span>Limited quantity of {nftData.limit}</span>
      </div>
      <div className="nft-title">{nftData.title}</div>
      <div className="nft-desc">{nftData.desc}</div>
    </div>
   </div>
  )
}

export default NFT