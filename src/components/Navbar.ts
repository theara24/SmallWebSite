import { Route } from '../types';

export const Navbar = (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): HTMLElement => {
  const nav = document.createElement('nav');
  nav.className =
    'navbar glass-nav fixed top-0 w-full z-[1000] py-4 transition-all duration-300 ease-out';

  const container = document.createElement('div');
  container.className =
    'nav-container max-w-[1400px] mx-auto px-8 flex justify-between items-center';

  // Logo
  const logoLink = document.createElement('a');
  logoLink.href = '#/';
  logoLink.className = 'logo cursor-pointer';
  logoLink.textContent = 'ShopEasy';
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/';
  });

  // Navigation Links
  const navLinks = document.createElement('ul');
  navLinks.className = 'nav-links flex gap-8 list-none md:flex hidden';

  routes.forEach((route) => {
    if (route.path === '#/product/') return; // Skip dynamic product route
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = route.path;
    link.className =
      'text-[var(--text-primary)] no-underline font-medium relative transition-all duration-300 ease-out';
    link.textContent = route.title;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = route.path;
    });
    li.appendChild(link);
    navLinks.appendChild(li);
  });

  // Buttons
  const navButtons = document.createElement('div');
  navButtons.className = 'nav-buttons flex gap-4 items-center';

  const browseButton = document.createElement('a');
  browseButton.href = '#/products';
  browseButton.className =
    'btn btn-glass px-6 py-3 rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out text-[var(--text-primary)]';
  browseButton.textContent = 'Browse';
  browseButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/products';
  });

  const darkModeToggle = document.createElement('button');
  darkModeToggle.className =
    'btn btn-glass px-6 py-3 rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out';
  darkModeToggle.innerHTML = darkMode ? '☀️' : '🌙';
  darkModeToggle.onclick = toggleDarkMode;

  const getStartedButton = document.createElement('a');
  getStartedButton.href = '#/contact';
  getStartedButton.className =
    'btn btn-primary px-6 py-3 rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out text-white';
  getStartedButton.textContent = 'Get Started';
  getStartedButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '#/contact';
  });

  // Ripple effect
  [browseButton, getStartedButton].forEach((btn) => {
    btn.addEventListener('click', (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `;
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Mobile Menu Button
  const mobileMenuButton = document.createElement('button');
  mobileMenuButton.className =
    'md:hidden btn btn-glass px-6 py-3 rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out';
  mobileMenuButton.innerHTML = '☰';
  mobileMenuButton.onclick = () => {
    mobileMenu.classList.toggle('hidden');
  };

  navButtons.appendChild(darkModeToggle);
  navButtons.appendChild(browseButton);
  navButtons.appendChild(getStartedButton);
  navButtons.appendChild(mobileMenuButton);

  // Mobile Menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className =
    'md:hidden hidden absolute top-16 left-0 right-0 bg-[rgba(15,15,35,0.9)] backdrop-blur-[20px] shadow-lg z-50';

  const mobileMenuContainer = document.createElement('ul');
  mobileMenuContainer.className = 'px-2 pt-2 pb-3 space-y-1';

  routes.forEach((route) => {
    if (route.path === '#/product/') return;
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = route.path;
    link.className =
      'block px-3 py-2 rounded-md text-base font-medium text-[var(--text-primary)] hover:text-[var(--primary)]';
    link.textContent = route.title;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = route.path;
      mobileMenu.classList.add('hidden'); // Close mobile menu after click
    });
    li.appendChild(link);
    mobileMenuContainer.appendChild(li);
  });

  mobileMenu.appendChild(mobileMenuContainer);

  // Assemble navbar
  container.appendChild(logoLink);
  container.appendChild(navLinks);
  container.appendChild(navButtons);
  nav.appendChild(container);
  nav.appendChild(mobileMenu);

  // Scroll effect
  let lastScrollY = window.scrollY;
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScrollY = currentScrollY;
  };
  window.addEventListener('scroll', handleScroll);

  return nav;
};
