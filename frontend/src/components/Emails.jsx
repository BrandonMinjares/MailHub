import React, {useContext} from 'react';
import SharedContext from './SharedContext';
import {TableContainer, Table, TableHead, TableBody, TableRow,
  TableCell, Paper} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

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
      // setError('');
      setMail(json);
    })
    .catch((error) => {
      setMail([]);
      // setError(`${error.status} - ${error.statusText}`);
    });
};

/**
 * @return {void}
 */
export default function Emails() {
  const {mailbox, mail, setMail} = useContext(SharedContext);
  React.useEffect(() => {
    fetchMail(mailbox, setMail);
    // nothing in array, it will only run once
  }, [mailbox, setMail]);

  return (
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
              onClick={() => console.log(row.mailid)}
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
              <TableCell align="right">{row.mail.content}</TableCell>
              <TableCell align="right">{row.mail.sent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
