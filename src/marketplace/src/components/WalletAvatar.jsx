import React, { useState } from 'react';
import Blockie from 'react-blockies';
import SimpleLoader from './SimpleLoader';

function WalletAvatar({ walletAddress, scale = 3 }) {
  //   const [walletAddress, setWalletAddress] = useState("");
  console.log('walletAddress: ', walletAddress);
  return (
    <>
      {walletAddress !== undefined ? (
        <Blockie
          seed={walletAddress.toLowerCase()}
          size={12}
          scale={scale}
          className="identicon rounded"
        />
      ) : (
        <SimpleLoader x={52} y={52} />
      )}
    </>
  );
}

export default WalletAvatar;
