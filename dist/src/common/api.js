"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.fail = fail;
const common_1 = require("@nestjs/common");
function ok(data) { return { data }; }
function fail(code, message, status = common_1.HttpStatus.BAD_REQUEST, details) {
    throw new common_1.HttpException({ error: { code, message, ...(details === undefined ? {} : { details }) } }, status);
}
//# sourceMappingURL=api.js.map