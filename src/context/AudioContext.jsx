import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BASS_COLOR_PALETTE, DEFAULT_MONOCHROME_COLOR } from '../constants/audioPalette';
import { AudioContext } from './audioContextDef';



export function AudioProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [colorIndex, setColorIndex] = useState(0);
  const [bassIntensity, setBassIntensity] = useState(0); // 0.0 - 1.0 smoothed
  const [rawBass, setRawBass] = useState(0);

  const audioRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const gainNodeRef = useRef(null);
  const sourceNodeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastBeatTimeRef = useRef(0);
  const bassEmaRef = useRef(0.2);
  const smoothBassRef = useRef(0);

  // Initialize Web Audio graph upon user gesture
  const initAudioGraph = useCallback(() => {
    if (!audioRef.current) return;

    if (!audioContextRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      const ctx = new AudioCtx();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.75;

      const gainNode = ctx.createGain();
      gainNode.gain.value = volume;

      if (!sourceNodeRef.current) {
        try {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyser);
          analyser.connect(gainNode);
          gainNode.connect(ctx.destination);
          sourceNodeRef.current = source;
        } catch (e) {
          console.warn('Audio node already connected or blocked:', e);
        }
      }

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      gainNodeRef.current = gainNode;
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, [volume]);

  // Real-time frequency analyzer loop
  const startFrequencyAnalysis = useCallback(() => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateLoop = () => {
      if (!analyserRef.current) return;

      analyser.getByteFrequencyData(dataArray);

      // Bass bins: 1 to 7 (~46 Hz to ~330 Hz with fftSize 1024 @ 48kHz)
      let bassSum = 0;
      const bassBinStart = 1;
      const bassBinEnd = 7;
      for (let i = bassBinStart; i <= bassBinEnd; i++) {
        bassSum += dataArray[i];
      }
      const currentBass = bassSum / ((bassBinEnd - bassBinStart + 1) * 255);

      // Exponential moving average for baseline tracking
      bassEmaRef.current = bassEmaRef.current * 0.94 + currentBass * 0.06;

      // Peak / Transient detection to trigger color switch
      const now = performance.now();
      const isBeat =
        currentBass > bassEmaRef.current * 1.35 &&
        currentBass > 0.35 &&
        now - lastBeatTimeRef.current > 280;

      if (isBeat) {
        lastBeatTimeRef.current = now;
        setColorIndex((prev) => (prev + 1) % BASS_COLOR_PALETTE.length);
      }

      // Smooth decay for visual responsiveness
      if (currentBass > smoothBassRef.current) {
        smoothBassRef.current = currentBass;
      } else {
        smoothBassRef.current = smoothBassRef.current * 0.90;
      }

      setRawBass(currentBass);
      setBassIntensity(smoothBassRef.current);

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(updateLoop);
  }, []);

  // Start audio from intro screen or explicit click
  const startAudio = useCallback(async () => {
    initAudioGraph();
    setHasStarted(true);

    if (audioRef.current) {
      try {
        if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
        startFrequencyAnalysis();
      } catch (err) {
        console.warn('Playback initiation error:', err);
      }
    }
  }, [initAudioGraph, startFrequencyAnalysis]);

  const togglePlay = useCallback(async () => {
    if (!hasStarted) {
      return startAudio();
    }

    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      setBassIntensity(0);
    } else {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        startFrequencyAnalysis();
      } catch (err) {
        console.warn('Play error:', err);
      }
    }
  }, [hasStarted, isPlaying, startAudio, startFrequencyAnalysis]);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const newMuted = !isMuted;
    audioRef.current.muted = newMuted;
    setIsMuted(newMuted);

    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = newMuted ? 0 : volume;
    }
  }, [isMuted, volume]);

  const setVolume = useCallback((val) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (gainNodeRef.current && !isMuted) {
      gainNodeRef.current.gain.value = clamped;
    }
    if (audioRef.current) {
      audioRef.current.volume = clamped;
    }
  }, [isMuted]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const currentColor =
    isPlaying && !isMuted
      ? BASS_COLOR_PALETTE[colorIndex]
      : DEFAULT_MONOCHROME_COLOR;

  const value = {
    isPlaying,
    isMuted,
    hasStarted,
    volume,
    bassIntensity,
    rawBass,
    currentColor,
    startAudio,
    togglePlay,
    toggleMute,
    setVolume,
  };

  return (
    <AudioContext.Provider value={value}>
      {/* Background audio element */}
      <audio
        ref={audioRef}
        src="/woofer.mp3"
        loop
        preload="auto"
        playsInline
      />
      {children}
    </AudioContext.Provider>
  );
}

