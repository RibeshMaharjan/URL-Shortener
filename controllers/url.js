import { nanoid, urlAlphabet } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if (!body.url) return res.status(400).json({ error: 'url is required' });

  const shortId = nanoid(8);

  const id = await URL.createShortURL(shortId, body.url, req.user.userid);

  return res.json({ id: id, shortId: shortId, redirectUrl: body.url });
}

async function handleGetShortURL(req, res) {
  const shortId = req.params.shortId;

  const url = await URL.getShortURL(shortId);

  res.redirect(url.redirectURL);
}

async function handleGetAllShortURL(req, res) {

  const url = await URL.getAllShortURL(req.user.userid);

  res.status(201).json(url);
}

async function handleAllGetAnalytics(req, res) {

  const data = await URL.getAllAnalytics();

  const analytics = {};

  data.map(element => {
    if (!analytics[element.id]) {
      analytics[element.id] = {
        shortId: element.shortId,
        redirectURL: element.redirectURL,
        totalCLicks: 0
      };
    }
    analytics[element.id].totalCLicks++;
  });

  return res.json(analytics);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  if (shortId === 'undefined') {
    const data = await URL.getAllAnalytics();

    const analytics = data.reduce((obj, element) => {

      if (!obj[element.id]) {
        obj[element.id] = {
          shortId: element.shortId,
          redirectURL: element.redirectURL,
          totalCLicks: 0
        };
      }

      obj[element.id].totalCLicks++;
      return obj;
    }, {});

    return res.json(analytics);
  }

  const data = await URL.getAnalytics(shortId);

  return res.json({ totalCLicks: data.length, analytics: data });
}

export default {
  handleGenerateNewShortURL,
  handleGetAllShortURL,
  handleGetShortURL,
  handleGetAnalytics,
  handleAllGetAnalytics
};