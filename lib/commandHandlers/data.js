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
const CQRS = require("@labshare/services-bus");
const data_1 = require("../aggregates/data");
class Data extends CQRS.Commands.CommandHandler {
    constructor() {
        super();
        this.store = CQRS.ServiceLocator.Process.Instance.eventStore;
    }
    // method for simulate the CQRS process
    log(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let aggregate = new data_1.DataAggregate();
            //creating a unique key for the aggregate
            let key = CQRS.Utils.Key.createKey(['Data', '1']);
            //setting the id to the aggregate
            aggregate.id = key;
            //retreiving the version from the store
            aggregate.version = yield this.store.load(key);
            //performing the aggregate's method
            yield aggregate.log(data);
            //aggregate : the aggregate to be stored
            //function (domainEvent) : the method invoqued after the event has been stored. this will work for send the event to the event handler.
            yield this.store.saveEvents(aggregate, function (domainEvent) {
                //send the result to the Event handler
                // Send an Event Object
                //Command.name : The name of the command Handler (CalculatorEvent)
                //Command.method : The name of the method to be invoked (domainEvent.eventName)
                //Command.command : The command or object to be sent (domainEvent)
                CQRS.ServiceLocator.Process.Instance.publishEvent(new CQRS.Models.Entities.Command('DataEvent', domainEvent.eventName, domainEvent));
            });
        });
    }
}
exports.default = Data;
//# sourceMappingURL=data.js.map