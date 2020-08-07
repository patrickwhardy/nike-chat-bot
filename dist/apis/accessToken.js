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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const env_1 = __importDefault(require("./env"));
const LIFE = 7200;
let expiration = null;
let accessToken = null;
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const halfLife = (Date.now() / 1000) + LIFE / 2;
    if (expiration !== null &&
        expiration > halfLife &&
        accessToken !== null) {
        return accessToken;
    }
    const payloadExpiration = (Date.now() / 1000) + LIFE;
    const payload = {
        aud: `${env_1.default.EINSTEIN_VISION_URL}v2/oauth2/token`,
        exp: payloadExpiration,
        sub: env_1.default.EINSTEIN_VISION_ACCOUNT_ID,
    };
    // TODO: PEM routine thing getting f'd here
    const token = jsonwebtoken_1.default.sign(payload, env_1.default.EINSTEIN_VISION_PRIVATE_KEY, { algorithm: 'RS256' });
    const response = yield node_fetch_1.default(`${env_1.default.EINSTEIN_VISION_URL}v2/oauth2/token`, {
        body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${token}`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const { access_token } = yield response.json();
    accessToken = access_token;
    expiration = payloadExpiration;
    return accessToken;
});
//# sourceMappingURL=accessToken.js.map