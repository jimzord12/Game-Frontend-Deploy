import React from 'react';

import './islandSpecs.styles.css';

const dummyDataFromDB = {
  data: {
    islandWeeklyProduction: {
      energy: 2504960,
      population: 3246,
      players: 13,
      gold: 120000000,
    },
  },
};
const IslandSpecs = ({ island, category }) => {
  function findMetric() {
    if (category === 'energy') return 'KW';
    if (category === 'population') return 'Citizens';
    if (category === 'players') return 'Town Leaders';
    if (category === 'gold') return 'Financial Power';
    console.error('😱 IslandSpecs.jsx: Problem with findMetric()');
  }

  function findDescription() {
    if (category === 'energy') return 'Weekly Energy Production:';
    if (category === 'population') return 'Current Population:';
    if (category === 'players') return 'Current Players:';
    if (category === 'gold') return 'Total Available Gold:';
    console.error('😱 IslandSpecs.jsx: Problem with findDescription()');
  }
  return (
    <div className="island-specs">
      <h5>Fetching Data from Database, Please Wait...</h5>
      <h5>
        Requested Island:{' '}
        <span
          style={{
            fontWeight: '600',
            fontSize: '18px',
            color: 'white',
          }}
        >
          {island}{' '}
        </span>
      </h5>
      <h5>
        Requested Category:{' '}
        <span
          style={{
            fontWeight: '600',
            fontSize: '18px',
            color: 'white',
          }}
        >
          {category}
        </span>
      </h5>
      {/* <h5>===========================</h5> */}

      <div>
        <h3>
          {' '}
          {findDescription()}{' '}
          <span
            style={{
              fontWeight: '600',
              fontSize: '18px',
              color: 'white',
            }}
          >
            {dummyDataFromDB.data.islandWeeklyProduction[category] +
              ' ' +
              findMetric()}{' '}
            {'(Fake)'}
          </span>
        </h3>
      </div>
    </div>
  );
};

export default IslandSpecs;
