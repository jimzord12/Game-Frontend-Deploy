/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  // Rating,
  styled,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect } from 'react';
import { blackSolus } from '../../assets';
// import Building from "../utils/Classes/classBuilding.js";
import InventoryModalList from './InventoryModalList';
import { bgcolor } from '@mui/system';
// import { useState } from "react"

function PaperComponent(props) {
  console.log(props);
  props = { ...props };
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const cardStyles = {
  width: '400px',
  //   height: "10%",
  //   backgroundColor: "green",
  padding: '20px',
  //   borderRightWidth: "20px",
  backgroundColor: 'green',
  marginRight: 32,
};

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%",
//   height: "fit-content",
//   maxHeight: "80%",
//   bgcolor: "green",
//   color: "white",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const BlurryDialog = styled(Dialog)(() => ({
  backdropFilter: 'blur(12px)',
}));

function LabDraggableModal({ props, playerData }) {
  const { setIsInventoryOpen, isInventoryOpen } = props;
  const { stats, resources, setters } = playerData;
  const handleClose = () => setIsInventoryOpen(false);

  useEffect(() => {
    console.log(stats, resources, setters);
    setters.setGold(999999999);
    setters.setPopulation(375);
    setters.setEnergy(562);
    setters.setRanking(25);
    setters.setMetals(1346);
    setters.setConcrete(3211);
    setters.setCrystals(578);
  }, []);

  // const handleCraft = () => {
  //   const testProps = {
  //     type: "Building",
  //     img: "an image",
  //     id: 1,
  //     name: "Card Name1",
  //   };
  //   const testBuilding = new Building(testProps);

  //   console.log(`The Craft Button was Clicked!`);
  //   const wasCrafted = testBuilding.craft({ name: "Elon Musk" });
  //   if (wasCrafted) {
  //     setters.setGold("-500 😁");
  //     console.log(
  //       `Elon Must, has successfully invested all his money in this NFT Card!`
  //     );
  //   } else {
  //     console.log(`Not enough Moneyyy...!`);
  //   }
  // };

  return (
    <Box sx={{ bgcolor: 'green' }}>
      <BlurryDialog
        // TODO:open={true}
        open={isInventoryOpen}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        // sx={{ width: "100%" }}
        maxWidth="xl"
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          sx={{ bgcolor: 'green', color: 'white' }}
          id="draggable-dialog-title"
        >
          Inventory
        </DialogTitle>
        <Stack
          direction="row"
          sx={{ diplay: 'flex', width: 'fit-content', bgcolor: 'green' }}
        >
          {/* <img src={blackSolus} alt="aaaaaa" style={cardStyles} /> */}
          {/* <DialogContent sx={{ bgcolor: 'green' }}>
            <DialogContentText sx={{ color: 'white' }}>
              <InventoryModalList />
            </DialogContentText>
          </DialogContent> */}
          <Box>
            <Typography variant="h5" sx={{ bgcolor: 'green', color: 'white' }}>
              Filters
            </Typography>
          </Box>
        </Stack>
        <DialogActions sx={{ bgcolor: 'green', p: 4 }}>
          <Button
            autoFocus
            variant="contained"
            onClick={() => setIsInventoryOpen(false)}
            sx={{ color: 'white' }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => setIsInventoryOpen(false)}
            sx={{ color: 'white' }}
          >
            Subscribe
          </Button>
        </DialogActions>
      </BlurryDialog>
    </Box>
  );
}

export default LabDraggableModal;
