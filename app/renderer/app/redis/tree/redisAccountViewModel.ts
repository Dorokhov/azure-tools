'use strict'

    import {ExpandableViewModel, IHierarchy} from './expandableViewModel';
    import {RedisKeyViewModel} from './redisKeyViewModel';
    import {TreeViewModel} from './treeViewModel';

    export class RedisAccountViewModel extends ExpandableViewModel implements IHierarchy {
        public items: RedisKeyViewModel[];

        constructor(
            public root: TreeViewModel,
            public name: string,
            public password: string,
            public port: number,
            public load: () => angular.IPromise<Array<RedisKeyViewModel>>) {
            super(root.items);
        }

        expandOrCollapse() {
            if (this.isExpanded) {
                this.collapse();
            } else {
                this.expand();
            }
        }

        expand() {
            this.isExpanded = true;
            if (this.items === null || angular.isUndefined(this.items)) {
                this.load().then((data) => {
                    this.items = data;
                    this.add(data);
                });
            }
            else {

                this.add(this.items);
            }
        }

        collapse() {
            this.isExpanded = false;
            if (this.items !== null) {
                this.remove(this.items.length);
            }
        }
    }