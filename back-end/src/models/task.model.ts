export interface Task {
    id_task? : number;
    name : string;
    description: string;
    date_of_create: Date;
    date_of_expire: Date;
    id_use?:number;
    id_task_user?:number;

}