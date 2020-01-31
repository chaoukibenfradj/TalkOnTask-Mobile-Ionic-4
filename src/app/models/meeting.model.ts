import { Project } from './project.model';
import { User } from './user.model';

export interface Meeting {
    _id: string;
    subject: string;
    description: string;
    chef: any;
    date: string;
    duration: string;
    selectedProject: any;
    created_at: string;
    updated_at: string;
}
