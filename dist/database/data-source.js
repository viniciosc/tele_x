"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
var typeorm_1 = require("typeorm");
var port = process.env.DB_PORT;
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: port,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: ["".concat(__dirname, "/../**/app/entities/*.{ts,js}")],
    migrations: ["".concat(__dirname, "/../**/database/migrations/*.{ts,js}")],
});
//# sourceMappingURL=data-source.js.map