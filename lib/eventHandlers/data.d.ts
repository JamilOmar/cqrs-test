import * as CQRS from '@labshare/services-bus';
export default class Data extends CQRS.Events.EventHandler<any> {
    constructor();
    onLog(data: CQRS.Models.Entities.DomainEvent): Promise<any>;
}
