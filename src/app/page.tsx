"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-red-500">
      <div className="p-12 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold text-gray-800">样式测试页面</h1>
        <p className="mt-4 text-lg text-gray-600">
          如果整个页面背景是红色的，并且这个方框是白色的，
        </p>
        <p className="text-lg text-gray-600">
          那就说明 Tailwind CSS 已经可以正常工作了。
        </p>
      </div>
    </main>
  );
}
