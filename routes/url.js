import express from "express";
import urlController from '../controllers/url.js';

const router = express.Router();

// POST a url
router.post('/', urlController.handleGenerateNewShortURL);

// POST a url
router.get('/', urlController.handleGetAllShortURL);

// GET a url
router.get('/:shortId', urlController.handleGetShortURL);

// GET analytics
router.get('/analytics', (req, res) => {

});

// GET analytics of a url
router.get('/analytics/:shortId', urlController.handleGetAnalytics);

export default router;