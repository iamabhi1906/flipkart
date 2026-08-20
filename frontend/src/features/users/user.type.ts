export interface loginFormData {
    email: string;
    password: string;
}

export interface signupFormData {
    email: string;
    username: string;
    password: string;
}

export interface user {
    uuid: string;
    email: string;
    username: string;
    password: string;
    role: string;
}

export interface userState {
    user: user | null;
    loading: boolean;
    error: any | null;
}