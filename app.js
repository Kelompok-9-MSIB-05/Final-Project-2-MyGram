const express = require("express")
const app = express()
const PORT = 7000
const routes = require("./routes")


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(routes)

app.get("",  (req, res) => {
    res.send("Test")// app.js
    const express = require("express");
    const debug = require("debug")("app");
    const routes = require("./routes");
    
    const app = express();
    const PORT = 7000;
    
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    
    app.use(routes);
    
    app.get("", (req, res) => {
      res.send("Test");
    });
    
    app.listen(PORT, () => {
      debug(`App running on port: ${PORT}`);
    });
    
})

app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
})
