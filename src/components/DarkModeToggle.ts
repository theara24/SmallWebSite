export const DarkModeToggle = (
  darkMode: boolean,
  toggle: () => void
): HTMLElement => {
  const toggleContainer = document.createElement('div');
  toggleContainer.className = 'flex items-center';

  const toggleButton = document.createElement('button');
  toggleButton.className =
    'relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none';
  toggleButton.className += darkMode ? ' bg-primary-dark' : ' bg-gray-300';
  toggleButton.onclick = toggle;

  const toggleCircle = document.createElement('span');
  toggleCircle.className =
    'inline-block w-4 h-4 transform transition-transform bg-white rounded-full';
  toggleCircle.className += darkMode ? ' translate-x-6' : ' translate-x-1';

  toggleButton.appendChild(toggleCircle);
  toggleContainer.appendChild(toggleButton);

  return toggleContainer;
};
