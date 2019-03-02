const fs = require("fs");
const mongoose = require("mongoose");

mongoose.connect("mongodb://kyle:kyle@ds127982.mlab.com:27982/codefightclub");
// mongoose.connect("mongodb://mongo:27017/codewars", { useNewUrlParser: true })
// .then(() => console.log('MongoDB Connected...'))
// .catch(err => console.log(err))

const db = mongoose.connection;
db.collection("challenges").drop();

// creates new collection of initialTests with data loated in data.json
fs.readFile("./challenges.json", "utf8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
  const problems = db.collection("challenges");
  problems.insert(JSON.parse(data), (err, docs) => {
    if (err) console.log(err);
    console.log(docs);
    problems.countDocuments((err, count) => {
      if (err) console.log(err);
      console.log(`${count} challenges inserted into challenges collection.`);
    });
  });
});
