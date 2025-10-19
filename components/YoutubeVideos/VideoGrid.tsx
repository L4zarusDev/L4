'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface VideoItem {
  id: string;
  title: string;
  imageUrl: string;
  videoUrl: string;
  viewCount: number;
  publishedAt: string;
}

const formatViewCount = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  } else if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

const VideoCard: React.FC<VideoItem> = ({
  title,
  imageUrl,
  videoUrl,
  viewCount,
}) => (
  <Link
    href={videoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="group/bento relative w-full overflow-hidden rounded-lg"
    data-gsap="video-card"
  >
    <div className="absolute inset-0 h-full w-full rounded-lg bg-black opacity-0 transition-all duration-200 group-hover/bento:opacity-30" />
    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={imageUrl}
        alt={title}
        fill
        className="object-cover transition-all duration-200 group-hover/bento:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-2/4 bg-gradient-to-t from-black to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 flex-1 text-sm font-medium text-white">
            {title}
          </h3>
          <span className="mt-0.5 whitespace-nowrap text-xs text-gray-300">
            {formatViewCount(viewCount)} views
          </span>
        </div>
      </div>
    </div>
  </Link>
);

async function fetchVideos(): Promise<VideoItem[]> {
  try {
    const response = await fetch('/api/youtube/videos');
    if (!response.ok) throw new Error('Failed to fetch videos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default function VideoGrid() {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVideos()
      .then(setVideos)
      .finally(() => setLoading(false));
  }, []);

  useGSAP(() => {
    if (loading || videos.length === 0) return;

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Set initial states for video cards
    gsap.set('[data-gsap="video-card"]', { opacity: 0, y: 40 });

    // Create staggered animation for video cards
    gsap.to('[data-gsap="video-card"]', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.3, // 0.3s delay between each video card
      scrollTrigger: {
        trigger: '[data-gsap="video-card"]',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none none',
      }
    });
  }, [loading, videos]); // Re-run when loading state or videos change

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-video w-full animate-pulse rounded-lg bg-gray-800"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.slice(0, 9).map((video) => (
        <VideoCard key={video.id} {...video} />
      ))}
    </div>
  );
}
