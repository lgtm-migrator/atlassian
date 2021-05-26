import { getNamespace } from 'cls-hooked';
import { apiLogger } from '../logger';
import { load } from '../utils';

const ATLASSIAN_API = load('AtlassianApi').default;

class API extends ATLASSIAN_API {
    async getMyself() {
        return {
            id    : 1,
            email : this.auth.username,
            name  : 'Tyler Simpson'
        };
    }

    getTraceId() {
        return getNamespace('__TEST__').get('current').id;
    }

    initLogger() {
        this._logger = this.logger =  apiLogger;
    }
}

const methods = Object.getOwnPropertyNames(API.prototype).filter(m => m !== 'constructor');

for (const methodName of methods) {
    ATLASSIAN_API.prototype[methodName] = API.prototype[methodName];
}
