export const Skeleton = (count: number = 1): HTMLElement => {
  const container = document.createElement('div');
  container.className =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6';

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement('div');
    skeleton.className = 'card animate-pulse';

    const image = document.createElement('div');
    image.className = 'h-48 bg-gray-200 dark:bg-gray-700';

    const content = document.createElement('div');
    content.className = 'p-4 space-y-3';

    const title = document.createElement('div');
    title.className = 'h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4';

    const category = document.createElement('div');
    category.className = 'h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2';

    const price = document.createElement('div');
    price.className = 'h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4';

    const button = document.createElement('div');
    button.className = 'h-8 bg-gray-200 dark:bg-gray-700 rounded';

    content.appendChild(title);
    content.appendChild(category);
    content.appendChild(price);
    content.appendChild(button);

    skeleton.appendChild(image);
    skeleton.appendChild(content);
    container.appendChild(skeleton);
  }

  return container;
};
