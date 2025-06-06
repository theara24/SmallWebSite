import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route, Product } from '../types';
import { fetchProducts } from '../api';
import { ProductCard } from '../components/ProductCard';

export const Products = async (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): Promise<HTMLElement> => {
  const productsPage = document.createElement('div');

  // Hero Section
  const hero = document.createElement('section');
  hero.className =
    'hero mt-20 h-[60vh] flex items-center justify-center relative overflow-hidden';
  hero.id = 'products';

  const particles = document.createElement('div');
  particles.className = 'particles absolute w-full h-full z-[1]';

  const heroContent = document.createElement('div');
  heroContent.className =
    'hero-content text-center max-w-[800px] z-[2] opacity-0 translate-y-[50px]';

  const heroTitle = document.createElement('h1');
  heroTitle.className = 'font-black mb-6';
  heroTitle.textContent = 'Explore Our Products';

  const heroSubtitle = document.createElement('p');
  heroSubtitle.className =
    'text-[1.3rem] text-[var(--text-secondary)] mb-10 max-w-[600px] mx-auto';
  heroSubtitle.textContent =
    'Discover a wide range of premium products designed to enhance your lifestyle.';

  const heroButtons = document.createElement('div');
  heroButtons.className = 'hero-buttons flex gap-6 justify-center flex-wrap';

  const shopNowButton = document.createElement('a');
  shopNowButton.href = '#/';
  shopNowButton.className =
    'btn btn-primary btn-hero px-10 py-4 text-[1.1rem] rounded-[50px] font-semibold cursor-pointer transition-all duration-300 ease-out text-white';
  shopNowButton.textContent = 'Shop Now';

  heroButtons.appendChild(shopNowButton);
  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroSubtitle);
  heroContent.appendChild(heroButtons);
  hero.appendChild(particles);
  hero.appendChild(heroContent);

  // Products Section
  const productsSection = document.createElement('section');
  productsSection.className =
    'products-section py-32 px-8 max-w-[1400px] mx-auto';

  const productsHeader = document.createElement('div');
  productsHeader.className = 'section-header fade-in text-center mb-16';

  const productsTitle = document.createElement('h2');
  productsTitle.className = 'section-title font-extrabold mb-4';
  productsTitle.textContent = 'All Products';

  const productsSubtitle = document.createElement('p');
  productsSubtitle.className =
    'section-subtitle text-[1.2rem] text-[var(--text-secondary)] max-w-[600px] mx-auto';
  productsSubtitle.textContent =
    'Browse our full collection of high-quality items.';

  productsHeader.appendChild(productsTitle);
  productsHeader.appendChild(productsSubtitle);

  const productsGrid = document.createElement('div');
  productsGrid.className =
    'products-grid grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-8 mt-12';

  // Loading spinner
  const loading = document.createElement('div');
  loading.className = 'loading flex justify-center items-center h-[200px]';
  const spinner = document.createElement('div');
  spinner.className = 'spinner w-[50px] h-[50px] rounded-full';
  loading.appendChild(spinner);
  productsGrid.appendChild(loading);

  productsSection.appendChild(productsHeader);
  productsSection.appendChild(productsGrid);

  // Fetch and display products
  const { data: products, error } = await fetchProducts();

  if (error) {
    productsGrid.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center';
    errorMessage.textContent = error;
    productsGrid.appendChild(errorMessage);
  } else if (products) {
    productsGrid.innerHTML = '';
    products.forEach((product: Product, index: number) => {
      const productCard = ProductCard(product);
      productCard.style.opacity = '0';
      productCard.style.transform = 'translateY(50px)';
      productsGrid.appendChild(productCard);

      // GSAP animation
      setTimeout(() => {
        gsap.to(productCard, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          delay: index * 0.1,
        });
      }, index * 150);
    });
  }

  // Assemble page
  productsPage.appendChild(Navbar(routes, darkMode, toggleDarkMode));
  productsPage.appendChild(hero);
  productsPage.appendChild(productsSection);
  productsPage.appendChild(Footer());

  // GSAP hero animation
  gsap.to(heroContent, {
    opacity: 1,
    y: 0,
    duration: 1.2,
    delay: 0.5,
    ease: 'power3.out',
  });

  // Create particles
  const particleCount = 50;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = Math.random() * 10 + 15 + 's';
    particles.appendChild(particle);
  }

  // Scroll animations
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
  document.querySelectorAll('.fade-in').forEach((el) => {
    observer.observe(el);
  });

  return productsPage;
};
