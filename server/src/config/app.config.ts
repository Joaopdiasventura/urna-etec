export const AppConfig = () => ({
    port: parseInt(process.env.PORT, 10) || 10000,
    environment: process.env.NODE_ENV || "DEVELOPMENT",
    frontend: process.env.FRONTEND || "*",
    jwtSecret: process.env.JWT_SECRET,
    salt: process.env.SALT,
});
