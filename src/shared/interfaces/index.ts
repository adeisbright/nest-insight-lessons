export interface Cursor {
    beforeCursor : string | null 
    afterCursor : string | null 
}

export interface ICursor {
    name : string 
    cursorObj : Cursor
}