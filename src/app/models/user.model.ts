export class User {
    id?: number;
    username?: string;
    email?: string
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
}

export interface _User {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
 }