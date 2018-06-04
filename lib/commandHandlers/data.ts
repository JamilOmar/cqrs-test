import * as CQRS from '@labshare/services-bus'
import {DataAggregate} from '../aggregates/data'

export default class Data extends CQRS.Commands.CommandHandler {
    constructor() {
        super();
        this.store = CQRS.ServiceLocator.Process.Instance.eventStore;
    }
    // method for simulate the CQRS process
    async log(data: any): Promise<void> {
            let aggregate = new DataAggregate();
            //creating a unique key for the aggregate
            let key = CQRS.Utils.Key.createKey(['Data', '1']);
            //setting the id to the aggregate
            aggregate.id = key;
            //retreiving the version from the store
            aggregate.version = await this.store.load(key);
            //performing the aggregate's method
            await aggregate.log(data);
            //aggregate : the aggregate to be stored
            //function (domainEvent) : the method invoqued after the event has been stored. this will work for send the event to the event handler.
            await this.store.saveEvents(aggregate, function (domainEvent: any) {
                //send the result to the Event handler
                // Send an Event Object
                //Command.name : The name of the command Handler (CalculatorEvent)
                //Command.method : The name of the method to be invoked (domainEvent.eventName)
                //Command.command : The command or object to be sent (domainEvent)
                CQRS.ServiceLocator.Process.Instance.publishEvent(new CQRS.Models.Entities.Command('DataEvent', domainEvent.eventName, domainEvent));

            });
      
    }

}