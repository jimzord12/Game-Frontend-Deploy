import {
  List,
  ListItem,
  ListItemText,
  //   ListItemButton,
  ListItemIcon,
  Divider,
  //   ListItemAvatar,
  //   Avatar,
  Box,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

const InventoryModalList = () => {
  return (
    <Box sx={{ width: "800px", maxWidth: 360, bgcolor: "inherit" }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="List item 1" />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );
};

export default InventoryModalList;
