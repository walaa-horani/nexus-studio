
import React from 'react';

export type AppView = 'dashboard' | 'content-studio' | 'image-studio' | 'history' | 'settings';

export interface StatItem {
  label: string;
  value: string | number;
  change: string;
  isPositive: boolean;
}

export interface GeneratedContent {
  id: string;
  title: string;
  type: 'text' | 'image';
  content: string;
  timestamp: Date;
  metadata?: any;
}

export interface SidebarItem {
  id: AppView;
  label: string;
  icon: React.ReactNode;
}