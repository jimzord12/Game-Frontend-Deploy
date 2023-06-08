/* eslint-disable react/function-component-definition */
import { useState } from 'react';
import { Box, SpeedDial, SpeedDialIcon, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
// import './styles.css';

// import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
// import SaveIcon from '@mui/icons-material/Save';
// import PrintIcon from '@mui/icons-material/Print';
// import ShareIcon from '@mui/icons-material/Share';

// import WindPowerIcon from '@mui/icons-material/WindPower';

import StoreIcon from '@mui/icons-material/Store';

// import ConstructionIcon from '@mui/icons-material/Construction'; //Craft Icon Good
import HandymanIcon from '@mui/icons-material/Handyman'; //Craft Icon Good

// import ContentCopyIcon from '@mui/icons-material/ContentCopy'; //Inv Icon Meh
// import WalletIcon from '@mui/icons-material/Wallet';
import WebStoriesIcon from '@mui/icons-material/WebStories';

import GpsFixedIcon from '@mui/icons-material/GpsFixed'; //Maps Icon Good
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const actions = [
  { icon: <HandymanIcon />, name: 'Craft' },
  { icon: <StoreIcon />, name: 'Marketplace' },
  { icon: <WebStoriesIcon />, name: 'Inventory' },
  { icon: <GpsFixedIcon />, name: 'Maps' },
  { icon: <EmojiEventsIcon />, name: 'Leaderboard' },
];

export default function ControlledOpenSpeedDial({
  // setIsInventoryOpen,
  setIsInvModalOpen,
  // isInvModalOpen,
  setIsCraftModalOpen,
}) {
  const [open, setOpen] = useState(false); //@NOTE: Make this FALSE
  const mediaQueryMax1920 = useMediaQuery('(min-width:1920px)');
  const mediaQueryMax900 = useMediaQuery('(min-width:900px)');
  // console.log('Media Query Max 1920: ', mediaQueryMax1920);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(!open);
  const handleAction = (actionName) => {
    if (actionName === 'Inventory') {
      // setIsInventoryOpen(true);
      setIsInvModalOpen(true);
      setIsCraftModalOpen(false);
      // console.log('Modal should Open!', isInvModalOpen);
    } else {
      // console.log(actionName);
    }

    if (actionName === 'Craft') {
      // setIsInventoryOpen(true);
      setIsInvModalOpen(false);
      setIsCraftModalOpen(true);
      // console.log('Modal should Open!', isInvModalOpen);
    } else {
      // console.log(actionName);
    }

    if (actionName === 'Maps') {
      navigate('/battleground');
    } else {
      // console.log(actionName);
    }

    if (actionName === 'Leaderboard') {
      // cb(true);
      navigate('/leaderboard');
    } else {
      console.log(actionName);
    }

    if (actionName === 'Marketplace') {
      // cb(true);
      navigate('/marketplace');
    } else {
      console.log(actionName);
    }
  };
  //   const handleOpen = () => setOpen(true);
  //   const handleClose = () =>
  //     setTimeout(() => {
  //       setOpen(false);
  //     }, 2500);

  return (
    <Box
      className="invisibleScrollbars"
      sx={{
        display: mediaQueryMax900 ? 'none' : 'block',
        position: 'fixed',
        right: mediaQueryMax1920 ? '48px' : '16px',
        bottom: mediaQueryMax1920 ? '24px' : '16px',
        zIndex: 1,
        // height: 320,
        transform: 'translateZ(0px)',

        // flexGrow: 1,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        // sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        // onClose={handleClose}
        // onOpen={handleOpen}
        onClick={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleAction(action.name)}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
