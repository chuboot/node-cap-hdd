const { Sequelize, DataTypes } = require("sequelize");

// conection db
const db = new Sequelize("cap_sur", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: "+08:00",
});

db.authenticate()
  .then(() => {
    console.log("Conection successfully..");
  })
  .catch((error) => {
    console.log("Unable to connect to db .. ", error);
  });

const Hardisk = db.define("hardisks", {
  owner: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hdd_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
//

module.exports = { db, Hardisk };
