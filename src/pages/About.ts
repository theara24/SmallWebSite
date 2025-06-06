import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route } from '../types';

export const About = (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): HTMLElement => {
  const about = document.createElement('div');
  about.className =
    'min-h-screen overflow-y-auto bg-[var(--background)] text-[var(--text-primary)]';

  /** -------------------- Hero Section -------------------- **/
  const hero = document.createElement('section');
  hero.className =
    'hero h-screen flex items-center justify-center relative overflow-hidden';
  hero.id = 'about';

  const particles = document.createElement('div');
  particles.className = 'particles absolute w-full h-full z-[1]';

  const heroContent = document.createElement('div');
  heroContent.className =
    'hero-content text-center max-w-[800px] z-[2] opacity-0 translate-y-[50px]';

  const heroTitle = document.createElement('h1');
  heroTitle.className = 'font-black text-5xl mb-6';
  heroTitle.textContent = 'About Me';

  const heroSubtitle = document.createElement('p');
  heroSubtitle.className =
    'text-[1.3rem] text-[var(--text-secondary)] mb-10 max-w-[600px] mx-auto';
  heroSubtitle.textContent =
    'Hi, I’m Theara – a passionate web designer and full-stack developer with a vision to build modern, user-friendly digital experiences.';

  const heroButtons = document.createElement('div');
  heroButtons.className = 'hero-buttons flex gap-6 justify-center flex-wrap';

  const exploreButton = document.createElement('a');
  exploreButton.href = '#/projects';
  exploreButton.className =
    'btn btn-primary btn-hero px-10 py-4 text-[1.1rem] rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out text-white';
  exploreButton.textContent = 'See My Work';

  heroButtons.appendChild(exploreButton);
  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroSubtitle);
  heroContent.appendChild(heroButtons);
  hero.appendChild(particles);
  hero.appendChild(heroContent);

  /** -------------------- Mission Section -------------------- **/
  const missionSection = document.createElement('section');
  missionSection.className = 'py-32 px-8 max-w-[1200px] mx-auto';

  const missionHeader = document.createElement('div');
  missionHeader.className = 'section-header fade-in text-center mb-16';

  const missionTitle = document.createElement('h2');
  missionTitle.className = 'section-title font-extrabold mb-4';
  missionTitle.textContent = 'My Mission';

  const missionSubtitle = document.createElement('p');
  missionSubtitle.className =
    'section-subtitle text-[1.2rem] text-[var(--text-secondary)] max-w-[700px] mx-auto';
  missionSubtitle.textContent =
    'My mission is to craft innovative and accessible digital solutions that make people’s lives easier and more connected through design and code.';

  missionHeader.appendChild(missionTitle);
  missionHeader.appendChild(missionSubtitle);
  missionSection.appendChild(missionHeader);

  /** -------------------- Timeline Section -------------------- **/
  const timelineSection = document.createElement('section');
  timelineSection.className = 'py-32 px-8 max-w-[1200px] mx-auto';

  const timelineHeader = document.createElement('div');
  timelineHeader.className = 'section-header fade-in text-center mb-16';

  const timelineTitle = document.createElement('h2');
  timelineTitle.className = 'section-title font-extrabold mb-4';
  timelineTitle.textContent = 'My Journey';

  const timelineSubtitle = document.createElement('p');
  timelineSubtitle.className =
    'section-subtitle text-[1.2rem] text-[var(--text-secondary)] max-w-[700px] mx-auto';
  timelineSubtitle.textContent =
    'From a student with a dream to a builder of complete digital experiences.';

  const timeline = document.createElement('div');
  timeline.className = 'relative';

  const timelineItems = [
    {
      year: '2022',
      event: 'Started my journey in web development & design.',
    },
    {
      year: '2023',
      event: 'Learned React, Tailwind, UX/UI, and completed personal projects.',
    },
    {
      year: '2024',
      event: 'Built real-world portfolio and e-commerce platforms.',
    },
    {
      year: '2025',
      event:
        'Launched “JobSeek” and continue growing as a full-stack developer.',
    },
  ];

  timelineHeader.appendChild(timelineTitle);
  timelineHeader.appendChild(timelineSubtitle);
  timelineSection.appendChild(timelineHeader);

  timelineItems.forEach((item, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `fade-in flex items-center mb-12 ${
      index % 2 === 0 ? 'justify-start' : 'justify-end'
    }`;
    timelineItem.innerHTML = `
      <div class="glass rounded-[20px] p-6 w-full md:w-1/2 ${
        index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
      }">
        <h3 class="text-xl font-bold text-[var(--primary)]">${item.year}</h3>
        <p class="text-[var(--text-secondary)]">${item.event}</p>
      </div>
    `;
    timeline.appendChild(timelineItem);
  });

  const timelineLine = document.createElement('div');
  timelineLine.className =
    'absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--primary)] opacity-20';
  timeline.appendChild(timelineLine);
  timelineSection.appendChild(timeline);

  /** -------------------- Me Section -------------------- **/
  const meSection = document.createElement('section');
  meSection.className = 'py-32 px-8 max-w-[1000px] mx-auto fade-in text-center';

  const profileCard = document.createElement('div');
  profileCard.className =
    'glass rounded-[20px] p-10 text-center max-w-[400px] mx-auto';

  profileCard.innerHTML = `
    <img src="../../public/assets/profile.JPG"
         alt="Xuxu"
         class="w-28 h-28 rounded-full mx-auto mb-4 object-cover shadow-md">
    <h3 class="text-2xl font-bold text-[var(--text-primary)]">Chim Theara</h3>
    <p class="text-[var(--text-secondary)]">Founder & Full-Stack Developer</p>
    <p class="mt-4 text-sm text-[var(--text-secondary)]">
      Building meaningful projects, one line of code at a time. Passionate about UI/UX, clean architecture, and solving real problems.
    </p>
  `;

  meSection.appendChild(profileCard);

  /** -------------------- Assemble Page -------------------- **/
  about.appendChild(Navbar(routes, darkMode, toggleDarkMode));
  about.appendChild(hero);
  about.appendChild(missionSection);
  about.appendChild(timelineSection);
  about.appendChild(meSection);
  about.appendChild(Footer());

  /** -------------------- GSAP Hero Animation -------------------- **/
  gsap.to(heroContent, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.5,
    ease: 'power3.out',
  });

  /** -------------------- Particle Animation -------------------- **/
  const particleCount = 40;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = Math.random() * 10 + 15 + 's';
    particles.appendChild(particle);
  }

  /** -------------------- Intersection Observer -------------------- **/
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  setTimeout(() => {
    about.querySelectorAll('.fade-in').forEach((el) => {
      observer.observe(el);
    });
  }, 0); // wait for DOM paint

  return about;
};
