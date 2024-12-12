import mysql from 'mysql2';

function connectToDB() {
  try {
    const pool = mysql.createPool({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
    }).promise();

    return pool;
  } catch (error) {
    return `Could not connect to DB`;
  }
}

export default { connectToDB };