'use strict';
import * as Express from 'express';
import * as _ from 'lodash';
import * as CQRS from '@labshare/services-bus';
export class Data {



    public post = async (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> => {

        try {
            CQRS.ServiceLocator.Process.Instance.publishCommand(new CQRS.Models.Entities.Command('DataCommand', 'log', req.body));
            res.status(202);
            res.json(req.body);
        } catch (error) {

            res.status(500).json({ error: error.message });

        }

    }

    public test = async (req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> => {

        res.send('CQRS is UP');

    }
    public get Routes() {
        let routes = [
            { path: '/cqrs/data', httpMethod: ['POST'], middleware: this.post },
            { path: '/cqrs/test', httpMethod: ['GET'], middleware: this.test }
        ];
        return routes;
    }
}
const instance = new Data();
const routes = instance.Routes;
export { routes };
