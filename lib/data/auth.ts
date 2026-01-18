import mockData from '@/mockData.json';

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
  permissions: string[];
}

export interface LoginResult {
  success: boolean;
  user?: User;
  error?: string;
}

export const validateLogin = async (email: string, password: string): Promise<LoginResult> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Find user by email (case-insensitive)
  const user = mockData.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return { success: false, error: 'Invalid email or password' };
  }

  // For demo purposes, accept any password for valid emails
  // In production, this would validate against hashed passwords
  if (password.length < 1) {
    return { success: false, error: 'Password is required' };
  }

  return {
    success: true,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      permissions: user.permissions,
    },
  };
};

export const getUsers = async () => mockData.users;
