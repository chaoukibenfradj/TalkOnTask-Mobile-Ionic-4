import { User } from './user.model';

export interface Message {
    _id?: string;
    fromId: string;
    toId: string;
    sentDate: string ;
    seenDate: string ;
    messageType: number;
    message: any;
}
