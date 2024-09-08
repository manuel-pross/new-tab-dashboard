/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "tokyo-red": "#f7768e", // Keywords, HTML elements, Terminal Red
      "tokyo-orange": "#ff9e64", // Number and Boolean constants, Terminal Red
      "tokyo-yellow": "#e0af68", // Function parameters, Terminal Yellow
      "tokyo-neutral-light": "#cfc9c2", // Parameters inside functions
      "tokyo-green": "#9ece6a", // Strings, CSS class names
      "tokyo-teal": "#73daca", // Object literal keys, Terminal Green
      "tokyo-cyan-light": "#b4f9f8", // Regex literal strings
      "tokyo-cyan": "#2ac3de", // Language support functions, HTML elements
      "tokyo-blue-light": "#7dcfff", // Object properties, Markdown headings, Terminal Cyan
      "tokyo-blue": "#7aa2f7", // Function names, CSS property names, Terminal Blue
      "tokyo-purple": "#bb9af7", // Control Keywords, Storage Types, Terminal Magenta
      "tokyo-white": "#c0caf5", // Variables, Class names, Terminal White
      "tokyo-foreground": "#a9b1d6", // Editor Foreground
      "tokyo-text": "#9aa5ce", // Markdown Text, HTML Text
      "tokyo-comment": "#565f89", // Comments
      "tokyo-black": "#414868", // Terminal Black
      "tokyo-storm": "#24283b", // Editor Background (Storm)
      "tokyo-night": "#1a1b26", // Editor Background (Night)
    },
    extend: {
      fontFamily: {
        firacode: ["FiraCode", "sans-serif"],
      },
    },
    plugins: [],
  },
};
