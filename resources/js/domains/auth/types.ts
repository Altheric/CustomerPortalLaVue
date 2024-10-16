export interface Credentials {
    email: string;
    password: string;
}

export interface ResetCreds extends Credentials {
    token?: string;   
}

export interface NewCreds extends Credentials{
    name: string
}