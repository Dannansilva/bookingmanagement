export const brandingConfig = {
  company: {
    name: 'Booking management system',
    tagline: 'customized booking management system',
    logo: '/images/logo.png',
    logoAlt: '/images/logo-alt.png',
    favicon: '/favicon.ico',
  },
  images: {
    hero: '/images/hero.jpg',
    placeholder: '/images/placeholder.png',
  },
  contact: {
    email: 'contact@bookingmanagement.com',
    phone: '+94 11 234 5678',
    address: 'Colombo, Sri Lanka',
  },
  social: {
    facebook: 'https://facebook.com/bookingmanagement',
    instagram: 'https://instagram.com/bookingmanagement',
    twitter: '',
  },
} as const;

export type BrandingConfig = typeof brandingConfig;
