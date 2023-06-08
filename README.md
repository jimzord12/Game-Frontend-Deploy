# Game-Frontend-Deploy

GENERA Project: The Online Multiplayer Browser-based Web3 Game Frontend (UI - Source Code)
<br />
You can check it out if you wish: [Game's Page](https://master--genera-game-testing.netlify.app/)
<br />

## Technologies

This Game is browser-based, meaning that a browser program (ex. Chrome, Firefox, etc.) is required to play it.
<br />
Therefore, for its development some of the most modern and popular Web Technologies were used.
<br />

<img src="https://styles.redditmedia.com/t5_2su6s/styles/communityIcon_4g1uo0kd87c61.png?width=256&v=enabled&s=86f4a4bd647772d34d2de32a0e4281dd0ab095f1" alt="React Logo" width="50" height="50" /> &nbsp;&nbsp;
<img src="https://v4.mui.com/static/logo.png" alt="Material UI" width="50" height="50" /> &nbsp;&nbsp;
<img src="https://velog.velcdn.com/images/real-bird/post/4f43bebb-5aff-4e53-b2ec-66a523a80bfb/image.png" alt="Framer Motion" width="100" height="50" /> &nbsp;&nbsp; 
<img src="https://0xchai.io/_next/image?url=%2Fstatic%2Fimages%2Fethersjs.png&w=3840&q=75" alt="Ethers.js" width="100" height="50" /> &nbsp;&nbsp; 
<img src="https://www.vectorlogo.zone/logos/leafletjs/leafletjs-ar21.svg" alt="Leaflet JS" width="110" height="50" /> &nbsp;
<img src="https://camo.githubusercontent.com/48d099290b4cb2d7937bcd96e8497cf1845b54a810a6432c70cf944b60b40c77/68747470733a2f2f7261776769742e636f6d2f676f72616e67616a69632f72656163742d69636f6e732f6d61737465722f72656163742d69636f6e732e737667" alt="React Icons" width="50" height="50" /> &nbsp;
<img src="https://bourhaouta.gallerycdn.vsassets.io/extensions/bourhaouta/tailwindshades/0.0.5/1592520164095/Microsoft.VisualStudio.Services.Icons.Default" alt="TailWind CSS" width="50" height="50" /> &nbsp;
<img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite" width="50" height="50" /> &nbsp;
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/ESLint_logo.svg/486px-ESLint_logo.svg.png?20211012234406" alt="ESLint" width="55" height="50" /> &nbsp;&nbsp; 

- **ReactJS** (Web Framework, combines HTML & JavaScript into one among other things)
- **Material UI** (A React Components Library, provides ready-2-go pre-styled components)
- **Framer Motion** (A React Library, that makes working with animations easier)
- **ethers.js** (A JS Library, that is required in order to connect the app with the blockchain)
- **Leaflet** (A JS Library, that creates Maps that are similar to Google Maps)
- **React Icons** (A huge collection of icons, that can be easily imported to a React application)
- **TailWind CSS** (A utility-first CSS framework packed with predefined classes that can be composed to build any design, directly in your markup)
- **Vite** (A modern front-end build tool that provides a faster and leaner development experience for modern web projects)
- **ESLint** (A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript code)
<br />

## Game's Purpose
The primary objective of our web browser game is to provide an engaging and educational platform for players to grasp the importance of transitioning to greener energy solutions.
<br />
<br />
By simulating real-world scenarios and presenting various renewable energy alternatives, this game aims to increase awareness of the environmental, economic, and social benefits of adopting clean energy sources over fossil fuels.
<br />
<br />
Through this interactive experience, we hope to inspire and empower individuals to make informed decisions and become advocates for a sustainable future.
<br />
<br />

## Gameplay
In the game, players assume the role of the mayor of a small town, their task is to increase the town’s residents by constructing buildings and powering them through renewable energy generators.

To create these structures, players must gather essential materials by assigning professions to the town’s people. Currently, four professions are available: accounting (which generates gold), concrete gathering, metals mining, and crystals harvesting.

Various buildings in the game offer unique benefits, effects or abilities, such as increasing resource gathering rates or resource conversion. However, these buildings need electricity to function, which can be found from renewable energy generators. Players must carefully manage their energy infrastructure to keep their town thriving.

A key element in the game is the living standards score, which represents the growth rate of the town's population. This score is inversely proportional to the population, meaning that as the number of residents increases, it becomes more challenging to grow the town further. Specialised buildings can help boost the living standards score, facilitating a sustainable population growth.
<br />
<br />

## Player's Goal (Reason to play the game)
The player’s ultimate goal is to earn MyGreenScore tokens, which behave as digital currency for the platform's eco-system. These tokens then can be redeemed for various goods and services depending on the player's real-world location.

To begin accumulating these tokens, players must first secure a position among the top 100 players of the game. In addition, the higher one is placed in the leaderboard, the greater the rewards become.

To increase engagement, a competitive element was inserted. Only the top 100 players will have the privilege of earning the MyGreenScore (MGS) crypto tokens. Futhermore, the higher one is placed in the leaderboard rankings, the greater the rewards are.
<br />
<br />

## Dev Space 👨‍💻
Following are some of the most important files in the project's directory.
1. **PlayerContext.jsx** (./src/context/playerContext/PlayerContext.jsx)
<br />  &nbsp;&nbsp;
In this file is where the most vital piece of code for any game resides, **The Game Loop**.
    - The Game Loop, is responsible for calculating the:
      - Player's stats
      - Gathering rates
      - Special effects' boosts & timers
      - Performs value checking (a simple anti-cheat system)
      - Buildings' and REGs' maintance costs
      - Update the Database, to keep the UI and the Database in sync
      
   Other important porcesses that take place here are:
      - New Player's Stats Initiation
      - The control of the sequence of the 4 steps required to load the app
      - The Creation of the 2 Smart Contract instances (created by ethers.js) to link the game with the blockchain
      
2. **Blockchain Related**
<br />  &nbsp;&nbsp;
There are 4 places in this project related with the Web3 Cosmos (Blockchain)
- **useMetaMask.jsx** (./src/context/useMetaMask.jsx)
<br /> &nbsp;&nbsp;
This context provides the following functionality for the rest of the app to consume:

    - If there is a crypto wallet installed 
    - The wallet information (address, chainId, balance)
    - If the context has finished executing its code (used to control the app's code execution flow)
    - The "Connect Wallet" functionality
    - The "Switch Network" functionality
    - The "Add Network" functionality
    
- **useContract.jsx** (./src/hooks/useContract.jsx)
<br /> &nbsp;&nbsp;
This custom react hook simplifies the process of creating a Contract Instance through the ethers.js lib.
<br />
By providing the deployed contract's information (address and ABI) and the user's crypto wallet (provider)
<br />
It return a a function that can be used to initialize the contract's instace. 
In turn, this function returns the desired contract instace.
<br />
<br />
Let's see an example to better understand how it works.
<br />
<br />

```javascript
import React, { useState, useEffect } from from 'react';
// 0. Import useMetaMask hook, this one give us the user's provider among other things
import { useMetaMask } from '../useMetaMask.jsx';
// 1. Import the hook
import useContract from '../../hooks/useContract.jsx';
// 2. Import the contract details
import {
  contractAddress,
  contractABI,
} from '../../web3/constants/index.js';

// 3. Create a state variable to store the contract
const [contract, setContract] = useState(null);

// 4. We will explain these variables later
const { wallet, hasProvider, hasMetaMaskRun, provider } = useMetaMask();

// 5.1 call it, this is how all React hooks work AND
// 5.2 provide the contract details as args
const { initialize, isLoading } = useContract(
    provider,
    contractAddress,
    contractABI
  );
  
// 6. Probaly you want to use the "initialize" function inside a useEffect hook like this
useEffect(() => {
    /* 
    * if wallet detection code has finished running (hasMetaMaskRun) AND 
    * wallet is connected to the site (hasProvider) AND
    * wallet is on the correct network (wallet.chainId === 12345)
    */
    if (hasMetaMaskRun && hasProvider && wallet.chainId === 12345) {
      (async () => {
        try {
          console.log('Initializing Rewarding Contract Instance...');
          // 7.1 Initializing the contract and also waiting for it to finish
          const _contract = await initialize();
          // 7.2 Once its done, store it to the state variable
          setContract(_contract);
          console.log('✅ Contract Instance Completed!');
        } catch (error) {
          console.error('❌ From: (PlayerContext), useEffect: ', error);
        }
      })(); // This weird syntax is called IIFE (https://developer.mozilla.org/en-US/docs/Glossary/IIFE)
      // Now you have a contract variable and call its functions like methods. 
      // If the contract has a named "viewAllYourCard"
      // You can call it like this: await contract.viewAllYourCard()
      // Remember that all contract function calls are ASYNC!
      // So don't forget to add the "await" keyword if you need the returned data from the contract
      // before your code continues it's execution
```
<br />

- **useGameContract.jsx** (./src/hooks/useGameContract.jsx)
<br /> &nbsp;&nbsp;
Unlike the more generic useContract.jsx hook I just showed, this one is specifically for the GameManager Smart Contract.

The reason I didn't re-use the useContract.jsx was basically to present another possible way of achieving the some result.
<br />
The code is almost the same, the critical difference is that you can initialize this hook without providing args to it like this:

```javascript
  const { initialize: gameContractInit, isLoading: gameContractLoading } = useGameContract();
```
Depending on one's preferences this might look more readable and easier to understand.
<br />


3. **The rest of the vital code files**
<br />  &nbsp;&nbsp;
There are 4 more files that I believe are worth mentioning.
- **CardGrid.jsx** (./src/components/CardGrid/CardGrid.jsx)
<br /> &nbsp;&nbsp;
This one holds all the logic for all the possible options that appear inside the modal that opens when you click the "Craft" or "Inventory" Buttons.
<br />

- **CardActionMenu.jsx** (./src/components/CardOnMapManager/CardActionMenu.jsx)
<br /> &nbsp;&nbsp;
This is responsible for the the logic that resides on the modal that opens when you click an activated Card which is rendered on the Town Map.
<br />

- **TownHallActionMenu.jsx** (./src/components/CardOnMapManager/Buildings/TownHallActionMenu/TownHallActionMenu.jsx)
<br /> &nbsp;&nbsp;
Going deeper on the same directory we will discover the "TownHallActionMenu", this component hold the logic of the Default "Town Hall" Building. 
Even though this just a specific case of the above component, due to the fact that it contains a ton of code as it must perform numerous calculations, 
I believe is worth checking out.
<br />

- **Marketplace** (./src/marketplace)
<br /> &nbsp;&nbsp;
The last one I wish to mentions is the Marketplace. The intersting aspect about this one is the fact that it is literally a whole application embedded inside the Game application. Something like a nested app.
<br />
