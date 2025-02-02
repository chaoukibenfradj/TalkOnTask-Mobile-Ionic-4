import { User } from './user.model';

export interface Project {
    _id: string;
    title: string;
    description: string;
    chef: any;
    devTeamId: User[] | string;
    estimated_start_date: string;
    estimated_end_date: string;
    created_at: string;
    updated_at: string;
}
