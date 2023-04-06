import React, { useState, useEffect } from 'react';
import './styles.css';

const CardManagerCraft = ({ cards, onFilteredCardsChange, typeSelection }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');
  const [filterType, setFilterType] = useState('');

  console.log('>>> CardManagerCraft: Card: ', cards);

  let filteredCards = cards.filter(
    (card) => card.type.toLowerCase() === typeSelection.toLowerCase()
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortType(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterType(event.target.value);
    console.log('CMC.jsx: Handle Filter: ', event.target.value);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      filteredCards = cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== '') {
      filteredCards = filteredCards.filter((card) => card.rarity == filterType);
    }

    if (sortType === 'title') {
      filteredCards.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (sortType === 'type') {
      filteredCards.sort((a, b) => (a.type > b.type ? 1 : -1));
    } else if (sortType === 'rarity') {
      filteredCards.sort((a, b) => (b.rarity > a.rarity ? 1 : -1));
    } else if (sortType === 'level') {
      filteredCards.sort((a, b) => b.level - a.level);
    }

    onFilteredCardsChange(filteredCards);
  }, [searchTerm, sortType, filterType]);

  return (
    <div className="card-manager">
      {console.log('CardManagerCraft.jsx : Filtered cards: ', filteredCards)}
      {/* <div className="card-manager-field">
        <span className="span-header">Type Card's Title</span>
      </div> */}
      <div className="card-manager-field">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search by Title..."
          onChange={handleSearchChange}
        />
      </div>

      {/* <div className="card-manager-field">
        <span className="span-header">Sort By:</span>
      </div>
      <div className="card-manager-field">
        <label>
          <input
            type="radio"
            name="sortType"
            value="title"
            checked={sortType === 'title'}
            onChange={handleSortChange}
          />
          Title
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="type"
            checked={sortType === 'type'}
            onChange={handleSortChange}
          />
          Type
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="rarity"
            checked={sortType === 'rarity'}
            onChange={handleSortChange}
          />
          Rarity
        </label>
        <label>
          <input
            type="radio"
            name="sortType"
            value="level"
            checked={sortType === 'level'}
            onChange={handleSortChange}
          />
          Level
        </label>
      </div>
      <div className="card-manager-field">
        <span className="span-header">Show:</span>
      </div>
      <div className="card-manager-field">
        <label>
          <input
            type="radio"
            name="filterType"
            value=""
            checked={filterType === ''}
            onChange={handleFilterChange}
          />
          All
        </label>
        <label
          style={{
            fontWeight: '500',
            color: 'white',
            textShadow: '1px 1px 1px black',
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={1}
            checked={filterType == 1}
            onChange={handleFilterChange}
          />
          Common
        </label>
        <label
          style={{
            fontWeight: '500',
            color: 'lightgreen',
            textShadow: '1px 1px 1px black',
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={2}
            checked={filterType == 2}
            onChange={handleFilterChange}
          />
          Special
        </label>
      </div>
      <div className="card-manager-field">
        <label
          style={{
            fontWeight: '500',
            color: '#66b7ff',
            textShadow: '1px 1px 1px black',
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={3}
            checked={filterType == 3}
            onChange={handleFilterChange}
          />
          Rare
        </label>
        <label
          style={{
            fontWeight: '500',
            color: '#cc66ff',
            textShadow: '1px 1px 1px black',
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={4}
            checked={filterType == 4}
            onChange={handleFilterChange}
          />
          Mythic
        </label>
        <label
          style={{
            fontWeight: '500',
            color: '#ff9000',
            textShadow: '1px 1px 1px black',
          }}
        >
          <input
            type="radio"
            name="filterType"
            value={5}
            checked={filterType == 5}
            onChange={handleFilterChange}
          />
          Legendary
        </label>
      </div> */}
    </div>
  );
};

export default CardManagerCraft;
