import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { classCard_V2 } from '../../models/Classes';
import { removeObjectWithId } from './utils.js';

import Card from '../Card/Card.jsx';
import simpleImgCard from '../Card/SimpleImgCard.jsx';

import { useGlobalContext } from '../../context/index.jsx';
import { usePlayerContext } from '../../context/playerContext/PlayerContext.jsx';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import './styles.css';
import cardImages from '../../myAssets/cardImages/windTurbine.png';
import vertDivider from '../../myAssets/vertical_section_divider.png';
import { CustomInput } from '../SimpleCustom';

import { apiEndpointLatestId } from '../../context/playerContext/constants';

import {
  getLastestId,
  createCard_API,
  updateCardData,
  uploadCardStats,
  sellCard,
} from '../../../api/apiFns';

//@Note: These images imports are all over the place! When refactoring, find a way to centralize them.
import {
  Restaurant,
  Techstore,
  TownHall,
  WindTurbine,
} from '../../myAssets/mapCardRepresentationImages';
import WindTurbine_V2 from '../../myAssets/cardImages/windTurbine.png';
import workaholismImg from '../../myAssets/temp/workaholism.png';
import { randNumber4Testing } from '../../context/playerContext/utilityFunctions';
import {
  NameToImgMapping,
  cardsWithStats,
} from '../../context/playerContext/constants.js';

function isFloat(x) {
  // check if the passed value is a number
  if (typeof x == 'number' && !isNaN(x)) {
    // check if it is integer
    if (Number.isInteger(x)) {
      console.log(`${x} is integer.`);
      return false;
    } else {
      console.log(`${x} is a float value.`);
      return true;
    }
  } else {
    console.log(`${x} is not a number`);
    return false;
  }
}

const rarityCoverter = (rarityNumber) => {
  if (rarityNumber === undefined) return 'Unknown';
  if (rarityNumber === 0) return 'default';
  if (rarityNumber === 1) return 'Common';
  if (rarityNumber === 2) return 'Special';
  if (rarityNumber === 3) return 'Rare';
  if (rarityNumber === 4) return 'Mythic';
  if (rarityNumber === 5) return 'Legendary';
  console.error('😱 Something Wrong at: Card.jsx, in: rarityCoverter()');
};

// const NameToImgMapping = {
//   WindTurbine: WindTurbine_V2,
//   Workaholism: workaholismImg,
//   Techstore: Techstore,
// };

export default function CardGrid(props) {
  const {
    cards,
    setSelectedCardModal,
    selectedCardModal,
    handleCardClickScroll,
    currentModal,
    setIsOpen,
  } = props;

  const {
    activeCards,
    setActiveCards,
    setInventoryCards,
    inventoryCards,
    materialResourcesRef,
    testCardTemplateData,
    setForceRerender,
    energyRef,
    specialEffectsRef,
    maxLimitsRef,
    fetchedPlayer,
  } = usePlayerContext();

  const navigate = useNavigate();
  // const [endPointForId, setEndPointForId] = useState(null);
  const [newCard_2, setNewCard_2] = useState(null); // Can't think another name for "newCard" 🤣
  const [showPriceInput, setShowPriceInput] = useState(false);
  const [priceInput, setPriceInput] = useState('');

  const {
    mutate: createCard_DB,
    data: newCardId,
    isSuccess: isSuccessNewCard,
  } = useMutation({
    mutationFn: createCard_API,
    onError: () => {
      console.error('😫 Something went wrong!!! While creating the new card!');
    },
    onSuccess: (newCard) => {
      console.log('Here is the new Card ID: ', newCard.id);

      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const {
    mutate: createCardStats_DB,
    // data: newCardId,
    // isSuccess: isSuccessNewCard,
  } = useMutation({
    mutationFn: uploadCardStats,
    // enabled: isSuccessNewCard,
    onError: () => {
      console.error(
        '😫 Something went wrong!!! While creating the new card STATS!'
      );
    },
    onSuccess: (newCardStats) => {
      console.log('Here is the new Card STATS: ', newCardStats);

      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const {
    mutate: putCardForSale,
    // data: newCardId,
    // isSuccess: isSuccessNewCard,
  } = useMutation({
    mutationFn: sellCard,
    // enabled: isSuccessNewCard,
    onError: () => {
      console.error(
        '😫 Something went wrong!!! While changing the card.in_mp property'
      );
    },
    onSuccess: (response) => {
      console.log('Here is the response from MP: ', response);

      // Invalidate and refetch
      // queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  useEffect(() => {
    console.log(
      'CardGrid: UseEffect() Number of Activated Cards: ',
      activeCards.length,
      activeCards,
      cards
    );
  }, [activeCards]);

  useEffect(() => {
    if (newCard_2 !== null) {
      const newCard = newCard_2;
      newCard.image = NameToImgMapping[newCard.img];
      newCard.id = newCardId.id;
      if (cardsWithStats.includes(newCard.templateId)) {
        createCardStats_DB({
          cardId: newCard.id,
          gold: 0,
          concrete: 0,
          metals: 0,
          crystals: 0,
          population: 0,
          energy: 0,
          rank: 0,
          expenses: 0,
        });
      }
      setInventoryCards((prev) => [...prev, newCard]); // (3)
      // setForceRerender((prev) => !prev);
      console.log('CardGrid::UseEffect() Complete New Card: ', newCard);
      alert('🥳 Amazing! You have Successfully Crafted a New Card!');
    }
  }, [isSuccessNewCard]);

  // Dont forget about the disabled state
  // const craftCardMut = useMutation({

  // const {
  //   isSuccess: latestIdSuccessfullyFetched,
  //   error: latestIdError,
  //   data: latestId,
  // } = useQuery({
  //   queryKey: [apiEndpointLatestId, endPointForId],
  //   // queryKey: [apiEndpointCards, cardsToFetch, axiosPrivate],
  //   queryFn: getLastestId,
  //   // enabled: false,
  //   enabled: endPointForId !== null,
  //   onSuccess: (fetchedData) => {
  //     setFetchedCards(fetchedData);
  //     console.log('SUCCESSFUL - LATEST ID: ', fetchedData);
  //     setEndPointForId(null);
  //   },
  // });

  // function getImage(name) {
  //   console.log('🎨 Searching for IMG with the name: ' + name + ' ...');
  // }

  // function getDesc(name) {
  //   console.log('📣 Searching for Desc with the name: ' + name + ' ...');
  // }

  function mysqlDatetimeToUnixTimestamp(mysqlDatetime) {
    const date = new Date(mysqlDatetime);
    return Math.floor(date.getTime() / 1000);
  }

  function convertToMySQLDate(timestamp) {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 10);
  }

  function convertToMySQLDateTime(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // function getOwner() {
  //   console.log('This is the owner of the card: ', fetchedPlayer);
  //   return fetchedPlayer;
  // }

  function createCard() {
    const ownerId = fetchedPlayer.id;
    const _creator = fetchedPlayer.name;
    const cardData = {
      owner: ownerId,
      templateId: Number(selectedCardModal),
      creator: _creator,
    };

    console.log('CardGrid, Create Card: ', selectedCardModal);
    console.log('CardGrid, Create Card Data: ', cardData);
    // Rarity, Level, State, Locked are automatically calculated inside the Class
    // Important! Add the 3rd Parameter to "true" when creating a new Card!
    return new classCard_V2(
      cardData,
      testCardTemplateData[selectedCardModal],
      true
    );
  }

  function checkAndSubtractRes(_card, type) {
    const playerResources = materialResourcesRef.current;
    let alertFlags = [];

    for (const key in _card.requirements) {
      if (Object.hasOwnProperty.call(_card.requirements, key)) {
        // Checks if the requirements are met
        if (playerResources[key] < _card.requirements[key]) {
          // If they are NOT...
          alertFlags.push(key);
        }
      }
    }
    if (alertFlags.length === 0) {
      if (type === 'level' && _card.level === 5) {
        alert(
          '😅 Your Card is at the Maximum Level! It can not be leveled Up any further'
        );
        return;
      }
      for (const key in _card.requirements) {
        // If they are...
        console.log('Old ', key, ' => ', materialResourcesRef.current[key]);
        // 1. Subtract resources
        materialResourcesRef.current[key] -= _card.requirements[key];
        console.log('New ', key, ' => ', materialResourcesRef.current[key]);
        console.log('------------------------------------');
      }

      if (type === 'craft') {
        const newCard = createCard();
        console.log('The Newly Created Card: ', newCard);
        setNewCard_2(newCard);
        if (_card.type === 'Special Effect') {
          const { templateId, level, state, rarity, creationTime } = newCard;
          createCard_DB({
            templateId,
            level,
            ownerId: fetchedPlayer.id,
            state,
            locked: false,
            rarity,
            creationTime: convertToMySQLDate(creationTime),
            creator: fetchedPlayer.name,
          });
        } else {
          const { templateId, level, state, rarity, creationTime, stats } =
            newCard;
          createCard_DB({
            templateId,
            level,
            ownerId: fetchedPlayer.id,
            state,
            locked: false,
            rarity,
            creationTime: convertToMySQLDate(creationTime),
            creator: fetchedPlayer.name,
          });
        }
        // const { templateId, level, state, rarity, creationTime } = newCard_2;
        // newCard.image = NameToImgMapping[newCard.img];
        // newCard.id = newCardId;
        // setInventoryCards((prev) => [...prev, newCard]); // (3)
        // setForceRerender((prev) => !prev);
        // alert('🥳 Amazing! You have Successfully Crafted a New Card!');
      }

      if (type === 'level' && _card.level >= 1) {
        _card.levelUp();
        const { level, id } = _card;
        updateCardData({ id, level });
        // setForceRerender((prev) => !prev);
        alert('💪 Awesome! You just leveled Up your Card!');
      }
    } else {
      alert(`You short on the following Resources: [${alertFlags}]`);
    }
  }

  // function calcCardId() {
  //   //@Note: Needs change obviously (MySQL)
  //   // setEndPointForId('cards');
  //   // return latestId;
  //   return randNumber4Testing();
  // }

  // Here we register the effects of SE Cards
  function createEffect(_templateId, boost) {
    if (specialEffectsRef.current.isEffectActive) {
      return false;
    }
    if (testCardTemplateData[_templateId].name === 'Workaholism') {
      return {
        isEffectActive: true,
        // endDate: 1679833229000, // @Important!: Very bad naming! StartDate is the correct one!!!
        endDate: Date.now(),
        goldGathRate: 1,
        popGrowthRate: 1,
        concreteGathRate: boost,
        metalsGathRate: boost,
        crystalsGathRate: boost,
      };
    }
  }

  function checkSpace(cardType) {
    if (cardType === 'REG') {
      const regCards = activeCards.filter(
        (card) => card.type.toLowerCase() === 'reg'
      );
      if (regCards.length === maxLimitsRef.current.generatorsSpace) {
        alert(
          `😱 Currently, your Town can not utilize more than (${maxLimitsRef.current.generatorsSpace}) Generators. Consider Upgrading/Level Up your Town Hall Building.`
        );
        return false;
      }
    }

    if (cardType === 'Building') {
      const buildingCards = activeCards.filter(
        (card) => card.type.toLowerCase() === 'building'
      );
      if (buildingCards.length === maxLimitsRef.current.buildingsSpace) {
        alert(
          `😱 Currently, your Town can not have more than (${maxLimitsRef.current.buildingsSpace}) Buildings. Consider Upgrading/Level Up your Town Hall Building.`
        );
        return false;
      }
    }
    return true;
  }

  const handleActivateClick = (_card) => {
    console.log('Attempting Card Activation: ', _card);
    const hasAvailSpace = checkSpace(_card.type);
    // -3. Check if the Card is of type "Special Effect"
    if (!hasAvailSpace) return; // If there is no available space, do nothing.
    if (_card.type === 'Special Effect') {
      if (_card.disabled === true) {
        alert(
          '😅 Special Effect Cards can be used only Once per Player. You have already used this one!'
        );
      } else {
        const effect = createEffect(
          _card.templateId,
          Number(_card.output.boost)
        );
        if (effect === false) {
          alert('Only one effect can be active at a time. 😅');
          return;
        } else {
          const { id } = _card;
          const mysqlDate = convertToMySQLDateTime(Date.now());
          console.log('HandleActivateClick::MySQLDate: ', mysqlDate);
          updateCardData({ id, state: true, endDate: mysqlDate });
          specialEffectsRef.current = effect;
        }
      }
    }

    // (For REGs) Check if there is enough Gold to activate
    if (_card.type.toLowerCase() === 'reg') {
      const regCards = activeCards.filter(
        (card) => card.type.toLowerCase() === 'reg'
      );
      const playerGold = materialResourcesRef.current.gold;
      const totalMaintenanceGold = regCards.reduce((acc, card) => {
        return acc + card.maintenance.gold;
      }, 0);
      console.log('1 SUKA SUKA! ', playerGold);
      console.log('2 SUKA SUKA! ', totalMaintenanceGold);
      if (totalMaintenanceGold + _card.maintenance.gold > playerGold) {
        alert(
          `😱 Your current Gold is not enough to pay for the maintenance of your Generators! Therefore, you can not activate any more generators.`
        );
        return;
      }
    }

    // -1. (For Buildings) Check if there is enough Energy to activate
    if (
      _card.maintenance?.energy !== undefined &&
      energyRef.current.delta - _card.maintenance.energy < 0
    ) {
      alert(`You need more ⚡ Energy to activate the (${_card.name}) Card!`);
      return;
    }
    // 0. Change Card's State to true
    _card.activate();

    const { state, id } = _card;
    updateCardData({ id, state });

    // 1. Add Selected Card => Activated Cards
    setActiveCards((prev) => [...prev, _card]);

    // 2. Remove Selected Card from the Inventory
    setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]);

    // Force Re-render
    // setForceRerender((prev) => !prev);

    // 3. Store Changes to Local Storage

    // 4. Update MySQL Database

    // 5. Go 1 step back in the Modal (Where all the cards are dispayed)
    setSelectedCardModal(null);

    // 6. Close the Modal
    setIsOpen(false);
  };

  const handleSellClick = (_card) => {
    // handle sell functionality here
    // setForceRerender((prev) => !prev);
    if (showPriceInput) {
      putCardForSale({
        cardId: _card.id,
        in_mp: true,
        priceTag: priceInput,
        state: false,
      });
      setInventoryCards([...removeObjectWithId(inventoryCards, _card.id)]);
      setIsOpen(false);
      setSelectedCardModal(null);
      console.log('Sell Button was clicked!');
      console.log('Active Card: ', activeCards);
      console.log('Inventory: ', inventoryCards);
      setShowPriceInput(false);
      return;
    } else {
      setShowPriceInput(true);
    }

    // setIsOpen(false);
  };

  const handleLevelUpClick = (_card) => {
    // handle level up functionality here
    // console.log('This is the target Card: ', _card);
    // console.log(
    //   'This is the target From Inv: ',
    //   inventoryCards.find((cardInv) => cardInv.id === _card.id)
    // );

    checkAndSubtractRes(_card, 'level');
    setIsOpen(false);
  };

  const handleCraftClick = (_card) => {
    // handle craft functionality here
    //@NOTE: Integration with Player Class is required!
    // 1. Check if player has the resources to craft the Card
    // 2. If "Yes" => Next(), Else "No" Show AlertModal (Not yet created!)
    // 3. Subtract the resources from the player
    // 4. Create the new Card (It needs a unique ID)
    // 5. Add the Card to:
    //    1) MySQL
    //    2) To Blockchain
    //    3) Local Storage
    //    4) Frontend => CardsInInventory (Context Variable
    checkAndSubtractRes(_card, 'craft');

    // 6. Go 1 step back in the Modal (Where all the cards are dispayed)
    setSelectedCardModal(null);

    // 7. Close Gracefully the Modal
    setIsOpen(false);
  };

  return (
    <div
      className={selectedCardModal === null ? 'card-grid' : 'single-card-grid'}
    >
      {console.log('Is a Card Selected? => ', selectedCardModal !== null)}
      {console.log('CardGrid: Cards (props) => ', cards)}

      {/* Here is the 1st Card Menu, where all the cards are displayed  */}
      {selectedCardModal === null
        ? cards.map((card, index) => (
            <div
              key={
                currentModal === 'Craft'
                  ? 'noCardSelected-' + 'Craft-' + index
                  : 'noCardSelected-' + 'Inv-' + index
              }
            >
              {/* Render the card contents here */}
              {card.templateId != 0 && (
                <Card
                  id={card.id} // In Craft Modal: undefined
                  templateId={card.templateId}
                  name={card.name}
                  type={card.type}
                  level={card.level} // In Craft Modal: undefined
                  rarity={card.rarity} // In Craft Modal: undefined
                  // image={getImage(card.name)}
                  // image={cardImages}
                  image={card.image}
                  // description={getDesc(card.name)}
                  isDisabled={card.disabled}
                  description={card.desc}
                  setSelectedCardModal={setSelectedCardModal}
                  selectedCardModal={selectedCardModal}
                  handleCardClickScroll={handleCardClickScroll}
                  currentModal={currentModal}
                />
              )}
            </div>
          ))
        : /* Here is the 2nd Card Menu, when we click/select a Card from the 1st Menu we arrive here  */
          cards
            .filter((card) => {
              if (currentModal === 'Craft')
                return card.templateId === selectedCardModal;
              return card.id === selectedCardModal;
            })
            .map((card) => (
              <div
                key={
                  currentModal === 'Craft'
                    ? 'CardisSelected-' + card.templateId
                    : 'CardisSelected-' + card.index
                }
                className="single-card-container"
                // style={{ marginTop: '24px' }}
              >
                <div className="card-plus-btns">
                  {console.log('asdasdasas: ', card)}
                  <Card
                    id={card.id}
                    templateId={card.templateId}
                    name={card.name}
                    type={card.type}
                    level={card.level}
                    rarity={card.rarity}
                    image={card.image}
                    isDisabled={card.disabled}
                    description={card.desc}
                    setSelectedCardModal={setSelectedCardModal}
                    selectedCardModal={selectedCardModal}
                    currentModal={currentModal}
                  />
                  {/* Single Card Menu for - Inventory - */}
                  {currentModal === 'Inventory' && (
                    <div className="single-card-btn-container">
                      <button
                        className="single-card-btn btn-activate"
                        // I use tge closeBtn class cuz I'm bored of renaming it :P
                        style={{
                          padding: '5px 10px',
                          borderRadius: '10px',
                          boxShadow: '1px 2px 2px 0px black',
                          pointerEvents: card.disabled ? 'none' : '',
                          filter: card.disabled ? 'grayscale(100%)' : '',
                        }}
                        onClick={() => handleActivateClick(card)}
                      >
                        Activate
                      </button>

                      <button
                        className="single-card-btn btn-sell"
                        style={{
                          padding: '5px 10px',
                          borderRadius: '10px',
                          boxShadow: '1px 2px 2px 0px black',
                        }}
                        onClick={() => handleSellClick(card)}
                      >
                        Sell
                      </button>

                      {showPriceInput && (
                        <div className="flex flex-col items-center w-full">
                          <CustomInput
                            label="Price Tag"
                            placeHolder="Ex. 25000"
                            Attribs={{
                              onChange: (e) => {
                                setPriceInput(e.target.value);
                                console.log('Price Tag: ', e.target.value);
                              },
                            }}
                          />
                        </div>
                      )}

                      {card.type !== 'Special Effect' && (
                        <button
                          className="single-card-btn btn-levelUp"
                          style={{
                            marginTop: showPriceInput ? '10px' : '0px',
                            padding: '5px 10px',
                            borderRadius: '10px',
                            boxShadow: '1px 2px 2px 0px black',
                          }}
                          onClick={() => handleLevelUpClick(card)}
                        >
                          Level Up
                        </button>
                      )}
                    </div>
                  )}
                  {/* Single Card Menu for - Craft - */}
                  {currentModal === 'Craft' && (
                    <div className="single-card-btn-container">
                      <button
                        className="single-card-btn btn-craft"
                        // I use tge closeBtn class cuz I'm bored of renaming it :P
                        style={{
                          padding: '5px 10px',
                          borderRadius: '10px',
                          boxShadow: '1px 2px 2px 0px black',
                        }}
                        onClick={() => handleCraftClick(card)}
                      >
                        Craft ⚙
                      </button>
                    </div>
                  )}
                </div>
                <img
                  src={vertDivider}
                  alt="-- Vertical Divider --"
                  // style={{ display: 'block' }}
                  className="vertical-divider"
                />

                <div className="single-card-desc">
                  {card.type !== 'Special Effect' && (
                    <>
                      <h3> Maintenance</h3>
                      {card.maintenance === false ? (
                        <span className="single-card-desc-span">
                          This Card does not require Maintenance
                        </span>
                      ) : (
                        <ul>
                          {card.type !== 'Special Effect' &&
                            Object.entries(card.maintenance).map(
                              ([key, value], index) => (
                                <li
                                  key={`noSE-Maintaince-Prop-${index}`}
                                  className="single-card-li"
                                >
                                  <span className="single-card-maintenance-prop">
                                    {key}:{` `}
                                  </span>
                                  <span className="single-card-maintenance-value">
                                    {value}
                                  </span>
                                </li>
                              )
                            )}
                        </ul>
                      )}
                    </>
                  )}

                  {card.type !== 'Special Effect' ? (
                    <>
                      <h3>
                        {' '}
                        {`${
                          currentModal === 'Craft' ? 'Craft' : 'Upgrade'
                        } - Requirements`}{' '}
                      </h3>
                      {card.level >= 5 ? (
                        <span className="single-card-desc-span">
                          This Card can not be upgraded any further
                        </span>
                      ) : (
                        <ul>
                          {Object.entries(card.requirements).map(
                            ([key, value], index) => (
                              <li
                                key={`noSE-Requirements-Prop-${index}`}
                                className="single-card-li"
                              >
                                <span className="single-card-maintenance-prop">
                                  {key}:{` `}
                                </span>
                                <span className="single-card-maintenance-value">
                                  {value}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </>
                  ) : (
                    <>
                      {currentModal === 'Craft' ? (
                        <>
                          <h3>Requirements</h3>
                          {Object.entries(card.requirements).map(
                            ([key, value], index) => (
                              <li
                                key={`Craft-Requirements-Prop-${index}`}
                                className="single-card-li"
                              >
                                <span className="single-card-maintenance-prop">
                                  {key}:{` `}
                                </span>
                                <span className="single-card-maintenance-value">
                                  {value}
                                </span>
                              </li>
                            )
                          )}
                        </>
                      ) : (
                        <>
                          <h3>Rarity</h3>
                          <span
                            className="single-card-maintenance-prop special-card"
                            style={{ fontSize: '26px', display: 'block' }}
                          >
                            {rarityCoverter(card.rarity)}
                          </span>
                        </>
                      )}
                    </>
                  )}

                  <h3> Output </h3>
                  {card.output === false ? (
                    <span className="single-card-desc-span">
                      This Card does not provide any output
                    </span>
                  ) : (
                    <ul>
                      {card.type === 'Special Effect'
                        ? Object.entries(card.output).map(
                            ([key, value], index) => (
                              <>
                                {currentModal === 'Craft' ? (
                                  <li
                                    key={`Craft-SE-Output-Prop-${index}`}
                                    className="single-card-li"
                                  >
                                    {/* <span className="single-card-maintenance-prop">
                                      {key}:{` `}
                                    </span> */}
                                    <span className="single-card-maintenance-prop">
                                      {card.desc}
                                    </span>
                                  </li>
                                ) : (
                                  <li
                                    key={`Inv-SE-Output-Prop-${index}`}
                                    className="single-card-li"
                                  >
                                    <span className="single-card-maintenance-prop special-card">
                                      {card.desc}
                                    </span>
                                    {/* <span className="single-card-maintenance-value">
                                      {card.desc}
                                    </span> */}
                                  </li>
                                )}
                              </>
                            )
                          )
                        : // For REG & Buildings 🏙 🏘
                          Object.entries(card.output).map(
                            ([key, value], index) => (
                              <>
                                {/* If the Card is: 'REG' */}
                                {card.type === 'REG' ? (
                                  <li
                                    key={`Inv-REG-Output-Prop-${index}`}
                                    className="single-card-li"
                                  >
                                    <span className="single-card-maintenance-prop">
                                      {key}:{` `}
                                    </span>
                                    {currentModal === 'Craft' ? (
                                      <span className="single-card-maintenance-value">
                                        {'???'}
                                      </span>
                                    ) : (
                                      <span className="single-card-maintenance-value">
                                        {value}
                                      </span>
                                    )}
                                  </li>
                                ) : (
                                  // {/* If the Card is: 'Building' */}
                                  <li
                                    key={`Inv-Building-Output-Prop-${index}`}
                                    className="single-card-li"
                                  >
                                    <span className="single-card-maintenance-prop">
                                      {key}:{` `}
                                    </span>
                                    {currentModal === 'Craft' ? (
                                      <span className="single-card-maintenance-value">
                                        {'???'}
                                      </span>
                                    ) : (
                                      <span className="single-card-maintenance-value">
                                        {isFloat(value)
                                          ? value * 100 + '%'
                                          : value}
                                      </span>
                                    )}
                                  </li>
                                )}
                              </>
                            )
                          )}
                    </ul>
                  )}
                </div>
                {/* ))} */}
              </div>
            ))}
    </div>
  );
}
