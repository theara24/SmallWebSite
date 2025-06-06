import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Route } from './types';

export class Router {
  private routes: Route[];
  private app: HTMLElement;
  private darkMode: boolean;

  constructor(appElement: HTMLElement) {
    this.app = appElement;
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.routes = [
      { path: '#/', component: Home, title: 'Home' },
      { path: '#/products', component: Products, title: 'Products' },
      { path: '#/product/', component: ProductDetail, title: 'Product' },
      { path: '#/about', component: About, title: 'About' },
      { path: '#/contact', component: Contact, title: 'Contact' },
    ];
    this.init();
  }

  private toggleDarkMode = () => {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', this.darkMode.toString());
    document.documentElement.classList.toggle('dark');
    this.render();
  };

  private async render() {
    const hash = window.location.hash || '#/';
    let path = hash;
    let isProductDetail = false;
    let productId: string | undefined;

    if (hash.startsWith('#/product/')) {
      path = '#/product/';
      isProductDetail = true;
      productId = hash.replace('#/product/', '');
    }

    const route = this.routes.find((r) => r.path === path) || this.routes[0];
    this.app.innerHTML = '';
    const page = isProductDetail
      ? await route.component(
          this.routes,
          this.darkMode,
          this.toggleDarkMode,
          productId
        )
      : await route.component(this.routes, this.darkMode, this.toggleDarkMode);
    this.app.appendChild(page);
    window.scrollTo(0, 0);
  }

  private init() {
    window.addEventListener('hashchange', () => this.render());
    window.addEventListener('DOMContentLoaded', () => this.render());
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
