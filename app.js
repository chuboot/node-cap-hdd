const PORT = 8000;
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");
const { getHddData, loadDataHdds } = require("./hddCapture.js");
// const { dstamp } = require("./util/capture.js");
const express = require("express");

const app = express();
app.use(cors());

// Read list device from json
const rawdata = fs.readFileSync("./data/listDev.json");
const devs = JSON.parse(rawdata);

app.get("/", (req, res) => {
  res.json("Welcome to Netsys");
});

app.get("/hardisks", (req, res) => {
  const hddss = loadDataHdds();

  res.json(hddss);
});
devs.forEach((dev) => {
  getHddData(dev);
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
