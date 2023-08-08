import { IAuthor }  from "../../../models";


declare module 'knex/types/tables' {
    interface Table {
        Author: IAuthor
        // Post: IPost
        // Comment: IComment
    }
}