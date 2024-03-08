

export class Witness {
  docId?: string;
  name: string;
  address: string;
  phone: string;
  role: string;
  statements: string[];

  constructor(obj?: any) {
    this.docId = obj ? obj.docId : null;
    this.name = obj ? obj.name : '';
    this.address = obj ? obj.capacity : '';
    this.phone = obj ? obj.phone : '';
    this.role = obj ? obj.role : 'user';
    this.statements = obj ? obj.statements : [];
  }
}


