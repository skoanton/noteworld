import crypto from "crypto";

const algorithm = "aes-256-ctr";
const secretKey = process.env.ENCRYPTION_SECRET || "default_secret_key";

if (!secretKey || secretKey.length !== 32) {
    throw new Error("ENCRYPTION_SECRET must be exactly 32 characters long");
}

export function encrypt(text: string): string {

    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return iv.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(encryptedText: string): string {

    const [iv, content] = encryptedText.split(":");
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), Buffer.from(iv, "hex"));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(content, "hex")), decipher.final()]);

    return decrypted.toString();
}
