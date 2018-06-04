'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CQRS = require("@labshare/services-bus");
class Data {
    constructor() {
        this.post = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('DataCommand', 'log', req.body));
                res.status(202);
                res.json(req.body);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        this.test = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            res.send('CQRS is UP');
        });
    }
    get Routes() {
        let routes = [
            { path: '/cqrs/data', httpMethod: ['POST'], middleware: this.post },
            { path: '/cqrs/test', httpMethod: ['GET'], middleware: this.test }
        ];
        return routes;
    }
}
exports.Data = Data;
const instance = new Data();
const routes = instance.Routes;
exports.routes = routes;
//# sourceMappingURL=cqrs.js.map