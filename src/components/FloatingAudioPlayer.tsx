
"use client";

import { useCallback, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const AUDIO_SRC = "/assets/audio/wedding-audio.mpeg";
const LOOP_START_SEC = 0;
const LOOP_END_SEC = 50;

export function FloatingAudioPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleToggleMute = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        // Initially muted: click to start playing with sound
        if (audio.paused) {
            audio.muted = false;
            audio.currentTime = LOOP_START_SEC;

            try {
                await audio.play();
                setIsPlaying(true);
                setIsMuted(false);
            } catch (error) {
                console.error("Audio playback failed:", error);
            }

            return;
        }

        // Toggle mute/unmute while playing
        audio.muted = !audio.muted;
        setIsMuted(audio.muted);
    }, []);

    const handleTimeUpdate = () => {
        const audio = audioRef.current;
        if (!audio || !Number.isFinite(audio.duration)) return;

        const effectiveEnd = Math.min(LOOP_END_SEC, audio.duration);

        if (audio.currentTime >= effectiveEnd) {
            audio.currentTime = LOOP_START_SEC;
        }
    };

    return (
        <div
            data-audio-control="true"
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center rounded-full"
            role="region"
            aria-label="Wedding Audio Control"
        >
            <audio
                ref={audioRef}
                src={AUDIO_SRC}
                preload="auto"
                onTimeUpdate={handleTimeUpdate}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            <button
                type="button"
                onClick={handleToggleMute}
                aria-label={isMuted ? "Play wedding music" : "Mute wedding music"}
                title={isMuted ? "Play music" : "Mute music"}
                className="flex items-center gap-2 transition-all cursor-pointer"
            >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#6B0F0D] text-[#FDF4DE]">
                    {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                    ) : (
                        <Volume2 className="h-4 w-4" />
                    )}
                </span>
            </button>
        </div>
    );
}
