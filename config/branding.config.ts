export const brandingConfig = {
  company: {
    name: 'Luxe Salon',
    tagline: 'Experience Luxury & Style',
    logo: '/images/logo.svg',
    logoAlt: '/images/logo.svg',
    favicon: '/favicon.ico',
  },
  images: {
    hero: '/images/hero.jpg',
    placeholder: '/images/placeholder.png',
  },
  contact: {
    email: 'contact@luxesalon.com',
    phone: '+1 234 567 8900',
    address: '123 Luxury Lane, Beverly Hills',
  },
  social: {
    facebook: '',
    instagram: '',
    twitter: '',
  },
} as const;

export type BrandingConfig = typeof brandingConfig;
