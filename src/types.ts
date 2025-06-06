export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export type ApiResponse<T> = {
  data?: T;
  error?: string;
  loading: boolean;
};

export type Route = {
  path: string;
  component: (...args: any[]) => Promise<HTMLElement> | HTMLElement;
  title: string;
};
