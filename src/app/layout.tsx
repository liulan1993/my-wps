import type { Metadata } from "next";
// 在这里导入全局样式表，确保 Tailwind CSS 应用于整个网站
import "./globals.css";

// 设置网站的元数据，例如标题
export const metadata: Metadata = {
  title: "在线文档阅读器",
  description: "一个模拟WPS界面的在线文档阅读器",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
