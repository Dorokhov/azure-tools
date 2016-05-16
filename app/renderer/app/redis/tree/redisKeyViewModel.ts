
'use strict'
import {IHierarchy} from './expandableViewModel';

export class RedisKeyViewModel implements IHierarchy {
    public items: IHierarchy[];

    constructor(public name: string) { }
}