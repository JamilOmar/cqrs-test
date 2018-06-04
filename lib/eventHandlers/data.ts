import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus'
const ServicesCache = require('@labshare/services-cache').Cache;
let config = _.get(global.LabShare.Config, 'cqrs');
export default class Data extends CQRS.Events.EventHandler<any> {
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
    }
    // method for simulate the CQRS process
    async onLog(data: CQRS.Models.Entities.DomainEvent): Promise<any> {
        /// Storing the data in the reportdatabase
        const response = await this.reportDatabase.saveObjectInList('data-storage', data.eventVersion, data.eventVersion, data);
        console.log('Received:', JSON.stringify(data));
        return;


    }

}