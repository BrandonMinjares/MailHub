import * as React from 'react';


const fetchMail = (mailbox, setMail) => {
  const item = localStorage.getItem('user');
  if (!item) {
    return;
  }
  const user = JSON.parse(item);
  const bearerToken = user ? user.accessToken : '';
  fetch(`http://localhost:3010/v0/email?mailbox=${mailbox}`, {
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
 * @param {Object} props
 * @return {void}
 */
export default function Dashboard(props) {
  const {mail, setMail, mailbox} = props.values;

  React.useEffect(() => {
    fetchMail(mailbox, setMail);
  }, [mailbox]);

  return (
    <div>
      {mailbox}
      {Array.isArray(mail) ?
        mail.map((row) => (
          <div key={row.mailid}>
            <h2>{row.mail.subject}</h2>
            <p>{row.mail.from}</p>
            <p>{row.mail.content}</p>
            <hr/>
          </div>
        )):
        null}
    </div>
  );
}
