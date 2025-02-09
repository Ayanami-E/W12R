"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const bookRoutes_1 = __importDefault(require("./bookRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1234;
// 启用日志
app.use((0, morgan_1.default)('dev'));
// CORS 配置
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}));
// 中间件
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// 路由
app.use('/api', bookRoutes_1.default);
// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});
// 数据库连接
const MONGODB_URI = 'mongodb://127.0.0.1:27017/bookstore';
mongoose_1.default.connect(MONGODB_URI);
mongoose_1.default.Promise = Promise;
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, "MongoDB connection error"));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
// 启动服务器
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app;
