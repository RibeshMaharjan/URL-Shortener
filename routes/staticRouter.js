import express from "express";
import path from "path";
import url from "url";

const router = express.Router();

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __root = path.join(__dirname, '../');
const staticFile = path.join(__root, 'public');

// static file (.css, .js)
router.use(express.static(staticFile));

// Homepage route
router.get('/', (req, res) => {

  const filepath = path.join(__root, 'public', 'index.html');
  res.sendFile(filepath);
});

// Login route
router.get('/login', (req, res) => {

  const filepath = path.join(__root, 'public', 'login.html');

  res.sendFile(filepath);
});

// Signup route
router.get('/signup', (req, res) => {
  const filepath = path.join(__root, 'public', 'signup.html');

  res.sendFile(filepath);
});

// Analytics route
router.get('/analytics', (req, res) => {
  const filepath = path.join(__root, 'public', 'analytics.html');

  res.sendFile(filepath);
});

export default router;