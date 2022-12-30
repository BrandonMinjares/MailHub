import React, {useContext, useState} from 'react';
import SharedContext from './SharedContext';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import {TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, Paper} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const fetchMail = (mailbox, setMail) => {
  if (mailbox === '') return;
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/email?mailbox=` + mailbox, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('notok');
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      // setError('');
      setMail(json);
    })
    .catch((error) => {
      setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

const fetchMailById = (id, setMailID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/email/${id}`, {
    method: 'get',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('notok');
        throw response;
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);

      setMailID(json);
    })
    .catch((error) => {
      // setMailID([]);
    });
};

const trashEmailById = (id, setMailID) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/email/${id}`, {
    method: 'put',
    headers: new Headers({
      'Authorization': `Bearer ${bearerToken}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('notok');
        throw response;
      }
      console.log(response);
      return response.json();
    })
    .then((json) => {
      setMailID([]);
      console.log(json);
    })
    .catch((error) => {
      setMailID([]);
    });
};

/**
 * @return {void}
 */
export default function Emails() {
  const {mailbox, mail, setMail} = useContext(SharedContext);
  const [mails, setMailID] = React.useState([]);

  const [composeOpen, setComposeOpen] = React.useState(false);
  const handleClickOpen = () => {
    setComposeOpen(true);
  };

  const handleClose = () => {
    setComposeOpen(false);
  };
  const [isShown, setIsShown] = useState(false);

  const handleShow = () => {
    // 👇️ toggle shown state
    setIsShown(true);
  };

  const handleShowCancel = () => {
    // 👇️ toggle shown state
    setIsShown(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = localStorage.getItem('user');
    if (!item) {
      return;
    }
    const user = JSON.parse(item);
    const bearerToken = user ? user.accessToken : '';
    const data = new FormData(event.currentTarget);
    // console.log(mail[0].mail);
    const emailToPost = {
      'ReceiverEmail': mail[0].mail.from,
      'subject': mail[0].mail.subject,
      'body': data.get('body'),
    };
    fetch('http://localhost:3010/v0/email', {
      method: 'POST',
      body: JSON.stringify(emailToPost),
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })

      .catch((err) => {
        // (`${err.status} - ${err.statusText}`);
      });
  };

  React.useEffect(() => {
    fetchMail(mailbox, setMail);
    // nothing in array, it will only run once
  }, [mailbox, setMail]);

  return (
    <div>
      <Dialog open={composeOpen} onClose={handleClose}
        fullWidth={ true } maxWidth={'md'}>
        <DialogContent>
          <DeleteIcon onClick={() => {
            trashEmailById(mails[0].mailid, setMailID);
            handleClose();
          }}></DeleteIcon>
          {Array.isArray(mails) ?
            mails.map((row) => (
              <div key={row.mailid}>
                <p>{row.mail.subject}</p>
                <p>{row.mail.from}</p>
                <p>{row.mail.content}</p>
                {!isShown && (
                  <Button onClick={handleShow}
                    variant="outlined">Reply
                  </Button>
                )}
                <hr/>
                {isShown && (
                  <Box component="form" noValidate
                    onSubmit={() => {
                      handleSubmit();
                      handleClose();
                    }}
                    sx={{mt: 3}}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          autoComplete="given-name"
                          name="body"
                          id="body"
                          autoFocus
                          aria-label='Body'
                          multiline
                          rows={5}
                          fullWidth
                        />
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      aria-label='Sign Up'
                      variant="contained"
                      sx={{mt: 3, mb: 2}}
                    >
              Reply
                    </Button>
                  </Box>
                )}
              </div>
            )):
            null}
        </DialogContent>
        <DialogActions>
          <Button aria-label="cancelComposeEmail"
            onClick={() => {
              handleClose();
              handleShowCancel();
            }
            }>
              Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  inputProps={{
                    'aria-label': 'select all desserts',
                  }}
                />
              </TableCell>
              <TableCell align="right">From</TableCell>
              <TableCell align="right">Subject</TableCell>
              <TableCell align="right">Content</TableCell>
              <TableCell align="right">Sent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mail.map((row) => (
              <TableRow
                onClick={() => {
                  fetchMailById(row.mailid, setMailID);
                  handleClickOpen();
                }}
                key={row.mailid}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell key={row.mailid} padding="checkbox">
                  <Checkbox
                    color="primary"
                    inputProps={{
                      'aria-label': 'select all desserts',
                    }}
                  />
                </TableCell>
                <TableCell align="right">{row.mail.from}</TableCell>
                <TableCell align="right">{row.mail.subject}</TableCell>
                <TableCell align="right">{row.mail.content.substring(0, 10)}
                </TableCell>
                <TableCell align="right">{row.mail.sent}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
