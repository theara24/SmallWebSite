import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route } from '../types';

export const NotFound = async (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): Promise<HTMLElement> => {
  const notFoundPage = document.createElement('div');

  const section = document.createElement('section');
  section.className =
    'not-found-section h-screen flex items-center justify-center relative bg-[var(--bg-primary)]';

  const content = document.createElement('div');
  content.className =
    'text-center p-8 rounded-[20px] bg-[var(--glass-bg)] border border-[var(--glass-border)] backdrop-blur-[20px] max-w-[600px] mx-auto';

  const title = document.createElement('h1');
  title.className = 'text-5xl font-extrabold text-red-500 mb-6';
  title.textContent = '404 - Page Not Found';

  const message = document.createElement('p');
  message.className = 'text-xl text-[var(--text-secondary)] mb-8';
  message.textContent =
    'Sorry, the page you’re looking for doesn’t exist. Let’s get you back on track!';

  const homeButton = document.createElement('a');
  homeButton.href = '#/';
  homeButton.className =
    'btn btn-primary px-10 py-4 text-[1.2rem] rounded-[50px] font-bold cursor-pointer text-white hover:shadow-[0_15px_35px_rgba(99,102,241,0.5)]';
  homeButton.textContent = 'Return to Home';

  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(homeButton);
  section.appendChild(content);

  notFoundPage.appendChild(Navbar(routes, darkMode, toggleDarkMode));
  notFoundPage.appendChild(section);
  notFoundPage.appendChild(Footer());

  return notFoundPage;
};
