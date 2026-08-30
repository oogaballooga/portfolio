export const pfpImages = [
  { src: '/images/pfp/image.webp', alt: 'Portrait of Oscar Eriksen' },
  { src: '/images/pfp/image1.webp', alt: 'Portrait of Oscar Eriksen' },
];

export type ContactLink = {
  id: 'email' | 'linkedin' | 'github' | 'resume';
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

export const contactContent = {
  greeting: "Hi, I'm",
  name: 'Oscar Eriksen',
  introduction: 'M.S. Computer Science graduate student at Seattle University.',
  scrollPrompt: '↓ Scroll down for more ↓',
  links: [
    {
      id: 'email',
      href: 'mailto:oscareriksen.work@gmail.com',
      label: 'Email',
    },
    { id: 'linkedin', href: 'https://linkedin.com/in/ooga', label: 'LinkedIn' },
    { id: 'github', href: 'https://github.com/oogaballooga', label: 'GitHub' },
    {
      id: 'resume',
      href: '/Oscar-Eriksen-Resume.pdf',
      label: 'Resume',
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  ] satisfies ContactLink[],
};
