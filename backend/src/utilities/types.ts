export interface BaseEntity {
  id: number;
  [key: string]: any;
}

export interface BaseInputData {
  [key: string]: any;
}

export type Modify<T, R> = Omit<T, keyof R> & R;

export type InputDatabaseRelation = { connect: Array<{ id: string }> }
