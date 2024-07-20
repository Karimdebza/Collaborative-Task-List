export interface TaskInterfaceTs {
    id_task:number;
    name:string;
    description:string;
    date_of_create:Date;
    date_of_expiry:Date;
    id_user:number
    id_task_list:number;
    timeSpent: number; // en minutes
    startTime?: Date;
    isTracking: boolean;
    status?: string;
}
