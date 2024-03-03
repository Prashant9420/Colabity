/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {},
    // colors: {
    //   primary:{
    //     50: '#c5c6c7',
    //     100: '#66fcf1',
    //     200: '#45a29e',
    //     300: '#1f2833',
    //     400: '#0b0c10',
    //   }
    // }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#c5c6c7",
          "secondary": "#66fcf1",
          "accent": "#45a29e",
          "neutral": "#1f2833",
          "base-100": "#0b0c10",
        },
      },
      // "dark",
      // "cupcake",
    ],
  },
};
