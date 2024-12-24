/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'
import flowbite  from "flowbite-react/tailwind";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [
    typography,
    flowbite.plugin()
  ],
}

