import { BusyViewModel } from './busyViewModel'

export class ExpandableViewModel extends BusyViewModel {
    constructor(treeModel: object,type: TreeItemType, name: string = '') {
        super();

        this.type = type;
        this.name = name;
        this.typeToDisplay = TreeItemType[type];
        this.treeModel = treeModel;
    }

    id: number;
    name: string;
    type: TreeItemType;
    typeToDisplay: string;
    children: ExpandableViewModel[] = [];
    hasChildren: boolean = true;
    isExpanded: boolean = false;
    public treeModel: object;


    protected getNode() {
        return this.treeModel.getNodeById(this.id);
    }

    protected expand() {
        this.getNode().toggleExpanded();
    }

    protected collapse() {
        this.getNode().collapse();
    }
}

export class ExpandableViewModelGeneric<T> extends ExpandableViewModel {
    constructor(treeModel: object, model: T, type: TreeItemType, name: string = '') {
        super(treeModel, type, name);
        this.model = model;
    }

    model: T;
}

export enum TreeItemType {
    Server,
    Database,
    Folder,
    Key
}