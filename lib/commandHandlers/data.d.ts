import * as CQRS from '@labshare/services-bus';
export default class Data extends CQRS.Commands.CommandHandler {
    constructor();
    log(data: any): Promise<void>;
}
