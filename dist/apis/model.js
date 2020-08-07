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
const form_data_1 = __importDefault(require("form-data"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const accessToken_1 = __importDefault(require("./accessToken"));
const env_1 = __importDefault(require("./env"));
const MODEL_ID = 'FRFPOUIOWOK7BO76ENW4PU2SSA';
exports.default = (phrase) => __awaiter(this, void 0, void 0, function* () {
    const token = yield accessToken_1.default();
    const formData = new form_data_1.default();
    formData.append('modelId', MODEL_ID);
    formData.append('document', phrase);
    const response = yield node_fetch_1.default(`${env_1.default.EINSTEIN_VISION_URL}v2/language/intent`, {
        body: formData,
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const json = yield response.json();
    return json;
});
//# sourceMappingURL=model.js.map