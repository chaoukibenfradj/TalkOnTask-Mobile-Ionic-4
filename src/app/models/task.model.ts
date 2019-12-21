import { Project } from './project.model';
import { User } from './user.model';

export interface Task {
    _id: string;
    projectId: Project;
    devTeamId: User[] | string;
    taskTitle: string;
    taskDescription: string;
    start_date: string;
    end_date: string;
    state: string;
    created_at: string;
    updated_at: string;
}
