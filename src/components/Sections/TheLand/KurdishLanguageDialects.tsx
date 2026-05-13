import React from "react";
import { ArrowLeft, Feather, UsersRound } from "lucide-react";
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
  const hasTitle = Boolean(item?.name?.trim());
  return (
    <article className="grid grid-cols-[86px_1fr] items-center gap-5 border-b border-[#ead8b7] py-5 last:border-b-0">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border-[5px] border-white text-[38px] font-bold text-white shadow-md"
        style={{ backgroundColor: item.color }}
      >
        {item.letter}
      </div>
      <div className={`flex min-h-[80px] flex-col ${hasTitle ? "justify-start" : "justify-center"}`}>
        {hasTitle && (
          <h3 className="font-serif text-[30px] font-semibold leading-tight" style={{ color: item.color }}>
            {item.name}
          </h3>
        )}
        <p className={`${hasTitle ? "mt-2" : "mt-0"} text-[15px] font-semibold leading-[1.45] text-[#35435b]`}>
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
  const isKu = lang === "ku";
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
  return (
    <main className="m-0 flex min-h-screen w-screen justify-center bg-[#f8f1e7] text-[#17233b]">
      <section className="relative flex min-h-[calc(100vh-clamp(16px,2.6vh,32px))] w-[min(100vw,1400px)] flex-col overflow-hidden rounded-[clamp(22px,2.4vw,34px)] bg-[#fbf5eb]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-4 top-4 z-30 grid h-12 w-12 place-items-center rounded-full border-2 border-[#d9b477] bg-white/70 text-[#17233b] shadow-sm sm:left-8 sm:top-8 sm:h-14 sm:w-14 lg:h-16 lg:w-16"
          aria-label="Back to The Land and Future"
        >
          <ArrowLeft className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8" />
        </button>
        <div className="absolute left-0 top-0 h-full w-28 opacity-22 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute right-0 top-0 h-full w-28 opacity-18 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Replace this with your generated language/books background */}
        <div className="pointer-events-none absolute right-0 top-[60px] h-[700px] w-[58vw] min-w-[740px]">
          <img
            src={bg}
            alt="Kurdish language books placeholder"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#fbf5eb] via-[#fbf5eb]/68 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf5eb] via-[#fbf5eb]/24 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#fbf5eb]" />
        </div>

        <div className="relative z-10 flex flex-1 flex-col px-[clamp(18px,3.2vw,52px)] py-[clamp(14px,2vh,36px)]">
          {/* Hero */}
          <section className="max-w-[720px] pt-2 pl-1 sm:pl-5">
            <h1 className="font-serif text-[68px] font-semibold leading-[0.98] tracking-tight text-[#17233b] sm:text-[76px] lg:text-[102px]">
              {isAr ? "اللغة الكوردية واللهجات" : isKu ? "زمان و زاراوە کوردییەکان" : "Kurdish"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "Language &"}
              {!isAr && !isKu && <br />}
              {!isAr && !isKu && "Dialects"}
            </h1>

            <p className="mt-8 font-serif text-[28px] leading-tight text-[#9b6d35] sm:text-[31px] lg:text-[40px]">
              {isAr ? "لغة حية تحمل الأدب والهوية والتعبير." : isKu ? "زمانێکی زیندووی ئەدەب، ناسنامە، و دەربڕین." : "A living language of literature, identity, and expression."}
            </p>

            <div className="mt-8 w-[230px] lg:w-[320px]">
              <Divider />
            </div>

            <p className="mt-8 max-w-[500px] text-[20px] font-semibold leading-[1.55] text-[#35435b] lg:max-w-[620px] lg:text-[28px]">
              {isAr
                ? "اللغة الكوردية لغة الشعب الكوردي، تجمع الملايين في كوردستان والمهجر، وتحمل تراثًا أدبيًا ثريًا وموروثًا شفهيًا حيًا تناقلته الأجيال."
                : isKu
                  ? "زمانێکی گرنگی گەلی کوردە. ملیۆنان کەس لە کوردستان و تاراوگە یەکدەخات، هەڵگری نەریتێکی ئەدەبی دەوڵەمەند و کەلەپوورێکی زارەکی زیندووە کە نەوە دوای نەوە دەگوازرێتەوە."
                : "Kurdish is an important language of the Kurdish people. It unites millions across Kurdistan and the diaspora, carrying a rich literary tradition and a vibrant oral heritage that has been passed down through generations."}
            </p>
          </section>

          {/* Main content */}
          <section className="mt-6 grid grid-cols-1 gap-5 pb-6 lg:mt-10 lg:grid-cols-[minmax(350px,0.82fr)_minmax(0,1.38fr)] lg:gap-7">
            <aside className="flex h-full min-h-[1000px] flex-col rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-6 py-6 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md lg:min-h-[1150px] lg:px-7 lg:py-7">
              <h2 className="text-center font-serif text-[30px] font-semibold text-[#17233b] lg:text-[38px]">{isAr ? "اللهجات الرئيسية" : isKu ? "دیالێکتە سەرەکییەکان" : "Main Dialects"}</h2>
              <Divider className="mx-auto mt-4 w-36" />
              <div className="mt-6 grid flex-1 content-between">
                {localDialects.map((item) => (
                  <DialectItem key={item.name} item={item} />
                ))}
              </div>
            </aside>

            <section className="flex h-full min-h-[1000px] flex-col rounded-[24px] border-2 border-[#ead8b7] bg-white/76 px-4 py-5 shadow-[0_12px_30px_rgba(84,54,16,0.13)] backdrop-blur-md lg:min-h-[1150px] lg:px-6 lg:py-6">
              <h2 className="text-center font-serif text-[28px] font-semibold text-[#17233b] lg:text-[36px]">
                Alphabet & Writing
              </h2>

              <Divider className="mx-auto mt-3 w-44 lg:w-56" />

              <div className="mt-5 grid flex-1 grid-cols-1 gap-5 xl:grid-cols-2">
                {[letters.slice(0, 13), letters.slice(13)].map((group, groupIndex) => (
                  <div
                    key={groupIndex}
                    className="flex h-full flex-col"
                  >
                    <table className="h-full w-full table-fixed border-collapse text-[#17233b]">
                      <thead>
                        <tr className="text-[9px] uppercase text-[#35435b] lg:text-[10px]">
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
                            className="h-[72px] last:border-0 lg:h-[78px]"
                          >
                            {row.map((cell, i) => (
                              <td
                                key={i}
                                className={`px-1 py-[8px] text-center align-middle text-[13px] font-bold leading-none lg:text-[15px] ${
                                  i === 0
                                    ? "text-left text-[11px] font-semibold text-[#35435b] lg:text-[12px]"
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
          <section className="grid min-h-[150px] grid-cols-1 items-center gap-6 rounded-[22px] border-2 border-[#ead8b7] bg-white/72 px-6 py-5 shadow-[0_12px_30px_rgba(84,54,16,0.1)] backdrop-blur-md sm:grid-cols-[1fr_120px_1fr] sm:gap-0 sm:px-8">
            <article className="grid grid-cols-[90px_1fr] gap-6 lg:grid-cols-[100px_1fr]">
              <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237] lg:h-26 lg:w-26">
                <Feather className="h-[54px] w-[54px] lg:h-[60px] lg:w-[60px]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-[28px] font-semibold text-[#17233b] lg:text-[34px]">
                  {isAr ? "الأدب والتراث الشفهي" : isKu ? "ئەدەب و کەلەپووری زارەکی" : "Literature & Oral Heritage"}
                </h3>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-[#35435b] lg:text-[20px]">
                  {isAr
                    ? "من الشعر الكلاسيكي والحكايات إلى الروايات والأغاني الحديثة، تُعبّر اللغة الكوردية عن عمق التجربة الإنسانية وروح الصمود والأمل."
                    : isKu
                      ? "لە شیعری کلاسیک و گێڕانەوە تا ڕۆمان و گۆرانییە مۆدێرنەکان، زمانی کوردی گوزارشت لە قووڵایی ئەزموونی مرۆیی و ڕۆحی خۆڕاگری و ئومێد دەکات."
                    : "From classical poetry and storytelling to modern novels and songs, Kurdish language expresses the depth of human experience and the spirit of resilience and hope."}
                </p>
              </div>
            </article>

            <div className="grid place-items-center text-[#b99152] text-6xl">✥</div>

            <article className="grid grid-cols-[90px_1fr] gap-6 lg:grid-cols-[100px_1fr]">
              <div className="grid h-24 w-24 place-items-center rounded-full border-2 border-[#ead8b7] bg-[#fff8ed] text-[#c69237] lg:h-26 lg:w-26">
                <UsersRound className="h-[54px] w-[54px] lg:h-[60px] lg:w-[60px]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-serif text-[28px] font-semibold text-[#17233b] lg:text-[34px]">
                  {isAr ? "اللغة في الحياة اليومية" : isKu ? "زمان لە ژیانی ڕۆژانەدا" : "Language in Daily Life"}
                </h3>
                <p className="mt-2 text-[17px] font-semibold leading-snug text-[#35435b] lg:text-[20px]">
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
  );
}
