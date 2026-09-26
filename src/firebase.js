import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { getFirestore, doc, onSnapshot, getDoc, setDoc, increment, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase App
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Firebase Analytics safely
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn("Firebase Analytics not supported in this environment:", err);
  });
}

export { analytics };

/**
 * Real-time subscription to download links stored in Firestore:
 * Collection: "config"
 * Document: "downloads"
 *
 * Example document structure in Firestore:
 * {
 *   macos: "https://github.com/.../Tadaao.dmg",
 *   windows: "https://github.com/.../Tadaao.zip",
 *   android: "https://github.com/.../app-release.apk",
 *   macos_count: 58,
 *   windows_count: 64,
 *   android_count: 47
 * }
 */
export function subscribeToFirebaseDownloads(onUpdate, onError) {
  try {
    const configDocRef = doc(db, "config", "downloads");
    const unsubscribe = onSnapshot(
      configDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onUpdate(docSnap.data());
        }
      },
      (error) => {
        // Handled silently with fallback so the app continues seamlessly
        if (onError) onError(error);
      }
    );
    return unsubscribe;
  } catch (err) {
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Increment the download count dynamically in Firebase Firestore
 * @param {string} platform - 'macos' | 'windows' | 'android'
 */
export async function incrementFirebaseDownloadCount(platform) {
  try {
    const configDocRef = doc(db, "config", "downloads");
    const countKey = `${platform}_count`;
    await setDoc(
      configDocRef,
      {
        [countKey]: increment(1),
        total_downloads: increment(1),
        last_downloaded_at: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    console.warn("Could not increment Firestore count:", err);
  }
}

/**
 * Track app download event in Firebase Analytics
 * @param {string} platform - 'macos' | 'windows' | 'android'
 * @param {string} fileFormat - '.dmg' | '.zip' | '.apk'
 */
export function trackDownload(platform, fileFormat) {
  try {
    if (analytics) {
      logEvent(analytics, "download_app", {
        platform,
        file_format: fileFormat,
        timestamp: new Date().toISOString(),
      });
      // Also log standard Google Analytics file_download event
      logEvent(analytics, "file_download", {
        file_name: `tadaao-${platform}${fileFormat}`,
        file_extension: fileFormat?.replace(".", "") || "",
        link_url: `https://tadaao.com/download/${platform}`,
      });
    }
  } catch (err) {
    console.warn("Failed to log download event:", err);
  }
}

/**
 * Submit a user bug report directly to Firebase Firestore: bug_reports collection
 * @param {Object} data - { platform, title, description, email, deviceSpecs }
 */
export async function submitBugReport(data) {
  try {
    const docRef = await addDoc(collection(db, "bug_reports"), {
      platform: data.platform || "unspecified",
      title: data.title || "Bug Report",
      description: data.description || "",
      email: data.email || "",
      deviceSpecs: data.deviceSpecs || "",
      createdAt: new Date().toISOString(),
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      status: "open",
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Failed to submit bug report to Firebase:", error);
    throw error;
  }
}

/**
 * Submit a user review directly to Firebase Firestore: reviews collection
 * @param {Object} data - { name, rating, comment, platform }
 */
export async function submitReview(data) {
  try {
    const docRef = await addDoc(collection(db, "reviews"), {
      name: data.name || "Anonymous Peer",
      rating: Number(data.rating) || 5,
      comment: data.comment || "",
      platform: data.platform || "all",
      createdAt: new Date().toISOString(),
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Failed to submit review to Firebase:", error);
    throw error;
  }
}
