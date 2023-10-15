"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var UserController_1 = __importDefault(require("../controllers/UserController"));
var MessageController_1 = __importDefault(require("../controllers/MessageController"));
var LoginController_1 = __importDefault(require("../controllers/LoginController"));
var routers = (0, express_1.Router)();
routers.use('/', UserController_1.default);
routers.use('/', MessageController_1.default);
routers.use('/', LoginController_1.default);
exports.default = routers;
//# sourceMappingURL=routes.js.map