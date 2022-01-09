import { defineConfig } from "windicss/helpers";

export default defineConfig({
  darkMode: "class", // or 'media'
  theme: {
    extend: {
      colors: {
        black: {
          light: "rgba(0, 0, 0, 0.6)",
        },
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
});
