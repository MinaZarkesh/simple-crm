import { User } from './user.interface';

export class Trail {
  docId: string;
  name: string;
  created_at: Date;
  created_by: User;
  owner: string | 'unknown';
  followers: User[] = [];
  priority: 'low' | 'medium' | 'high' | 'critical';
  aservateName: string;
  category: string;
  closed: boolean;
  description: string;

  constructor(obj: any) {
    this.docId = obj ? obj.docId : null;
    this.name = obj ? obj.name : '';
    this.created_at = obj ? obj.created_at : new Date();
    this.created_by = obj ? obj.created_by : new User({});
    this.owner = obj ? obj.owner : 'unknown';
    this.followers = obj ? obj.followers : [];
    this.priority = obj ? obj.priority : 'low';
    this.aservateName = obj ? obj.aservateName : '';
    this.category = obj ? obj.category : '';
    this.closed = obj ? obj.closed : false;
    this.description = obj ? obj.description : '';
  }
}
