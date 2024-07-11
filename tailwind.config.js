/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-green-400": "#5ADDB0",
			"custom-green-200": "#F4FBF8"
      },
    },
  },
  plugins: [],
};
