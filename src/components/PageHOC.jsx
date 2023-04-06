/* eslint-disable react/display-name */
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Alert from './Alert';
// import { useGlobalContext } from '../context/index.jsx';
import { logoGenera, footerImg, UniwaLogo } from '../myAssets/index';
import styles from '../styles';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';

// import WorldMap from './WorldMap/WorldMap';
// import MiniTopBarV2 from '../components/NavBar/MiniTopBarV2.jsx';

const PageHOC = (Component, title, description) => () => {
  // const { showAlert } = useGlobalContext();
  const mediaMax320 = useMediaQuery('(max-width: 320px)');
  const navigate = useNavigate();

  // const { useSecondaryModal } = useGlobalContext();

  // const [gold, setGold] = useState(0);
  // const [population, setPopulation] = useState(0);
  // const [energy, setEnergy] = useState(0);
  // const [ranking, setRanking] = useState(0);
  // const [concrete, setConcrete] = useState(0);
  // const [metals, setMetals] = useState(0);
  // const [crystals, setCrystals] = useState(0);

  return (
    <div className={styles.hocContainer}>
      {/* {showAlert?.status && (
        <Alert type={showAlert.type} message={showAlert.message} />
      )} */}

      <div className={styles.hocContentBox}>
        <img
          // src={logo}
          src={logoGenera}
          alt="logo"
          className={styles.hocLogo}
          onClick={() => navigate('/battle')}
        />

        <div className={styles.hocBodyWrapper}>
          <div className="flex flex-row w-full">
            <h1 className={`flex ${styles.headText} head-text`}>{title}</h1>
          </div>

          <p className={`${styles.normalText} my-10`}>{description}</p>

          <Component />
        </div>

        <p className={styles.footerText}>
          <img
            src={UniwaLogo}
            alt="Uniwa Logo"
            style={{
              display: 'inline-block',
              marginRight: '10px',
              width: mediaMax320 ? '42px' : '56px',
              height: 'auto',
            }}
          />
          Made with 💙 by UNIWA{' '}
        </p>
      </div>

      <div className="flex flex-1">
        <img
          src={footerImg}
          // src={heroImg}
          alt="hero-img"
          className="w-full xl:h-full object-cover"
        />
      </div>
    </div>
    // <div>
    //   <MiniTopBarV2
    //     playerData={{
    //       stats: { gold, population, energy, ranking },
    //       resources: { concrete, metals, crystals },
    //       setters: {
    //         setGold,
    //         setPopulation,
    //         setConcrete,
    //         setEnergy,
    //         setRanking,
    //         setCrystals,
    //         setMetals,
    //       },
    //     }}
    //   />
    //   <div className={styles.hocContainer}>
    //     <WorldMap />
    //   </div>
    // </div>
  );
};

export default PageHOC;
