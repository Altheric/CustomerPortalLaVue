export interface Credentials {
    email: string;
    password: string;
}

export interface ResetCreds {
    email: string;
    token?: string;   
}

export interface NewCreds extends Credentials{
    name: string
}