export class User {
  docId?: string;
  name: string;
  email: string;
  capacity: boolean;
  trails: string[];

  constructor(obj?: any) {
    this.docId = obj ? obj.docId : null;
    this.name = obj ? obj.name : '';
    this.email = obj ? obj.email : '';
    this.capacity = obj ? obj.capacity : false;
    this.trails = obj ? obj.trails : [];
  }
}
