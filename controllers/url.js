import { nanoid, urlAlphabet } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;

  if(!body.url) return res.status(400).json({ error: 'url is required' });

  const shortId = nanoid(8);

  await URL.createShortURL( shortId, body.url );

  return res.json({ id: shortId });
}

async function handleGetShortURL(req, res) {
  const shortId = req.params.shortId;
  
  const url = await URL.getShortURL(shortId);
  
  res.redirect(url.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;

  const data = await URL.getAnalytics(shortId);

  return res.json({ totalCLicks: data.length,analytics: data });
}

export default {
  handleGenerateNewShortURL,
  handleGetShortURL,
  handleGetAnalytics
};