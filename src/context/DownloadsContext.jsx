import React, { createContext, useContext, useState, useEffect } from 'react';
import { DOWNLOAD_LINKS, PLATFORM_INFO } from '../constants/downloads';
import { subscribeToFirebaseDownloads, trackDownload, incrementFirebaseDownloadCount } from '../firebase';

const DownloadsContext = createContext(null);

export function DownloadsProvider({ children }) {
  const [links, setLinks] = useState(DOWNLOAD_LINKS);
  const [counts, setCounts] = useState(() => {
    return PLATFORM_INFO.reduce((acc, p) => {
      acc[p.id] = p.downloadsCount;
      return acc;
    }, {});
  });
  const [isFirebaseSynced, setIsFirebaseSynced] = useState(false);
  const [animatingPlatform, setAnimatingPlatform] = useState(null);

  useEffect(() => {
    // Subscribe to real-time updates from Firebase Firestore: config/downloads
    const unsubscribe = subscribeToFirebaseDownloads(
      (data) => {
        if (!data) return;

        // Update links if present in Firestore
        setLinks((prev) => ({
          macos: data.macos || prev.macos,
          windows: data.windows || prev.windows,
          android: data.android || prev.android,
        }));

        // Update counts if present in Firestore
        setCounts((prev) => ({
          macos: data.macos_count !== undefined ? Number(data.macos_count) : prev.macos,
          windows: data.windows_count !== undefined ? Number(data.windows_count) : prev.windows,
          android: data.android_count !== undefined ? Number(data.android_count) : prev.android,
        }));

        setIsFirebaseSynced(true);
      },
      (error) => {
        // Fallback silently to static constants if Firestore is not configured yet
        console.info('Using local fallback download links (Firestore sync pending configuration)');
      }
    );

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleDownload = (platformId, fileFormat) => {
    // 1. Log event in Firebase Analytics
    trackDownload(platformId, fileFormat);

    // 2. Increment real count in Firebase Firestore
    incrementFirebaseDownloadCount(platformId);

    // 3. Trigger dynamic animation on UI counter badge
    setAnimatingPlatform(platformId);
    setTimeout(() => {
      setAnimatingPlatform(null);
    }, 1200);

    // 4. Optimistically update local count for instantaneous responsiveness
    setCounts((prev) => ({
      ...prev,
      [platformId]: (prev[platformId] || 50) + 1,
    }));
  };

  return (
    <DownloadsContext.Provider
      value={{
        links,
        counts,
        handleDownload,
        isFirebaseSynced,
        animatingPlatform,
      }}
    >
      {children}
    </DownloadsContext.Provider>
  );
}

export function useDownloads() {
  const context = useContext(DownloadsContext);
  if (!context) {
    throw new Error('useDownloads must be used within a DownloadsProvider');
  }
  return context;
}
