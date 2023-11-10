const express = require("express")
const app = express()
const PORT = 7000

app.get("",  (req, res) => {
    res.send("Test")
})

app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
})
