export interface Task {
    id_task? : number;
    name : string;
    description: string;
    date_of_create: Date;
    date_of_expiry: Date;
    id_user?:number;
    id_task_list?:number;
    timeSpent : number;
    startTime :Date;
    isTracking : boolean;
    is_public?:boolean;


}