import React from "react";
import { ArrowLeft, Feather, UsersRound } from "lucide-react";

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
  ["[ j ]", "Jj", "Jj", "Жж", "ژ", "-", "-", "ژ"],
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

function DialectItem({ item }) {
  return (
    <article className="grid grid-cols-[86px_1fr] gap-5 border-b border-[#ead8b7] py-5 last:border-b-0">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border-[5px] border-white text-[38px] font-bold text-white shadow-md"
        style={{ backgroundColor: item.color }}
      >
        {item.letter}
      </div>
      <div>
        <h3 className="font-serif text-[30px] font-semibold leading-tight" style={{ color: item.color }}>
          {item.name}
        </h3>
        <p className="mt-2 text-[15px] font-semibold leading-[1.45] text-[#35435b]">
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
  const isAr = lang === "ar";
  const localDialects = isAr
    ? [
        { name: "السورانية", text: "تُتحدث في جنوب كوردستان في العراق وإيران. وهي اللهجة الرسمية في كوردستان العراق ولها تقليد أدبي مكتوب عريق.", letter: "س", color: "#963538" },
        { name: "الكُرمانجية", text: "تُتحدث بصورة رئيسية في شمال كوردستان في تركيا وسوريا وأجزاء من إيران. وهي اللهجة الكوردية الأوسع انتشارًا ولها تقليد أدبي وشفهي غني.", letter: "ژ", color: "#13213b" },
        { name: "الهَوْرامي / الگورانية", text: "تُتحدث في منطقة هَوْرامان وأجزاء أخرى من إيران والعراق. تعكس الغنى اللغوي والتنوع الثقافي لكوردستان .", letter: "✥", color: "#c69237" },
        { name: "الزازاكية", text: "تُتحدث في أجزاء من شرق تركيا وشمال غرب إيران. تُعدّ من اللهجات المهمة في عائلة اللغة الكوردية.", letter: "ز", color: "#405846" },
      ]
    : dialects;
  return (
    <main className="min-h-screen w-full bg-[#f8f1e7] text-[#17233b]">
      <section className="relative mx-auto flex min-h-screen w-full max-w-[1080px] flex-col overflow-hidden bg-[#fbf5eb] px-8 py-9">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-8 top-8 z-30 grid h-14 w-14 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="absolute inset-0 opacity-16 [background-image:radial-gradient(#d7b56c_1px,transparent_1px)] [background-size:26px_26px]" />
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-28 opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated language/books background */}
        <div className="pointer-events-none absolute right-0 top-[70px] h-[610px] w-[760px]">
          <img
            src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1500&q=90"
            alt="Kurdish language books placeholder"
            className="absolute inset-0 h-full w-full object-cover opacity-76 [mask-image:radial-gradient(circle_at_62%_48%,black_0%,black_56%,transparent_84%)]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/24 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Hero */}
          <section className="max-w-[520px] pt-2 pl-5">
            <h1 className="font-serif text-[76px] font-semibold leading-[0.98] tracking-tight text-[#17233b]">
              {isAr ? "اللغة الكوردية واللهجات" : "Kurdish"}
              {!isAr && <br />}
              {!isAr && "Language &"}
              {!isAr && <br />}
              {!isAr && "Dialects"}
            </h1>

            <p className="mt-8 font-serif text-[31px] leading-tight text-[#9b6d35]">
              {isAr ? "لغة حية تحمل الأدب والهوية والتعبير." : "A living language of literature, identity, and expression."}
            </p>

            <div className="mt-8 w-[230px]">
              <Divider />
            </div>

            <p className="mt-8 max-w-[420px] text-[20px] font-semibold leading-[1.55] text-[#35435b]">
              {isAr
                ? "اللغة الكوردية لغة الشعب الكوردي، تجمع الملايين في كوردستان والمهجر، وتحمل تراثًا أدبيًا ثريًا وموروثًا شفهيًا حيًا تناقلته الأجيال."
                : "Kurdish is an important language of the Kurdish people. It unites millions across Kurdistan and the diaspora, carrying a rich literary tradition and a vibrant oral heritage that has been passed down through generations."}
            </p>
          </section>

          <div className="flex-1" />

          {/* Main content */}
          <section className="grid grid-cols-[330px_1fr] gap-4 pb-6">
            <aside className="rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-6 py-6 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md">
              <h2 className="text-center font-serif text-[28px] font-semibold text-[#17233b]">{isAr ? "اللهجات الرئيسية" : "Main Dialects"}</h2>
              <Divider className="mx-auto mt-4 w-36" />
              <div className="mt-3">
                {localDialects.map((item) => (
                  <DialectItem key={item.name} item={item} />
                ))}
              </div>
            </aside>

            <section className="rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-7 py-6 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md">
              <h2 className="text-center font-serif text-[28px] font-semibold text-[#17233b]">Alphabet & Writing</h2>
              <Divider className="mx-auto mt-4 w-52" />

              <div className="mt-5 grid grid-cols-2 gap-8 text-[15px] font-semibold text-[#17233b]">
                {[letters.slice(0, 13), letters.slice(13)].map((group, groupIndex) => (
                  <table key={groupIndex} className="w-full border-collapse">
                    <thead>
                      <tr className="text-[10px] uppercase text-[#35435b]">
                        <th className="py-1 text-left">IPA</th>
                        <th>Latin1</th>
                        <th>Latin2</th>
                        <th>Cyrillic</th>
                        <th>Final</th>
                        <th>Medial</th>
                        <th>Initial</th>
                        <th>Isolated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.map((row, idx) => (
                        <tr key={idx} className="border-b border-[#efe3cc]/70 last:border-0">
                          {row.map((cell, i) => (
                            <td key={i} className={`py-[5px] text-center ${i === 0 ? "text-left text-[13px] text-[#35435b]" : ""}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ))}
              </div>
            </section>
          </section>

          {/* Bottom strip */}
          <section className="grid min-h-[150px] grid-cols-[1fr_120px_1fr] items-center rounded-[22px] border-2 border-[#ead8b7] bg-white/72 px-8 py-5 shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md">
            <article className="grid grid-cols-[90px_1fr] gap-6">
              <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237]">
                <Feather size={54} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-[28px] font-semibold text-[#17233b]">
                  {isAr ? "الأدب والتراث الشفهي" : "Literature & Oral Heritage"}
                </h3>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-[#35435b]">
                  {isAr
                    ? "من الشعر الكلاسيكي والحكايات إلى الروايات والأغاني الحديثة، تُعبّر اللغة الكوردية عن عمق التجربة الإنسانية وروح الصمود والأمل."
                    : "From classical poetry and storytelling to modern novels and songs, Kurdish language expresses the depth of human experience and the spirit of resilience and hope."}
                </p>
              </div>
            </article>

            <div className="grid place-items-center text-[#b99152] text-6xl">✥</div>

            <article className="grid grid-cols-[90px_1fr] gap-6">
              <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237]">
                <UsersRound size={54} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-[28px] font-semibold text-[#17233b]">
                  {isAr ? "اللغة في الحياة اليومية" : "Language in Daily Life"}
                </h3>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-[#35435b]">
                  {isAr
                    ? "الكوردية هي لغة البيت والتعليم والإعلام والثقافة. تربط المجتمعات وتعزز الهوية عبر الحدود والأجيال."
                    : "Kurdish is the language of home, education, media, and culture. It connects communities and strengthens identity across borders and generations."}
                </p>
              </div>
            </article>
          </section>
        </div>
      </section>
    </main>
  );
}
