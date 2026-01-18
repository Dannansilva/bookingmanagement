export const brandingConfig = {
  company: {
    name: 'Booking Management',
    tagline: 'Manage your bookings with ease',
    logo: '/images/logo.svg',
    logoAlt: '/images/logo.svg',
    favicon: '/favicon.ico',
  },
  images: {
    hero: '/images/hero.jpg',
    placeholder: '/images/placeholder.png',
  },
  contact: {
    email: 'contact@example.com',
    phone: '+1 234 567 8900',
    address: '123 Business Street',
  },
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
} as const;

export type BrandingConfig = typeof brandingConfig;
