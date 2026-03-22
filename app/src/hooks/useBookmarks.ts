"use client";

import { useState, useEffect } from 'react';

export interface Bookmark {
  id: string;
  type: 'severance' | 'unemployment' | 'article' | 'guide';
  title: string;
  data: any;
  createdAt: string;
  cityName?: string;
  summary?: string;
}

const STORAGE_KEY = 'caileme_bookmarks';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 加载收藏列表
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setBookmarks(parsed);
      }
    } catch (error) {
      console.error('Failed to load bookmarks:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 保存到localStorage
  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Failed to save bookmarks:', error);
    }
  };

  // 添加收藏
  const addBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    
    const newBookmarks = [newBookmark, ...bookmarks];
    saveBookmarks(newBookmarks);
    return newBookmark;
  };

  // 删除收藏
  const removeBookmark = (id: string) => {
    const newBookmarks = bookmarks.filter(b => b.id !== id);
    saveBookmarks(newBookmarks);
  };

  // 检查是否已收藏
  const isBookmarked = (type: string, title: string) => {
    return bookmarks.some(b => b.type === type && b.title === title);
  };

  // 切换收藏状态
  const toggleBookmark = (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const existing = bookmarks.find(b => b.type === bookmark.type && b.title === bookmark.title);
    if (existing) {
      removeBookmark(existing.id);
      return false;
    } else {
      addBookmark(bookmark);
      return true;
    }
  };

  // 清空所有收藏
  const clearAll = () => {
    saveBookmarks([]);
  };

  return {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    clearAll,
  };
}
