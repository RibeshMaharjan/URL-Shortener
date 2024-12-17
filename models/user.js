import DB from '../connect.js';

const pool = DB.connectToDB();

async function getUser(email, password) {
  try {
    const [user] = await pool.query(`
      SELECT *
      FROM users
      WHERE email = ?
      AND password = ?
      `, [email, password]);

    return user[0];
  } catch (error) {
    return `Could not get User \n${error}`;
  }
}

async function setUser(email, username, password) {
  try {
    const [insertuser] = await pool.query(`
      INSERT INTO users (email, username, password, createdBy)
      VALUES (?, ?, ?)
      `, [email, username, password]);

    const user = await getUser(email, password);

    return {
      success: true,
      user
    };
  } catch (error) {
    return {
      success: false,
      message: `Could not get User \n${error}`
    };
  }
}

// const result = await setUser('test1234567@gmail.com', 'testuser', 'testing');
// console.log(result);

const LOGIN = {
  setUser,
  getUser
};

export default LOGIN;