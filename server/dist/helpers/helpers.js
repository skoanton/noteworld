"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTimeToSeconds = parseTimeToSeconds;
function parseTimeToSeconds(time) {
    const match = time.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error("Invalid time format");
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
        case "s": return value;
        case "m": return value * 60;
        case "h": return value * 60 * 60;
        case "d": return value * 60 * 60 * 24;
        default: throw new Error("Invalid time unit");
    }
}
