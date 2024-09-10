/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // Enable dark mode variant
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Light mode colors
        primaryColor: "#071952",
        headingColor: "#0a257b",
        smallTextColor: "#EBF4F6",
        fadeHeading: "#959a9c",
        // Dark mode colors
        dark: {
          // primaryColor: "#071952",
          // headingColor: "#FFF8F3", 
          // smallTextColor: "#758694", 
          // fadeHeading: "#11343886",
        },
      },
      keyframes: {
        slideIn: {
          
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};
