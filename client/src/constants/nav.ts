import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ChatIcon from '@mui/icons-material/Chat';
import VideoChatIcon from '@mui/icons-material/VideoChat';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const homepageLinks = [
  {
    page: 'Home',
    url: '/',
  },
  {
    page: 'About',
    url: '/about',
  },
  {
    page: 'Services',
    url: '/services',
  },
  {
    page: 'Contact',
    url: '/contact',
  },
];

export const homepageStats = [
  { label: 'Patients', value: '50000+' },
  { label: 'Satisfaction', value: '98%' },
  { label: 'Doctors', value: '50+' },
  { label: 'Access', value: '24/7' },
];

export const homepageServices = [
  {
    icon: EventAvailableIcon,
    type: 'Easy Scheduling',
    text: 'Effortlessly schedule your dental appointments from the comfort of your home, saving time and hassle  with our user-friendly booking system',
  },
  {
    icon: VideoChatIcon,
    type: 'Secure Video Consultation',
    text: 'Access a vast network of trusted dental professionals, providing you with personalisedl care and expert advice tailored to your needs.',
  },
  {
    icon: ChatIcon,
    type: 'Secure Messaging',
    text: 'Communicate with your healthcare provider safely and privately.',
  },
];

export const homepageSteps = [
  {
    label: 'Sign up',
    text: 'Register by creating an account on the registration page',
  },
  {
    label: 'Book an Appointment',
    text: 'Schedule a meeting with any of our qualified doctors',
  },
  {
    label: 'Connect for Consultation',
    text: 'Connect with via secure video consultation or messaging to get expert medical advice and management plans',
  },
  {
    label: 'Follow-up Care',
    text: 'Personalised follow-up sessions to ensure effectiveness of management plans',
  },
];

export const homepageInfo = [
  {
    label: 'About Us',
    infoLinks: [
      { name: 'Contact Us', link: '' },
      { name: 'Services', link: '' },
      { name: 'Our Process', link: '' },
    ],
  },
  {
    label: 'Legal',
    infoLinks: [
      { name: 'Terms of Service', link: '' },
      { name: 'Privacy Policy', link: '' },
    ],
  },
  {
    label: 'Social Media',
    infoLinks: [
      { name: 'Twitter', link: '' },
      { name: 'Instagram', link: '' },
      { name: 'LinkedIn', link: '' },
    ],
  },
];

export const patientDrawer = [
  { name: 'Profile', icon: PersonIcon },
  { name: 'Chat', icon: ChatIcon },
  { name: 'Setting', icon: SettingsIcon },
];
