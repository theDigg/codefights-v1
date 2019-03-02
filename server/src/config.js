module.exports = {
  port: 4000,
  db: {
    prod: process.env.DATABASE_URL || "mongodb://localhost/codewars2",
    test: "mongodb://localhost/codewars2_test",
    options: {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || "development_secret",
    expiry: "7d"
  }
};
