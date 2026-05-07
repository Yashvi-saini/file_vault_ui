# 🔒 File Vault

A premium, localized file management experience built with **Next.js 15**, **Tailwind CSS v4**, and **Lucide Icons**. 

## 🚀 Overview
File Vault is a high-fidelity frontend application designed to simulate secure file management directly in your browser memory. No cloud, no tracking—just pure local-first performance.

## ✨ Key Features
- **Modern UI**: A clean, mint-themed dashboard with a professional two-column layout.
- **Drag-and-Drop**: Seamless file uploading using native browser APIs.
- **Intelligent Previews**: 
  - **Images**: High-quality thumbnails for visual content.
  - **Documents**: Branded icons for PDF, Word, and Excel files.
  - **Media**: Themed icons for Audio, Video, and Archives.
- **File Management**: List all uploaded files with real-time metadata (name, size, type) and instant deletion.
- **Local-First**: Files are stored in volatile browser state, ensuring maximum privacy.

## 🛠️ Tech Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Hooks (useState, useCallback)

## 📦 Getting Started

First, install the dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛡️ Privacy
All files are stored in the browser's memory and are never uploaded to any server. Refreshing the page will clear the vault.
