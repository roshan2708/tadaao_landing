/**
 * ==============================================================================
 * TADAAO DOWNLOAD & REPOSITORY HYPERLINKS
 * ==============================================================================
 * Paste your specific download links and GitHub URL below.
 * Updating these URLs here will automatically update all buttons, cards,
 * navbar, hero, and footer links across the entire website.
 */

export const DOWNLOAD_LINKS = {
  // macOS Download Link (e.g., .dmg or .zip release asset URL)
  macos: "#",

  // Windows Download Link (e.g., .exe or .msi installer URL)
  windows: "#",

  // Linux Download Link (e.g., .AppImage or .deb package URL)
  linux: "#",

  // Android Download Link (e.g., direct .apk or Google Play Store URL)
  android: "#",

  // iOS Download Link (e.g., Apple App Store or TestFlight URL)
  ios: "#",

  // GitHub Repository URL
  github: "https://github.com/tadaao-app/tadaao",

  // Optional: Release notes or documentation URL
  docs: "https://github.com/tadaao-app/tadaao#readme",
};

/**
 * Platform metadata configuration
 */
export const PLATFORM_INFO = [
  {
    id: "macos",
    name: "macOS",
    version: "macOS 12.0+",
    arch: "Apple Silicon (M1–M4) & Intel x86_64",
    fileFormat: ".dmg / .zip",
    href: DOWNLOAD_LINKS.macos,
    command: "brew install tadaao",
    badge: "Universal Binary",
  },
  {
    id: "windows",
    name: "Windows",
    version: "Windows 10 & 11",
    arch: "x64 & ARM64 Architecture",
    fileFormat: ".exe / .msi",
    href: DOWNLOAD_LINKS.windows,
    command: "winget install tadaao",
    badge: "Installer & Portable",
  },
  {
    id: "linux",
    name: "Linux",
    version: "Ubuntu, Arch, Fedora, Debian",
    arch: "x86_64 & aarch64",
    fileFormat: ".AppImage / .deb",
    href: DOWNLOAD_LINKS.linux,
    command: "curl -fsSL https://tadaao.app/install.sh | sh",
    badge: "Universal Binary",
  },
  {
    id: "android",
    name: "Android",
    version: "Android 8.0 (API 26)+",
    arch: "arm64-v8a / armeabi-v7a",
    fileFormat: ".apk / Play Store",
    href: DOWNLOAD_LINKS.android,
    command: null,
    badge: "APK & Store",
  },
  {
    id: "ios",
    name: "iOS & iPadOS",
    version: "iOS 15.0 or newer",
    arch: "Universal iPhone & iPad",
    fileFormat: "App Store / TestFlight",
    href: DOWNLOAD_LINKS.ios,
    command: null,
    badge: "Native Swift",
  },
];
