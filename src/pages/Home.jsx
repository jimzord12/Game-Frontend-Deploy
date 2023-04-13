import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton, CustomInput } from '../components/SimpleCustom';
import PageHOC from '../components/PageHOC';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';

import { useMediaQuery } from '@mui/material';
import axios from '../../api/api';
// import { usePlayerContext } from '../context/playerContext/PlayerContext';
import { usePlayerContext } from '../context/playerContext/PlayerContext.jsx';

// import { useGlobalContext } from '../context';
const LOGIN_URL = '/authNoPwd';
const CREATE_PL_URL = 'register/player';
const walletRegex = /(0x[a-fA-F0-9]{40})/;
const usernameRegex = /([a-zA-Z][a-zA-Z0-9 ]{0,15})/;

export function Home() {
  // const { setShowAlert, setErrorMessage } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');
  const [initComplete, setInitComplete] = useState(false);
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  const { setPlayerToFetch, setAccessToken } = usePlayerContext();

  const [user, resetUser, userAttribs] = useInput('user', '');
  const [wallet, resetWallet, walletAttribs] = useInput('wallet', '');
  const [errMsg, setErrMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isNameTaken, setIsNameTaken] = useState(false);

  const smallDev = useMediaQuery('(max-width: 640px)');

  const handlePlayerLogin = async (e) => {
    e.preventDefault();
    console.log('Home::UserName: ', user);
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ name: user }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.aT;
      // const roles = response?.data?.roles;
      console.log('🤩 Got A-JWT from Web Server! Yay! 🤩');
      console.log('Access Token: ', accessToken);
      setAccessToken(accessToken);
      setAuth((prev) => {
        return { user, accessToken, ...prev };
      });
      resetUser(); // Cleaning the memory for security
      resetWallet(); // Cleaning the memory for security
      // setPwd(''); // Cleaning the memory for security
      setInitComplete(true);
      setPlayerToFetch(user);

      // Error Handling, based on the error
    } catch (err) {
      console.error('Response Error from Server: ', err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  const handlePlayerCreate = async (e) => {
    if (!usernameRegex.test(user)) {
      setErrMsg(
        'The player name must begin with a letter, not exceed 16 characters and can contain only letters, numbers and spaces'
      );
      return;
    }

    if (!walletRegex.test(wallet)) {
      setErrMsg(
        'The wallet address must begin with "0x", have a length of 40 characters'
      );
      return;
    }
    e.preventDefault();
    console.log('Home::Wallet: ', wallet);
    try {
      const response = await axios.post(
        CREATE_PL_URL,
        JSON.stringify({ name: user, wallet }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      if (response?.status === 201) {
        console.log(response);
        resetUser(); // Cleaning the memory for security
        resetWallet(); // Cleaning the memory for security
        setSuccessMsg(
          `Your Account has been created! 🥳 Login to start playing!`
        );
      }
      // const accessToken = response?.data?.aT;
      // const roles = response?.data?.roles;
      // console.log('🤩 Got A-JWT from Web Server! Yay! 🤩');
      // console.log('Access Token: ', accessToken);
      // setAuth((prev) => {
      //   return { user, accessToken, ...prev };
      // });

      // setPwd(''); // Cleaning the memory for security
      // if (!isNewPlayer) {
      //   setInitComplete(true);
      //   setPlayerToFetch(user);
      // } else {
      //   // Clicked the Create Player button
      // if (response.statusText === 'OK') setErrMsg('Username already exists!');
      // console.log('RESPONSE: ', response);
      // }

      // Error Handling, based on the error
    } catch (err) {
      console.error('Response Error from Server: ', err);
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.data?.errno === 1062) {
        console.error('DUPLICATES!!');
        setErrMsg('Name or Wallet already exists!');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Wallet');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
    }
  };

  useEffect(() => {
    setErrMsg(''); // Make the error disappear, when the user tries to fix it
    // setSuccessMsg(''); // Make the error disappear, when the user tries to fix it
  }, [user, wallet]);

  useEffect(() => {
    if (initComplete && auth.user) {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
      console.log(auth.user);
      navigate('/battle/');
    }
  }, [initComplete]);
  /*
  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if (!playerExists) {
        await contract.registerPlayer(playerName, playerName, {
          gasLimit: 500000,
        });

        setShowAlert({
          status: true,
          type: 'info',
          message: `${playerName} is being summoned!`,
        });

        setTimeout(() => navigate('/create-battle'), 8000);
      }
    } catch (error) {
      setErrorMessage(error);
    }
  };
    */

  // Checks if Player exists in DB
  // useEffect(() => {}, []);
  const offscreenStyles = {
    position: 'absolute',
    left: '-9999px',
  };

  const errorStyles = {
    backgroundColor: 'lightpink',
    maxWidth: smallDev ? '100%' : '50%',
    borderRadius: '6px',
    color: 'red',
    fontWeight: 'bold',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  };

  const successStyles = {
    backgroundColor: 'lightgreen',
    maxWidth: smallDev ? '100%' : '50%',
    borderRadius: '6px',
    color: 'green',
    fontWeight: 'bold',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  };

  return (
    <div className="flex flex-col">
      <p
        // ref={errRef}
        // className={errMsg ? 'errmsg' : 'offscreen'}
        // aria-live="assertive"
        style={errMsg ? errorStyles : offscreenStyles}
      >
        {errMsg}
      </p>

      <p
        // ref={errRef}
        // className={errMsg ? 'errmsg' : 'offscreen'}
        // aria-live="assertive"
        style={successMsg ? successStyles : offscreenStyles}
      >
        Your Account has been created!
        <br /> Login to start playing! 🥳
        <br /> - (1) Enter only your Player Name
        <br /> {`- (2) Click "Log in"`}
      </p>

      <CustomInput
        label="Player Name"
        placeHolder="Enter your player name"
        Attribs={userAttribs}
      />

      <CustomInput
        label="Wallet Address"
        placeHolder="Enter your wallet address"
        Attribs={walletAttribs}
      />

      <div className="flex flex-col">
        <div className="flex gap-6">
          <CustomButton
            title="Log in"
            handleClick={handlePlayerLogin}
            restStyles="mt-6 w-fit"
          />
          <h4 className="text-white font-semibold text-3xl self-center mt-4">
            OR
          </h4>
        </div>

        <CustomButton
          title="Create Player"
          handleClick={handlePlayerCreate}
          restStyles="mt-6 w-fit"
        />
      </div>
    </div>
  );
}
// export default Home;

export default PageHOC(
  Home,
  <>
    {"Welcome to GENERA's"} <br /> Energy Transition Card Game
  </>,
  <>
    Connect your wallet to start playing <br />
    {`To Login, enter your Player Name and click "Log in"`} <br />
  </>
);
