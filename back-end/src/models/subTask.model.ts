export interface SubTask {
    id_subTask?: number;
    name: string;
    description: string;
    date_of_create?: Date;
    date_of_expiry?: Date;
    id_task?: number;
    isCompleted: boolean;
}