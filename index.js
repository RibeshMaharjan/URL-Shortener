import cookieParser from "cookie-parser";
import express, { query } from "express";
import auth from "./middleware/auth.js";
import URL from "./models/url.js";
import staticRoute from "./routes/staticRouter.js";
import urlRoute from "./routes/url.js";
import userRoute from "./routes/user.js";

const app = express();
const PORT = process.env.PORT;


// JSON middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(auth.checkForAuthentication);

// Static routes
app.use('/', staticRoute);

//  Login route
app.use('/user', userRoute);

// URL route
app.use('/url', auth.checkForAuthentication, urlRoute);

app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});
