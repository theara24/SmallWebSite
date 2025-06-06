import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route } from '../types';

export const Contact = (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): HTMLElement => {
  const contact = document.createElement('div');
  contact.className = 'w-full overflow-auto';

  // === Navbar ===
  contact.appendChild(Navbar(routes, darkMode, toggleDarkMode));

  // === Hero Section ===
  const hero = document.createElement('section');
  hero.className =
    'hero min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--background)]';
  hero.id = 'contact';

  const particles = document.createElement('div');
  particles.className = 'particles absolute w-full h-full z-[1]';

  const heroContent = document.createElement('div');
  heroContent.className =
    'hero-content text-center max-w-[800px] z-[2] opacity-0 translate-y-[50px]';

  const title = document.createElement('h1');
  title.className = 'font-black text-4xl md:text-5xl mb-6';
  title.textContent = 'Contact Us';

  const subtitle = document.createElement('p');
  subtitle.className =
    'text-lg text-[var(--text-secondary)] mb-10 max-w-[600px] mx-auto';
  subtitle.textContent =
    'Have questions or feedback? We’d love to hear from you. Fill out the form below and we’ll get back to you shortly.';

  heroContent.appendChild(title);
  heroContent.appendChild(subtitle);
  hero.appendChild(particles);
  hero.appendChild(heroContent);
  contact.appendChild(hero);

  // === Contact Form Section ===
  const contactSection = document.createElement('section');
  contactSection.className =
    'py-24 px-6 md:px-12 lg:px-20 bg-[var(--background)]';

  const formContainer = document.createElement('div');
  formContainer.className =
    'glass max-w-4xl mx-auto rounded-2xl p-10 shadow-xl';

  const formTitle = document.createElement('h2');
  formTitle.className = 'text-2xl font-semibold text-center mb-8';
  formTitle.textContent = 'Send Us a Message';

  const form = document.createElement('form');
  form.className = 'grid grid-cols-1 md:grid-cols-2 gap-6';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = 'Your Name';
  nameInput.required = true;
  nameInput.className =
    'bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-4 py-3 rounded-lg col-span-2';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Your Email';
  emailInput.required = true;
  emailInput.className =
    'bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-4 py-3 rounded-lg col-span-2';

  const messageTextarea = document.createElement('textarea');
  messageTextarea.placeholder = 'Your Message';
  messageTextarea.required = true;
  messageTextarea.className =
    'bg-transparent border border-[var(--text-secondary)] text-[var(--text-primary)] px-4 py-3 rounded-lg col-span-2 min-h-[150px]';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Send Message';
  submitBtn.className =
    'btn btn-primary mt-4 col-span-2 px-10 py-4 text-lg rounded-full font-semibold transition-all duration-300 ease-out';

  form.appendChild(nameInput);
  form.appendChild(emailInput);
  form.appendChild(messageTextarea);
  form.appendChild(submitBtn);

  formContainer.appendChild(formTitle);
  formContainer.appendChild(form);
  contactSection.appendChild(formContainer);
  contact.appendChild(contactSection);

  // === Footer ===
  contact.appendChild(Footer());

  // === GSAP Animation for Hero ===
  gsap.to(heroContent, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.5,
    ease: 'power3.out',
  });

  // === Generate Particles ===
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particles.appendChild(particle);
  }

  return contact;
};
