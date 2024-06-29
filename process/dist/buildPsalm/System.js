"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.System = void 0;
const fs_1 = require("fs");
class System {
    readJSON(file) {
        return JSON.parse((0, fs_1.readFileSync)(file).toString());
    }
    writeJSON(file, data) {
        try {
            (0, fs_1.writeFileSync)(file, JSON.stringify(data));
        }
        catch (e) { }
        return false;
    }
}
exports.System = System;
