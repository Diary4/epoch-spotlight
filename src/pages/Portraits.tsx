import { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PORTRAITS } from "@/data/portraits";
import background from "@/assets/images/kurdistan.jpg";

const Portraits = () => {
  const navigate = useNavigate();

  const rows = useMemo(
    () =>
      PORTRAITS.map((portrait) => ({
        id: portrait.id,
        character: {
          id: portrait.id,
          name: portrait.name,
          image: portrait.image,
          role: portrait.role,
          target: portrait,
        },
        wife: {
          id: `${portrait.id}-wife`,
          name: `${portrait.name.split(" ")[0]} Wife`,
          image: portrait.images[1] ?? portrait.image,
          role: "Wife",
          target: portrait,
        },
      })),
    [],
  );

  return (
    <main className="relative min-h-screen overflow-auto" style={{ background: "linear-gradient(135deg, #0B2A66 0%, #091A3D 45%, #070F24 100%)" }}>
      {/* Background with elegant overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${background})`,
        }}
      />
      
      {/* Subtle animated gradient overlay */}
      <div className="fixed inset-0 opacity-30" style={{
        background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
      }} />
      
      {/* Decorative corner accents */}
      <div className="fixed left-8 top-8 h-20 w-20 border-l-2 border-t-2 border-white/10" />
      <div className="fixed right-8 top-8 h-20 w-20 border-r-2 border-t-2 border-white/10" />
      <div className="fixed bottom-8 left-8 h-20 w-20 border-b-2 border-l-2 border-white/10" />
      <div className="fixed bottom-8 right-8 h-20 w-20 border-b-2 border-r-2 border-white/10" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:py-16 lg:px-8">
        {/* Header Section - Elegant */}
        <div className="mb-16 text-center md:text-left">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div className="space-y-3">
              <p 
                className="text-xs font-light uppercase tracking-[0.3em] md:text-sm"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                Our Collection
              </p>
              <h1
                className="text-5xl font-light tracking-tight md:text-7xl lg:text-8xl"
                style={{
                  color: "white",
                  textShadow: "0 2px 20px rgba(0,0,0,0.3)",
                }}
              >
                All Portraits
              </h1>
              <div className="flex justify-center md:justify-start">
                <div className="mt-2 h-px w-16 bg-gradient-to-r from-white/60 to-transparent" />
              </div>
            </div>
            
            <Link 
              to="/" 
              className="group flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 hover:gap-3"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.08)";
              }}
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Portraits Grid - No borders, elegant cards */}
        <div className="space-y-8">
          {rows.map((row, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:shadow-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Elegant background gradient on hover */}
              <div 
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0) 100%)",
                }}
              />
              
              <div className="relative px-6 py-8 md:px-8 md:py-10">
                <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                  {/* Row Number - Elegant display */}
                  <div className="relative">
                    <div 
                      className="text-center md:text-left"
                      style={{
                        fontSize: "clamp(3rem, 8vw, 5rem)",
                        fontWeight: 200,
                        background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {String(rowIndex + 1).padStart(2, '0')}
                    </div>
                    <div className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-white/20 to-transparent md:hidden" />
                  </div>
                  
                  {/* Character Cards - No borders, elegant design */}
                  <div className="flex flex-1 flex-wrap items-center justify-center gap-8 md:justify-around md:gap-12">
                    {[row.character, row.wife].map((person, idx) => (
                      <button
                        key={person.id}
                        type="button"
                        onClick={() => navigate(`/portraits/${person.target.id}`, { state: { fromPortraitList: true } })}
                        className="group/person relative text-center transition-all duration-300 hover:scale-105"
                      >
                        {/* Elegant glow effect on hover */}
                        <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/person:opacity-100" style={{
                          background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                          filter: "blur(20px)",
                        }} />
                        
                        {/* Image Container - No border, elegant shadow */}
                        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full shadow-2xl transition-all duration-500 md:h-32 md:w-32 lg:h-36 lg:w-36">
                          <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover/person:opacity-100" style={{
                            background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)",
                          }} />
                          <img 
                            src={person.image} 
                            alt={person.name} 
                            className="h-full w-full object-cover transition-transform duration-700 group-hover/person:scale-110"
                          />
                          
                          {/* Elegant ring on hover */}
                          <div className="absolute inset-0 rounded-full border-2 border-white/0 transition-all duration-500 group-hover/person:border-white/40" />
                        </div>
                        
                        {/* Name with elegant styling */}
                        <p 
                          className="mt-4 text-xs font-medium uppercase tracking-[0.2em] transition-all duration-300 md:text-sm group-hover/person:tracking-[0.25em]"
                          style={{ 
                            color: "rgba(255,255,255,0.9)",
                            letterSpacing: "0.15em",
                          }}
                        >
                          {person.name}
                        </p>
                        
                        {/* Role badge */}
                        <div className="mt-1">
                          <span 
                            className="text-[10px] font-light uppercase tracking-[0.15em] md:text-xs"
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          >
                            {idx === 0 ? "Character" : "Partner"}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer note */}
        <div className="mt-16 text-center">
          <p 
            className="text-xs font-light uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {PORTRAITS.length} Characters • Click any portrait to explore
          </p>
        </div>
      </div>
    </main>
  );
};

export default Portraits;