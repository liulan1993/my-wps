import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // 告诉 Tailwind CSS 扫描 app 目录下的所有相关文件
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;

