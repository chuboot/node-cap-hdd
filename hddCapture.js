const xml2js = require("xml2js");
const DigestClient = require("digest-fetch");
const { db, Hardisk } = require("./database.js");
const fs = require("fs");

const loadDataHdds = () => {
  const file = fs.readFileSync("data/data.json", "utf8");
  const hddss = JSON.parse(file);
  return hddss;
};

//get hdd status

const parser = new xml2js.Parser();

const hddss = loadDataHdds();
hddss.length = 0;
fs.writeFileSync("data/data.json", JSON.stringify(hddss));
const getHddData = (dev) => {
  const client = new DigestClient(dev.user, dev.pass);
  const url = `http://${dev.ip}:${dev.port}/ISAPI/ContentMgmt/Storage/hdd`;

  client
    .fetch(url)
    .then((response) => response.text())
    .then((data) => {
      // console.log(data);

      parser
        .parseStringPromise(data)
        .then(function (result) {
          // console.log(result);
          // console.log(
          //   `=================Data HDD from ${dev.nama}=================`
          // );
          const listHdd = result.hddList.hdd;
          listHdd.forEach((hdd) => {
            // console.log(
            //   `${dev.nama} id : ${hdd.id} name: ${hdd.hddName} status: ${hdd.status}`
            // );
            const owner = dev.nama;
            const id = hdd.id[0];
            const nama = hdd.hddName[0];
            const status = hdd.status[0];

            // const file = fs.readFileSync("data/data.json", "utf8");
            // const hddss = JSON.parse(file);

            const hddss = loadDataHdds();

            hddss.push({ owner, id, nama, status });
            fs.writeFileSync("data/data.json", JSON.stringify(hddss));
            console.log(hddss);

            // a.push(dev.nama);

            db.sync().then(() => {
              console.log("HDD Table created success...");
            });
            Hardisk.create({
              owner: dev.nama.toString(),
              hdd_id: hdd.id.toString(),
              name: hdd.hddName.toString(),
              status: hdd.status.toString(),
            })
              .then((res) => {
                console.log(res);
              })
              .catch((error) => {
                console.log("Fail to create data", error);
              })
              .catch((error) => {
                console.log("Unable to create tabel : ", error);
              });
          });
        })
        .catch(function (err) {
          console.log(err);
        });
    });
};

module.exports = { getHddData, loadDataHdds };
