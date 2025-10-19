    import type { Config } from "tailwindcss";
    
    const config: Config = {
      content: [
        // 只扫描 app 目录，这是唯一正确的路径
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],
      theme: {
        extend: {},
      },
      plugins: [],
    };
    export default config;
    

