export const Footer = (): HTMLElement => {
  const footer = document.createElement('footer');
  footer.className =
    'bg-[rgba(15,15,35,0.9)] text-[var(--text-primary)] py-8 backdrop-blur-[20px]';

  const container = document.createElement('div');
  container.className = 'max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8';

  const content = document.createElement('div');
  content.className = 'flex flex-col md:flex-row justify-between items-center';

  const copyright = document.createElement('div');
  copyright.className = 'mb-4 md:mb-0';
  copyright.innerHTML = `
    <p>© ${new Date().getFullYear()} ShopEasy. All rights reserved.</p>
  `;

  const links = document.createElement('div');
  links.className = 'flex space-x-6';

  const linkItems = [
    { text: 'Privacy Policy', href: '#/privacy' },
    { text: 'Terms of Service', href: '#/terms' },
    { text: 'Contact Us', href: '#/contact' },
  ];

  linkItems.forEach((item) => {
    const link = document.createElement('a');
    link.href = item.href;
    link.className =
      'text-[var(--text-primary)] hover:text-[var(--primary)] transition-colors';
    link.textContent = item.text;
    links.appendChild(link);
  });

  content.appendChild(copyright);
  content.appendChild(links);
  container.appendChild(content);
  footer.appendChild(container);

  return footer;
};
