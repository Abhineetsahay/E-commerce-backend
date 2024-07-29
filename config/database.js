
const mongoose = require("mongoose");

require("dotenv").config();

exports.connect=()=>{
          mongoose.connect(process.env.MONODB_URL)
          .then(() => {console.log("DB connected successfully")})
          .catch( (err) => {
              console.log("DB CONNECTION ISSUES");
              console.error(err);
              process.exit(1);
          } );
}