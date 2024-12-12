import express, { query } from "express";
import URL from "./models/url.js";
import urlroute from "./routes/url.js";

const app = express();
const PORT = process.env.PORT;

// JSON middleware
app.use(express.json());

// URL route
app.use('/url', urlroute);

app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
