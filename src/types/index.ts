type SigninType = {
    email: string;
    password: string;
}
type SignupType = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type { SigninType, SignupType };