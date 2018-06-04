"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const CQRS = require("@labshare/services-bus");
const ServicesCache = require('@labshare/services-cache').Cache;
let config = _.get(global.LabShare.Config, 'cqrs');
class Result extends CQRS.Reporting.ReportHandler {
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
    }
    // method for test
    result() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.reportDatabase.getAllObjectsList('data-storage');
            return response;
        });
    }
}
exports.default = Result;
//# sourceMappingURL=result.js.map