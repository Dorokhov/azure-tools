export class ExpandableViewModel {
    constructor(type: TreeItemType, name: string = '') {
        this.type = type;        
        this.name = name;
        this.typeToDisplay = TreeItemType[type];
    }

    id: number;
    name: string;
    type: TreeItemType;
    typeToDisplay: string;
    children: ExpandableViewModel[] = [];
    hasChildren: boolean = true;
    isExpanded : boolean = false;
}

export class ExpandableViewModelGeneric<T> extends ExpandableViewModel {
    constructor(model: T, type: TreeItemType, name: string = '') {
        super(type, name);
        this.model = model;
    }

    model: T;
}

export enum TreeItemType {
    Server,
    Database,
    Key
}