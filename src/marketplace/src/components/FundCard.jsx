import React from 'react';

import { useStateContext } from '../context';
import { usePlayerContext } from '../../../context/playerContext/PlayerContext';
import { cardInfo } from '../constants/index';
import { CustomButton } from '../components/index';

// ICONS
import { FaStar, FaGem } from 'react-icons/fa';
import { BsFillBuildingsFill } from 'react-icons/bs';
import { GiCrownCoin, GiStarFormation } from 'react-icons/gi';
import { MdEnergySavingsLeaf } from 'react-icons/md';
import { numberWithDots, findOwnerWallet } from '../utils';
import styles from './styles/FundCard.module.css';
import WalletAvatar from './WalletAvatar';
import SimpleLoader from './SimpleLoader';
// import { deletePurchase } from "../api/apiFns";

//@Note: Need to get all the PLayers as well to map ownerID to ownerName or Wallet
const FundCard = ({ card, handleClick, playerAvatar, from }) => {
  const {
    playersMapping,
    players,
    isSuccessPlayers,
    axiosPrivate,
    refetchSoldCards,
    removePurchaseEvent,
  } = useStateContext();

  const { materialResourcesRef } = usePlayerContext();

  const cardDetails = cardInfo[card.templateId];
  console.log('1 - FundCard Card: ', card);
  console.log('2 - FundCard cardDetails: ', cardDetails);
  console.log('3 - Players: ', players);
  console.log('4 - playersMapping: ', playersMapping);

  // Mini Util functions
  function iconFinder(type) {
    if (type === 'Generator')
      return <MdEnergySavingsLeaf size={24} color={'white'} />;
    if (type === 'Building')
      return <BsFillBuildingsFill size={24} color={'white'} />;
    if (type === 'Special Effect')
      return <GiStarFormation size={24} color={'white'} />;
  }

  const rarityCoverter = (rarityNumber) => {
    if (rarityNumber === 1) return { text: 'Common', color: '255, 255, 255' };
    if (rarityNumber === 2) return { text: 'Special', color: '0, 204, 0' };
    if (rarityNumber === 3) return { text: 'Rare', color: '0, 102, 255' };
    if (rarityNumber === 4) return { text: 'Mythic', color: '230, 0, 230' };
    if (rarityNumber === 5) return { text: 'Legendary', color: '255, 102, 0' };
    console.error('😱 Something Wrong at: Card.jsx, in: rarityCoverter()');
  };

  // const getBoxShadow = (color) => {
  //   return `0 4px 16px rgba(${color}, 0.18), 0 14px 13px rgba(${color}, 0.08)`;
  // };

  const cardRarity = rarityCoverter(card.rarity);
  const hoverStyles = from === 'withdraw' ? '' : styles.card;

  return (
    <div
      // style={{
      //   boxShadow: getBoxShadow(cardRarity.color),
      // }}
      className={`${hoverStyles} ${
        styles[cardRarity.text]
      } max-xs:w-[228px] w-[288px] rounded-[15px] bg-[#1c1c24]`}
      onClick={() =>
        from === 'withdraw'
          ? console.log('(FundCard) - Do Nothing')
          : handleClick()
      }
    >
      <img
        src={cardDetails.image}
        alt="card Image"
        className="w-full h-[158px] object-cover rounded-[15px]"
      />

      <div className="flex flex-col p-4">
        <div className="flex flex-row items-center mb-[12px] justify-between border-solid border-b-2 border-gray-400 pb-3">
          <div className="flex items-center">
            <FaGem size={20} color={'white'} />
            {/* {console.log("Rarity Color: ", cardRarity.color)} */}
            <p
              className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px]"
              style={{ color: `rgb(${cardRarity.color})` }}
            >
              {cardRarity.text}
              {/* {console.log(
                "firstasdasd : ",
                rarityCoverter(cardDetails.rarity)
              )} */}
            </p>
          </div>
          <div className="flex items-center">
            {iconFinder(cardDetails.type)}
            <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px] text-white">
              {/* <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[14px] text-[#808191]"> */}
              {cardDetails.type}
            </p>
          </div>
        </div>

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">
            {cardDetails.name}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] text-[12px] truncate">
            {cardDetails.desc}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[18px] text-[#b2b3bd] leading-[22px]">
              {/* {`Price: ${cardDetails.priceTag}`} */}
              {`${numberWithDots(card.priceTag)} `}{' '}
              {/* <span className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">
                Gold
              </span> */}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              in {'Gold'}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[18px] text-[#b2b3bd] leading-[22px] text-center">
              {card.level === 0 ? '-' : card.level}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">
              Level
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-[20px] gap-[12px]">
          <>
            {from !== 'withdraw' ? (
              <>
                <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-[#13131a]">
                  {/* <img
              src={thirdweb}
              alt="user"
              className="w-1/2 h-1/2 object-contain"
            /> */}
                  {isSuccessPlayers && players.length > 0 ? (
                    <WalletAvatar
                      walletAddress={
                        // '0x9ba4DaC17C4286Fd32572A6d75203598C1c8C87E'
                        findOwnerWallet(card, players)
                      }
                    />
                  ) : (
                    <SimpleLoader />
                  )}
                </div>
                <p className="flex-1 justify-between font-epilogue font-normal text-[14px] text-[#808191] truncate">
                  from:{' '}
                  <span className="text-[#b2b3bd]">
                    {playersMapping[card.ownerId]}
                  </span>
                </p>
              </>
            ) : (
              <CustomButton
                btnType={'button'}
                title="Redeem Gold"
                styles="w-[62%] bg-[#8c6dfd]"
                // disabled={!canBuy}
                handleClick={() => {
                  removePurchaseEvent({
                    axiosPrivate,
                    cardId: card.cardId,
                  });
                  materialResourcesRef.current.gold += card.priceTag;
                }}
              />
            )}
          </>
          <div>
            <p className="flex-1 justify-between font-epilogue font-normal text-[16px] text-[#808191] truncate">
              #{' '}
              {from !== 'withdraw' ? (
                <span className="text-[#b2b3bd]">{card.id}</span>
              ) : (
                <span className="text-[#b2b3bd]">{card.cardId}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
