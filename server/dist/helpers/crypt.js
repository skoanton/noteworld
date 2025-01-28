"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const algorithm = "aes-256-ctr";
const secretKey = process.env.ENCRYPTION_SECRET || "default_secret_key";
if (!secretKey || secretKey.length !== 32) {
    throw new Error("ENCRYPTION_SECRET must be exactly 32 characters long");
}
console.log("Secret key", secretKey);
function encrypt(text) {
    const iv = crypto_1.default.randomBytes(16);
    const cipher = crypto_1.default.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
}
function decrypt(encryptedText) {
    const [iv, content] = encryptedText.split(":");
    const decipher = crypto_1.default.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, "hex")), decipher.final()]);
    return decrypted.toString();
}
