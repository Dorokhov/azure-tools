export class ExpandableViewModel {
    constructor(name : string = '') {
        this.name = name;
    }

    id: number;
    name: string;
    children: ExpandableViewModel[] = [];
    hasChildren : boolean = true;
}