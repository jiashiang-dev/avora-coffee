'use client';

import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FRAME_THRESHOLD = 1 / 48;
const SEEK_INTERVAL = 1000 / 24;

function getScrollDistance() {
  if (window.innerWidth < 640) return window.innerHeight * 2.4;
  if (window.innerWidth < 1024) return window.innerHeight * 3.15;
  return window.innerHeight * 4;
}

export function CinematicPour() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const outroRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const video = videoRef.current;
    const intro = introRef.current;
    const outro = outroRef.current;

    if (!section || !video || !intro || !outro) return;

    video.pause();

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let trigger: ScrollTrigger | undefined;
    let copyTimeline: gsap.core.Timeline | undefined;
    let animationFrame = 0;
    let targetTime = 0;
    let seekPending = false;
    let lastSeekAt = 0;

    const releaseSeek = () => {
      seekPending = false;
    };

    const seekTowardTarget = (now: number) => {
      const difference = targetTime - video.currentTime;

      if (
        !seekPending &&
        Math.abs(difference) >= FRAME_THRESHOLD &&
        now - lastSeekAt >= SEEK_INTERVAL
      ) {
        const nextTime =
          Math.abs(difference) > 0.55
            ? targetTime
            : video.currentTime + difference * 0.58;

        seekPending = true;
        lastSeekAt = now;
        video.currentTime = Math.max(0, Math.min(nextTime, video.duration));
      }

      animationFrame = requestAnimationFrame(seekTowardTarget);
    };

    const buildSequence = () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return;

      video.pause();

      if (reduceMotion.matches) {
        video.currentTime = Math.min(video.duration * 0.52, video.duration - 0.01);
        gsap.set(intro, { autoAlpha: 1, y: 0 });
        gsap.set(outro, { autoAlpha: 0 });
        section.dataset.motion = 'reduced';
        return;
      }

      section.dataset.motion = 'scrub';
      video.currentTime = 0;

      gsap.set(intro, { autoAlpha: 1, y: 0 });
      gsap.set(outro, { autoAlpha: 0, y: 20 });

      copyTimeline = gsap.timeline({ paused: true, defaults: { ease: 'none' } });
      copyTimeline.to(intro, { autoAlpha: 0, y: -20, duration: 0.12 }, 0.025);
      copyTimeline.to(outro, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.82);
      copyTimeline.to({}, { duration: 0.06 }, 0.94);

      trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollDistance()}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetTime = self.progress * video.duration;
          copyTimeline?.progress(self.progress);
        },
        onRefresh: (self) => {
          video.pause();
          targetTime = self.progress * video.duration;
          seekPending = false;
          video.currentTime = targetTime;
          copyTimeline?.progress(self.progress);
        },
      });

      animationFrame = requestAnimationFrame(seekTowardTarget);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    video.addEventListener('seeked', releaseSeek);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      buildSequence();
    } else {
      video.addEventListener('loadedmetadata', buildSequence, { once: true });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      video.removeEventListener('seeked', releaseSeek);
      video.removeEventListener('loadedmetadata', buildSequence);
      trigger?.kill();
      copyTimeline?.kill();
      video.pause();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hero cinematic"
      id="top"
      aria-labelledby="hero-title"
    >
      <video
        ref={videoRef}
        className="cinematic__video"
        src="/avora-coffee-scrub.mp4"
        preload="auto"
        muted
        playsInline
        disablePictureInPicture
        onPlay={(event) => event.currentTarget.pause()}
        aria-label="Coffee poured from a pitcher into a glass"
      />

      <nav className="nav" aria-label="Primary navigation">
        <a className="wordmark" href="#top" aria-label="AVORA COFFEE, home">
          AVORA<sup>®</sup>
        </a>
        <div className="nav__links">
          <a href="#coffee">Coffee</a>
          <a href="#craft">Craft</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
        </div>
        <a className="nav__visit" href="#visit">
          Visit us <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <div ref={introRef} className="hero__brand">
        <p className="hero__label">Specialty coffee / 2026</p>
        <h1 className="hero__title" id="hero-title">
          <span>Avora</span>
          <span className="italic">Coffee</span>
        </h1>
        <div className="hero__support">
          <p>Coffee made for slower moments.</p>
          <span className="hero__scroll" aria-hidden="true">Scroll to pour ↓</span>
        </div>
      </div>

      <div ref={outroRef} className="cinematic__copy cinematic__copy--outro" aria-hidden="true">
        <p>AVORA / Poured slowly</p>
        <h2>
          <span>Poured</span>
          <span className="italic">with patience.</span>
        </h2>
      </div>

      <div className="cinematic__edge" aria-hidden="true">
        <span>Scroll controls the pour</span>
      </div>
    </section>
  );
}
