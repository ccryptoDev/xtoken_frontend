import React from 'react'
import nftImg from '../../assets/1.png'
import partyImg from '../../assets/party.png'
import groupImg from '../../assets/group.png'

interface Props {
  closeModal: () => void;
}

export const NFTContent = (props: Props) => {
  const {closeModal} = props;

  return (
    <div className="modal-body">
      <div className="nft-image">
        <img src={nftImg} alt="Circle Henchman" />
      </div>
      <div className="nft-info">
        <div className="nft-awarded">
          <img src={partyImg} alt="party" />
          <span>NFT awarded</span>
        </div>
        <div className="nft-title">Circle Henchman</div>
        <div className="nft-desc">
          <p>Awarded for being one of the first 666 players in the Squid Moon games.</p>
          <p>Holding this NFT will grant you early access beta launch permissions to upcoming Squid Moon games.</p>
        </div>
        <div className="inspect-transaction">
          <h6>Insepct the transaction</h6>
          <p>4gHyrZz4uTe1w...p3w9Yvr6c8   <img src={groupImg} alt="" /></p>
        </div>
      </div>
    </div>
  )
}