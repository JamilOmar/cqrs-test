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
//Reference to @labshare/services-bus
const services_bus_1 = require("@labshare/services-bus");
const _ = require("lodash");
let config = _.get(global.LabShare.Config, 'cqrs');
//Inherit from Aggregate
class DataAggregate extends services_bus_1.Models.Entities.Aggregate {
    constructor(id) {
        super(id);
    }
    log(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.apply('onLog', { data, machineName: config.data.name, id: this.id });
        });
    }
}
exports.DataAggregate = DataAggregate;
//# sourceMappingURL=data.js.map