
'use strict'

import angular = require('angular');

export class ExpandableViewModel {
    constructor(public source: Array<any>) {
    }

    protected isExpanded = false;

    protected add(itemsToAdd: Array<any>) {
        var indexOfCurrentKey = this.source.indexOf(this);
        var nextToCurrent = indexOfCurrentKey + 1;
        this.source.splice(nextToCurrent, 0, ...itemsToAdd);
    }

    protected remove(count: number) {
        var indexOfCurrentKey = this.source.indexOf(this);
        var nextToCurrent = indexOfCurrentKey + 1;
        this.source.splice(nextToCurrent, count);
    }
}

export interface IHierarchy {
    items: IHierarchy[],
    name: string
}