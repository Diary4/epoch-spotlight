import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getPortraitById } from "@/data/portraits";

const PortraitTimeline = () => {
  const { id } = useParams();
  const portraitId = Number(id);
  const portrait = getPortraitById(portraitId);
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!portrait) {
    return <Navigate to="/portraits" replace />;
  }

  // Sample timeline data - you can replace this with actual data from your portrait object
  const timelineData = [
    {
      year: "Early Life",
      title: "Childhood & Origins",
      description: `Born in the heart of ${portrait.name.split(" ")[0]}'s homeland, showing exceptional promise from an early age. The foundations of greatness were laid during these formative years.`,
      image: portrait.images[0] || portrait.image,
      details: [
        "Born into a noble family",
        "Showed exceptional talents in youth",
        "Trained under legendary mentors"
      ]
    },
    {
      year: "Rise to Prominence",
      title: "The Journey Begins",
      description: `A period of remarkable growth and achievement as ${portrait.name} began to make their mark on history.`,
      image: portrait.images[1] || portrait.images[0] || portrait.image,
      details: [
        "First major achievement",
        "Recognition by peers and elders",
        "Establishment of legacy"
      ]
    },
    {
      year: "Peak Era",
      title: "Golden Age",
      description: `The zenith of ${portrait.name}'s power and influence, where legends were forged and history was shaped.`,
      image: portrait.images[2] || portrait.images[0] || portrait.image,
      details: [
        "Defeated great challenges",
        "United divided factions",
        "Built lasting institutions"
      ]
    },
    {
      year: "Legacy",
      title: "Enduring Impact",
      description: `The lasting influence of ${portrait.name} continues to inspire generations.`,
      image: portrait.images[0] || portrait.image,
      details: [
        "Stories passed through generations",
        "Monuments erected in honor",
        "Teachings still followed today"
      ]
    }
  ];

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const sections = document.querySelectorAll('.timeline-section');
    const scrollPosition = e.currentTarget.scrollTop + 300;
    
    sections.forEach((section, index) => {
      const sectionTop = (section as HTMLElement).offsetTop;
      const sectionBottom = sectionTop + (section as HTMLElement).offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        setActiveSection(index);
      }
    });
  };

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('.timeline-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(index);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${portrait.images[0] || portrait.image})`,
          filter: "brightness(0.3) blur(2px)",
          transform: "scale(1.1)",
        }}
      />
      
      {/* Gradient overlays */}
      <div className="fixed inset-0" style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.9) 100%)",
      }} />
      
      <div className="fixed inset-0" style={{
        background: "radial-gradient(circle at 50% 50%, transparent 0%, rgba(0,0,0,0.4) 100%)",
      }} />

      {/* Back Button */}
      <Link
        to={`/portraits/${portrait.id}`}
        className="fixed left-4 top-6 z-30 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 hover:gap-3 md:left-8 md:top-8"
        style={{
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(8px)",
          color: "white",
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <span>←</span>
        <span>Back to Portrait</span>
      </Link>

      {/* Timeline Navigation - Vertical Line */}
      <div className="fixed bottom-0 left-8 top-0 z-20 hidden md:block">
        <div className="relative flex h-full flex-col justify-center">
          {/* Vertical Line */}
          <div 
            className="absolute left-1/2 h-[70%] w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.3) 20%, rgba(255,255,255,0.3) 80%, transparent 100%)",
            }}
          />
          
          {/* Navigation Dots */}
          <div className="relative flex flex-col gap-12">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(index)}
                className="group relative flex items-center gap-4 text-left transition-all duration-300"
              >
                <div className="relative z-10">
                  <div 
                    className={`rounded-full transition-all duration-500 ${
                      activeSection === index 
                        ? "h-3 w-3 bg-white shadow-lg shadow-white/50" 
                        : "h-2 w-2 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-500 ${
                    activeSection === index 
                      ? "max-w-xs opacity-100" 
                      : "max-w-0 opacity-0 group-hover:max-w-xs group-hover:opacity-100"
                  }`}
                >
                  <p className="whitespace-nowrap text-sm font-light uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.7)" }}>
                    {item.year}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div 
        className="relative z-10 mx-auto max-w-5xl px-6 pb-20 pt-32 md:pl-32 md:pr-8"
        onScroll={handleScroll}
        style={{ height: "100vh", overflowY: "auto", scrollBehavior: "smooth" }}
      >
        <div className="space-y-32">
          {timelineData.map((item, index) => (
            <div 
              key={index}
              className={`timeline-section transition-all duration-700 ${
                isVisible 
                  ? "translate-y-0 opacity-100" 
                  : "translate-y-20 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                {/* Year Badge - Centered on desktop */}
                <div className="absolute -top-6 left-1/2 z-10 hidden -translate-x-1/2 md:block">
                  <div 
                    className="rounded-full px-6 py-2 text-sm font-medium uppercase tracking-[0.2em] shadow-xl"
                    style={{
                      background: "rgba(0,0,0,0.8)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.9)",
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Mobile Year Badge */}
                <div className="mb-6 inline-block md:hidden">
                  <div 
                    className="rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em]"
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content Card - Alternating layout */}
                <div 
                  className="overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl"
                  style={{
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Alternating layout based on index */}
                  {index % 2 === 0 ? (
                    // Even index: Image on left, text on right
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 overflow-hidden md:h-auto">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 md:hidden" style={{
                          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
                        }} />
                      </div>
                      <div className="p-6 md:p-8">
                        <h2 
                          className="mb-3 text-2xl font-light tracking-tight md:text-3xl"
                          style={{ color: "white" }}
                        >
                          {item.title}
                        </h2>
                        <p 
                          className="mb-6 text-sm leading-relaxed md:text-base"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {item.description}
                        </p>
                        
                        <div className="space-y-2">
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40" />
                              <span 
                                className="text-xs md:text-sm"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                              >
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Odd index: Text on left, image on right
                    <div className="grid md:grid-cols-2">
                      <div className="order-2 p-6 md:order-1 md:p-8">
                        <h2 
                          className="mb-3 text-2xl font-light tracking-tight md:text-3xl"
                          style={{ color: "white" }}
                        >
                          {item.title}
                        </h2>
                        <p 
                          className="mb-6 text-sm leading-relaxed md:text-base"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {item.description}
                        </p>
                        
                        <div className="space-y-2">
                          {item.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-white/40" />
                              <span 
                                className="text-xs md:text-sm"
                                style={{ color: "rgba(255,255,255,0.6)" }}
                              >
                                {detail}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="relative order-1 h-64 overflow-hidden md:order-2 md:h-auto">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        <div className="absolute inset-0 md:hidden" style={{
                          background: "linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.8) 100%)",
                        }} />
                      </div>
                    </div>
                  )}
                </div>

                {/* Connector Line between sections */}
                {index < timelineData.length - 1 && (
                  <div className="absolute -bottom-16 left-1/2 hidden h-16 w-px -translate-x-1/2 md:block" style={{
                    background: "linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)",
                  }} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* End of Timeline Message */}
        <div className="mt-20 text-center pb-20">
          <div 
            className="inline-block rounded-full px-8 py-4"
            style={{
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          >
            <p className="text-sm uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.6)" }}>
              The Legacy Continues...
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 md:hidden">
        <div className="animate-bounce rounded-full p-2" style={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(8px)",
        }}>
          <span className="text-white">↓</span>
        </div>
      </div>
    </main>
  );
};

export default PortraitTimeline;