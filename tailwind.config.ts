import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: { 950: "#05070A", 900: "#0A0D12", 850: "#0F1319", 800: "#151A22" },
        surface: { 700: "#1B222C", 600: "#242D38", 500: "#303B48" },
        line: { DEFAULT: "#26303C", strong: "#3A4654", subtle: "#1A222C" },
        ink: { primary: "#F8FAFC", secondary: "#CBD5E1", muted: "#94A3B8", disabled: "#64748B", inverse: "#05070A" },
        cyan: { 300: "#67E8F9", 400: "#22D3EE", 500: "#06B6D4", 600: "#0891B2", glow: "#00E5FF" }
      },
      boxShadow: {
        panel: "0 20px 50px rgba(0,0,0,0.36)",
        cyan: "0 0 32px rgba(0,229,255,0.18)",
        "cyan-strong": "0 0 48px rgba(0,229,255,0.28)"
      },
      borderRadius: { xl: "24px", lg: "16px", md: "10px", sm: "6px" }
    }
  },
  plugins: []
};

export default config;
