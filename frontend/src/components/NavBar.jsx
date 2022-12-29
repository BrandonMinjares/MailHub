import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/**
 * @return {void}
 */
export default function NavBar() {
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
        // setMail(json);
      });
  };
  return (
    <div>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="search"
          label="search"
          name="search"
          autoComplete="search"
          autoFocus
          aria-label='Search'
        />
        <Button
          type="submit"
          aria-label='Log In'
          fullWidth
          variant="contained"
          sx={{mt: 3, mb: 2}}
        >
              Log In
        </Button>
      </Box>
    </div>
  );
}
