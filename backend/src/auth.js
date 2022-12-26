const {Pool} = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secrets = require('../data/secrets');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

// Taken from AuthenticatedBookExample
exports.login = async (req, res) => {
  const {email, password} = req.body;

  const select = `SELECT data FROM Person WHERE data->>'email' = $1`;
  const query = {
    text: select,
    values: [email],
  };

  const {rows} = await pool.query(query);
  if (rows.length == 0) {
    return res.status(401).send('Invalid credentials or user does not exist');
  }
  // check if email exists and passwords are same
  if (bcrypt.compareSync(password, rows[0].data.password)) {
    const accessToken = jwt.sign(
      {email: email},
      secrets.accessToken, {
        expiresIn: '30m',
        algorithm: 'HS256',
      });
    res.status(200).json({email: email, accessToken: accessToken});
  } else {
    res.status(401).send('Invalid credentials or user does not exist');
  }
};

exports.register = async (req, res) => {
  // Check if User with that email already exists
  const checkEmail =
  `SELECT userID, data FROM Person WHERE data->>'email' = $1`;
  const emailQuery = {
    text: checkEmail,
    values: [req.body.email],
  };
  const {rows} = await pool.query(emailQuery);
  if (rows.length != 0) {
    return res.status(403)
      .json('Password is incorrect or user with that email already exists');
  }

  // Encrypt password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    name: {first: req.body.name.first, last: req.body.name.last},
    email: req.body.email,
    password: hashedPassword,
  };

  const insert = 'INSERT INTO Person(data)' +
      'VALUES ($1) RETURNING userID';

  const insertQuery = {
    text: insert,
    values: [user],
  };

  const result = await pool.query(insertQuery);
  const userID = result.rows[0].userid;

  // Create default mailboxes for this user
  createMailbox('inbox', userID);
  createMailbox('sent', userID);
  createMailbox('trash', userID);

  return res.status(201).json('User has been created');
};

const createMailbox = async (name, userID) => {
  const insert = 'INSERT INTO mailbox(mailboxName, userID) VALUES ($1, $2)';
  const query = {
    text: insert,
    values: [name, userID],
  };
  await pool.query(query);
};

exports.check = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secrets.accessToken, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
