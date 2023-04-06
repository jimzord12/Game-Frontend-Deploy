import React, { useEffect } from 'react';
import {
  AppBar,
  Typography,
  Stack,
  Divider,
  Box,
  Container,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import LocalAtmRoundedIcon from '@mui/icons-material/LocalAtmRounded';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import BoltIcon from '@mui/icons-material/Bolt';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AppleIcon from '@mui/icons-material/Apple';
import BuildIcon from '@mui/icons-material/Build';

function MuiNavbar(playerData) {
  // console.log(resources.stats.gold);
  const { playerData: playerData1 } = playerData;
  const { stats, resources, setters } = playerData1;
  // const small = useMediaQuery('(min-width:375px)'); // Once the width get 374 or lower, this var becomes true
  // const 12px = useMediaQuery('(min-width:495px)');
  // const large = useMediaQuery('(min-width:875px)');
  // const xLarge = useMediaQuery('(min-width:1275px)');

  useEffect(() => {
    console.log(stats, resources, setters);
    setters.setGold(5000);
    setters.setPopulation(375);
    setters.setEnergy(562);
    setters.setRanking(25);
    setters.setMetals(1346);
    setters.setConcrete(12344);
    setters.setCrystals(578);
  }, []);
  return (
    <AppBar
      sx={{
        width: '100%',
        backgroundColor: 'green',
        position: 'absolute',
        left: '0',
        border: '2mm ridge rgba(211, 220, 50, .6);',
      }}
    >
      {/* <IconButton
          size="12px"
          edge="start"
          color="inherit"
          aria-label="logo"
          sx={{ marginRight: "25px" }}
        >
          <CatchingPokemonIcon fontSize="12px" />
        </IconButton> */}

      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 1 }}
        justifyContent="space-evenly"
      >
        {/* <IconButton
                size="12px"
                edge="start"
                color="inherit"
                aria-label="logo"

                // sx={{ marginRight: "25px" }}
              > */}
        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <LocalAtmRoundedIcon fontSize="12px" disabled />
          <Typography
            variant="h6"
            component="div"
            aria-label="text-gold"
            sx={{ ml: 2 }}
          >
            {stats.gold}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 5, bgcolor: 'white' }}
        />
        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <AccessibilityNewIcon fontSize="12px" disabled />

          <Typography
            variant="h6"
            component="div"
            aria-label="text-population"
            sx={{ ml: 2 }}
          >
            {stats.population}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 5, bgcolor: 'white' }}
        />

        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <BoltIcon fontSize="12px" disabled />

          <Typography
            variant="h6"
            component="div"
            aria-label="text-energy"
            sx={{ ml: 2 }}
          >
            {stats.energy}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 5, bgcolor: 'white' }}
        />

        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <EmojiEventsIcon fontSize="12px" disabled />

          <Typography
            variant="h6"
            component="div"
            aria-label="text-ranking"
            sx={{ ml: 2 }}
          >
            #{stats.ranking}
          </Typography>
        </Box>
      </Stack>

      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 1 }}
        justifyContent="space-evenly"
      >
        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <BiotechOutlinedIcon fontSize="12px" disabled />
          <Typography
            variant="h6"
            component="div"
            aria-label="text-concrete"
            sx={{ ml: 2 }}
          >
            {resources.concrete}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 5, bgcolor: 'white' }}
        />

        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <AppleIcon fontSize="12px" disabled />
          <Typography
            variant="h6"
            component="div"
            aria-label="text-metals"
            sx={{ ml: 2 }}
          >
            {resources.metals}
          </Typography>
        </Box>
        <Divider
          orientation="vertical"
          flexItem
          sx={{ borderRightWidth: 5, bgcolor: 'white' }}
        />

        <Box
          direction="row"
          spacing={1}
          sx={{ display: 'flex' }}
          alignItems="center"
        >
          <BuildIcon fontSize="12px" disabled />
          <Typography
            variant="h6"
            component="div"
            aria-label="text-crystals"
            sx={{ ml: 2 }}
          >
            {resources.crystals}
          </Typography>
        </Box>
      </Stack>
    </AppBar>
  );
}

export default MuiNavbar;
