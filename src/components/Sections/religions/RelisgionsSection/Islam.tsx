import React from "react";
import { Sparkles } from "lucide-react";

import bg from "@/assets/images/religions/islam/barzani.jpeg";
import shafiImg from "@/assets/images/religions/islam/shafi.jpeg";
import sufismImg from "@/assets/images/religions/islam/sufism.jpeg";
import ministryImg from "@/assets/images/religions/islam/ministry.jpeg";
import eidImg from "@/assets/images/religions/islam/eid.jpeg";
import { useReligionPageAnimation } from "@/components/Sections/religions/useReligionPageAnimation";
import {
  FAITH_CONTENT_PADDING,
  FAITH_DETAIL_CONTENT_WIDTH,
  FAITH_DETAIL_HEADER_CLASS,
  FAITH_TAGLINE_SECTION_CLASS,
  FAITH_TAGLINE_ICON_WRAP_CLASS,
  NATION_TAGLINE_TEXT_CLASS,
  FaithDetailControls,
  FaithDetailHeroImage,
  FaithDetailPageShell,
  FaithDetailSpacer,
} from "@/components/Sections/religions/faithDetailLayout";
import { NationTopicSwitcher } from "@/components/Sections/religions/nations/NationTopicSwitcher";

type LangCode = "en" | "ku" | "ar";
type TopicId = "shafii-school" | "sufism" | "ministry" | "ramadan-eid";

type TopicContent = {
  id: TopicId;
  title: string;
  text: string;
};

type IslamContent = {
  back: string;
  pageTitle: string;
  subtitle: string;
  topics: [TopicContent, TopicContent, TopicContent, TopicContent];
  tagline: string;
};

const TOPIC_IMAGES: Record<TopicId, string> = {
  "shafii-school": shafiImg,
  sufism: sufismImg,
  ministry: ministryImg,
  "ramadan-eid": eidImg,
};

const content: Record<LangCode, IslamContent> = {
  en: {
    back: "Back",
    pageTitle: "ISLAM",
    subtitle: "Faith, worship, and living tradition",
    topics: [
      {
        id: "shafii-school",
        title: "SHAFI'I SCHOOL",
        text: "The majority of Kurds follow the Shafi'i school of thought, embraced since the 7th century CE during the caliphate of Umar ibn al-Khattab.",
      },
      {
        id: "sufism",
        title: "SUFISM",
        text: "189 registered Sufi lodges across the KRI. The Qadiriyya and Naqshbandiyya orders shaped Kurdish society and culture for centuries through dhikr, poetry, and spiritual guidance.",
      },
      {
        id: "ministry",
        title: "MINISTRY",
        text: "The Ministry of Endowments and Religious Affairs supervises 6,103 mosques, 121,112 staff, and serves all religions — not only Islam. Includes directorates for Christian and Yazidi affairs.",
      },
      {
        id: "ramadan-eid",
        title: "RAMADAN & EID",
        text: "Shared seasons of fasting, prayer, and generosity. Christians in Erbil prepare iftar tables during Ramadan as a gesture of solidarity with Muslims.",
      },
    ],
    tagline: "Faith lived every day.",
  },
  ku: {
    back: "گەڕانەوە",
    pageTitle: "ئیسلام",
    subtitle: "باوەڕ، پەرستن و نەریتە زیندووەکان",
    topics: [
      {
        id: "shafii-school",
        title: "مەزهەبی شافعی",
        text: "زۆربەی کوردان پەیڕەوی مەزهەبی شافعی دەکەن. هەرچەندە ئیسلام لە سەدەی حەوتەمی زایینییەوە گەیشتووەتە کوردستان، بەڵام ئەم مەزهەبە بە درێژایی سەدەکان بووەتە ناسنامەی سەرەکی و ڕێچکەی فقهی و ڕۆحیی زۆربەی کۆمەڵگەی کوردی.",
      },
      {
        id: "sufism",
        title: "سۆفیگەری",
        text: "١٨٩ تەکیەی سۆفیگەری تۆمارکراو لە هەرێم هەن. تەریقەتی قادری و نەقشبەندی ڕۆڵیان هەبووە لە پەروەردەی ڕۆحی و کلتووری کۆمەڵگەدا.",
      },
      {
        id: "ministry",
        title: "وەزارەت",
        text: "وەزارەتی ئەوقاف و کاروباری ئایینی سەرپەرشتی ٦١٠٣ مزگەوت دەکات. ئەم وەزارەتە خزمەتی هەموو ئایینەکان دەکات و بەڕێوەبەرایەتی تایبەتی بۆ مەسیحی و ئێزیدییەکان هەیە.",
      },
      {
        id: "ramadan-eid",
        title: "ڕەمەزان و جەژن",
        text: "وەرزی ڕۆژوو و نزا و بەخشندەییە. مەسیحییەکانی هەولێر لە ڕەمەزاندا خوانی بەربانگ بۆ نیشاندانی هاوسۆزی ئامادە دەکەن.",
      },
    ],
    tagline: "باوەڕێک کە هەموو ڕۆژێک دەمانژیێنێتەوە.",
  },
  ar: {
    back: "العودة",
    pageTitle: "الإسلام",
    subtitle: "الإيمان والعبادة والتقاليد الحية",
    topics: [
      {
        id: "shafii-school",
        title: "المذهب الشافعي",
        text: "يتبع غالبية الكورد المذهب الشافعي. ورغم أن الإسلام دخل كوردستان منذ القرن السابع الميلادي، إلا أن هذا المذهب ترسخ عبر القرون كمنهج فقهي وروحي سائد، مشكلاً ركيزة أساسية في الهوية الدينية للمجتمع الكوردي.",
      },
      {
        id: "sufism",
        title: "التصوف",
        text: "189 تكية صوفية مسجلة في إقليم كوردستان. شكّلت الطريقتان القادرية والنقشبندية المجتمع والثقافة الكوردية عبر القرون بالذكر والشعر والإرشاد الروحي.",
      },
      {
        id: "ministry",
        title: "الوزارة",
        text: "تشرف وزارة الأوقاف والشؤون الدينية على 6,103 مساجد، وتضم 121,112 موظفاً، وتخدم جميع الأديان لا الإسلام وحده. وتشمل مديريات للشؤون المسيحية والإيزيدية.",
      },
      {
        id: "ramadan-eid",
        title: "رمضان والعيد",
        text: "مواسم صيام وصلاة وكرم مشتركة. ويُعدّ المسيحيون في أربيل موائد إفطار خلال رمضان تعبيراً عن التضامن مع المسلمين.",
      },
    ],
    tagline: "إيمان يُعاش كل يوم.",
  },
};

function DecorativeLine({ color = "#c3923a" }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
      <span className="text-2xl" style={{ color }}>
        ✥
      </span>
      <span className="h-px flex-1" style={{ backgroundColor: color }} />
    </div>
  );
}

type IslamPageProps = {
  lang?: LangCode;
  languageLabel?: string;
  onLanguageChange?: () => void;
  onBack?: () => void;
};

export default function IslamPage({
  lang = "en",
  languageLabel = "ENGLISH",
  onLanguageChange,
  onBack,
}: IslamPageProps) {
  const sectionRef = React.useRef<HTMLElement | null>(null);
  const c = content[lang];
  const dir = lang === "en" ? "ltr" : "rtl";

  useReligionPageAnimation(
    sectionRef,
    {
      hero: "[data-islam-hero='true']",
      animate: "[data-islam-animate='true']",
      controls: "[data-islam-controls='true']",
    },
    [lang],
  );

  return (
    <FaithDetailPageShell dir={dir} lang={lang} fitDeps={[lang]} sectionRef={sectionRef}>
        <FaithDetailHeroImage
          heroAttr="data-islam-hero"
          src={bg}
          heightClassName="h-[1100px]"
        />

        <FaithDetailControls
          controlsAttr="data-islam-controls"
          backLabel={c.back}
          dir={dir}
          onBack={onBack}
          onLanguageChange={onLanguageChange}
          languageLabel={languageLabel}
        />

        <div className={`relative z-10 mx-auto ${FAITH_DETAIL_CONTENT_WIDTH} ${FAITH_CONTENT_PADDING}`}>
          <header
            data-islam-animate="true"
            className={FAITH_DETAIL_HEADER_CLASS}
          >
            <div className="mx-auto mb-6 grid h-24 w-24 place-items-center text-[68px] text-[#b9822d]">
              ✥
            </div>

            <div className="mx-auto mb-3 mt-3 w-[260px] max-w-full">
              <DecorativeLine />
            </div>

            <h1 className="break-words font-serif text-[96px] font-light uppercase leading-[1.04] tracking-[0.04em] text-[#3b2410]">
              {c.pageTitle}
            </h1>

            <div className="mx-auto mt-5 w-[180px] max-w-full">
              <DecorativeLine />
            </div>

            <p className="mx-auto mt-5 max-w-[620px] font-serif text-[22px] font-light leading-relaxed text-[#4d3c2a]">
              {c.subtitle}
            </p>
          </header>

          <FaithDetailSpacer desktopHeight="h-[700px]" />

          <NationTopicSwitcher
            pageTitle={c.pageTitle}
            topics={c.topics}
            images={TOPIC_IMAGES}
            animateAttr="data-islam-animate"
            ariaLabel="Islam topics"
            langKey={lang}
          />

          <section data-islam-animate="true" className={FAITH_TAGLINE_SECTION_CLASS}>
            <div className={`${FAITH_TAGLINE_ICON_WRAP_CLASS} text-[42px]`}>
              ☾
            </div>

            <p className={NATION_TAGLINE_TEXT_CLASS}>{c.tagline}</p>

            <Sparkles className="h-8 w-8 shrink-0 text-[#c58b16]" />
          </section>

          <div className="mt-8 text-center text-[58px] text-[#b9822d]">✥</div>
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 h-52 w-52 rounded-tr-full border-r-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-52 w-52 rounded-tl-full border-l-2 border-t-2 border-[#d2a35a]/30 opacity-70" />
    </FaithDetailPageShell>
  );
}
