import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx,css}",
    "./node_modules/daisyui/dist/**/*.js",
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"], // Habilitar temas claros y oscuros
  },

} satisfies Config;
