import axios from 'axios';
import { Product, ApiResponse } from './types';

const API_BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = async (): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<Product[]>(`${API_BASE_URL}/products`);
    return { data: response.data, loading: false };
  } catch (error) {
    return { error: 'Failed to fetch products', loading: false };
  }
};

export const fetchProductById = async (
  id: number
): Promise<ApiResponse<Product>> => {
  try {
    const response = await axios.get<Product>(`${API_BASE_URL}/products/${id}`);
    return { data: response.data, loading: false };
  } catch (error) {
    return { error: `Failed to fetch product with id ${id}`, loading: false };
  }
};

export const fetchCategories = async (): Promise<ApiResponse<string[]>> => {
  try {
    const response = await axios.get<string[]>(
      `${API_BASE_URL}/products/categories`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    return { error: 'Failed to fetch categories', loading: false };
  }
};

export const fetchProductsByCategory = async (
  category: string
): Promise<ApiResponse<Product[]>> => {
  try {
    const response = await axios.get<Product[]>(
      `${API_BASE_URL}/products/category/${category}`
    );
    return { data: response.data, loading: false };
  } catch (error) {
    return {
      error: `Failed to fetch products for category ${category}`,
      loading: false,
    };
  }
};
