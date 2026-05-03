import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LazyImage from "../ui/LazyImage";
import { SLIDES } from "../../data/heroSlides";

gsap.registerPlugin(ScrollTrigger);

const INTERVAL = 5500;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);
  const heroRef = useRef(null);
 
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const ctaRef = useRef(null);
 
  const imageRefs = useRef([]);

  const counterRef = useRef(null);

  const progressRef = useRef(null);
  const progressTweenRef = useRef(null);

   const animateTextIn = useCallback(() => {
    const targets = [eyebrowRef.current, headingRef.current, bodyRef.current, ctaRef.current];
    gsap.killTweensOf(targets);
    gsap.fromTo(
      targets,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  }, []);

   const animateTextOut = useCallback(() => {
    const targets = [ctaRef.current, bodyRef.current, headingRef.current, eyebrowRef.current];
    return gsap.to(targets, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.06,
    });
  }, []);

   const crossFade = useCallback((nextIndex) => {
    const imgs = imageRefs.current;
    gsap.to(imgs[nextIndex], { opacity: 1, duration: 0.9, ease: "power2.inOut", zIndex: 2 });
     gsap.to(imgs[nextIndex === 0 ? SLIDES.length - 1 : nextIndex - 1] ?? imgs, {
      opacity: 0, duration: 0, delay: 0.9, zIndex: 0,
    });
  }, []);

   const resetImages = useCallback((activeIndex) => {
    imageRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: i === activeIndex ? 1 : 0, zIndex: i === activeIndex ? 2 : 0 });
    });
  }, []);

   const startProgress = useCallback(() => {
    if (progressTweenRef.current) progressTweenRef.current.kill();
    if (!progressRef.current) return;
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
    progressTweenRef.current = gsap.to(progressRef.current, {
      scaleX: 1,
      duration: INTERVAL / 1000,
      ease: "none",
    });
  }, []);

   const goTo = useCallback(
    (nextIndex) => {
      if (isAnimating || nextIndex === current) return;
      setIsAnimating(true);
       if (counterRef.current) {
        gsap.fromTo(
          counterRef.current,
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.45 }
        );
      }

      animateTextOut().then(() => {
         crossFade(nextIndex);
        setCurrent(nextIndex);
        setIsAnimating(false);
        animateTextIn();
        startProgress();
      });
    },
    [isAnimating, current, animateTextOut, crossFade, animateTextIn, startProgress]
  );

  const next = useCallback(() => {
    goTo((current + 1) % SLIDES.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length);
  }, [current, goTo]);

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, INTERVAL);
  }, [next]);

  // ── Mount: initial anim + timer ───────────────────────
  useEffect(() => {
    resetImages(0);
    animateTextIn();
    startProgress();
    timerRef.current = setInterval(next, INTERVAL);

    // Scroll-triggered fade in
    if (heroRef.current) {
      gsap.set(heroRef.current, { opacity: 0 });
      gsap.to(heroRef.current, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });
    }

    return () => {
      clearInterval(timerRef.current);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
   }, []);

   useEffect(() => {
    const el = imageRefs.current[current];
    if (!el) return;
    gsap.fromTo(
      el,
      { scale: 1.06 },
      { scale: 1, duration: 6, ease: "power1.out" }
    );
  }, [current]);

  const slide = SLIDES[current];

  return (
    <div ref={heroRef} className="relative h-[75dvh] min-h-[480px] w-full overflow-hidden bg-black">

      {/* Images */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => (imageRefs.current[i] = el)}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 0 }}
        >
          <LazyImage
            src={s.src}
            alt={s.alt}
            className="h-full w-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        </div>
      ))}

       <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

       <div className="absolute inset-0 z-20 flex items-end pb-16 pl-8 pr-8 sm:pl-14 lg:pl-20 lg:pb-20 justify-end">
        <div className="max-w-lg">
          <p
            ref={eyebrowRef}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/60"
            style={{ opacity: 0 }}
          >
            {slide.eyebrow}
          </p>
          <h1
            ref={headingRef}
            className="mb-4 font-['Cormorant_Garamond',Georgia,serif] text-4xl font-light leading-tight text-white sm:text-5xl lg:text-6xl"
            style={{ opacity: 0 }}
          >
            {slide.heading}
          </h1>
          <p
            ref={bodyRef}
            className="mb-7 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base"
            style={{ opacity: 0 }}
          >
            {slide.body}
          </p>
          <Link
            ref={ctaRef}
            to={slide.cta.to}
            className="group inline-flex items-center gap-2.5 border border-white/80 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-white hover:text-black"
            style={{ opacity: 0 }}
          >
            {slide.cta.label}
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>

       <button
        type="button"
        onClick={() => { prev(); resetTimer(); }}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-30 -translate-y-1/5 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/50 sm:left-6"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        type="button"
        onClick={() => { next(); resetTimer(); }}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-30 -translate-y-1/5 flex h-10 w-10 items-center justify-center border border-white/30 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/50 sm:right-6"
      >
        <ChevronRight size={20} />
      </button>
       <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-between px-8 sm:px-14 lg:px-20">

         <div className="font-['Cormorant_Garamond',Georgia,serif] text-xs tracking-widest text-white/50">
          <span ref={counterRef} className="text-white">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="mx-1">/</span>
          {String(SLIDES.length).padStart(2, "0")}
        </div>

         <div className="flex items-center gap-3">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => { goTo(i); resetTimer(); }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              className="relative h-[2px] bg-white/25 transition-all duration-300 overflow-hidden"
              style={{ width: i === current ? "2.5rem" : "0.75rem" }}
            >
              {i === current && (
                <span
                  ref={progressRef}
                  className="absolute inset-0 bg-white origin-left"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}