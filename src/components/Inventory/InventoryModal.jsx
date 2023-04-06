import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  styled,
  Stack,
  Box,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { blackSolus } from '../assets';
import InventoryModalList from './InventoryModalList';
// import { useState } from "react"

function PaperComponent(props) {
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
  width: '300px',
  height: '10%',
  backgroundColor: 'green',
  padding: '20px',
  borderRightWidth: '5px',
};

const BlurryDialog = styled(Dialog)(() => ({
  backdropFilter: 'blur(12px)',
}));
function InventoryModal({ props }) {
  const { setIsInventoryOpen, isInventoryOpen } = props;
  return (
    <Box>
      <BlurryDialog
        open={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        // sx={{ width: "100%" }}
        maxWidth="xl"
        border
      >
        <DialogTitle
          style={{ cursor: 'move' }}
          sx={{ bgcolor: 'green', color: 'white' }}
          id="draggable-dialog-title"
        >
          Inventory
        </DialogTitle>
        <Stack direction="row" sx={{ diplay: 'flex', width: 'fit-content' }}>
          <img src={blackSolus} alt="aaaaaa" style={cardStyles} />
          <DialogContent sx={{ bgcolor: 'green', color: 'white' }}>
            <DialogContentText sx={{ color: 'white' }}>
              <InventoryModalList />
            </DialogContentText>
          </DialogContent>
        </Stack>
        <DialogActions sx={{ bgcolor: 'green', p: 4 }}>
          <Button
            autoFocus
            onClick={() => setIsInventoryOpen(false)}
            sx={{ color: 'white' }}
          >
            Cancel
          </Button>
          <Button
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

export default InventoryModal;
