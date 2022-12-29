import React, {useContext} from 'react';
import SharedContext from './SharedContext';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import InboxIcon from '@mui/icons-material/Inbox';

/**
 * @return {void}
 */
export default function SideBar() {
  const {setMailbox} = useContext(SharedContext);

  /**
   * @return {void}
   */
  function logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:3000/#/login';
  }

  return (
    <div>
      <div>
        <ListItemButton
          onClick={() => setMailbox('inbox')}
          aria-label='inbox'
        >
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItemButton>
        <ListItemButton
          onClick={() => setMailbox('sent')}
          aria-label='sent'
        >
          <ListItemIcon>
            <ArrowForwardIcon />
          </ListItemIcon>
          <ListItemText primary="Sent" />
        </ListItemButton>

        <ListItemButton
          onClick={() => setMailbox('trash')}
          aria-label='trash'
        >
          <ListItemIcon>
            <DeleteOutlineIcon />
          </ListItemIcon>
          <ListItemText primary="Trash" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="New Mailbox" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <SettingsApplicationsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItemButton>
        <ListItemButton
          onClick={logout}
          aria-label='logout'
        >
          <ListItemIcon>
            <SettingsApplicationsIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </div>
    </div>
  );
}
