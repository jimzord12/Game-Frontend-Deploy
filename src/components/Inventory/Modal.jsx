import {
  Modal,
  Box,
  Button,
  Typography,
  Stack,
  Divider,
  Rating,
  // Paper,
  // styled,
} from '@mui/material';
import { useEffect } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Draggable from "react-draggable";
import { blackSolus } from '../../assets';
import Building from '../../models/Classes/classBuilding';

// const BlurryDialog = styled(Dialog)(() => ({
//   backdropFilter: "blur(12px)",
// }));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: 'fit-content',
  maxHeight: '80%',
  bgcolor: 'green',
  color: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const cardStyles = {
  width: '400px',
  //   height: "10%",
  //   backgroundColor: "green",
  padding: '20px',
  //   borderRightWidth: "20px",
  backgroundColor: 'green',
  marginRight: 32,
};

// const PaperComponent = (props) => {
//   return (
//     <Draggable
//       handle="#draggable-dialog-title"
//       cancel={'[class*="MuiDialogContent-root"]'}
//     >
//       <Paper {...props} />
//     </Draggable>
//   );
// };

function MuiModal({ props, playerData }) {
  //   const [open, setOpen] = useState(false);
  const { setIsInventoryOpen, isInventoryOpen } = props;
  //   const handleOpen = () => setIsInventoryOpen(true);
  const handleClose = () => setIsInventoryOpen(false);

  const { stats, resources, setters } = playerData;

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

  const handleCraft = () => {
    const testProps = {
      type: 'Building',
      img: 'an image',
      id: 1,
      name: 'Card Name1',
    };
    const testBuilding = new Building(testProps);

    console.log(`The Craft Button was Clicked!`);
    const wasCrafted = testBuilding.craft({ name: 'Elon Musk' });
    if (wasCrafted) {
      setters.setGold('-500 😁');
      console.log(
        `Elon Must, has successfully invested all his money in this NFT Card!`
      );
    } else {
      console.log(`Not enough Moneyyy...!`);
    }
  };

  return (
    <Box>
      <Modal
        open={isInventoryOpen}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
        aria-describedby="modal-modal-description"
        // slots={PaperComponent}
      >
        <Box sx={style}>
          <Stack
            direction="row"
            spacing={4}
            /* divider={
                <Divider
                  sx={{ borderBottomWidth: 3, backgroundColor: "white" }}
                />
              } */
            justifyContent="space-between"
          >
            <img src={blackSolus} alt="aaaaaa" style={cardStyles} />
            <Stack sx={{ flexGrow: '1' }}>
              <Typography
                id="draggable-dialog-title"
                variant="h6"
                component="h2"
                align="right"
                gutterBottom
                sx={{ borderBottom: 2, borderRight: 2, paddingRight: 2 }}
              >
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Card's Title goes here
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Here will be the:
              </Typography>
              <Divider sx={{ borderBottomWidth: 5, mt: 2 }} />
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                // align="center"
              >
                <Rating
                  value={3}
                  //   onChange={handleChange}
                  precision={1}
                  size="large"
                  icon={<FavoriteIcon fontSize="inherit" color="error" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                  readOnly
                />
                {`    1.   The Card's Level`}{' '}
              </Typography>{' '}
              <Divider sx={{ borderBottomWidth: 5, mt: 2 }} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                2. Stats
              </Typography>{' '}
              <Divider sx={{ borderBottomWidth: 5, mt: 2 }} />
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                3. etc...
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" spacing={4}>
            <Button
              variant="contained"
              orientation="vertical"
              size="medium"
              color="secondary"
              onClick={handleCraft}
            >
              Carft
            </Button>
            <Button
              variant="contained"
              orientation="vertical"
              size="medium"
              color="primary"
              onClick={() => console.log('Adding Card to Marketplace...')}
            >
              Sell
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default MuiModal;
