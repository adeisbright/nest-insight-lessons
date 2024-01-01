export interface Cursor {
  beforeCursor: string | null;
  afterCursor: string | null;
}

export interface ICursor {
  name: string;
  cursorObj: Cursor;
}

export enum OrderEnum {
  ASC = 'ASc',
  DESC = 'DESC',
}
export interface IOrderBy {
  sortString: string;
  order: 'ASC' | 'DESC';
}
