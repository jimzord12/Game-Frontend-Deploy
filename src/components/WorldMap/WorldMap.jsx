import React, { useState, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // useMapEvent,
  Tooltip,
  // LayersControl,
  // LayerGroup,
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import SecondaryModal from '../Modal/SecondaryModal.jsx';
import CatButton from '../CatButton/CatButton.jsx';
import IslandSpecs from './IslandSpecs.jsx';

import icon from 'leaflet/dist/images/marker-icon.png';
// import iconRed from 'leaflet/dist/images/marker-icon-red.png';
import redMarker from '../../myAssets/marker-icon-red.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { BsPeopleFill } from 'react-icons/bs';
import { BsPersonBadgeFill } from 'react-icons/bs';
import { AiFillThunderbolt } from 'react-icons/ai';
import { GiGoldBar } from 'react-icons/gi';
import { IoArrowBackCircle } from 'react-icons/io5';

// import MiniTopBarV2 from '../NavBar/MiniTopBarV2.jsx';
import { useGlobalContext } from '../../context/index.jsx';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const playerMarker = L.icon({
  iconUrl: redMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

function WorldMap() {
  // const [gold, setGold] = useState(0);
  // const [population, setPopulation] = useState(0);
  // const [energy, setEnergy] = useState(0);
  // const [ranking, setRanking] = useState(0);
  // const [concrete, setConcrete] = useState(0);
  // const [metals, setMetals] = useState(0);
  // const [crystals, setCrystals] = useState(0);

  const [playerIsland, setPlayerIsland] = useState('Sardinia');

  const [selectedIslandCategory, setSelectedIslandCategory] = useState(null);
  const [isCategorySelected, setIsCategorySelected] = useState(false);

  const { useSecondaryModal } = useGlobalContext();
  const { isModalOpen_hook, close, open } = useSecondaryModal();

  // useEffect(() => {}, [selectedIslandCategory]);

  const position = [41.9028, 12.4964]; // Rome, Italy
  const islands = [
    {
      id: 1,
      name: 'Ibiza',
      position: [38.9588, 1.4327],
      info: 'Info about Ibiza',
    },
    {
      id: 2,
      name: 'Mykonos',
      position: [37.4467, 25.3689],
      info: 'Info about Mykonos',
    },
    {
      id: 3,
      name: 'Santorini',
      position: [36.3932, 25.4615],
      info: 'Info about Santorini',
    },
    {
      id: 4,
      name: 'Sardinia',
      position: [39.8277, 9.111111],
      info: 'Sardinia is the second-largest island in the Mediterranean after Sicily. Sardinia has a rich history and culture that dates back thousands of years. The island has been inhabited since prehistoric times, and it has been ruled by various civilizations. It is a unique and fascinating destination with something to offer for everyone.',
    },
    {
      id: 5,
      name: 'Crete',
      position: [35.2074, 24.83],
      info: 'Info about Crete',
    },
    {
      id: 6,
      name: 'Cyprus',
      position: [35.0951, 33.2034],
      info: 'Info about Cyprus',
    },
    // Add more islands as needed
  ];
  const [selectedIsland, setSelectedIsland] = useState(null);

  function assingPlayerMarker(dataFromDB) {
    setPlayerIsland(dataFromDB);
  }

  function handleMarkerClick(e) {
    setSelectedIsland(e.target.options.options.island);
    console.log(
      'The Island: ',
      e.target.options.options.island,
      'was selected'
    );
    console.log('World.jsx: Opening Modal...');
    open();
  }

  function handleCloseModal() {
    console.log('World.jsx: Closing Modal...');
    setSelectedIslandCategory(null);
    setIsCategorySelected(false);
    close();
  }

  function handleIslandEnergyClick() {
    console.log('Show Total Energy!');
    setSelectedIslandCategory('energy');
    setIsCategorySelected(true);
  }

  function handleIslandPopulationClick() {
    console.log('Show Total Population!');
    setSelectedIslandCategory('population');
    setIsCategorySelected(true);
  }

  function handleIslandGoldClick() {
    console.log('Show Total Gold!');
    setSelectedIslandCategory('gold');
    setIsCategorySelected(true);
  }

  function handleIslandPlayersClick() {
    console.log('Show Total Players!');
    setSelectedIslandCategory('players');
    setIsCategorySelected(true);
  }

  function IslandMarkers() {
    return (
      <>
        {islands.map((island) => (
          <Marker
            key={island.name}
            position={island.position}
            eventHandlers={{ click: handleMarkerClick }}
            icon={playerIsland === island.name ? playerMarker : DefaultIcon}
            options={{ island }}
          >
            <Tooltip offset={[12, -26]}>
              <span style={{ fontSize: '18px' }}>{island.name}</span>
            </Tooltip>
            <Popup>{island.name}</Popup>
          </Marker>
        ))}
      </>
    );
  }

  function IslandModal() {
    console.log('Is Modal Open: ', isModalOpen_hook);
    if (isModalOpen_hook) {
      return (
        <SecondaryModal
          // isOpen={true}
          handleClose={handleCloseModal}
          title={selectedIsland.name}
          text={selectedIsland.info}
          contentCategory={selectedIslandCategory}
          isCategorySelected={isCategorySelected}
          onClick={() => console.log('first')}
        >
          {isCategorySelected === false ? (
            <>
              <CatButton
                icon={<AiFillThunderbolt size={24} color="#04ea00" />}
                text={'Energy'}
                onClick={handleIslandEnergyClick}
              />
              <CatButton
                icon={<BsPeopleFill size={24} color="#1acbff" />}
                text={'Population'}
                onClick={handleIslandPopulationClick}
              />
              <CatButton
                icon={<GiGoldBar size={24} color="gold" />}
                text={'Gold'}
                onClick={handleIslandGoldClick}
              />
              <CatButton
                icon={<BsPersonBadgeFill size={24} color="red" />}
                text={'Players'}
                onClick={handleIslandPlayersClick}
              />
            </>
          ) : (
            <>
              <IoArrowBackCircle
                size={54}
                color="#000000"
                style={{
                  // alignSelf: 'start',
                  cursor: 'pointer',
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsCategorySelected(false);
                }}
              />
              <IslandSpecs
                island={selectedIsland.name}
                category={selectedIslandCategory}
              />
            </>
          )}
        </SecondaryModal>
      );
    }
    return null;
  }

  return (
    <div>
      <IslandModal />
      <MapContainer
        center={position}
        // style={{ position: 'fixed', zIndex: 1 }}
        zoom={5}
        maxBounds={[
          // [10, -5], // top-left
          // [60, 50], // bottom-right

          // [25.0, 35.0], // Southwest coordinates (latitude, longitude)
          // [47.0, 0.0], // Northeast coordinates

          [34.0, 38.0], // Southwest coordinates (latitude, longitude)
          [47.0, -2.0], // Northeast coordinates (Bottom, Left)
        ]}
        maxBoundsViscosity={0.25} // How much you drag beyong the limits
        minZoom={4} // Zoom out level, bigger = more zoom in
        maxZoom={10} // Zoom in level
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <IslandMarkers />
      </MapContainer>
    </div>
  );
}

export default WorldMap;
