import React, {useContext} from 'react';
import SharedContext from './SharedContext';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../styles.css';


/**
 * @return {void}
 */
export default function NavBar() {
  const {setMail, setMailbox} = useContext(SharedContext);

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
    const searchEmail = data.get('search');

    fetch(`http://localhost:3010/v0/results?search=${searchEmail}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
      }),
    })
      .then((res) => {
        if (!res.ok) throw res;
        return res.json();
      })
      .then((json) => {
        setMail(json);
        setMailbox('');
      });
  };
  return (
    <div>
      <Box component="form" onSubmit={handleSubmit}
        noValidate>
        <TextField
          InputLabelProps={{shrink: false}}
          margin="normal"
          required
          id="search"
          placeholder="Search in mail"
          name="search"
          aria-label='Search'
          sx={{width: {sm: 200, md: 800}, backgroundColor: 'white'}}
        />
        <Button
          type="submit"
          aria-label='Log In'
          variant="contained"
          sx={{mt: 3, mb: 2, bgcolor: 'white',
            color: 'black', marginRight: '290px', marginLeft: '20px',
          }}
        >
              Search
        </Button>
      </Box>
    </div>
  );
}
