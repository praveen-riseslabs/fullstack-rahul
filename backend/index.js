const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());



app.use(cors());
const origin = ["http://localhost:3000"];

//database connection
const connect = require("./config/database");
connect
.then(() => {
    console.log("Successfully connected to database")
}).catch((err) => {
    console.log("error");
    process.exit(1);
});

app.use(cors({origin:["http://localhost:3000"], credentials:true}));

//--------------------ROUTES----------------
const userRoutes = require("./routes/users");

app.use("/users", userRoutes);
app.get("/check", (req, res) => {
    console.log(req.cookies);
    res.send("ok");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
