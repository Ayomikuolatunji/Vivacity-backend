"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const requestHeaders_1 = __importDefault(require("./middleware/requestHeaders"));
const requestErrorHandler_1 = require("./middleware/requestErrorHandler");
const v1Api_1 = __importDefault(require("./services/v1Api"));
const database_1 = __importDefault(require("./database/database"));
const _404Page_1 = require("./middleware/404Page");
const port = process.env.PORT || 8080;
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.options("*", (0, cors_1.default)());
app.use((0, compression_1.default)());
app.use(requestHeaders_1.default);
// version apis
app.use("/api", v1Api_1.default);
app.use(_404Page_1.pageNotFound);
app.use(requestErrorHandler_1.handleServerError);
class CreateDBConnect {
    constructor() {
        this.db = database_1.default;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.db.$connect();
                console.log("Connected to database successfully");
                app.listen(port, () => console.log(`Server started on port ${port}`));
            }
            catch (error) {
                console.error("Failed to connect to database", error.message);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.$disconnect();
        });
    }
}
const dbConnect = new CreateDBConnect();
dbConnect.connect();
