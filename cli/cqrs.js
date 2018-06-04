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
const Util = require("util");
const CQRS = require("@labshare/services-bus");
const { Services } = require('@labshare/services');
const logger = global.LabShare.Logger;
let config = _.get(global.LabShare.Config, 'cqrs');
exports.usage = ["CQRS CLI",
    '',
    'Manage CQRS',
    '',
    'lsc crqs start - Start the CQRS',
    ''
];
function process() {
    return __awaiter(this, void 0, void 0, function* () {
        //setting the configuration 
        CQRS.ServiceLocator.Process.Instance.setConfig(config.sb);
        //load the singleton object
        yield CQRS.ServiceLocator.Process.Instance.load();
        //setting the Process events.
        //when there is an error in the channel
        CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CHANNEL_ERROR, (x) => {
            logger.info('channelError', x);
        });
        //when there is an error in the connection
        CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CONNECTION_ERROR, (x) => {
            logger.info('connectionError', x);
        });
        //when the message is processed (only consumer)
        CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.MESSAGE_PROCESSED, (x) => {
            logger.info('Message Processed');
        });
    });
}
;
/********************************************************** */
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('STARTING THE CQRS Services:', config.data.name);
        let services = new Services(config.services);
        yield process();
        logger.info('Handlers loaded');
        services.start();
    });
}
exports.start = start;
/********************************************************** */
function report() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('STARTING THE CQRS Report:', config.data.name);
        yield process();
        logger.info('Handlers loaded');
    });
}
exports.report = report;
/********************************************************** */
function reportAll() {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('STARTING THE CQRS ReportAll:', config.data.name);
        yield process();
        logger.info('Handlers loaded');
        let data = yield CQRS.ServiceLocator.Process.Instance.query(new CQRS.Models.Entities.ReportCommand('Report', 'result'));
        console.log(Util.inspect(data, true, null));
    });
}
exports.reportAll = reportAll;
//# sourceMappingURL=cqrs.js.map