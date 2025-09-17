export type SignUp = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignIn = {
  email: string;
  password: string;
};

export type SignInFormState = {
  success: boolean;
  message: string | null;
  userId: string | null;
};
