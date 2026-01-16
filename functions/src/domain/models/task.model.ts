import {TaskStatus} from "./task-status.enum";

export interface Task {
   id?: string;
   supervisorId: string;
   assignedToId: string;
   priority: Priorities;
   title: string;
   description: string;
   status: TaskStatus;
   createdAt?: Date;
}

export enum Priorities{
   BAJA,
   MEDIA,
   ALTA
}