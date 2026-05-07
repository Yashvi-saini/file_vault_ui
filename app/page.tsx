"use client";

import React, { useState, useCallback, useRef } from "react";
import { 
  FileText, 
  FileSpreadsheet, 
  FileCode, 
  Music, 
  FileVideo, 
  FileArchive, 
  File, 
  CloudUpload,
  X,
  Search,
  Plus,
  LayoutGrid,
  List,
  Folder,
  Image as ImageIcon,
  Star,
  Trash2,
  Share2,
  Clock,
  ChevronRight,
  MoreVertical,
  Download,
  Copy
} from "lucide-react";

interface FileData {
  id: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
  uploadedAt: Date;
}

export default function FileVault() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback((uploadedFiles: FileList | null) => {
    if (!uploadedFiles) return;

    const newFiles: FileData[] = Array.from(uploadedFiles).map((file) => ({
      id: Math.random().toString(36).substring(7),
      name: file.name,
      size: file.size,
      type: file.type,
      preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
      uploadedAt: new Date(),
    }));

    setFiles((prev) => [...newFiles, ...prev]);
  }, []);

  const deleteFile = (id: string) => {
    setFiles((prev) => {
      const fileToDelete = prev.find((f) => f.id === id);
      if (fileToDelete?.preview) {
        URL.revokeObjectURL(fileToDelete.preview);
      }
      return prev.filter((f) => f.id !== id);
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string, size = 24) => {
    if (type.includes("pdf")) return <FileText size={size} color="#e53e3e" strokeWidth={1.5} />;
    if (type.includes("excel") || type.includes("sheet") || type.includes("csv")) return <FileSpreadsheet size={size} color="#2f855a" strokeWidth={1.5} />;
    if (type.includes("word") || type.includes("text")) return <FileText size={size} color="#2b6cb0" strokeWidth={1.5} />;
    if (type.includes("audio")) return <Music size={size} color="#e53e3e" strokeWidth={1.5} />;
    if (type.includes("video")) return <FileVideo size={size} color="#805ad5" strokeWidth={1.5} />;
    if (type.includes("image")) return <ImageIcon size={size} color="#ed8936" strokeWidth={1.5} />;
    return <File size={size} color="#718096" strokeWidth={1.5} />;
  };

  const filteredFiles = files.filter(f => f.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 bg-sidebar-bg border-r border-border flex-col shrink-0">
        <div className="p-6 flex items-center gap-2">
          <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
            <CloudUpload size={20} color="white" />
          </div>
          <span className="font-bold text-lg tracking-tight">Dropinside</span>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <div className="flex items-center justify-between px-4 py-2 text-xs font-bold text-text-muted uppercase tracking-wider mb-2">
            <span>Your vault</span>
            <div className="flex items-center gap-1.5">
              <span className="text-accent">25%</span>
              <div className="w-8 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-accent w-1/4" />
              </div>
            </div>
          </div>
          <div className="sidebar-item active">
            <Folder size={18} />
            <span>All Files</span>
            <span className="ml-auto text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-text-muted">142</span>
          </div>
          <div className="sidebar-item ml-4 border-l border-border pl-4">
            <Folder size={16} color="#ecc94b" />
            <span>New Project</span>
          </div>
          <div className="sidebar-item ml-8 border-l border-border pl-4 opacity-70">
            <Folder size={14} />
            <span>Worksheets</span>
          </div>
          <div className="sidebar-item">
            <ImageIcon size={18} />
            <span>Foto</span>
            <span className="ml-auto text-[10px] text-green-500 font-bold">+4</span>
          </div>
          <div className="sidebar-item">
            <Share2 size={18} />
            <span>Shared</span>
          </div>
          <div className="sidebar-item">
            <Star size={18} />
            <span>Starred</span>
          </div>
          <div className="sidebar-item">
            <Trash2 size={18} />
            <span>Deleted</span>
          </div>
        </nav>

        <div className="p-6 border-t border-border">
          <div className="text-[11px] text-text-muted text-center">
            Privacy policy • Term of use
            <div className="mt-2 text-[10px]">© 2026 Dropinside</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-header-bg border-b border-border flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="relative flex-1 max-w-xs md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-accent outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-foreground p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <CloudUpload size={18} />
              <span className="hidden sm:inline">Upload</span>
            </button>
            <button className="flex items-center gap-2 bg-foreground text-white p-2 md:px-4 md:py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
              <Plus size={18} />
              <span className="hidden sm:inline">Create</span>
            </button>
          </div>


          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            multiple 
            onChange={(e) => handleFileUpload(e.target.files)} 
          />
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          {/* Recent Files Section */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-bold text-text-muted uppercase tracking-wider">Recent files</h2>
              <div className="flex gap-2">
                <LayoutGrid size={18} className="text-text-muted cursor-pointer" />
                <List size={18} className="text-accent cursor-pointer" />
              </div>
            </div>

            <div className="card-grid">
              {files.slice(0, 4).map(file => (
                <div key={file.id} className="file-card group relative">
                  <div className="mb-4">
                    {file.preview ? (
                      <img src={file.preview} alt={file.name} className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                    ) : (
                      getFileIcon(file.type, 48)
                    )}
                  </div>
                  <span className="text-sm font-semibold truncate w-full">{file.name}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }}
                    className="absolute top-2 right-2 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {/* Mock Folders */}
              <div className="file-card">
                <Folder size={48} color="#ecc94b" fill="#ecc94b" fillOpacity={0.2} className="mb-4" />
                <span className="text-sm font-semibold">Worksheets</span>
              </div>
              <div className="file-card">
                <Folder size={48} color="#ecc94b" fill="#ecc94b" fillOpacity={0.2} className="mb-4" />
                <span className="text-sm font-semibold">Project details</span>
              </div>
            </div>
          </section>

          {/* All Files Table */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">All files</span>
                <ChevronRight size={14} className="text-text-muted" />
                <span className="text-text-muted">New Project</span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="table-row table-header bg-gray-50/50">
                <div>Name</div>
                <div>Type</div>
                <div>Size</div>
                <div>Date of change</div>
                <div></div>
              </div>
              
              {filteredFiles.length === 0 ? (
                <div className="p-12 text-center text-text-muted italic">
                  No files uploaded in this folder.
                </div>
              ) : (
                filteredFiles.map(file => (
                  <div key={file.id} className="table-row group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="shrink-0">{getFileIcon(file.type, 20)}</div>
                      <span className="truncate font-medium">{file.name}</span>
                    </div>
                    <div className="text-text-muted">{file.type.split("/")[1]?.toUpperCase() || "FILE"}</div>
                    <div className="text-text-muted">{formatFileSize(file.size)}</div>
                    <div className="text-text-muted">{file.uploadedAt.toLocaleDateString()}</div>
                    <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => deleteFile(file.id)}
                        className="p-1 hover:text-red-500"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Bottom Bar (Conditional) */}
        {files.length > 0 && (
          <div className="h-14 bg-white border-t border-border flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3 text-sm">
              <Folder size={18} color="#ecc94b" fill="#ecc94b" fillOpacity={0.2} />
              <span className="font-semibold">New Project</span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted">{files.length} items</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-text-muted hover:text-foreground">
                <Download size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Download</span>
              </button>
              <button className="flex items-center gap-2 text-text-muted hover:text-foreground">
                <Copy size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Copy link</span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreVertical size={16} />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
