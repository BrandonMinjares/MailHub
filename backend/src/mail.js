const {Pool} = require('pg');


const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});


// Taken from AuthenticatedBookExample
exports.getAll = async (req, res) => {
  let mailboxSelection = 'inbox';
  if (req.query.mailbox) {
    mailboxSelection = req.query.mailbox[0];
  }
  const select = `SELECT mailID, mail, opened FROM email M JOIN mailbox MB ` +
  `ON M.mailboxid = MB.mailboxid JOIN person P ON MB.userID = P.userID ` +
  `where P."data" ->>'email' = $1 AND MB.mailboxName = $2`;

  const query = {
    text: select,
    values: [req.user.email, mailboxSelection],
  };

  const {rows} = await pool.query(query);
  // console.log(rows);

  rows.sort((a, b) => (b.mail.sent > a.mail.sent) ? 1: -1);

  for (const row of rows) {
    const event = new Date(row.mail.sent);
    row.mail.sent = event.toLocaleString();
    // console.log(row.mail.sent.toLocaleString());
  }


  res.status(200).json(rows);
};

exports.getById = async (req, res) => {
  const selectMailbox = 'SELECT mailID, mail, opened FROM email ' +
  'WHERE mailID = $1';
  const query = {
    text: selectMailbox,
    values: [req.params.id],
  };

  const {rows} = await pool.query(query);

  for (const row of rows) {
    const event = new Date(row.mail.sent);
    row.mail.sent = event.toLocaleString();
  }

  if (rows.length === 0) {
    return res.status(404).send();
  }

  const updateOpened = 'Update email set opened = TRUE WHERE ' +
  'email.mailID = $1';

  const query2 = {
    text: updateOpened,
    values: [req.params.id],
  };

  await pool.query(query2);

  res.status(200).json(rows);
};

// Taken from AuthenticatedBookExample
exports.postEmail = async (req, res) => {
  const result = [];

  const date = new Date();

  const mail = {
    from: req.user.email,
    to: req.body.ReceiverEmail,
    subject: req.body.subject,
    content: req.body.body,
    sent: date.toISOString(),
  };

  const insertEmail =
  `insert into email (mailboxID, mail) values ` +
  `((select M.mailboxID from Mailbox M join Person P on M.userID = P.userID ` +
  `where M.mailboxName = 'inbox' and P."data" ->>'email' = $1), $2) ` +
  `RETURNING mailID, mail`;

  // need to check if email exists
  const query = {
    text: insertEmail,
    values: [req.body.ReceiverEmail, mail],
  };
  const {rows} = await pool.query(query);
  // console.log(rows);
  result.push(rows[0]);

  if (rows.length < 1) {
    return res.status(510).json('User does not exist');
  }

  const insertIntoSent =
  `insert into email (mailboxID, mail) values ` +
  `((select M.mailboxID from Mailbox M join Person P on M.userID = P.userID ` +
  `where M.mailboxName = 'sent' and P."data" ->>'email' = $1), $2) ` +
  `RETURNING mailID, mail`;

  const query2 = {
    text: insertIntoSent,
    values: [req.user.email, mail],
  };
  const insertReturn = await pool.query(query2);
  // console.log(insertReturn.rows);
  result.push(insertReturn.rows[0]);

  return res.status(200).json(result);
};

exports.trashEmail = async (req, res) => {
  const update = `update email ` +
  `set mailboxID = (select M.mailboxid from mailbox M join Person P `+
  `on M.userID = P.userID WHERE M.mailboxName = 'trash' and ` +
  `P."data" ->>'email' = $1) WHERE email.mailid = $2 RETURNING email`;

  // need to check if email exists
  const query = {
    text: update,
    values: [req.user.email, req.params.id],
  };

  const {rows} = await pool.query(query);
  res.status(200).json(rows);
};
/*
exports.putEmail = async (req, res) => {
  const update = `upday email ` +
  `set mailboxID = (select M.mailboxid from mailbox M join Person P `+
  `on M.userID = P.userID WHERE M.mailboxName = 'trash' and ` +
  `P."data" ->>'email' = $1) `;
  `WHERE email.mailid = $2`;

  // need to check if email exists
  const query = {
    text: update,
    values: [req.user.email, req.body.mailID],
  };

  const {rows} = await pool.query(query);
  console.log(rows);
};
*/

exports.searchEmail = async (req, res) => {
  console.log(req.query.search);
  const find = 'SELECT * FROM email e, person p WHERE '+
  `e."mail" ->>'content' like '%${req.query.search}%' `+
  `AND P."data" ->>'email' = $1`;

  const query = {
    text: find,
    values: [req.user.email],
  };

  const {rows} = await pool.query(query);
  res.status(200).json(rows);
};
