module.exports = {
    env: 'development',
    serverPort: 3000,
    secret: '7Wa$5&3W4z9Z-gTs',
    preName: '_trampobom_',
    corsOptions: {
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
        credentials: true,
        methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
        origin: "http://localhost:3000",
        preflightContinue: false
    },
    dbHost: 'localhost',
    dbPort: 27017,
    dbUser: 'teste',
    dbPass: '12345678',
    dbName: 'seapegadb',
    viewPathLayout: '/src/views/layouts',
    viewPath: '/src/views',
    assetsPath: '/src/public/'
};
