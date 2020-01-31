import { User } from './user.model';

export interface ProjectProposition {
    _id: string;
    title: string;
    description: string;
    status: string;
    cahier_charge: any;
    client: any;
    created_at: string;
}
