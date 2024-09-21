require('dotenv').config();
import express from "express";
import initAuthRouter from "./interfaces/router/auth.js";
import errorMiddleware from "../src/infrastructure/middlewares/errorHandle.js";
import initUserRouter from "./interfaces/router/user.js";
import connection from "./infrastructure/config/connectDB.js";
const app = express();
const port = process.env.PORT || 3000;
import swaggerSetup from "./infrastructure/docs/swagger.js";

app.use(express.urlencoded({extended: true}));
app.use(express.json());
connection();
initAuthRouter(app);
initUserRouter(app);
app.use(errorMiddleware);
swaggerSetup(app)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});