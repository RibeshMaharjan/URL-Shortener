import USER from '../models/user.js';
import auth from '../services/auth.js';

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const user = await USER.getUser(email, password);

  if (!user) {
    // res.status(400).json({ success: false, message: 'Invalid username or password' });
    return res.redirect('/login');
  }

  const token = auth.setUser(user);
  res.cookie('token', token);
  return res.redirect('/');
  // return res.json({ token });
}

async function handleUserSignup(req, res) {
  const { email, username, password } = req.body;

  const { success, user } = await USER.setUser(email, username, password);

  console.log(success);
  console.log(user);

  if (!success) return res.status(400).json({ success: false, message: 'Invalid username or password' });

  return res.redirect('/');
}

export default {
  handleUserLogin,
  handleUserSignup
};