
    'use strict'

    import {RedisAccountViewModel} from './redisAccountViewModel';
    export class TreeViewModel {
        public items: any[];
        public name: string;
        constructor() {
            this.items = new Array();
        }

        add(account: RedisAccountViewModel) {
            this.items.push(account);
        }
    };