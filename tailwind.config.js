import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: ["class"],
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border) / <alpha-value>)",
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "hsl(var(--ring) / <alpha-value>)",
        background: "hsl(var(--background) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        shark: {
          50: "hsl(180, 5%, 96%)",
          100: "hsl(216, 10%, 90%)",
          200: "hsl(197, 8%, 82%)",
          300: "hsl(206, 9%, 69%)",
          400: "hsl(207, 8%, 53%)",
          500: "hsl(207, 8%, 43%)",
          600: "hsl(210, 9%, 36%)",
          700: "hsl(215, 8%, 31%)",
          800: "hsl(217, 6%, 27%)",
          900: "hsl(214, 6%, 24%)",
          950: "hsl(216, 7%, 14%)",
        },
        athens: {
          50: "hsl(210, 25%, 97%)",
          100: "hsl(210, 20%, 90%)",
          200: "hsl(208, 20%, 87%)",
          300: "hsl(207, 20%, 78%)",
          400: "hsl(210, 20%, 68%)",
          500: "hsl(212, 19%, 60%)",
          600: "hsl(217, 18%, 53%)",
          700: "hsl(220, 16%, 48%)",
          800: "hsl(223, 15%, 40%)",
          900: "hsl(218, 13%, 33%)",
          950: "hsl(222, 12%, 21%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
    },
  },
};

export default config;
