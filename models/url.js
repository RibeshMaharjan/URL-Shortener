import DB from "../connect.js";

const pool = DB.connectToDB();

async function createShortURL(shortId, redirectURL, id) {
  try {
    const [newurl] = await pool.query(`
    INSERT INTO urls (shortId, redirectURL, createdBy)
    VALUES (?, ?, ?)
    `, [shortId, redirectURL, id]);

    if (!newurl.insertId) return `Could not insert new url`;

    return newurl.insertId;
  } catch (error) {
    return `Could not insert new url \n${error}`;
  }
}

async function getShortURL(shortId) {
  try {
    const [url] = await pool.query(`
    SELECT * 
    FROM urls
    WHERE shortId = ?
    `, [shortId]);

    await updateVisitHistory(url[0].id);
    return url[0];
  } catch (error) {
    return `Could not fetch url \n${error}`;
  }
}

async function getAllShortURL(id) {
  try {
    const [url] = await pool.query(`
    SELECT * 
    FROM urls
    WHERE createdBy = ?
    `, [id]);

    return url;
  } catch (error) {
    return `Could not fetch url \n${error}`;
  }
}

async function updateVisitHistory(urlId) {
  const [result] = await pool.query(`
    INSERT INTO visit_history (url_id)
    VALUES (?)
    `, [urlId]);

}

async function getAllAnalytics() {
  try {
    const [result] = await pool.query(`
      SELECT u.*, v.timestamp 
      FROM urls as u join visit_history as v on u.id = v.url_id
    `);

    return result;
  } catch (error) {
    return `Could not get analytics \n${error}`;
  }
}

async function getAnalytics(shortId) {
  try {
    const [result] = await pool.query(`
      SELECT u.*, v.timestamp 
      FROM urls as u join visit_history as v on u.id = v.url_id 
      WHERE u.shortId = ?;
    `, [shortId]);

    return result;
  } catch (error) {
    return `Could not get analytics \n${error}`;
  }
}

const URL = {
  createShortURL,
  getAllShortURL,
  getShortURL,
  getAnalytics,
  getAllAnalytics
};

export default URL;