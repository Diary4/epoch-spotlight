import React from 'react';
import { Calendar, Sun, Users, Mountain, Diamond } from 'lucide-react';

const KurdistanFlagInfographic = () => {
  return (
    <div className="min-h-screen bg-[#FDFBF6] text-gray-800 font-sans p-4 md:p-12 flex justify-center">
      <div className="max-w-5xl w-full bg-white/40 shadow-sm border border-[#EBE5D9] rounded-2xl overflow-hidden">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row relative">
          {/* Background decorative curve placeholder */}
          <div className="absolute top-0 left-0 w-full md:w-2/3 h-full bg-[#F5F1E6] rounded-br-[100px] -z-10 border-b border-r border-[#E2D6C0]"></div>
          
          {/* Text Content */}
          <div className="md:w-1/2 p-8 md:p-14 z-10 flex flex-col justify-center">
            <h2 className="text-2xl text-[#1a2f43] font-serif mb-1">The</h2>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1a2f43] leading-[0.9] mb-6">
              Kurdistan<br />Flag
            </h1>
            
            <div className="mb-4">
              <h3 className="text-xl text-[#A37B45] font-semibold mb-4">
                A Symbol of Identity, Unity and Hope
              </h3>
              <p className="text-gray-700 leading-relaxed max-w-sm text-sm">
                The Kurdistan Flag embodies the aspirations, history, and cultural heritage of the Kurdish people. It represents peace, freedom, and the enduring spirit of a nation.
              </p>
            </div>
          </div>

          {/* Hero Image Area */}
          <div className="md:w-1/2 p-6 z-10">
            <div className="w-full h-64 md:h-[400px] bg-gray-200 rounded-xl overflow-hidden shadow-lg relative">
              {/* Replace placeholder with actual flag/citadel image */}
              <img 
                src="/api/placeholder/800/600" 
                alt="Kurdistan Flag over Erbil Citadel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* --- Main Content Container --- */}
        <div className="p-8 md:p-12">
          
          {/* --- History & Meaning Row --- */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            
            {/* History Card */}
            <div className="bg-[#FAF8F3] border border-[#EBE5D9] rounded-xl p-8 flex flex-col">
              <div className="flex items-center gap-2 text-[#A37B45] mb-6 font-serif font-bold tracking-widest text-sm">
                <Diamond size={12} fill="currentColor" /> HISTORY
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 h-full">
                <div className="flex-1">
                  <div className="flex items-center gap-3 text-3xl font-serif font-bold text-gray-800 mb-4">
                    <Calendar size={28} className="text-[#A37B45]" /> 1946
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    The flag was adopted on 17 December 1946 in Mahabad (the Republic of Mahabad) as the official flag of Kurdistan.
                  </p>
                </div>
                <div className="flex-1">
                  <img 
                    src="/api/placeholder/400/300" 
                    alt="Historical adoption of the flag" 
                    className="w-full h-auto rounded grayscale brightness-90 contrast-125 object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Meaning Card */}
            <div className="bg-[#FAF8F3] border border-[#EBE5D9] rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-2 text-[#A37B45] mb-6 font-serif font-bold tracking-widest text-sm self-start w-full">
                <Diamond size={12} fill="currentColor" /> MEANING
              </div>
              
              <Sun size={80} className="text-[#F5A623] mb-6" strokeWidth={1} fill="#F5A623" fillOpacity={0.2} />
              
              <p className="text-sm text-gray-700 leading-relaxed max-w-xs">
                The sun emblem and the colors reflect the Kurdish people's deep connection to nature, life, and the pursuit of freedom.
              </p>
            </div>
          </div>

          {/* --- Colors & Symbolism Section --- */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-px bg-[#D6CBB9] w-1/4"></div>
              <h3 className="font-serif font-bold text-[#333] tracking-[0.2em] text-sm md:text-base">COLORS & SYMBOLISM</h3>
              <div className="h-px bg-[#D6CBB9] w-1/4"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {/* Red */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#ED1C24] mb-4 shadow-sm border border-gray-100"></div>
                <h4 className="font-serif font-bold text-[#ED1C24] mb-2 tracking-widest text-sm">RED</h4>
                <div className="w-2 h-2 rounded-full bg-[#D6CBB9] mb-3"></div>
                <p className="text-xs text-gray-600 leading-relaxed">Sacrifice and<br/>the struggle<br/>for freedom.</p>
              </div>

              {/* White */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white mb-4 shadow-sm border-2 border-[#EBE5D9]"></div>
                <h4 className="font-serif font-bold text-gray-500 mb-2 tracking-widest text-sm">WHITE</h4>
                <div className="w-2 h-2 rounded-full bg-[#D6CBB9] mb-3"></div>
                <p className="text-xs text-gray-600 leading-relaxed">Peace<br/>and truth.</p>
              </div>

              {/* Green */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#279948] mb-4 shadow-sm border border-gray-100"></div>
                <h4 className="font-serif font-bold text-[#279948] mb-2 tracking-widest text-sm">GREEN</h4>
                <div className="w-2 h-2 rounded-full bg-[#D6CBB9] mb-3"></div>
                <p className="text-xs text-gray-600 leading-relaxed">Nature, wealth,<br/>and the land<br/>of Kurdistan.</p>
              </div>

              {/* Sun */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 flex items-center justify-center mb-4">
                  <Sun size={64} className="text-[#F5A623]" fill="#F5A623" />
                </div>
                <h4 className="font-serif font-bold text-[#D08B1F] mb-2 tracking-widest text-sm">SUN</h4>
                <div className="w-2 h-2 rounded-full bg-[#D6CBB9] mb-3"></div>
                <p className="text-xs text-gray-600 leading-relaxed">Life, energy,<br/>and the eternal<br/>light of hope.</p>
              </div>
            </div>
          </div>

          {/* --- Bottom Row: Unity & Heritage --- */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Unity */}
            <div className="bg-[#FAF8F3] border border-[#EBE5D9] rounded-xl p-8 text-center flex flex-col items-center justify-center relative overflow-hidden">
              <h4 className="font-serif font-bold text-[#A37B45] mb-6 tracking-widest text-sm">UNITY</h4>
              
              {/* Abstract Map/People Pattern Placeholder */}
              <div className="absolute inset-0 opacity-5 flex items-center justify-center pointer-events-none">
                 <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-500 via-transparent to-transparent"></div>
              </div>

              <div className="flex justify-center mb-6 text-[#C9A975]">
                <Users size={60} strokeWidth={1.5} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                The flag unites Kurds across all parts of Kurdistan and the diaspora, beyond political and geographical boundaries.
              </p>
            </div>

            {/* Heritage */}
            <div className="bg-[#FAF8F3] border border-[#EBE5D9] rounded-xl p-8 text-center flex flex-col items-center justify-center">
              <div className="flex items-center justify-center gap-3 text-[#A37B45] mb-6 font-serif font-bold tracking-widest text-sm">
                 <Diamond size={10} fill="currentColor" /> 
                 A LIVING HERITAGE 
                 <Diamond size={10} fill="currentColor" />
              </div>
              
              <div className="flex justify-center mb-6 text-[#C9A975]">
                <Mountain size={60} strokeWidth={1} />
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
                More than a flag, it is a living heritage that continues to inspire future generations to build a peaceful and prosperous Kurdistan.
              </p>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default KurdistanFlagInfographic;