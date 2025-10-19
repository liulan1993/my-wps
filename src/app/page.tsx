"use client";

import React, { useState, useRef, FC, useCallback } from 'react';

// --- 类型定义 ---
interface HeaderProps {
  onImportClick: () => void;
}

type ToolbarProps = Record<string, never>;


// --- SVG 图标组件 ---
const IconSave: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>;
const IconUndo: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>;
const IconRedo: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 7v6h-6"></path><path d="M3 17a9 9 0 0 0 9 9 9 9 0 0 0 6-2.3L21 13"></path></svg>;
const IconBold: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>;
const IconItalic: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>;
const IconUnderline: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path><line x1="4" y1="21" x2="20" y2="21"></line></svg>;
const IconAlignLeft: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>;
const IconAlignCenter: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="3" y2="10"></line><line x1="21" y1="6" x2="3" y2="6"></line><line x1="17" y1="14" x2="7" y2="14"></line><line x1="17" y1="18" x2="7" y2="18"></line></svg>;
const IconAlignRight: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" y1="10" x2="7" y2="10"></line><line x1="21" y1="6" x2="7" y2="6"></line><line x1="21" y1="14" x2="3" y2="14"></line><line x1="21" y1="18" x2="3" y2="18"></line></svg>;
const IconCaretDown: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></svg>;
const IconSearch: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const IconUpload: FC = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>;


// --- 顶部工具栏和菜单 ---
const Header: FC<HeaderProps> = ({ onImportClick }) => {
  const tabs = ["开始", "插入", "页面", "引用", "审阅", "视图", "安全", "工具", "增值服务"];
  const [activeTab, setActiveTab] = useState("开始");

  return (
    <div className="bg-white text-gray-800 shadow-sm">
      <div className="flex justify-between items-center h-8 px-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="text-blue-600 font-bold text-sm">WPS 文字</span>
          <span className="text-xs text-gray-600">新建 DOCX文档.docx</span>
        </div>
        <div></div>
      </div>
      
      <div className="flex justify-between items-center h-10 px-4">
        <div className="flex items-center">
            <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-sm">文件</button>
            <div className="flex items-center ml-2 space-x-3 text-gray-600">
                <IconSave />
                <IconUndo />
                <IconRedo />
            </div>
        </div>
        <div className="flex items-center space-x-4 text-xs">
            <span>立减登录</span>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-sm">登录</button>
        </div>
      </div>

      <div className="flex items-center px-4 border-b border-gray-200">
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-sm ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
        <button
          onClick={onImportClick}
          className="flex items-center gap-2 px-3 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md ml-4"
        >
          <IconUpload />
          导入小说/文档
        </button>
        <div className="flex-grow"></div>
        <IconSearch />
      </div>
    </div>
  );
};

const Toolbar: FC<ToolbarProps> = () => {
    return (
        <div className="bg-white px-4 py-2 flex items-center space-x-4 border-b border-gray-200 text-xs text-gray-700">
            <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded-sm">格式刷</button>
                <div className="h-6 border-l border-gray-300 mx-2"></div>
                <div className="flex items-center border border-gray-300 rounded-sm">
                    <span className="px-2">宋体 (正文)</span>
                    <button className="p-1 border-l border-gray-300"><IconCaretDown /></button>
                </div>
                <div className="flex items-center border border-gray-300 rounded-sm">
                    <span className="px-2">五号</span>
                    <button className="p-1 border-l border-gray-300"><IconCaretDown /></button>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconBold /></button>
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconItalic /></button>
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconUnderline /></button>
            </div>
            <div className="h-6 border-l border-gray-300"></div>
            <div className="flex items-center space-x-1">
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconAlignLeft /></button>
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconAlignCenter /></button>
                <button className="p-1 hover:bg-gray-100 rounded-sm"><IconAlignRight /></button>
            </div>
            <div className="h-6 border-l border-gray-300"></div>
            <div className="flex items-center space-x-2">
                <button className="px-3 py-1 border border-blue-300 bg-blue-50 rounded-sm text-blue-600">正文</button>
                <button className="px-3 py-1 border border-gray-300 rounded-sm">标题 1</button>
                <button className="px-3 py-1 border border-gray-300 rounded-sm">标题 2</button>
            </div>
        </div>
    );
};


// --- 主应用组件 ---
export default function Home() {
  const [importedContent, setImportedContent] = useState<string>('');
  const [userTypedValue, setUserTypedValue] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImportedContent(result);
        setUserTypedValue('');
      };
      reader.readAsText(file);
    } else {
        alert("请选择一个 .txt 格式的文件。");
    }
    event.target.value = '';
  }, []);

  const handleUserInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setUserTypedValue(e.target.value);
  }

  const displayedContent = importedContent 
    ? importedContent.slice(0, userTypedValue.length) 
    : userTypedValue;

  const wordCount = displayedContent.trim() === '' ? 0 : displayedContent.trim().split(/\s+/).length;

  return (
    <div className="min-h-screen bg-gray-200 font-sans flex flex-col text-sm">
      <Header onImportClick={handleImportClick} />
      <Toolbar />
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt"
      />
      
      <main className="flex-grow overflow-auto py-8 flex justify-center">
        <div 
          className="w-[210mm] min-h-[297mm] h-fit bg-white shadow-lg p-16"
        >
          <textarea
            className="w-full h-full resize-none border-none outline-none text-base leading-relaxed"
            placeholder="在这里开始输入..."
            value={displayedContent}
            onChange={handleUserInputChange}
          />
        </div>
      </main>

      <footer className="bg-gray-100 h-6 border-t border-gray-200 px-4 flex items-center justify-between text-xs text-gray-600">
        <div>
            <span>页面: 1/1</span>
            <span className="ml-4">字数: {wordCount}</span>
        </div>
        <div>
            <span>100%</span>
        </div>
      </footer>
    </div>
  );
}

