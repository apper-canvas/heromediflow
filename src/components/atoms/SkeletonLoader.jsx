import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';

const SkeletonLoader = ({ type = 'list', count = 5 }) => {
  if (type === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(count)].map((_, i) => (
          <Card key={i} motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 } }}>
            <div className="animate-pulse space-y-3">
              <div className="h-6 bg-surface-200 rounded w-1/3"></div>
              <div className="h-4 bg-surface-200 rounded w-1/2"></div>
              <div className="h-4 bg-surface-200 rounded w-3/4"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(count)].map((_, i) => (
          <Card key={i} motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 } }}>
            <div className="animate-pulse space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-surface-200 rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-5 bg-surface-200 rounded w-32"></div>
                  <div className="h-4 bg-surface-200 rounded w-24"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-surface-200 rounded w-full"></div>
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'profile') {
    return (
      <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
        <div className="animate-pulse space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-surface-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-6 bg-surface-200 rounded w-48"></div>
              <div className="h-4 bg-surface-200 rounded w-32"></div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-4 bg-surface-200 rounded w-full"></div>
            <div className="h-4 bg-surface-200 rounded w-3/4"></div>
            <div className="h-4 bg-surface-200 rounded w-1/2"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (type === 'dashboard') {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.1 } }}>
            <div className="animate-pulse space-y-4">
              <div className="h-6 bg-surface-200 rounded w-1/3"></div>
              <div className="space-y-2">
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (type === 'report') {
    return (
      <Card motionProps={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }}>
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-surface-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-surface-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-64 bg-surface-200 rounded-lg"></div>
        </div>
      </Card>
    );
  }

  return null;
};

export default SkeletonLoader;