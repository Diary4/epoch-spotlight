import { useEffect, useMemo, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getPortraitById } from "@/data/portraits";
import secondBg from "@/assets/second-bg.svg";

const PortraitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const portraitId = Number(id);
  const portrait = useMemo(() => getPortraitById(portraitId), [portraitId]);
  const [slide, setSlide] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [pageReady, setPageReady] = useState(false);

  if (!portrait) {
    return <Navigate to="/portraits" replace />;
  }

  const currentSlide = portrait.images[slide] ?? portrait.images[0];
  const hasSlider = portrait.images.length > 1;

  useEffect(() => {
    const timer = window.setTimeout(() => setShowContent(true), 300);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setPageReady(true), 40);
    return () => window.clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setSlide((s) => (s + 1) % portrait.images.length);
      setTimeout(() => setIsFading(false), 60);
    }, 200);
  };

  const prevSlide = () => {
    if (isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setSlide((s) => (s - 1 + portrait.images.length) % portrait.images.length);
      setTimeout(() => setIsFading(false), 60);
    }, 200);
  };

  const goToSlide = (index: number) => {
    if (isFading || index === slide) return;
    setIsFading(true);
    setTimeout(() => {
      setSlide(index);
      setTimeout(() => setIsFading(false), 60);
    }, 200);
  };

  return (
    <main
      className="relative h-screen overflow-hidden"
      style={{ backgroundColor: "#000" }}
    >
      {/* Background Image with Simple Fade */}
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-out ${pageReady ? "opacity-100 scale-100" : "opacity-0 scale-[1.01]"}`}
        style={{
          backgroundImage: `url(${currentSlide || portrait.image || secondBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: isFading ? 0.82 : undefined,
        }}
      />
      
      {/* Dark gradient overlay for better text visibility */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.5) 100%)",
        }} 
      />

      {/* Image Slider Controls - Only show if multiple images */}
      {hasSlider && (
        <>
          <button
            type="button"
            onClick={prevSlide}
            disabled={isFading}
            className={`fixed left-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 transition-all duration-300 md:left-8 ${
              isFading ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:bg-black/70"
            }`}
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            ←
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={isFading}
            className={`fixed right-4 top-1/2 z-20 -translate-y-1/2 rounded-full p-3 transition-all duration-300 md:right-8 ${
              isFading ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:bg-black/70"
            }`}
            style={{
              background: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(8px)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
          >
            →
          </button>
          
          {/* Slide indicators */}
          <div className="fixed bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {portrait.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                disabled={isFading}
                className="transition-all duration-300"
                style={{
                  width: slide === idx ? "32px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  background: slide === idx ? "white" : "rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </>
      )}

      {/* Back Button */}
      <Link
        to="/portraits"
        className="fixed left-4 top-6 z-20 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:gap-3 md:left-8 md:top-8"
        style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <span>←</span>
        <span>Back</span>
      </Link>

      {/* Elegant Content Box */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-10 transition-all duration-700 md:bottom-8 md:left-8 md:right-auto md:max-w-lg ${
          showContent ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div 
          className="rounded-t-2xl p-6 shadow-2xl md:rounded-2xl md:p-8"
          style={{
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Character Name */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-white/40" />
              <p 
                className="text-xs font-light uppercase tracking-[0.25em]"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {portrait.role}
              </p>
            </div>
            
            <h1 
              className="text-4xl font-light tracking-tight md:text-5xl lg:text-6xl"
              style={{ 
                color: "white",
                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              }}
            >
              {portrait.name}
            </h1>
          </div>

          {/* Short Description */}
          <div className="mt-6">
            <p 
              className="text-sm leading-relaxed md:text-base"
              style={{ 
                color: "rgba(255,255,255,0.85)",
                lineHeight: "1.7",
              }}
            >
              {portrait.about}
            </p>
          </div>

          {/* Decorative Line */}
          <div className="my-6">
            <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/40 to-transparent" />
          </div>

          {/* Explore More Button */}
          <button
            type="button"
            onClick={() => navigate(`/portraits/${portrait.id}/timeline`)}
            className="group flex w-full items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:gap-4 md:w-auto"
            style={{
              background: "rgba(255,255,255,0.1)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.2)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.2)";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.1)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span>Explore Journey</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default PortraitDetail;