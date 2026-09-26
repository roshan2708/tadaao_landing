export const DOWNLOAD_LINKS = {
  macos: "https://github.com/roshan2708/tadaao_landing/releases/download/v01/Tadaao.dmg",
  windows: "https://github.com/roshan2708/tadaao_landing/releases/download/v01/Tadaao.zip",
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
    downloadsCount: 58,
    badge: "58+ downloads",
    steps: [
      { step: "1", text: "Open the downloaded .dmg file" },
      { step: "2", text: "Drag Tadaao into Applications in Finder" },
      { step: "3", text: "Open Tadaao from Applications" },
      {
        step: "4",
        text: "If macOS prevents opening: Go to System Settings → Privacy & Security, scroll down to Security, and click 'Open Anyway'",
        highlight: true,
      },
    ],
  },
  {
    id: "windows",
    name: "Windows",
    fileFormat: ".zip",
    description: "Windows 10 & 11 (x64)",
    href: DOWNLOAD_LINKS.windows,
    buttonText: "Download .zip",
    downloadsCount: 64,
    badge: "64+ downloads",
    steps: [
      { step: "1", text: "Extract the downloaded .zip file" },
      { step: "2", text: "Click on the sharing app to open" },
      { step: "3", text: "Right-click & select 'Pin to Start' to use regularly", highlight: true },
    ],
  },
  {
    id: "android",
    name: "Android",
    fileFormat: ".apk",
    description: "Android 8.0 or newer",
    href: DOWNLOAD_LINKS.android,
    buttonText: "Download .apk",
    downloadsCount: 47,
    badge: "47+ downloads",
    steps: [
      { step: "1", text: "Download the .apk package file" },
      { step: "2", text: "Open the file and tap Install" },
      { step: "3", text: "Allow installation from this source if prompted" },
    ],
  },
];
