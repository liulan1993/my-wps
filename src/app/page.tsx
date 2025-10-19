"use client";

import React, { useState, useRef, useEffect } from 'react';

// --- 类型定义 ---
// 为组件的属性（props）添加明确的 TypeScript 类型，解决 "implicitly has an 'any' type" 错误。

interface HeaderProps {
  onImportClick: () => void;
}

interface ToolbarProps {
  // 这里可以添加未来可能需要的属性
}

interface EditorProps {
  text: string;
  onTextChange: (event: React.ChangeEvent<HTMLDivElement>) => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

interface FooterProps {
  charCount: number;
}

// --- SVG 图标组件 ---
// 为了保持代码整洁和独立，所有图标都作为独立的组件创建
const FileIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 1.5C3.17157 1.5 2.5 2.17157 2.5 3V13C2.5 13.8284 3.17157 14.5 4 14.5H12C12.8284 14.5 13.5 13.8284 13.5 13V5.5L10 1.5H4Z" stroke="currentColor" strokeLinejoin="round"/><path d="M9.5 2V5.5H13" stroke="currentColor" strokeLinejoin="round"/></svg>);
const SaveIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 13.5V10.5C13.5 10.2239 13.2761 10 13 10H3C2.72386 10 2.5 10.2239 2.5 10.5V13.5C2.5 13.7761 2.72386 14 3 14H13C13.2761 14 13.5 13.7761 13.5 13.5Z" stroke="currentColor" strokeLinejoin="round"/><path d="M11.5 2.5H4.5V6.5H11.5V2.5Z" stroke="currentColor" strokeLinejoin="round"/><path d="M10.5 10V8.5H5.5V10" stroke="currentColor"/></svg>);
const UndoIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 6.5V8.5C3.5 10.9853 5.51472 13 8 13H11.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M5.5 4.5L3.5 6.5L5.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const RedoIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5 6.5V8.5C12.5 10.9853 10.4853 13 8 13H4.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M10.5 4.5L12.5 6.5L10.5 8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const SearchIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7.5" cy="7.5" r="5" stroke="currentColor"/><path d="M11 11L14 14" stroke="currentColor" strokeLinecap="round"/></svg>);
const BoldIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 2.5H8.5C10.1569 2.5 11.5 3.84315 11.5 5.5C11.5 7.15685 10.1569 8.5 8.5 8.5H4.5V2.5Z" stroke="currentColor" strokeLinejoin="round"/><path d="M4.5 8.5H9C10.933 8.5 12.5 10.067 12.5 12C12.5 13.933 10.933 15.5 9 15.5H4.5V8.5Z" stroke="currentColor" strokeLinejoin="round"/></svg>);
const ItalicIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 2.5H11.5" stroke="currentColor" strokeLinecap="round"/><path d="M4.5 13.5H9.5" stroke="currentColor" strokeLinecap="round"/><path d="M8 2.5L7 13.5" stroke="currentColor" strokeLinecap="round"/></svg>);
const UnderlineIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.5 13.5H12.5" stroke="currentColor" strokeLinecap="round"/><path d="M4.5 2.5V8C4.5 9.933 6.067 11.5 8 11.5C9.933 11.5 11.5 9.933 11.5 8V2.5" stroke="currentColor" strokeLinecap="round"/></svg>);
const AlignLeftIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M2.5 5.5H9.5" stroke="currentColor" strokeLinecap="round"/><path d="M2.5 8.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M2.5 11.5H9.5" stroke="currentColor" strokeLinecap="round"/></svg>);
const AlignCenterIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M4.5 5.5H11.5" stroke="currentColor" strokeLinecap="round"/><path d="M2.5 8.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M4.5 11.5H11.5" stroke="currentColor" strokeLinecap="round"/></svg>);
const AlignRightIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 2.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M6.5 5.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M2.5 8.5H13.5" stroke="currentColor" strokeLinecap="round"/><path d="M6.5 11.5H13.5" stroke="currentColor" strokeLinecap="round"/></svg>);
const ChevronDownIcon = () => (<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3L4 5L6 3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const UploadIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.5V10.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M5 5.5L8 2.5L11 5.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 8.5V13.5H13V8.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/></svg>);


// --- 顶部工具栏和菜单 ---
const Header: React.FC<HeaderProps> = ({ onImportClick }) => {
    const tabs = ["开始", "插入", "页面", "引用", "审阅", "视图", "安全", "工具", "增值服务"];
    const [activeTab, setActiveTab] = useState("开始");

    return (
        <div className="bg-[#F6F6F6] px-4 pt-2">
            <div className="flex justify-between items-center text-xs text-gray-700">
                <div className="flex items-center space-x-4">
                    <span>WPS 文字/新建.docx文档.docx</span>
                    <span className="bg-blue-500 text-white px-2 py-0.5 rounded-sm">文件</span>
                </div>
                <div className="flex items-center space-x-2">
                    <span>登录</span>
                    <span>立即登录</span>
                </div>
            </div>
            <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-1">
                    <SaveIcon />
                    <FileIcon />
                    <UndoIcon />
                    <RedoIcon />
                    <span className="text-gray-400">|</span>
                    <span>正文</span>
                    <ChevronDownIcon />
                </div>
                <div className="flex items-center">
                    {tabs.map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1 text-sm ${activeTab === tab ? 'bg-white rounded-t-md border-b-2 border-blue-500 font-semibold' : 'text-gray-600'}`}>
                            {tab}
                        </button>
                    ))}
                     <button onClick={onImportClick} className="flex items-center space-x-1 ml-2 px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">
                        <UploadIcon />
                        <span>导入小说/文档</span>
                    </button>
                </div>
                <div className="flex items-center space-x-2">
                    <SearchIcon />
                    <input type="text" placeholder="查找" className="text-xs w-24 px-1 border-b bg-transparent" />
                </div>
            </div>
        </div>
    );
};

// --- 功能区工具栏 ---
const Toolbar: React.FC<ToolbarProps> = () => {
    const iconButtonClass = "p-1 hover:bg-gray-200 rounded";
    const dropdownButtonClass = "flex items-center space-x-1 px-2 py-1 border border-gray-300 bg-white rounded hover:bg-gray-50 text-sm";
    
    return (
        <div className="bg-[#FDFDFD] px-4 py-2 border-t border-b border-gray-200 flex items-center space-x-4 text-sm text-gray-800">
            <div className="flex items-center space-x-1">
                <button className={dropdownButtonClass}>
                    <span>宋体 (正文)</span>
                    <ChevronDownIcon />
                </button>
                <button className={dropdownButtonClass}>
                    <span>五号</span>
                    <ChevronDownIcon />
                </button>
            </div>
            <div className="flex items-center space-x-1 border-r pr-2">
                <button className={iconButtonClass}><BoldIcon /></button>
                <button className={iconButtonClass}><ItalicIcon /></button>
                <button className={iconButtonClass}><UnderlineIcon /></button>
            </div>
            <div className="flex items-center space-x-1 border-r pr-2">
                <button className={iconButtonClass}><AlignLeftIcon /></button>
                <button className={iconButtonClass}><AlignCenterIcon /></button>
                <button className={iconButtonClass}><AlignRightIcon /></button>
            </div>
            <div className="flex items-center space-x-2">
                <button className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded">正文</button>
                <button className="px-2 py-0.5 text-blue-600 border border-transparent hover:border-gray-200 rounded">标题 1</button>
                <button className="px-2 py-0.5 text-blue-600 border border-transparent hover:border-gray-200 rounded">标题 2</button>
            </div>
        </div>
    );
};

// --- 编辑器区域 ---
const Editor: React.FC<EditorProps> = ({ text, onTextChange, editorRef }) => {
    return (
        <div className="flex-grow bg-gray-100 p-8 flex justify-center overflow-y-auto">
            <div
                ref={editorRef}
                contentEditable
                onInput={onTextChange}
                className="w-[210mm] min-h-[297mm] bg-white shadow-lg p-16 text-black outline-none"
                style={{ fontFamily: '宋体', fontSize: '14pt' }} // Simulating '五号' font size
            >
            </div>
        </div>
    );
};

// --- 底部状态栏 ---
const Footer: React.FC<FooterProps> = ({ charCount }) => {
    return (
        <div className="bg-[#F6F6F6] px-4 py-1 text-xs text-gray-600 flex justify-between items-center border-t border-gray-200">
            <div className="flex space-x-4">
                <span>页面: 1/1</span>
                <span>字数: {charCount}</span>
                <span>拼写检查: 打开</span>
            </div>
            <div className="flex items-center space-x-2">
                <span>100%</span>
            </div>
        </div>
    );
};


// --- 主应用组件 ---
export default function WpsReaderPage() {
    const [originalContent, setOriginalContent] = useState('');
    const [displayedContent, setDisplayedContent] = useState('');
    const [charCount, setCharCount] = useState(0);
    const editorRef = useRef<HTMLDivElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    const handleImportClick = () => {
        hiddenInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                setOriginalContent(text);
                setDisplayedContent('');
                if (editorRef.current) {
                    editorRef.current.innerText = '';
                }
                setCharCount(0);
            };
            reader.readAsText(file);
        }
    };
    
    const handleTextChange = () => {
      if (!editorRef.current || !originalContent) return;
      
      const currentLength = editorRef.current.innerText.length;
      const newContent = originalContent.substring(0, currentLength);
      
      setDisplayedContent(newContent);
      setCharCount(newContent.length);

      // To avoid cursor jumping, we only update if necessary
      if (editorRef.current.innerText !== newContent) {
          editorRef.current.innerText = newContent;
          
          // Move cursor to the end
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel?.removeAllRanges();
          sel?.addRange(range);
      }
    };

    useEffect(() => {
        if (editorRef.current) {
            handleTextChange();
        }
    }, [displayedContent]);


    return (
        <div className="flex flex-col h-screen font-sans bg-white">
            <Header onImportClick={handleImportClick} />
            <Toolbar />
            <main className="flex-grow bg-[#E6E6E6] flex justify-center py-8 overflow-auto">
              <div
                  contentEditable
                  ref={editorRef}
                  onInput={handleTextChange}
                  className="w-[21cm] min-h-[29.7cm] bg-white p-[2.54cm] shadow-lg text-black outline-none leading-relaxed"
                  style={{ fontSize: '14pt' }} // 五号字 approximately 14pt
              ></div>
            </main>
            <Footer charCount={charCount} />
            <input
                type="file"
                ref={hiddenInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".txt"
            />
        </div>
    );
}
