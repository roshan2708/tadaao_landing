export const DOWNLOAD_LINKS = {
  macos: "https://github.com/roshan2708/tadaao_landing/releases/download/v01/Tadaao.dmg",
  windows: "https://github.com/roshan2708/tadaao_landing/releases/download/v01/Tadaao-Windows.zip",
  android: "https://github.com/roshan2708/tadaao_landing/releases/download/v01/app-release.apk",
};

export const PLATFORM_INFO = [
  {
    id: "macos",
    name: "macOS",
    fileFormat: ".dmg",
    description: "macOS 12.0+ (Apple Silicon & Intel)",
    href: DOWNLOAD_LINKS.macos,
    buttonText: "Download .dmg",
  },
  {
    id: "windows",
    name: "Windows",
    fileFormat: ".zip",
    description: "Windows 10 & 11 (x64)",
    href: DOWNLOAD_LINKS.windows,
    buttonText: "Download .zip",
  },
  {
    id: "android",
    name: "Android",
    fileFormat: ".apk",
    description: "Android 8.0 or newer",
    href: DOWNLOAD_LINKS.android,
    buttonText: "Download .apk",
  },
];
