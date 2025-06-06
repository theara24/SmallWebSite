import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route, Product } from '../types';
import { fetchProducts } from '../api';
import { ProductCard } from '../components/ProductCard';
import gsap from 'gsap';

export const Home = async (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void
): Promise<HTMLElement> => {
  const home = document.createElement('div');

  // ======= NAVBAR =======
  home.appendChild(Navbar(routes, darkMode, toggleDarkMode));

  // ======= HERO SECTION =======
  const hero = document.createElement('section');
  hero.id = 'home';
  hero.className =
    'hero h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)]';

  const particles = document.createElement('div');
  particles.className = 'particles absolute w-full h-full z-[1]';

  // Create colorful floating particles
  const particleCount = 60;
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle rounded-full absolute';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.width = `${Math.random() * 6 + 2}px`;
    particle.style.height = `${Math.random() * 6 + 2}px`;
    particle.style.background = `rgba(${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, 0.3)`;
    particle.style.animationDelay = `${Math.random() * 15}s`;
    particle.style.animationDuration = `${Math.random() * 12 + 18}s`;
    particles.appendChild(particle);
  }

  const heroContent = document.createElement('div');
  heroContent.className =
    'hero-content text-center max-w-[900px] z-[2] opacity-0 translate-y-[60px] px-6';

  const heroTitle = document.createElement('h1');
  heroTitle.className =
    'font-extrabold text-[clamp(3rem,8vw,6.5rem)] mb-6 leading-tight';
  heroTitle.innerHTML =
    'Shop the <span class="text-[var(--primary)]">Future</span>';

  const heroSubtitle = document.createElement('p');
  heroSubtitle.className =
    'text-[1.4rem] text-[var(--text-secondary)] mb-10 max-w-[700px] mx-auto';
  heroSubtitle.textContent =
    'Elevate your shopping with cutting-edge designs, seamless navigation, and a curated selection that redefines e-commerce.';

  const heroButtons = document.createElement('div');
  heroButtons.className = 'hero-buttons flex gap-8 justify-center flex-wrap';

  const exploreButton = document.createElement('a');
  exploreButton.href = '#products';
  exploreButton.className =
    'btn btn-primary btn-hero px-12 py-5 text-[1.2rem] rounded-[60px] font-bold cursor-pointer transition-all duration-300 ease-out text-white hover:shadow-[0_15px_35px_rgba(99,102,241,0.5)]';
  exploreButton.textContent = 'Explore Now';

  const learnMoreButton = document.createElement('a');
  learnMoreButton.href = '#about';
  learnMoreButton.className =
    'btn btn-glass btn-hero px-12 py-5 text-[1.2rem] rounded-[60px] font-bold cursor-pointer transition-all duration-300 ease-out text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.3)]';
  learnMoreButton.textContent = 'Learn More';

  heroButtons.appendChild(exploreButton);
  heroButtons.appendChild(learnMoreButton);

  heroContent.appendChild(heroTitle);
  heroContent.appendChild(heroSubtitle);
  heroContent.appendChild(heroButtons);

  hero.appendChild(particles);
  hero.appendChild(heroContent);

  home.appendChild(hero);

  // Animate hero content with GSAP
  gsap.fromTo(
    heroContent,
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.3, delay: 0.6, ease: 'power3.out' }
  );

  // ======= FEATURED PRODUCTS SECTION =======
  const featuredSection = document.createElement('section');
  featuredSection.id = 'products';
  featuredSection.className =
    'products-section py-24 px-8 max-w-[1400px] mx-auto bg-[rgba(15,15,35,0.95)] backdrop-blur-[20px] rounded-lg';

  // Section Header
  const featuredHeader = document.createElement('div');
  featuredHeader.className = 'section-header fade-in text-center mb-16';

  const featuredTitle = document.createElement('h2');
  featuredTitle.className = 'section-title font-extrabold text-[3.5rem] mb-6';
  featuredTitle.innerHTML =
    'Featured <span class="text-[var(--secondary)]">Products</span>';

  const featuredSubtitle = document.createElement('p');
  featuredSubtitle.className =
    'section-subtitle text-[1.3rem] text-[var(--text-secondary)] max-w-[700px] mx-auto';
  featuredSubtitle.textContent =
    'Explore our handpicked selection of premium products to inspire your next purchase.';

  featuredHeader.appendChild(featuredTitle);
  featuredHeader.appendChild(featuredSubtitle);

  // Products grid container
  const productsGrid = document.createElement('div');
  productsGrid.className =
    'products-grid grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-10 mt-14';

  // Loading spinner while fetching
  const loading = document.createElement('div');
  loading.className = 'loading flex justify-center items-center h-[250px]';
  const spinner = document.createElement('div');
  spinner.className =
    'spinner w-[60px] h-[60px] rounded-full border-[5px] border-t-[var(--primary)] border-[var(--glass-border)]';
  loading.appendChild(spinner);
  productsGrid.appendChild(loading);

  featuredSection.appendChild(featuredHeader);
  featuredSection.appendChild(productsGrid);
  home.appendChild(featuredSection);

  // Fetch products
  const { data: products, error } = await fetchProducts();

  if (error) {
    productsGrid.innerHTML = '';
    const errorMessage = document.createElement('p');
    errorMessage.className = 'text-red-500 text-center text-xl font-medium';
    errorMessage.textContent = error;
    productsGrid.appendChild(errorMessage);
  } else if (products) {
    productsGrid.innerHTML = '';
    products.slice(0, 6).forEach((product: Product, index: number) => {
      const productCard = ProductCard(product);
      productCard.style.opacity = '0';
      productCard.style.transform = 'translateY(60px)';
      productsGrid.appendChild(productCard);

      gsap.fromTo(
        productCard,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.15,
          onComplete: () => productCard.classList.add('visible'),
        }
      );
    });
  }

  // ======= CATEGORIES SECTION =======
  const categoriesSection = document.createElement('section');
  categoriesSection.id = 'categories';
  categoriesSection.className =
    'categories-section py-24 px-8 max-w-[1200px] mx-auto';

  const categoriesHeader = document.createElement('div');
  categoriesHeader.className = 'section-header fade-in text-center mb-12';

  const categoriesTitle = document.createElement('h2');
  categoriesTitle.className = 'section-title font-extrabold text-[3rem] mb-6';
  categoriesTitle.textContent = 'Shop by Categories';

  const categoriesSubtitle = document.createElement('p');
  categoriesSubtitle.className =
    'section-subtitle text-[1.2rem] text-[var(--text-secondary)] max-w-[700px] mx-auto';
  categoriesSubtitle.textContent =
    'Browse products sorted into the most popular categories.';

  categoriesHeader.appendChild(categoriesTitle);
  categoriesHeader.appendChild(categoriesSubtitle);

  // Category cards container
  const categoriesGrid = document.createElement('div');
  categoriesGrid.className =
    'categories-grid grid grid-cols-3 md:grid-cols-6 gap-8 mt-12';

  // Example categories (replace with dynamic data if available)
  const categoryList = [
    {
      name: 'Electronics',
      img: 'https://via.placeholder.com/150?text=Electronics',
    },
    { name: 'Fashion', img: 'https://via.placeholder.com/150?text=Fashion' },
    {
      name: 'Home & Garden',
      img: 'https://via.placeholder.com/150?text=Home+%26+Garden',
    },
    { name: 'Toys', img: 'https://via.placeholder.com/150?text=Toys' },
    { name: 'Sports', img: 'https://via.placeholder.com/150?text=Sports' },
    { name: 'Beauty', img: 'https://via.placeholder.com/150?text=Beauty' },
  ];

  categoryList.forEach(({ name, img }) => {
    const categoryCard = document.createElement('div');
    categoryCard.className =
      'category-card cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300';

    const categoryImg = document.createElement('img');
    categoryImg.src = img;
    categoryImg.alt = name;
    categoryImg.className = 'w-full h-32 object-cover';

    const categoryName = document.createElement('h3');
    categoryName.className = 'text-center font-semibold mt-4 text-lg';
    categoryName.textContent = name;

    categoryCard.appendChild(categoryImg);
    categoryCard.appendChild(categoryName);
    categoriesGrid.appendChild(categoryCard);
  });

  categoriesSection.appendChild(categoriesHeader);
  categoriesSection.appendChild(categoriesGrid);
  home.appendChild(categoriesSection);

  // ======= TESTIMONIALS SECTION =======
  const testimonialsSection = document.createElement('section');
  testimonialsSection.id = 'testimonials';
  testimonialsSection.className =
    'testimonials-section py-24 px-8 bg-[rgba(0,0,0,0.6)] max-w-[1100px] mx-auto rounded-lg';

  const testimonialsHeader = document.createElement('div');
  testimonialsHeader.className = 'section-header fade-in text-center mb-16';

  const testimonialsTitle = document.createElement('h2');
  testimonialsTitle.className = 'section-title font-extrabold text-[3rem] mb-6';
  testimonialsTitle.textContent = 'What Our Customers Say';

  const testimonialsSubtitle = document.createElement('p');
  testimonialsSubtitle.className =
    'section-subtitle text-[1.2rem] text-[var(--text-secondary)] max-w-[700px] mx-auto';
  testimonialsSubtitle.textContent =
    'Hear from those who love our products and services.';

  testimonialsHeader.appendChild(testimonialsTitle);
  testimonialsHeader.appendChild(testimonialsSubtitle);

  const testimonialsGrid = document.createElement('div');
  testimonialsGrid.className =
    'testimonials-grid grid grid-cols-1 md:grid-cols-3 gap-12';

  // Example testimonials
  const testimonialList = [
    {
      name: 'Alice M.',
      text: 'Amazing products and outstanding customer service. Highly recommend!',
      avatar: 'https://i.pravatar.cc/100?img=1',
    },
    {
      name: 'John D.',
      text: 'Fast shipping and the product quality exceeded my expectations.',
      avatar: 'https://i.pravatar.cc/100?img=2',
    },
    {
      name: 'Emma W.',
      text: 'A seamless shopping experience with great deals. I keep coming back!',
      avatar: 'https://i.pravatar.cc/100?img=3',
    },
  ];

  testimonialList.forEach(({ name, text, avatar }) => {
    const testimonialCard = document.createElement('div');
    testimonialCard.className =
      'testimonial-card p-6 rounded-lg bg-[var(--bg-secondary)] shadow-lg flex flex-col items-center text-center';

    const avatarImg = document.createElement('img');
    avatarImg.src = avatar;
    avatarImg.alt = `${name} avatar`;
    avatarImg.className = 'w-20 h-20 rounded-full mb-4 object-cover';

    const testimonialText = document.createElement('p');
    testimonialText.className =
      'text-[1rem] text-[var(--text-primary)] mb-4 italic';
    testimonialText.textContent = `"${text}"`;

    const testimonialName = document.createElement('h4');
    testimonialName.className =
      'font-semibold text-[1.1rem] text-[var(--primary)]';
    testimonialName.textContent = name;

    testimonialCard.appendChild(avatarImg);
    testimonialCard.appendChild(testimonialText);
    testimonialCard.appendChild(testimonialName);

    testimonialsGrid.appendChild(testimonialCard);
  });

  testimonialsSection.appendChild(testimonialsHeader);
  testimonialsSection.appendChild(testimonialsGrid);
  home.appendChild(testimonialsSection);

  // ======= NEWSLETTER SECTION =======
  const newsletterSection = document.createElement('section');
  newsletterSection.id = 'newsletter';
  newsletterSection.className =
    'newsletter-section py-20 px-8 bg-[var(--primary)] rounded-lg max-w-[900px] mx-auto text-center text-white';

  // Newsletter Header
  const newsletterTitle = document.createElement('h2');
  newsletterTitle.className = 'section-title font-extrabold text-[3rem] mb-6';
  newsletterTitle.textContent = 'Subscribe to Our Newsletter';

  const newsletterSubtitle = document.createElement('p');
  newsletterSubtitle.className = 'section-subtitle text-[1.2rem] mb-12';
  newsletterSubtitle.textContent =
    'Get the latest updates, exclusive deals, and insider news delivered right to your inbox.';

  // Newsletter form
  const newsletterForm = document.createElement('form');
  newsletterForm.className =
    'newsletter-form flex flex-col sm:flex-row justify-center gap-4 max-w-[600px] mx-auto';

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your email address';
  emailInput.required = true;
  emailInput.className =
    'email-input px-5 py-4 rounded-full flex-1 text-black placeholder:text-gray-600 outline-none focus:ring-2 focus:ring-white transition';

  const subscribeButton = document.createElement('button');
  subscribeButton.type = 'submit';
  subscribeButton.className =
    'btn btn-secondary px-8 py-4 rounded-full font-bold cursor-pointer transition hover:bg-white hover:text-[var(--primary)]';
  subscribeButton.textContent = 'Subscribe';

  newsletterForm.appendChild(emailInput);
  newsletterForm.appendChild(subscribeButton);

  newsletterSection.appendChild(newsletterTitle);
  newsletterSection.appendChild(newsletterSubtitle);
  newsletterSection.appendChild(newsletterForm);

  home.appendChild(newsletterSection);

  // Newsletter form submit handler
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!emailInput.value) {
      alert('Please enter a valid email address.');
      return;
    }
    alert(`Thanks for subscribing, ${emailInput.value}!`);
    emailInput.value = '';
  });

  // ======= FOOTER SECTION =======
  const footer = document.createElement('footer');
  footer.className =
    'footer bg-[var(--bg-primary)] py-12 px-8 mt-20 border-t border-[var(--glass-border)]';

  const footerContainer = document.createElement('div');
  footerContainer.className =
    'max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-[var(--text-secondary)]';

  // Footer Left: Logo or brand name
  const footerBrand = document.createElement('div');
  footerBrand.className =
    'footer-brand font-extrabold text-2xl text-[var(--primary)] cursor-default';
  footerBrand.textContent = 'ShopFuture';

  // Footer Center: Navigation links
  const footerNav = document.createElement('nav');
  footerNav.className = 'footer-nav flex gap-6 flex-wrap justify-center';

  const navLinks = [
    { text: 'Home', href: '#home' },
    { text: 'Products', href: '#products' },
    { text: 'Categories', href: '#categories' },
    { text: 'Testimonials', href: '#testimonials' },
    { text: 'Newsletter', href: '#newsletter' },
  ];

  navLinks.forEach(({ text, href }) => {
    const link = document.createElement('a');
    link.href = href;
    link.className = 'hover:text-[var(--primary)] transition';
    link.textContent = text;
    footerNav.appendChild(link);
  });

  // Footer Right: Social media icons (placeholder links)
  const footerSocial = document.createElement('div');
  footerSocial.className =
    'footer-social flex gap-6 text-[var(--text-secondary)]';

  // Example icons as simple text, replace with SVG or icon fonts as needed
  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com', icon: '📘' },
    { name: 'Twitter', url: 'https://twitter.com', icon: '🐦' },
    { name: 'Instagram', url: 'https://instagram.com', icon: '📸' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: '🔗' },
  ];

  socialLinks.forEach(({ name, url, icon }) => {
    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.title = name;
    a.className = 'text-2xl hover:text-[var(--primary)] transition';
    a.textContent = icon;
    footerSocial.appendChild(a);
  });

  footerContainer.appendChild(footerBrand);
  footerContainer.appendChild(footerNav);
  footerContainer.appendChild(footerSocial);
  footer.appendChild(footerContainer);

  home.appendChild(footer);

  return home;
};
