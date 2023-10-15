"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
if (!process.env.BOT_TOKEN)
    throw new Error('Sem token bot');
var bot = new node_telegram_bot_api_1.default(process.env.BOT_TOKEN, { polling: true });
exports.default = bot;
//# sourceMappingURL=botTele.js.map