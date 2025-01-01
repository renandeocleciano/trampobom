const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

export class SessionsModule {
  constructor() {}

  public config(app: any, conn: any) {
    app.use(
      session({
        secret: "7Wa$5&3W4z9Z-gTs",
        store: new MongoStore({
          mongooseConnection: conn,
          ttl: 1 * 24 * 60 * 60,
          autoRemove: "native",
          touchAfter: 24 * 3600,
          secret: "7Wa$5&3W4z9Z-gTs",
        }),
        saveUninitialized: false,
        resave: false,
      })
    );
  }
}
