export interface Comment {
    id_comment?:number ;
    content:string;
    date_of_create?:Date;
    id_user :number| null;
    id_task :number | null;
}
