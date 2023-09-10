type CheckForValidProps = {
  username: string;
  email: string;
  password: string;
};

export const checkForValid = ({ username, email, password }: CheckForValidProps) => {
  const isUserNameValid = /^[a-zA-Z0-9_]{3,16}$/.test(username);
  const isEmailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email
  );
  const isPasswordValid =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
      password
    );

  if (!isUserNameValid) return 'Username is invalid!';
  if (!isEmailValid) return 'Email is invalid!';
  if (!isPasswordValid) return 'Password is invalid!';

  return null;
};
