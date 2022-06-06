const dateScalar = require("./dateScalar");
const urlResolver = require("./urlResolver");
const userResolver = require("./userResolver");

// defain custom scalar type  dateScalar for Date. Date is type name, so you use custom instead Date, ex: Date -> MyDate 
const resolvers = [{ Date: dateScalar }, userResolver, urlResolver];

module.exports = resolvers;
