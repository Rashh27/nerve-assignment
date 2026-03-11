/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './out/**/*.html',  
  ],
  safelist: [ 
    'bg-blue-600',
    'text-white', 
    'shadow-lg',
    'text-slate-500',
    'hover:text-slate-800',
    'border-blue-600',
    'text-blue-600',
    'bg-slate-50',
    'rotate-180',
  
  ],
  theme: { extend: {} },
  plugins: [],
};
