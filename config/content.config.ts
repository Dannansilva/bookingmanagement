export const contentConfig = {
  currency: {
    code: 'LKR',
    symbol: 'Rs.',
    locale: 'en-LK',
  },
  pages: {
    login: {
      title: 'Welcome Back',
      description: 'Sign in to Booking Management System',
    },
    home: {
      title: 'Dashboard',
      description: 'Overview of your wellness business',
    },
    booking: {
      title: 'Bookings',
      description: 'Manage your appointments',
    },
  },
  buttons: {
    signIn: 'Sign In',
    signOut: 'Sign Out',
    book: 'Book Now',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
  },
  labels: {
    email: 'Email',
    password: 'Password',
  },
  placeholders: {
    email: 'Enter your email',
    password: 'Enter your password',
  },
  messages: {
    success: 'Operation completed successfully',
    error: 'Something went wrong. Please try again.',
    loginSuccess: 'Welcome back!',
    loginError: 'Invalid email or password',
  },
} as const;

export type ContentConfig = typeof contentConfig;
