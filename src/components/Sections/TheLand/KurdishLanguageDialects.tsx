import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, Feather, UsersRound } from "lucide-react";
import { useLandDetailAnimation } from "@/components/Sections/TheLand/useLandDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import bg from "@/assets/mainImages/letter.webp"

const dialects = [
  {
    name: "Sorani",
    text: "Spoken in southern Kurdistan (Iraq and Iran). It is the official dialect in Iraqi Kurdistan and has a long tradition of written literature.",
    letter: "س",
    color: "#963538",
  },
  {
    name: "Kurmanji",
    text: "Spoken mainly in northern Kurdistan (Turkey, Syria, and parts of Iran). It is the most widespread Kurdish dialect and has a rich literary and oral tradition.",
    letter: "ژ",
    color: "#13213b",
  },
  {
    name: "Hawrami / Gorani",
    text: "Spoken in the Hawraman region and other areas of Iran and Iraq. It reflects the linguistic richness and cultural diversity of Kurdistan.",
    letter: "✥",
    color: "#c69237",
  },
  {
    name: "Zazaki",
    text: "Spoken in parts of eastern Turkey and northwestern Iran. It is one of the important dialects of the Kurdish language family.",
    letter: "ز",
    color: "#405846",
  },
];

const letters = [
  ["[ o ]", "Oo", "Oo", "Oo", "ۆ", "-", "ۆ", "و"],
  ["[ p ]", "Pp", "Pp", "Пп", "پ", "پ", "پ", "پ"],
  ["[ q ]", "Qq", "Qq", "Qq", "ق", "قـ", "ـقـ", "ق"],
  ["[ r ]", "Rr", "Rr", "Рр", "ر", "-", "-", "ر"],
  ["[ s ]", "Ss", "Ss", "Cc", "س", "سـ", "ـسـ", "س"],
  ["[ ʃ ]", "Shsh", "Şş", "Шш", "ش", "شـ", "ـشـ", "ش"],
  ["[ t ]", "Tt", "Tt", "Тт", "ت", "تـ", "ـتـ", "ت"],
  ["[ u ]", "Uu", "Uu", "Ӧӧ", "و", "-", "نو", "و"],
  ["[ y ]", "Ûû", "Ûû", "Yy", "وو", "-", "نو", "وو"],
  ["[ v ]", "Vv", "Vv", "Вв", "ڤ", "ڤـ", "ـڤـ", "ڤ"],
  ["[ x ]", "Xx", "Xx", "Хх", "خ", "خـ", "ـخـ", "خ"],
  ["[ z ]", "Zz", "Zz", "Зз", "ز", "-", "-", "ز"],
  ["[ e ]", "Aa", "Aa", "Aa", "ا", "ـا", "نا", "ا"],
  ["[ b ]", "Bb", "Bb", "Бб", "ب", "بـ", "ـبـ", "ب"],
  ["[ c ]", "Cc", "Çç", "Чч", "ج", "جـ", "ـجـ", "ج"],
  ["[ d ]", "Dd", "Dd", "Дд", "د", "-", "-", "د"],
  ["[ e ]", "Ee", "Ee", "Ээ", "ە", "ە", "ە", "ە"],
  ["[ f ]", "Ff", "Ff", "Фф", "ف", "فـ", "ـفـ", "ف"],
  ["[ g ]", "Gg", "Gg", "Гг", "گ", "گـ", "ـگـ", "گ"],
  ["[ h ]", "Hh", "Hh", "Һһ", "ه", "هـ", "ـهـ", "ه"],
  ["[ i ]", "Ii", "Ii", "Ыы", "ی", "ـی", "ـیـ", "ی"],
  ["[ j ]", "Jj", "Jj", "Жж", "ژ", "-", "-", "ز"],
  ["[ k ]", "Kk", "Kk", "Кк", "ک", "کـ", "ـکـ", "ک"],
  ["[ l ]", "Ll", "Ll", "Лл", "ل", "لـ", "ـلـ", "ل"],
  ["[ m ]", "Mm", "Mm", "Мм", "م", "مـ", "ـمـ", "م"],
  ["[ n ]", "Nn", "Nn", "Нн", "ن", "نـ", "ـنـ", "ن"],
];

function Divider({ className = "" }) {
  return (
    <div className={`flex items-center gap-4 text-[#b99152] ${className}`}>
      <span className="h-0.5 flex-1 bg-[#b99152]" />
      <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
      <span className="h-0.5 flex-1 bg-[#b99152]" />
    </div>
  );
}

function DialectItem({ item, displayFont = "font-serif" }: { item: (typeof dialects)[number]; displayFont?: string }) {
  const hasTitle = Boolean(item?.name?.trim());
  return (
    <article className="grid grid-cols-[86px_1fr] items-center gap-5 border-b border-[#ead8b7] py-5 last:border-b-0">
      <div
        className="grid h-[clamp(3rem,5.7cqw,80px)] w-[clamp(3rem,5.7cqw,80px)] place-items-center rounded-full border-[5px] border-white text-[clamp(1.1rem,2.71cqw,38px)] shrink-0 font-light text-white shadow-md"
        style={{ backgroundColor: item.color }}
      >
        {item.letter}
      </div>
      <div className={`flex min-h-[80px] flex-col ${hasTitle ? "justify-start" : "justify-center"}`}>
        {hasTitle && (
          <h3 className={`${displayFont} text-[clamp(0.9rem,2.14cqw,30px)] font-light leading-tight`} style={{ color: item.color }}>
            {item.name}
          </h3>
        )}
        <p className={`${hasTitle ? "mt-2" : "mt-0"} text-[clamp(0.6rem,1.07cqw,15px)] font-light leading-[1.45] text-[#35435b]`}>
          {item.text}
        </p>
      </div>
    </article>
  );
}

type KurdishLanguageDialectsPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
};

export default function KurdishLanguageDialectsPage({ lang = "en", onBack }: KurdishLanguageDialectsPageProps) {
  const rootRef = useLandDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);
  const localDialects = isAr
    ? [
        { name: "السورانية", text: "تُتحدث في جنوب كوردستان في العراق وإيران. وهي اللهجة الرسمية في كوردستان العراق ولها تقليد أدبي مكتوب عريق.", letter: "س", color: "#963538" },
        { name: "الكُرمانجية", text: "تُتحدث بصورة رئيسية في شمال كوردستان في تركيا وسوريا وأجزاء من إيران. وهي اللهجة الكوردية الأوسع انتشارًا ولها تقليد أدبي وشفهي غني.", letter: "ژ", color: "#13213b" },
        { name: "الهَوْرامي / الگورانية", text: "تُتحدث في منطقة هَوْرامان وأجزاء أخرى من إيران والعراق. تعكس الغنى اللغوي والتنوع الثقافي لكوردستان .", letter: "✥", color: "#c69237" },
        { name: "الزازاكية", text: "تُتحدث في أجزاء من شرق تركيا وشمال غرب إيران. تُعدّ من اللهجات المهمة في عائلة اللغة الكوردية.", letter: "ز", color: "#405846" },
      ]
    : isKu
      ? [
          { name: "سۆرانی", text: "لە باشوور و ڕۆژهەڵاتی کوردستان (عێراق و ئێران) قسەی پێدەکرێت. دیالێکتێکی فەرمییە لە کوردستانی عێراق و خاوەن نەریتێکی درێژی ئەدەبی نووسراوە.", letter: "س", color: "#963538" },
          { name: "کرمانجی", text: "بە شێوەیەکی سەرەکی لە باکوور و ڕۆژئاوای کوردستان (تورکیا، سووریا و بەشێک لە ئێران) قسەی پێدەکرێت. بەربڵاوترین دیالێکتی کوردییە و خاوەن نەریتێکی دەوڵەمەندی ئەدەبی و زارەکییە.", letter: "ژ", color: "#13213b" },
          { name: "هەورامی / گۆرانی", text: "لە ناوچەی هەورامان و چەند ناوچەیەک تری ئێران و عێراق قسەی پێدەکرێت. ڕەنگدانەوەی دەوڵەمەندیی زمانەوانی و فرەجۆریی کولتووریی کوردستانە.", letter: "✥", color: "#c69237" },
          { name: "زازاکی", text: "لە بەشێک لە ڕۆژهەڵاتی تورکیا و باکووری ڕۆژئاوای ئێران قسەی پێدەکرێت. یەکێکە لە دیالێکتە گرنگەکانی خێزانی زمانی کوردی.", letter: "ز", color: "#405846" },
        ]
      : dialects;

  // Fixed design canvas (1400px wide). We measure its natural height and scale
  // the whole canvas to fit the viewport in BOTH dimensions, then center it, so
  // the page looks identical on big screens and small phones (just smaller),
  // instead of reflowing into a different mobile layout.
  const DESIGN_WIDTH = 1400;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0, y: 0 });

  useEffect(() => {
    const recompute = () => {
      const el = canvasRef.current;
      if (!el) return;
      const naturalHeight = el.offsetHeight;
      if (!naturalHeight) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scale = Math.min(vw / DESIGN_WIDTH, vh / naturalHeight);
      const x = (vw - DESIGN_WIDTH * scale) / 2;
      // Anchor to the top so the hero header stays flush with the top edge;
      // any leftover space (when width is the limiting factor) falls below.
      const y = 0;
      setFit({ scale, x, y });
    };

    recompute();
    window.addEventListener("resize", recompute);
    const el = canvasRef.current;
    const ro = el ? new ResizeObserver(recompute) : null;
    if (el && ro) ro.observe(el);
    return () => {
      window.removeEventListener("resize", recompute);
      ro?.disconnect();
    };
  }, [lang]);

  return (
    <div
      dir={dir}
      className={`relative h-screen w-screen overflow-hidden bg-[#f8f1e7] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, ${fit.y}px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          containerType: "inline-size",
        }}
      >
        <main ref={rootRef} className="m-0 w-full bg-[#f8f1e7] text-[#17233b]">
          <section className="relative mx-auto flex w-full flex-col overflow-hidden rounded-[28px] bg-[#fbf5eb]">

            {/* Responsive back button */}
            <button
              type="button"
              onClick={onBack}
              className="land-detail-back absolute left-[clamp(1rem,2cqw,2rem)] top-[clamp(1rem,2cqw,2rem)] z-30 grid h-[clamp(2.8rem,4.4cqw,3.8rem)] w-[clamp(2.8rem,4.4cqw,3.8rem)] place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm rtl:left-auto rtl:right-[clamp(1rem,2cqw,2rem)]"
              aria-label="Back to The Land and Future"
            >
              <ArrowLeft size={32} className="rtl:rotate-180" />
            </button>

            <div className="pointer-events-none absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-28 opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Absolutely positioned background artwork container */}
            <div className="land-detail-hero pointer-events-none absolute right-0 top-0 z-0 h-[700px] w-[clamp(740px,58cqw,812px)] overflow-hidden rtl:right-auto rtl:left-0">
              <div className="absolute inset-0 rtl:-scale-x-100">
                <img
                  src={bg}
                  alt="Kurdish language books placeholder"
                  className="absolute inset-0 h-full w-full object-cover object-right-top opacity-72 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_72%,rgba(0,0,0,0.75)_82%,rgba(0,0,0,0.35)_92%,transparent_100%)]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/25 to-transparent rtl:bg-gradient-to-l" />
              <div className="absolute bottom-0 left-0 h-40 w-full bg-gradient-to-b from-transparent via-[#fbf5eb]/55 to-[#fbf5eb]" />
            </div>

            <div className="relative z-10 flex w-full flex-col px-[clamp(1.4rem,3.2cqw,52px)] pt-[clamp(1.5rem,4cqw,3rem)] pb-[clamp(1.2rem,3cqw,2.6rem)]">
              {/* Hero header */}
              <section className="land-detail-intro w-full max-w-[min(52cqw,720px)] pt-2">
                <h1 className={`${displayFont} text-[clamp(2.6rem,7.3cqw,102px)] font-light leading-[0.98] tracking-tight text-[#17233b]`}>
                  {isAr ? "اللغة الكوردية واللهجات" : isKu ? "زمان و زاراوە کوردییەکان" : "Kurdish"}
                  {!isAr && !isKu && <br />}
                  {!isAr && !isKu && "Language &"}
                  {!isAr && !isKu && <br />}
                  {!isAr && !isKu && "Dialects"}
                </h1>

                <p className={`mt-8 ${displayFont} text-[clamp(1.3rem,2.86cqw,40px)] leading-tight text-[#9b6d35]`}>
                  {isAr ? "لغة حية تحمل الأدب والهوية والتعبير." : isKu ? "زمانێکی زیندووی ئەدەب، ناسنامە، و دەربڕین." : "A living language of literature, identity, and expression."}
                </p>

                <div className="mt-8 w-[clamp(12rem,22.8cqw,320px)]">
                  <Divider />
                </div>

                <p className="mt-8 max-w-none text-[clamp(0.85rem,2cqw,28px)] font-light leading-[1.55] text-[#35435b]">
                  {isAr
                    ? "اللغة الكوردية لغة الشعب الكوردي، تجمع الملايين في كوردستان والمهجر، وتحمل تراثًا أدبيًا ثريًا وموروثًا شفهيًا حيًا تناقلته الأجيال."
                    : isKu
                      ? "زمانێکی گرنگی گەلی کوردە. ملیۆنان کەس لە کوردستان و تاراوگە یەکدەخات، هەڵگری نەریتێکی ئەدەبی دەوڵەمەند و کەلەپوورێکی زارەکی زیندووە کە نەوە دوای نەوە دەگوازرێتەوە."
                      : "Kurdish is an important language of the Kurdish people. It unites millions across Kurdistan and the diaspora, carrying a rich literary tradition and a vibrant oral heritage that has been passed down through generations."}
                </p>
              </section>

              {/* Main Content Panels */}
              <section className="mt-10 grid grid-cols-[minmax(350px,0.82fr)_minmax(0,1.38fr)] gap-7 pb-6">
                <aside className="land-detail-panel flex min-h-[1150px] flex-col rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-7 py-7 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md">
                  <h2 className={`text-center ${displayFont} text-[clamp(1.1rem,2.71cqw,38px)] font-light text-[#17233b]`}>
                    {isAr ? "اللهجات الرئيسية" : isKu ? "دیالێکتە سەرەکییەکان" : "Main Dialects"}
                  </h2>
                  <Divider className="mx-auto mt-4 w-36" />
                  <div className="mt-6 flex flex-1 flex-col justify-evenly">
                    {localDialects.map((item) => (
                      <DialectItem key={item.name} item={item} displayFont={displayFont} />
                    ))}
                  </div>
                </aside>

                <section className="land-detail-panel flex min-h-[1150px] flex-col rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-6 py-6 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md">
                  <h2 className={`text-center ${displayFont} text-[clamp(1.1rem,2.57cqw,36px)] font-light text-[#17233b]`}>
                    {isAr ? "الأبجدية والكتابة" : isKu ? "ئەلفوبێ و نووسین" : "Alphabet & Writing"}
                  </h2>

                  <Divider className="mx-auto mt-4 w-56" />

                  <div className="mt-5 grid flex-1 grid-cols-2 gap-5">
                    {[letters.slice(0, 13), letters.slice(13)].map((group, groupIndex) => (
                      <div key={groupIndex} className="min-w-0">
                        <table className="w-full table-fixed border-collapse text-[#17233b]">
                          <thead>
                            <tr className="text-[clamp(0.4rem,0.71cqw,10px)] uppercase text-[#35435b]">
                              <th className="w-[13%] px-1 py-2 text-left">IPA</th>
                              <th className="w-[12%] px-1 py-2">Latin1</th>
                              <th className="w-[12%] px-1 py-2">Latin2</th>
                              <th className="w-[14%] px-1 py-2">Cyrillic</th>
                              <th className="w-[12%] px-1 py-2">Final</th>
                              <th className="w-[12%] px-1 py-2">Medial</th>
                              <th className="w-[13%] px-1 py-2">Initial</th>
                              <th className="w-[12%] px-1 py-2">Isol.</th>
                            </tr>
                          </thead>

                          <tbody>
                            {group.map((row, idx) => (
                              <tr
                                key={idx}
                                className="h-[78px] last:border-0"
                              >
                                {row.map((cell, i) => (
                                  <td
                                    key={i}
                                    className={`px-1 py-2 text-center align-middle text-[clamp(0.6rem,1.07cqw,15px)] font-bold leading-none ${
                                      i === 0
                                        ? "text-left text-[clamp(0.5rem,0.86cqw,12px)] font-semibold text-[#35435b]"
                                        : ""
                                    }`}
                                  >
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}
                  </div>
                </section>
              </section>

              {/* Bottom strip */}
              <section className="land-detail-panel mt-2 grid grid-cols-[1fr_auto_1fr] items-center gap-4 rounded-[22px] border-2 border-[#ead8b7] bg-white/72 px-8 py-5 min-h-[150px] shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md">
                <article className="grid grid-cols-[100px_1fr] gap-6">
                  <div className="grid h-[clamp(3rem,7.43cqw,104px)] w-[clamp(3rem,7.43cqw,104px)] place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237] shadow-md shrink-0">
                    <Feather className="h-[clamp(1.5rem,4.3cqw,60px)] w-[clamp(1.5rem,4.3cqw,60px)]" strokeWidth={1.5} />
                  </div>
                  <div className="text-start">
                    <h3 className={`${displayFont} text-[clamp(1rem,2.43cqw,34px)] font-light text-[#17233b]`}>
                      {isAr ? "الأدب والتراث الشفهي" : isKu ? "ئەدەب و کەلەپووری زارەکی" : "Literature & Oral Heritage"}
                    </h3>
                    <p className="mt-2 text-[clamp(0.7rem,1.43cqw,20px)] font-light leading-snug text-[#35435b]">
                      {isAr
                        ? "من الشعر الكلاسيكي والحكايات إلى الروايات والأغاني الحديثة، تُعبّر اللغة الكوردية عن عمق التجربة الإنسانية وروح الصمود والأمل."
                        : isKu
                          ? "لە شیعری کلاسیک و گێڕانەوە تا ڕۆمان و گۆرانییە مۆدێرنەکان، زمانی کوردی گوزارشت لە قووڵایی ئەزموونی مرۆیی و ڕۆحی خۆڕاگری و ئومێد دەکات."
                          : "From classical poetry and storytelling to modern novels and songs, Kurdish language expresses the depth of human experience and the spirit of resilience and hope."}
                    </p>
                  </div>
                </article>

                <div className="grid place-items-center text-[#b99152] text-[clamp(1.5rem,4.3cqw,60px)]">✥</div>

                <article className="grid grid-cols-[100px_1fr] gap-6">
                  <div className="grid h-[clamp(3rem,7.43cqw,104px)] w-[clamp(3rem,7.43cqw,104px)] place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237] shadow-md shrink-0">
                    <UsersRound className="h-[clamp(1.5rem,4.3cqw,60px)] w-[clamp(1.5rem,4.3cqw,60px)]" strokeWidth={1.5} />
                  </div>
                  <div className="text-start">
                    <h3 className={`${displayFont} text-[clamp(1rem,2.43cqw,34px)] font-light text-[#17233b]`}>
                      {isAr ? "اللغة في الحياة اليومية" : isKu ? "زمان لە ژیانی ڕۆژانەدا" : "Language in Daily Life"}
                    </h3>
                    <p className="mt-2 text-[clamp(0.7rem,1.43cqw,20px)] font-light leading-snug text-[#35435b]">
                      {isAr
                        ? "الكوردية هي لغة البيت والتعليم والإعلام والثقافة. تربط المجتمعات وتعزز الهوية عبر الحدود والأجيال."
                        : isKu
                          ? "کوردی زمانی ماڵ، پەروەردە، میدیا و کولتوورە. کۆمەڵگە بەیەکەوە دەبەستێتەوە و ناسنامە لە سەرانسەری سنوورەکان و نەوەکاندا بەهێز دەکات."
                          : "Kurdish is the language of home, education, media, and culture. It connects communities and strengthens identity across borders and generations."}
                    </p>
                  </div>
                </article>
              </section>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
