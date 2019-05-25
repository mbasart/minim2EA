export class Bike {

    constructor(_id = '', name = '', kms = 0, description = '', assigned = false) {
        this._id = _id;
        this.name = name;
        this.kms = kms;
        this.description = description;
        this.assigned = assigned;
    }

    _id: string;
    name: string;
    kms: number;
    description: string;
    assigned: boolean;
}
