"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hackathonSchema = void 0;
const mongoose = require("mongoose");
exports.hackathonSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    held_on: {
        type: String,
    },
    held_at: {
        type: String,
    },
    application_closed: {
        type: String,
    },
});
//# sourceMappingURL=hackathon.schema.js.map