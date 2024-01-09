const testController = (req, res, next) => {
  console.log("test is working");
  res.send("Welcome test Api");
};

export { testController };
