'use strict';

//Reference to @labshare/services-bus
import { Models } from '@labshare/services-bus';
import * as _ from 'lodash';
let config =    _.get(global.LabShare.Config, 'cqrs');
//Inherit from Aggregate
export class DataAggregate extends Models.Entities.Aggregate {
    public id: string;
    public name: string;
    constructor(id?: string) {
        super(id);
    }
    async log(data): Promise<any>
    {
        
        return this.apply('onLog',{ data, machineName:config.data.name ,   id : this.id});
         
    }
}

