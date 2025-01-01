const mongoose = require("mongoose");
const { dbHost, dbPort, dbName, dbUser, dbPass } = require("../config/index")();

export class MongoConnector {
  constructor() {
    this.loadSchemas();
  }

  sync() {
    try {
      mongoose.set("debug", true);
      return mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`, {
        auth: { authSource: "admin" },
        user: dbUser,
        pass: dbPass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  private loadSchemas(): void {
    console.log("Loading Schemas...");
    require("../../models/user");
    require("../../models/templates");
    console.log("Schemas loaded...");
  }
}
