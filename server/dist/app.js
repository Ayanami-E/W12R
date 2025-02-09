"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const app = (0, express_1.default)();
// 仅在开发环境启用 CORS
if (process.env.NODE_ENV === 'development') {
    app.use((0, cors_1.default)({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }));
}
// 解析 JSON 请求体
app.use(express_1.default.json());
// 路由
app.use('/api/book', bookRoutes_1.default);
// 数据库连接
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mybooks';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
exports.default = app;
