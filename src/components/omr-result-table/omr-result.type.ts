export enum Status {
    PENDING = 'PENDING',
    DONE = 'DONE',
    FAILED = 'FAILED',
}

export enum Action {
    EDIT = 'EDIT',
    DELETE = 'DELETE',
}

export interface Omr {
    id?: string;
    imageName: string;
    roll: string;
    marks: number;
    status: `${Status}`;
    action?: `${Action}`;
    isRechecked: boolean;
}
