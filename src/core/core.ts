import * as http from "http";
import { Server } from "./server/server";

const { serverPort } = require("./config/index")();

export class Core {
  private db: any;
  private express: any;

  constructor(dbConnector) {
    this.db = dbConnector;
    this.syncDataBase();
  }

  private async syncDataBase() {
    try {
      const syncData = await this.db.sync();
      this.databaseSyncHandler(syncData);
    } catch (error) {
      console.log(`syncDataBase: ${error}`);
    }
  }

  private databaseSyncHandler(dbInfo: any) {
    this.express = new Server(dbInfo).express;
    this.upServer();
  }

  private upServer() {
    http
      .createServer(this.express)
      .listen(serverPort)
      .on("listening", this.onServerUp.bind(this, serverPort))
      .on("error", this.onServerStartUpError.bind(this));
  }

  private onServerUp(port: Number) {
    console.log(`Server is running on port: ${port} `);
  }

  private onServerStartUpError(error: any) {
    console.log(`onServerStartUpError: ${error}`);
  }
}
