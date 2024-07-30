const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: "*"
}));
require("./config/database").connect();
app.use(express.json());

const route = require("./routes/AuthRoute");
const cartRoute=require("./routes/CartRoute");

app.use("/api/v1", route);
app.use("/api/cart",cartRoute);


app.listen(PORT, () => {
  console.log(`Server started at Port No. ${PORT}`);
});
