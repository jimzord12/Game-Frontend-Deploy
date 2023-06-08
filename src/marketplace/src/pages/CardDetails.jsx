import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { cardInfo } from '../constants/index';
import { FaStar, FaGem, FaBirthdayCake } from 'react-icons/fa';
import { BsFillBuildingsFill, BsStars } from 'react-icons/bs';
import {
  GiCrownCoin,
  GiStarFormation,
  GiUpgrade,
  GiAbstract047,
} from 'react-icons/gi';
import { MdEnergySavingsLeaf } from 'react-icons/md';
import { IoBuild } from 'react-icons/io5';
import { loader } from '../assets';
import {
  numberWithDots,
  calculateBarPercentage,
  formatDate,
  smoothScrollTo,
  rarityCoverter,
  findOwnerWallet,
} from '../utils';
import cardClass from '../../../models/Classes/classCard_V2';
import templateData from '../../../context/playerContext/testCardTemplateData.json';
import { thirdweb } from '../assets';
import WalletAvatar from '../components/WalletAvatar';
import { cardInfo as cardDesc, islands } from '../constants';
import {
  purchaseCard,
  removeFromMP,
  ownersSwapper,
} from '../../../../api/apiFns';
import { usePlayerContext } from '../../../context/playerContext/PlayerContext';

// const CustomDivider = () => (
//   <div className="border-1 border-white min-h-full mt-4"></div>
// );

const CardDetails = () => {
  const { state: locationState } = useLocation(); // Card's Data
  const { fetchedPlayer, materialResourcesRef, refetchPlayerData } =
    usePlayerContext();
  // const q = useLocation(); // Card's Data

  console.log('ADDDDDFF: ', locationState);
  const state = locationState.card;
  const navigate = useNavigate();
  const {
    playersMapping,
    playerWallet,
    players,
    userId,
    axiosPrivate,
    refetch,
    playerBalance,
    setPlayerBalance,
    refetchSoldCards,
    setIsActive,
  } = useStateContext();
  console.log('1 - State: ', state);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [canBuy, setCanBuy] = useState(false);

  // Transaction States
  const [showTranMsg, setShowTranMsg] = useState(false);
  const [tranType, setTranType] = useState('verify');
  const [beginTransaction, setBeginTransaction] = useState(false);
  // const [isTranLoading, setIsTranLoading] = useState(false);

  // Initialization Flags
  const [initFlag, setInitFlag] = useState(false);

  const confirmationRef = useRef(null);

  const cardDetails = cardInfo[state.templateId];
  const owner = playersMapping[state.ownerId];
  const redirectedFrom = locationState.from;

  const {
    isSuccess: isTranSuccess,
    isFetching: isTranLoading,
    isError: isTranError,
    error,
  } = useQuery({
    queryKey: [
      'buyCard',
      axiosPrivate,
      {
        cardId: selectedCard?.id,
        buyerId: userId,
        sellerId: selectedCard?.ownerId,
        priceTag: selectedCard?.priceTag,
        completed: false,
        rarity: selectedCard?.rarity,
        templateId: selectedCard?.templateId,
        level: selectedCard?.level,
      },
    ],
    queryFn: purchaseCard,
    enabled: beginTransaction && !!selectedCard.id,
    onSuccess: (fetchedData) => {
      console.log('SUCCESSFUL - Created Purchase (Marketplace): ', fetchedData);
      setTranType('success');
      materialResourcesRef.current.gold -= selectedCard.priceTag;
      removeFromMP({ axiosPrivate, cardId: selectedCard.id });
      setTimeout(() => {
        setPlayerBalance((prev) => prev - selectedCard.priceTag);
        refetchSoldCards();
        refetch();
        refetchPlayerData();
        navigate('/marketplace');
        smoothScrollTo(0, 500);
      }, 3500);
    },
    onError: (error) => {
      console.log('--- FAILED ---- Created Purchase (Marketplace): ', error);
      setTranType('failed');
    },
  });

  const {
    isSuccess: isSuccessOwnerSwap,
    isFetching: isOwnerSwap,
    isError: isOwnerSwapError,
    error: ownerSwapError,
  } = useQuery({
    queryKey: [
      'swapOwners',
      axiosPrivate,
      { cardId: selectedCard?.id, buyerId: userId },
    ],
    queryFn: ownersSwapper,
    enabled: isTranSuccess && !!selectedCard.id,
    onSuccess: (fetchedData) => {
      console.log('SUCCESSFUL - Swapped Owners (Marketplace): ', fetchedData);
    },
    onError: (error) => {
      console.log('--- FAILED ---- Swapped Owners (Marketplace): ', error);
      // setTranType("failed");
    },
  });

  // @Note: Here use the classCard_V2 to calc the Card's Stats
  useEffect(() => {
    console.log('UseEffect, State: ', state);
    console.log('UseEffect, Template Data: ', templateData);
    setSelectedCard(new cardClass(state, templateData[state.templateId]));
    // setPlayerBalance(500000);
    setInitFlag(true);
    // setCanBuy(playerBalance - selectedCard.priceTag < 0 ? false : true);
  }, []);

  useEffect(() => {
    if (initFlag) {
      console.log('1 - UseEffect, Seleceted Card: ', selectedCard);
      console.log('2 - UseEffect, Player Balance: ', playerBalance);
      console.log('3 - UseEffect, Price Tag: ', selectedCard.priceTag);
      console.log(
        '3 - UseEffect, Can Buy? : ',
        playerBalance - selectedCard.priceTag > 0 ? true : false
      );
      setCanBuy(playerBalance - selectedCard.priceTag > 0 ? true : false);
    }
  }, [initFlag]);

  useEffect(() => {
    if (showTranMsg) smoothScrollTo(document.body.scrollHeight, 1750);
  }, [showTranMsg]);

  const handlePurchase = () => {
    setBeginTransaction(true);
  };

  const handleCardRemoval = () => {
    removeFromMP({ axiosPrivate, cardId: selectedCard.id });
    setTimeout(() => {
      setIsActive('dashboard');
      refetchSoldCards();
      refetch();
      refetchPlayerData();
      navigate('/marketplace');
      smoothScrollTo(0, 500);
    }, 4000);
  };

  return (
    <div>
      {isLoading && initFlag === false && <Loader />}

      {/* <div className="w-full flex flex-col mt-10 gap-[30px]"> */}
      {initFlag && (
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <img
              src={cardDetails.image}
              alt="campaign"
              className="w-full h-[410px] object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    state.target,
                    state.amountCollected
                  )}%`,
                  maxWidth: '100%',
                }}
              ></div>
            </div>
          </div>

          {/* <div className="flex w-full flex-wrap justify-between gap-[30px]"> */}
          <div className="flex md:w-[150px] w-full md:justify-center flex-wrap justify-center gap-[30px]">
            {/* <CountBox title="Type" value={1234} /> */}
            <CountBox
              title="Rarity"
              value={rarityCoverter(state.rarity).text}
            />
            <CountBox
              title="Level"
              value={state.level === 0 ? 'N/A' : state.level}
            />
            <CountBox title="Card ID" value={`#${state.id}`} />
            {/* <CountBox title="Total Backers" value={donators.length} /> */}
          </div>
        </div>
      )}

      {initFlag && (
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div className="flex flex-col w-full mt-0">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Card Description
              </h4>

              <div className="mt-[10px] flex flex-row items-center flex-wrap gap-[14px] pl-2">
                <div>
                  <p className="mt-[0px] font-epilogue font-normal text-[16px] text-[#808191] text-justify">
                    {console.log('AAAAAAAAA: ', cardDesc)}
                    {cardDesc[state.templateId].desc}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Cards Details
              </h4>
              {selectedCard !== null && (
                <div className="flex gap-4 flex-wrap justify-around sm:px-0 px-4">
                  {selectedCard.output && (
                    <MainCategory
                      text="Output"
                      icon={<BsStars size={20} color={'white'} />}
                    >
                      {
                        <SubCategories
                          cardProps={selectedCard.output}
                          isSp={selectedCard.type === 'Special Effect'}
                        />
                      }
                    </MainCategory>
                  )}
                  {/* <CustomDivider /> */}

                  {selectedCard.maintenance && (
                    <MainCategory
                      text="Maintenance"
                      icon={<IoBuild size={20} color={'white'} />}
                    >
                      <SubCategories
                        cardProps={selectedCard.maintenance}
                        isSp={selectedCard.type === 'Special Effect'}
                      />
                    </MainCategory>
                  )}

                  {/* <CustomDivider /> */}

                  <MainCategory
                    text="Upgrade Requirements"
                    icon={<GiUpgrade size={20} color={'white'} />}
                  >
                    <SubCategories
                      cardProps={selectedCard.requirements}
                      isSp={selectedCard.type === 'Special Effect'}
                    />
                  </MainCategory>

                  {/* <CustomDivider /> */}

                  <div className="flex gap-2 h-min w-full mt-[20px] border-[1px] border-[#808191] rounded-xl p-4">
                    <div className="flex gap-1 basis-[220px]">
                      <FaBirthdayCake
                        className="shrink-0"
                        size={20}
                        color={'white'}
                      />
                      <div className="flex flex-wrap w-full justify-between">
                        <p className="indent-2 font-epilogue font-normal text-[16px] text-white leading-[22px] whitespace-nowrap text-justify capitalize h-min">
                          Creation:{' '}
                        </p>
                        <div className="flex gap-2 items-start">
                          {/* <GiAbstract047 size={26} color={"white"} /> */}
                          <div className="flex justify-between w-full ">
                            <p className="indent-2 font-epilogue font-normal text-[14px] text-[#808191] leading-[22px] text-justify">
                              {formatDate(state.creationTime)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col w-full mt-0 mb-6">
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Seller
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px] pl-2">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  {/* <img
                    src={thirdweb}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  /> */}
                  <WalletAvatar
                    walletAddress={findOwnerWallet(selectedCard, players)}
                    scale={4}
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[18px] text-white break-all">
                    {owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[16px] text-[#808191]">
                    from:{' '}
                    {
                      islands.find(
                        (island) => island.id === fetchedPlayer.island_id
                      ).name
                    }
                  </p>
                </div>
              </div>
            </div>

            <>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                {redirectedFrom === 'profile' ? 'Cancel Sale' : 'Purchase'}
              </h4>

              {playerBalance && (
                <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
                  {redirectedFrom === 'profile' ? null : (
                    <div className="flex justify-between">
                      <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191]">
                        Current Balance:
                      </p>
                      <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white">
                        {numberWithDots(playerBalance)}
                      </p>
                    </div>
                  )}
                  {redirectedFrom === 'profile' ? null : (
                    <div className="flex justify-between border-solid border-b-2 border-gray-400 pb-1">
                      <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191]">
                        {"Card's Price:"}
                      </p>
                      <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white">
                        {`-${numberWithDots(selectedCard.priceTag)}`}
                      </p>
                    </div>
                  )}

                  {redirectedFrom === 'profile' ? null : (
                    <div className="flex justify-between mt-2 mb-4">
                      <p className="font-epilogue font-medium text-[16px] leading-[30px] text-left text-[#808191] text-justify">
                        New Balance:
                      </p>
                      <p className="font-epilogue font-medium text-[18px] leading-[30px] text-right text-white text-justify">
                        <span
                          style={{
                            color: canBuy ? '' : 'red',
                          }}
                        >
                          {numberWithDots(
                            playerBalance - selectedCard.priceTag
                          )}
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="mt-[0px]">
                    <Message
                      isVisible={showTranMsg}
                      setVisibility={setShowTranMsg}
                      isLoading={isTranLoading}
                      isTranSuccess={isTranSuccess}
                      isTranError={isTranError}
                      type={tranType}
                      from={locationState.from}
                      text="Are you certain you wish you complete this transaction?"
                      handlerFunction={
                        redirectedFrom === 'profile'
                          ? handleCardRemoval
                          : handlePurchase
                      }
                    />

                    <CustomButton
                      btnType="button"
                      title={
                        redirectedFrom === 'profile'
                          ? 'Remove Card'
                          : canBuy
                          ? 'Buy Card'
                          : "Can't Buy Card"
                      }
                      styles="w-full bg-[#8c6dfd]"
                      disabled={redirectedFrom === 'profile' ? false : !canBuy}
                      handleClick={() => {
                        setShowTranMsg(true);
                        console.log('The JS Card: ', selectedCard);
                        // if (showConfirmation && confirmationRef.current) {
                        // }
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

const SubCategories = ({ cardProps, isSp }) => {
  console.log('cardProps: ', cardProps);
  console.log('SubCat isSp: ', isSp);
  const catInfo = Object.entries(cardProps);

  return (
    <div className="flex flex-col gap-2 pl-2 items-start">
      {catInfo.map(([category, value], index) => {
        return (
          // <div className="flex flex-col">
          <div
            className="flex w-full items-start"
            key={`${cardProps.name}-${cardProps.id}-${index}`}
          >
            <div className="flex">
              <GiAbstract047 size={18} color={'white'} />
            </div>
            <div className="flex justify-between w-full">
              <p className="indent-2 font-epilogue font-normal text-[14px] text-[#808191] leading-[22px] text-justify capitalize">
                {category}:{' '}
              </p>
              <p className="indent-2 font-epilogue font-normal text-[14px] text-white leading-[22px] text-justify">
                {numberWithDots(value, isSp)}
              </p>
            </div>
          </div>
          // </div>
        );
      })}
    </div>
  );
};

const MainCategory = ({ children, text, icon }) => {
  return (
    <div className="flex gap-4 items-start w-full mt-[20px] border-[1px] border-[#808191] rounded-xl p-4">
      <div className="flex flex-col gap-4 basis-[220px]">
        <div className="flex flex-row gap-3">
          {/* <icon size={20} color={"white"} /> */}
          {icon}
          {/* text-[#808191] */}
          <p className="font-epilogue font-normal text-[16px] text-white leading-[26px] text-justify">
            {text}:
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

const Message = ({
  isVisible,
  setVisibility,
  text,
  type,
  from = 'not-withdraw',
  isLoading,
  handlerFunction,
  isTranSuccess,
  isTranError,
}) => {
  const [showRemoveMsg, setShowRemoveMsg] = useState(false);
  const getStyles = () => {
    if (showRemoveMsg) return { bg: 'bg-[#80d266]', margin: 'mt-0' };
    if (type === 'verify') return { bg: 'bg-[#13131a]', margin: 'mt-4' };
    if (type === 'remove-card') return { bg: 'bg-[#13131a]', margin: 'mt-4' };
    if (type === 'success') return { bg: 'bg-[#80d266]', margin: 'mt-0' };
    if (type === 'failed') return { bg: 'bg-[#cf4f54]', margin: 'mt-0' };
  };

  const styles = getStyles();
  return (
    <div
      className={`${
        isVisible ? 'opacity-100' : 'hidden'
      } transition-opacity duration-200`}
    >
      {console.log('Is Fetching: ', isLoading)}
      {console.log('Is Error: ', isTranError)}
      {isLoading && !isTranError ? (
        <div className="flex justify-center items-center">
          <img
            src={loader}
            alt="loader"
            className="w-[150px] h-[150px] object-contain -translate-y-4"
          />
        </div>
      ) : (
        <div className={`mb-4 p-4 ${styles.bg} rounded-[10px]`}>
          {!isTranSuccess && !isTranError && !showRemoveMsg && (
            <h4 className="font-epilogue font-semibold text-[16px] leading-[22px] text-center text-white">
              {text}
              {/* Are you certain you wish you complete this transaction? */}
            </h4>
          )}
          <div
            className={`flex justify-around gap-4 ${styles.margin} rounded-[10px]`}
          >
            <>
              {!isTranSuccess && !isTranError && !showRemoveMsg && (
                <>
                  <CustomButton
                    btnType="button"
                    title="Yes"
                    styles="w-[100px] bg-[#42ab21]"
                    handleClick={() => {
                      if (from === 'profile') setShowRemoveMsg(true);
                      handlerFunction();
                    }}
                  />
                  <CustomButton
                    btnType="button"
                    title="No"
                    styles="w-[100px] bg-[#b30019]"
                    handleClick={() => setVisibility(false)}
                  />
                </>
              )}
              {(isTranSuccess || showRemoveMsg) && (
                <h4 className="font-epilogue font-semibold text-[18px] text-white text-center">
                  Your transaction was successfully executed!
                </h4>
              )}
              {isTranError && !showRemoveMsg && (
                <h4 className="font-epilogue font-semibold text-[18px] text-white text-center">
                  Something went wrong with the transaction. Please try again
                  later
                </h4>
              )}
            </>
            {/* {showCardRemoval && (
              <h4 className="bg-[#80d266] font-epilogue font-semibold text-[18px] text-white text-center">
                Your Card was successfully returned to your inventory!
              </h4>
            )} */}
          </div>
        </div>
      )}
    </div>
  );
};
export default CardDetails;
