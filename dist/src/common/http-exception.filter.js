"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpErrorFilter = class HttpErrorFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        const request = host.switchToHttp().getRequest();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const body = exception.getResponse();
            if (body?.error?.code)
                return response.status(status).json(body);
            if (body?.message)
                return response.status(status).json({ error: { code: status === 400 ? 'BAD_REQUEST' : 'HTTP_ERROR', message: Array.isArray(body.message) ? body.message.join('; ') : body.message } });
            return response.status(status).json({ error: { code: 'HTTP_ERROR', message: 'Request failed.' } });
        }
        console.error(`[${request.method}] ${request.url}`, exception);
        return response.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: { code: 'INTERNAL_ERROR', message: 'An unexpected error occurred.' } });
    }
};
exports.HttpErrorFilter = HttpErrorFilter;
exports.HttpErrorFilter = HttpErrorFilter = __decorate([
    (0, common_1.Catch)()
], HttpErrorFilter);
//# sourceMappingURL=http-exception.filter.js.map