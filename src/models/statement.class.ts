

export class Statement {
  docId?: string;
  witness: string;
  event: string;
  date: string;
  time: string;
  place: string;
  comment: string;
  status: string;

  constructor(obj?: any) {
    this.docId = obj ? obj.docId : null;
    this.witness = obj ? obj.witness : '';
    this.event = obj ? obj.event : '';
    this.date = obj ? obj.date : '';
    this.time = obj ? obj.time : '';
    this.place = obj ? obj.place : '';
    this.comment = obj ? obj.comment : '';
    this.status = obj ? obj.status : '';
  }
}
