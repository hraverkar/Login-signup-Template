const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");


app.use(
  express.urlencoded({
    extended: true,
    limit: "5mb",
  })
);
app.use(express.json({ limit: "5mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.disable("x-powered-by");

const db = require("./models");
const Role = db.role;
//mongodb://localhost:27017/?readPreference=primary&ssl=false
// mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}

db.mongoose
  // .connect(`mongodb+srv://harshal:*harshal92@cluster0.lqkoa.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "recruiter",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'recruiter' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// routes
require("./routes/auth.routes")(app);
require("./routes/userAuth.routes")(app);


app.get('/', (req, res) => {
  res.send('Welcome to Login API');
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Application started on", app.settings.env + " environment");
});
