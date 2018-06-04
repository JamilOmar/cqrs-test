import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus';
const { Services } = require('@labshare/services');
const logger = global.LabShare.Logger;
let config =    _.get(global.LabShare.Config, 'cqrs');
export const usage = ["CQRS CLI",
    '',
    'Manage CQRS',
    '',
    'lsc crqs start - Start the CQRS',
    ''
];
async function process(){
    //setting the configuration 
    CQRS.ServiceLocator.Process.Instance.setConfig(config.sb);
    //load the singleton object
    await CQRS.ServiceLocator.Process.Instance.load();
    //setting the Process events.
    //when there is an error in the channel
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CHANNEL_ERROR, (x: any) => {
        logger.info('channelError', x);

    })
    //when there is an error in the connection
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.CONNECTION_ERROR, (x: any) => {
        logger.info('connectionError', x);

    })
    //when the message is processed (only consumer)
    CQRS.ServiceLocator.Process.Instance.onEvent(CQRS.Common.Constants.Events.MESSAGE_PROCESSED, (x: any) => {
        logger.info('Message Processed')
    })
};
/********************************************************** */
export async function start() {
    logger.info('STARTING THE CQRS Services:',config.data.name );
    let services = new Services(config.services);
    await process();
    logger.info('Handlers loaded');
    services.start();
}

/********************************************************** */
export async function report() {
    logger.info('STARTING THE CQRS Report:',config.data.name );
    await process();
    logger.info('Handlers loaded');
}
/********************************************************** */
export async function reportAll() {
    logger.info('STARTING THE CQRS ReportAll:',config.data.name );
    await process();
    logger.info('Handlers loaded');
    let data = await CQRS.ServiceLocator.Process.Instance.query(new CQRS.Models.Entities.ReportCommand('Report', 'result'));
    console.log(data);

    
}