import * as _ from 'lodash';
import * as CQRS from "@labshare/services-bus";
const ServicesCache = require('@labshare/services-cache').Cache;
let config = _.get(global.LabShare.Config, 'cqrs');
export default class Result extends CQRS.Reporting.ReportHandler<any> {
    
   
    constructor() {
        super();
        this.reportDatabase = new ServicesCache(config.sb.eventStore.redis, config.sb.eventStore.maxTime);
        
    }
     // method for test
    async result(): Promise<any> {
        const response = await this.reportDatabase.getAllObjectsList('data-storage');
        return response;
    }

}