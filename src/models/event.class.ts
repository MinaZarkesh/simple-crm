export class Event {
    docId?: string;
    date: string;
    time: string;
    place: string;
    type: string;
    description: string;
    witnesses: string[];

    constructor(obj?: any) {
        this.docId = obj ? obj.docId : null;
        this.date = obj ? obj.date : '';
        this.time = obj ? obj.time : '';
        this.place = obj ? obj.place : '';
        this.type = obj ? obj.type : '';
        this.description = obj ? obj.description : '';
        this.witnesses = obj ? obj.witnesses : [];
    }

}