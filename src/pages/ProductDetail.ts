import { Product } from '../types';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Route } from '../types';
import { fetchProductById } from '../api';

export const ProductDetail = async (
  routes: Route[],
  darkMode: boolean,
  toggleDarkMode: () => void,
  productId: string
): Promise<HTMLElement> => {
  const productPage = document.createElement('div');

  // SECTION: Container
  const section = document.createElement('section');
  section.className = 'py-14 mt-20 px-4 bg-white dark:bg-gray-900';

  const container = document.createElement('div');
  container.className = 'max-w-7xl mx-auto';

  // Skeleton loading
  container.innerHTML = `
    <div class="animate-pulse flex flex-col md:flex-row gap-10">
      <div class="w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      <div class="w-full md:w-1/2 space-y-5">
        <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div class="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
        <div class="space-y-3">
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
        <div class="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  `;

  const { data: product, error } = await fetchProductById(parseInt(productId));

  if (error) {
    container.innerHTML = `<p class="text-center text-red-500 text-lg py-12">${error}</p>`;
  } else if (product) {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col md:flex-row gap-12 items-start';

    // IMAGE
    const imageWrap = document.createElement('div');
    imageWrap.className =
      'w-full md:w-1/2 flex items-center justify-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow';

    const image = document.createElement('img');
    image.src = product.image;
    image.alt = product.title;
    image.className = 'max-h-[24rem] object-contain drop-shadow-xl';

    imageWrap.appendChild(image);

    // INFO
    const info = document.createElement('div');
    info.className = 'w-full md:w-1/2 space-y-6';

    const title = document.createElement('h1');
    title.className =
      'text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight';
    title.textContent = product.title;

    const category = document.createElement('p');
    category.className =
      'text-sm uppercase tracking-wide text-primary font-medium';
    category.textContent = product.category;

    const price = document.createElement('div');
    price.className = 'flex items-center gap-4';

    const actualPrice = document.createElement('p');
    actualPrice.className =
      'text-4xl font-bold text-accent dark:text-accent-light';
    actualPrice.textContent = `$${product.price.toFixed(2)}`;

    const oldPrice = document.createElement('span');
    oldPrice.className = 'text-lg line-through text-gray-400';
    oldPrice.textContent =
      product.price > 50 ? `$${(product.price * 1.2).toFixed(2)}` : '';

    price.appendChild(actualPrice);
    price.appendChild(oldPrice);

    const rating = document.createElement('div');
    rating.className = 'flex items-center gap-2 text-yellow-400 text-xl';

    const stars =
      '★'.repeat(Math.round(product.rating.rate)) +
      '☆'.repeat(5 - Math.round(product.rating.rate));
    const starText = document.createElement('span');
    starText.textContent = stars;

    const ratingCount = document.createElement('span');
    ratingCount.className = 'text-sm text-gray-500 dark:text-gray-400 ml-2';
    ratingCount.textContent = `${product.rating.rate} (${product.rating.count} reviews)`;

    rating.appendChild(starText);
    rating.appendChild(ratingCount);

    const description = document.createElement('p');
    description.className =
      'text-base leading-relaxed text-gray-700 dark:text-gray-300';
    description.textContent = product.description;

    const addToCart = document.createElement('button');
    addToCart.className =
      'btn btn-primary w-full sm:w-auto px-8 py-3 rounded-full text-lg transition-all hover:bg-[var(--primary-dark)]';
    addToCart.textContent = 'Add to Cart';
    addToCart.onclick = () => {
      // You can add cart logic here if needed
      window.location.hash = '#/products';
    };

    info.appendChild(title);
    info.appendChild(category);
    info.appendChild(price);
    info.appendChild(rating);
    info.appendChild(description);
    info.appendChild(addToCart);

    wrapper.appendChild(imageWrap);
    wrapper.appendChild(info);
    container.appendChild(wrapper);
  }

  section.appendChild(container);

  // Compose Full Page
  productPage.appendChild(Navbar(routes, darkMode, toggleDarkMode));
  productPage.appendChild(section);
  productPage.appendChild(Footer());

  return productPage;
};
