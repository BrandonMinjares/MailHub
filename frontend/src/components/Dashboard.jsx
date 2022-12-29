
import React, {useState} from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import MailOutlineIcon from '@mui/icons-material/MailOutline';

import SideBar from './SideBar';
import Emails from './Emails';
import '../styles.css';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer,
  {shouldForwardProp: (prop) => prop !== 'open'})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

/**
 * @return {void}
 */
export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [composeOpen, setComposeOpen] = React.useState(false);
  const handleClickOpen = () => {
    setComposeOpen(true);
  };

  const handleClose = () => {
    setComposeOpen(false);
  };


  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const handleToChange = (e) => {
    setTo(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };

  const handleEmailBodyChange = (e) => {
    setEmailBody(e.target.value);
  };

  const composeEmail = () => {
    const emailToPost = {
      'ReceiverEmail': to,
      'subject': subject,
      'body': emailBody,
    };

    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';

    fetch('http://localhost:3010/v0/email', {
      method: 'POST',
      body: JSON.stringify(emailToPost),
      headers: {
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Dialog open={composeOpen} onClose={handleClose}
        fullWidth={ true } maxWidth={'md'}>
        <DialogTitle>Compose</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="To"
            type="email"
            fullWidth
            variant="standard"
            value={to}
            onChange={handleToChange}
            aria-label='sentEmail'

          />
          <TextField
            margin="dense"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            variant="standard"
            value={subject}
            onChange={handleSubjectChange}
            aria-label='sentSubject'
          />
          <TextField
            margin="dense"
            id="body"
            label="Body"
            type="text"
            fullWidth
            variant="standard"
            value={emailBody}
            onChange={handleEmailBodyChange}
            aria-label='sentBody'
          />
        </DialogContent>
        <DialogActions>
          <Button aria-label="cancelComposeEmail"
            onClick={handleClose}>Cancel</Button>
          <Button aria-label="composeEmailMsg"

            onClick={(event) => {
              composeEmail();
              handleClose();
            }}>Send</Button>
        </DialogActions>
      </Dialog>

      <ThemeProvider theme={mdTheme}>
        <Box sx={{display: 'flex'}}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="openDrawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && {display: 'none'}),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{flexGrow: 1}}
              >
              </Typography>

              <IconButton color="inherit"
                onClick={handleClickOpen}
                aria-label='openCompose'
              >
                <MailOutlineIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}
                aria-label='toggleDrawer'
              >
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>

            <List component="nav">
              <SideBar />
              <Divider sx={{my: 1}} />
            </List>

          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'? theme.palette.grey[100] :
                  theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
              <Grid container spacing={3}>
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                    <Emails />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </div>
  );
}
