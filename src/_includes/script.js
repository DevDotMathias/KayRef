(() => {
   const $switch = document.querySelector('#kr-theme');
   const $backTop = document.querySelector('.kr-back-top');
   const scrollHeight = document.querySelector('.navbar').offsetHeight;

   const getTheme = () => {
      const storedTheme = localStorage.getItem('theme');
      if(storedTheme) {
         return storedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
   } 

   const setTheme = theme => {
      document.documentElement.setAttribute('data-bs-theme', theme);
   };

   $switch.addEventListener('change', e => {
      const theme = e.target.checked ? 'light' : 'dark';
      setTheme(theme);
      localStorage.setItem('theme', theme);
   });

   $backTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
   });

   window.addEventListener('DOMContentLoaded', () => {
      const theme = getTheme();
      if(theme === 'light') {
         $switch.checked = true;
      } else {
         $switch.checked = false;
      }
      setTheme(theme);
   });

   window.addEventListener('scroll', () => {
      if(window.scrollY > scrollHeight) {
         $backTop.classList.remove('d-none');
      } else {
         $backTop.classList.add('d-none');
      }
   });
})();