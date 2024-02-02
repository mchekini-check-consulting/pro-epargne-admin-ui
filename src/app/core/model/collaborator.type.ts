export type CollaboratorType = {
    id: number;
    lastName: string;
    firstName: string;
    gender: string;
    birthDate: string;
    entryDate: string;
    email: string;
    grossSalary: number;
};

export type CreateCollaboratorType = Omit<CollaboratorType, 'id'>;
