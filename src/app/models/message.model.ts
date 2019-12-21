import { User } from './user.model';

export interface Message {
    _id?: string;
    fromId: any;
    toId: any;
    sentDate: string ;
    seenDate: string ;
    messageType: number;
    message: any;
}
