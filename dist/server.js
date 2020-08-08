"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = __importDefault(require("./apis/env"));
const model_1 = __importDefault(require("./apis/model"));
const PORT = env_1.default.PORT;
const start = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const app = express_1.default();
        app.get('/answers', (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { phrase } = req.query;
                if (phrase === undefined || phrase.trim() === '') {
                    res.status(400).send();
                    return;
                }
                const results = yield model_1.default(phrase);
                res.send(results);
            }
            catch (error) {
                console.log(error);
                res.status(500).send();
            }
        }));
        app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.sendFile('nike-soccer.html', { root: __dirname });
        }));
        app.get('/components/main.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
            return res.sendFile('/components/main.js', { root: __dirname });
        }));
        app.listen(PORT, () => console.log(`Nike chat bot listening on port ${PORT}!`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
//# sourceMappingURL=server.js.map