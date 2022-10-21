const storageKey = 'theme-preference';

const darkCSS = document.querySelectorAll('link[media*=prefers-color-scheme][media*="dark"]');
const lightCSS = document.querySelectorAll('link[media*=prefers-color-scheme][media*="light"]');

const theme = {
  value: getColorPreference(),
};

function getColorPreference() {
  const colorPreference = localStorage.getItem(storageKey);
  if (colorPreference) {
    return colorPreference;
  } else {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}

function reflectPreference() {
  if (theme.value === 'light') {
    lightCSS.forEach((link) => {
      link.media = 'all';
      link.disabled = false;
    });

    darkCSS.forEach((link) => {
      link.media = 'not all';
      link.disabled = true;
    });

  } else {
    darkCSS.forEach((link) => {
      link.media = 'all';
      link.disabled = false;
    });

    lightCSS.forEach((link) => {
      link.media = 'not all';
      link.disabled = true;
    });

  }

  document.getElementById('theme-switch')?.setAttribute('aria-label', theme.value);
}

function setPreference() {
  localStorage.setItem(storageKey, theme.value);
  reflectPreference();
}

function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light';

  setPreference();
}

reflectPreference();

window.onload = () => {
  reflectPreference();

  document.getElementById('theme-switch').addEventListener('click', onClick);
}

window.matchMedia('(prefers-color-scheme: dark)')
.addEventListener('change', ({ matches: isDark }) => {
  theme.value = isDark ? 'dark' : 'light';
  setPreference();
});
