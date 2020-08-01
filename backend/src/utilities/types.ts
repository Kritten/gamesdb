export interface BaseEntity {
    [key: string]: any;
}

export interface BaseInputData {
    [key: string]: any;
}

export interface BaseService {
    find(data: {});
}