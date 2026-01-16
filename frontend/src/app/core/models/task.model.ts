export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
   id: any;
   supervisorId: string;
   assignedToId: string;
   assignedUser: AssignedUser;
   title: string;
   description: string;
   status: TaskStatus;
   priority?: Priorities;
   createdAt: string | Date;
}

export type TaskAction = 'edit' | 'delete' | 'create';

export interface TaskWithAction extends Task {
   action: TaskAction;
}

export interface AssignedUser {
   name: string;
   lastname: string;
   email: string;
}

export enum Priorities {
   High = 'ALTA',
   Medium = 'MEDIA',
   Low = 'BAJA'
 }

 export const priorityColors: Record<Priorities, string> = {
   [Priorities.High]: '#ec5353',
   [Priorities.Medium]: '#ee7917',
   [Priorities.Low]: '#16a34a',
 };
