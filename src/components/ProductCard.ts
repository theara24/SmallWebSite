import { Product } from '../types';
import gsap from 'gsap';

export const ProductCard = (product: Product): HTMLElement => {
  const card = document.createElement('div');
  card.className =
    'product-card relative rounded-[25px] overflow-hidden bg-[var(--bg-card)] shadow-lg hover:shadow-2xl transition-all duration-500 ease-out group';

  // Badge (New or Featured)
  const badge = document.createElement('div');
  badge.className =
    'absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold text-white bg-[var(--primary)]';
  badge.textContent = product.rating.count > 50 ? 'Featured' : 'New';
  card.appendChild(badge);

  // Image container
  const imageContainer = document.createElement('div');
  imageContainer.className =
    'h-[260px] flex items-center justify-center bg-transparent relative';

  const image = document.createElement('img');
  image.src = product.image;
  image.alt = product.title;
  image.className =
    'max-w-[90%] max-h-[90%] object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out group-hover:scale-105';
  imageContainer.appendChild(image);

  // Product content
  const content = document.createElement('div');
  content.className = 'p-6';

  const category = document.createElement('div');
  category.className =
    'uppercase text-[0.85rem] font-semibold tracking-widest text-[var(--secondary)] mb-2';
  category.textContent = product.category;

  const title = document.createElement('h3');
  title.className =
    'text-[1.2rem] font-bold mb-2 text-[var(--text-primary)] line-clamp-2';
  title.textContent = product.title;

  const priceRow = document.createElement('div');
  priceRow.className = 'flex items-center gap-3 mb-4';

  const price = document.createElement('span');
  price.className = 'text-[1.5rem] font-bold text-[var(--accent)]';
  price.textContent = `$${product.price.toFixed(2)}`;

  const originalPrice = document.createElement('span');
  originalPrice.className =
    'text-sm text-[var(--text-secondary)] line-through opacity-70';
  originalPrice.textContent =
    product.price > 50 ? `$${(product.price * 1.2).toFixed(2)}` : '';

  priceRow.appendChild(price);
  priceRow.appendChild(originalPrice);

  const rating = document.createElement('div');
  rating.className = 'flex items-center gap-2 text-[#fbbf24] mb-4';
  const stars =
    '★'.repeat(Math.round(product.rating.rate)) +
    '☆'.repeat(5 - Math.round(product.rating.rate));
  const ratingText = document.createElement('span');
  ratingText.textContent = stars;

  const ratingCount = document.createElement('span');
  ratingCount.className = 'text-[0.85rem] text-[var(--text-secondary)]';
  ratingCount.textContent = `(${product.rating.count})`;

  rating.appendChild(ratingText);
  rating.appendChild(ratingCount);

  // CTA button
  const button = document.createElement('a');
  button.href = `#/product/${product.id}`;
  button.textContent = 'View Details';
  button.className =
    'block mt-4 w-full px-6 py-3 rounded-full text-white font-medium text-center bg-[var(--primary)] hover:bg-[var(--primary-dark)] transition duration-300 ease-in-out';

  content.appendChild(category);
  content.appendChild(title);
  content.appendChild(priceRow);
  content.appendChild(rating);
  content.appendChild(button);

  card.appendChild(imageContainer);
  card.appendChild(content);

  // Ripple animation using span element
  card.addEventListener('mouseenter', () => {
    gsap.to(card, {
      y: -10,
      scale: 1.02,
      boxShadow: '0 20px 40px rgba(99, 102, 241, 0.4)',
      duration: 0.4,
      ease: 'power2.out',
    });

    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    const rect = card.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${
      Math.max(rect.width, rect.height) * 2
    }px`;
    ripple.style.left = `-${rect.width}px`;
    ripple.style.top = `-${rect.height}px`;

    card.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      y: 0,
      scale: 1,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
      duration: 0.4,
      ease: 'power2.out',
    });
  });

  return card;
};
