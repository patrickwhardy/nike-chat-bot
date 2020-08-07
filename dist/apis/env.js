"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ajv_1 = __importDefault(require("ajv"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const ENV_KEYS = [
    'EINSTEIN_VISION_ACCOUNT_ID',
    'EINSTEIN_VISION_PRIVATE_KEY',
    'EINSTEIN_VISION_URL',
    'PORT',
];
const ajv = new ajv_1.default();
const ENV_SCHEMA = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    required: ENV_KEYS,
    type: 'object',
};
const validateEnvironment = ajv.compile(ENV_SCHEMA);
const ENV_FILE = './.env';
if (fs_1.default.existsSync(ENV_FILE)) {
    ENV_KEYS.map((key) => delete process.env[key]);
    dotenv_1.default.config();
}
const validEnvironment = validateEnvironment(process.env);
if (!validEnvironment) {
    console.log('Invalid Environment');
    process.exit(1);
}
const { EINSTEIN_VISION_ACCOUNT_ID, EINSTEIN_VISION_PRIVATE_KEY, EINSTEIN_VISION_URL, PORT, } = process.env;
exports.default = {
    EINSTEIN_VISION_ACCOUNT_ID,
    EINSTEIN_VISION_PRIVATE_KEY,
    EINSTEIN_VISION_URL,
    PORT: parseInt(PORT, 10),
};
//# sourceMappingURL=env.js.map