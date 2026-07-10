import React, { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Handshake,
  Landmark,
  Settings,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";
import { useSystemDetailAnimation } from "@/components/Sections/TheSystem/useSystemDetailAnimation";
import { discoverDisplayFont, discoverRtlScript } from "@/components/Sections/discoverLanguage";
import {
  detailBackButtonSideClassName,
  detailBackIconClassName,
  systemCanvasBackButtonClassName,
  systemCanvasBackIconSize,
} from "@/constants/backNavigation";
import bg from "@/assets/images/PrimeMinistir/government.jpg";
import bg2 from "@/assets/mainImages/government-2.webp";
import publicServicesIcon from "@/assets/icons/thesystem/government/public-services.png";
import policyImplementationIcon from "@/assets/icons/thesystem/government/policy-impl.png";
import administrationIcon from "@/assets/icons/thesystem/government/administration.png";

const mainCards = [
  {
    title: "Public Services",
    text: "Supports education, health, water, electricity, and daily services.",
    iconSrc: publicServicesIcon,
  },
  {
    title: "Policy Implementation",
    text: "Turns plans and decisions into action.",
    iconSrc: policyImplementationIcon,
  },
  {
    title: "Administration",
    text: "Coordinates ministries and institutional work.",
    iconSrc: administrationIcon,
  },
];

const keyAreas = [
  {
    title: "Ministries",
    text: "Lead core sectors of governance.",
    icon: Landmark,
    color: "#13213b",
  },
  {
    title: "Public Services",
    text: "Deliver essential services to citizens.",
    icon: UsersRound,
    color: "#405846",
  },
  {
    title: "Community Engagement",
    text: "Work with local communities.",
    icon: Handshake,
    color: "#963538",
  },
  {
    title: "Economic Management",
    text: "Manage resources and budgets.",
    icon: TrendingUp,
    color: "#405846",
  },
  {
    title: "Transparency & Accountability",
    text: "Uphold integrity and public trust.",
    icon: ShieldCheck,
    color: "#13213b",
  },
  {
    title: "Planning & Development",
    text: "Plan for growth and improvement.",
    icon: Settings,
    color: "#13213b",
  },
];

type GovernmentPageProps = {
  lang?: "ku" | "en" | "ar";
  onBack?: () => void;
  onCabinetClick?: () => void;
};

export default function GovernmentPage({ lang = "en", onBack, onCabinetClick }: GovernmentPageProps) {
  const rootRef = useSystemDetailAnimation([lang]);
  const isAr = lang === "ar";
  const isKu = lang === "ku";
  const dir = lang === "en" ? "ltr" : "rtl";
  const isRtlScript = discoverRtlScript(lang);
  const displayFont = discoverDisplayFont(lang);

  const localMainCards = isAr
    ? [
        { title: "الخدمات العامة", text: "دعم التعليم والصحة والمياه والكهرباء والخدمات اليومية.", iconSrc: publicServicesIcon },
        { title: "تنفيذ السياسات", text: "تحويل الخطط والقرارات إلى واقع ملموس.", iconSrc: policyImplementationIcon },
        { title: "الإدارة", text: "تنسيق عمل الوزارات والمؤسسات.", iconSrc: administrationIcon },
      ]
    : isKu
      ? [
          { title: "خزمەتگوزارییە گشتییەکان", text: "پاڵپشتی پەروەردە، تەندروستی، ئاو، کارەبا، و خزمەتگوزارییەکانی ڕۆژانەکان دەکات.", iconSrc: publicServicesIcon },
          { title: "جێبەجێکردنی سیاسەت", text: "پلان و بڕیارەکان دەگۆڕێت بۆ کردار.", iconSrc: policyImplementationIcon },
          { title: "کارگێڕی", text: "هەماهەنگی لەنێوان وەزارەتەکان و کارە دامەزراوەیییەکان دەکات.", iconSrc: administrationIcon },
        ]
      : mainCards;

  const localKeyAreas = isAr
    ? [
        { title: "الوزارات", text: "قيادة القطاعات الأساسية للحوكمة.", icon: Landmark, color: "#13213b" },
        { title: "الخدمات العامة", text: "تقديم الخدمات الأساسية للمواطنين.", icon: UsersRound, color: "#405846" },
        { title: "المشاركة المجتمعية", text: "العمل مع المجتمعات المحلية.", icon: Handshake, color: "#963538" },
        { title: "الإدارة الاقتصادية", text: "إدارة الموارد والميزانيات.", icon: TrendingUp, color: "#405846" },
        { title: "الشفافية والمساءلة", text: "صون النزاهة وثقة المواطن.", icon: ShieldCheck, color: "#13213b" },
        { title: "التخطيط والتنمية", text: "التخطيط للنمو والتحسين المستمر.", icon: Settings, color: "#13213b" },
      ]
    : isKu
      ? [
          { title: "وەزارەتەکان", text: "ڕێبەرایەتی کەرتە سەرەکییەکانی حکومڕانی دەکەن.", icon: Landmark, color: "#13213b" },
          { title: "خزمەتگوزارییە گشتییەکان", text: "گەیاندنی خزمەتگوزارییە سەرەکییەکان بۆ هاووڵاتییان.", icon: UsersRound, color: "#405846" },
          { title: "بەشداریی کۆمەڵایەتی", text: "کارکردن لەگەڵ کۆمەڵگە ناوخۆیییەکان.", icon: Handshake, color: "#963538" },
          { title: "بەڕێوەبردنی ئابووری", text: "بەڕێوەبردنی سەرچاوەکان و بودجەکان.", icon: TrendingUp, color: "#405846" },
          { title: "شەفافیەت و لێپرسینەوە", text: "پاراستنی دەستپاکی و متمانەی گشتی.", icon: ShieldCheck, color: "#13213b" },
          { title: "پلاندانان و گەشەپێدان", text: "پلاندانان بۆ گەشە و پەرەپێدان.", icon: Settings, color: "#13213b" },
        ]
      : keyAreas;

  // Fixed design canvas (1400px wide). We measure its natural height and scale
  // the whole canvas to fit the viewport in BOTH dimensions, then center it, so
  // all content stays visible without scrolling on any screen (e.g. 1080x1920).
  const DESIGN_WIDTH = 1400;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, x: 0 });

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
      setFit({ scale, x });
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
      className={`relative h-screen w-screen overflow-hidden bg-[#fbf5eb] ${isRtlScript ? "font-noto-naskh" : ""}`}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div
        ref={canvasRef}
        style={{
          width: `${DESIGN_WIDTH}px`,
          transform: `translate(${fit.x}px, 0px) scale(${fit.scale})`,
          transformOrigin: "top left",
          position: "absolute",
          top: 0,
          left: 0,
          containerType: "inline-size",
        }}
      >
        <main ref={rootRef} className="m-0 w-full bg-[#fbf5eb] text-[#17233b]">
          <section className="relative mx-auto flex w-full flex-col overflow-hidden bg-[#fbf5eb]">
            <button
              type="button"
              onClick={onBack}
              className={`${systemCanvasBackButtonClassName} ${detailBackButtonSideClassName(dir)}`}
              aria-label="Back to The System"
            >
              <ArrowLeft size={systemCanvasBackIconSize} className={detailBackIconClassName(dir)} />
            </button>

            <div className="absolute left-0 top-[120px] h-full w-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />
            <div className="absolute right-0 top-[120px] h-full w-24 opacity-20 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:22px_22px]" />

            {/* Main portrait — centered subject shifted right for visibility */}
            <div className="pointer-events-none absolute right-0 top-0 z-0 h-[940px] w-full overflow-hidden rtl:right-auto rtl:left-0">
              <div className="absolute inset-0 translate-x-[24%] rtl:-scale-x-100 rtl:translate-x-[-24%]">
                <img
                  src={bg}
                  alt="Government portrait"
                  className="system-detail-hero absolute inset-0 h-full w-full object-cover object-[center_8%] [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.35)_14%,rgba(0,0,0,0.7)_30%,rgba(0,0,0,0.95)_48%,black_68%)]"
                />
              </div>
              <div
                className="absolute inset-0 [background:linear-gradient(to_right,rgba(251,245,235,0.22)_0%,rgba(251,245,235,0.08)_6%,transparent_14%)] rtl:[background:linear-gradient(to_left,rgba(251,245,235,0.22)_0%,rgba(251,245,235,0.08)_6%,transparent_14%)]"
              />
              <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-b from-transparent to-[#fbf5eb]/20" />
            </div>

            <div className="relative z-10 flex h-[940px] min-h-0 flex-col px-[clamp(1.4rem,4cqw,4rem)] pt-[clamp(3.5rem,6cqh,5rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="system-detail-intro max-w-[min(46cqw,720px)]">
                <h1 className={`${displayFont} text-[clamp(6rem,11cqw,10rem)] font-light leading-none tracking-tight text-[#17233b]`}>
                  {isAr ? "الحكومة" : isKu ? "حکومەت" : "Government"}
                </h1>

                <p className="mt-[clamp(1rem,2.2cqh,2rem)] text-[clamp(1.65rem,2.75cqw,2.7rem)] font-light leading-tight text-[#9b6d35]">
                  {isAr ? "الجهاز التنفيذي المسؤول عن الإدارة والخدمات العامة." : isKu ? "دەستەی جێبەجێکار کە بەرپرسە لە کارگێڕی و خزمەتگوزارییە گشتییەکان." : "The executive body responsible for administration and public services."}
                </p>

                <div className="mt-[clamp(1rem,2.3cqh,2rem)] flex w-[clamp(9rem,18cqw,14.5rem)] items-center gap-4 text-[#b99152]">
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                  <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                  <span className="h-0.5 flex-1 bg-[#b99152]" />
                </div>

                <p className="mt-[clamp(1rem,2.4cqh,2rem)] max-w-[min(38cqw,590px)] text-[clamp(1.2rem,2cqw,1.95rem)] font-light leading-[1.55] text-[#2d3549]">
                  {isAr
                    ? "تنفّذ الحكومة السياسات وتدير الخدمات وتشرف على الإدارة اليومية."
                    : isKu
                      ? "حکومەت سیاسەتەکان جێبەجێ دەکات، خزمەتگوزارییەکان بەڕێوەدەبات، و سەرپەرشتی کارگێڕی ڕۆژانە دەکات."
                      : "The government implements policy, manages services, and oversees daily administration."}
                </p>
              </section>
            </div>

            <div className="relative z-10 px-[clamp(1.4rem,4cqw,4rem)] pb-[clamp(1.2rem,3cqh,2.6rem)]">
              <section className="grid grid-cols-3 gap-[clamp(0.85rem,1.8cqw,2.1rem)]">
                {localMainCards.map((card) => {
                  return (
                    <article
                      key={card.title}
                      className="system-detail-card relative flex min-h-[clamp(27rem,44cqh,40rem)] flex-col items-center overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/76 px-[clamp(0.95rem,1.9cqw,2rem)] py-[clamp(1rem,2.2cqh,2rem)] text-center shadow-[0_14px_35px_rgba(84,54,16,0.15)] backdrop-blur-md"
                    >
                      <div className="grid h-[clamp(8rem,14cqw,14rem)] w-[clamp(8rem,14cqw,14rem)] shrink-0 place-items-center overflow-hidden rounded-full">
                        <img
                          src={card.iconSrc}
                          alt=""
                          className="h-full w-full object-cover scale-[1.25]"
                        />
                      </div>

                      <h3 className={`mt-[clamp(0.8rem,1.8cqh,1.9rem)] whitespace-pre-line ${displayFont} text-[clamp(1.5rem,2.7cqw,2.5rem)] font-light leading-[0.98] text-[#17233b]`}>
                        {card.title}
                      </h3>

                      <div className="my-[clamp(0.75rem,1.6cqh,1.7rem)] flex w-[clamp(4.8rem,10cqw,8rem)] items-center justify-center gap-3 text-[#b99152]">
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                        <span className="h-3 w-3 rotate-45 border-2 border-[#b99152]" />
                        <span className="h-0.5 flex-1 bg-[#d2b475]" />
                      </div>

                      <p className="text-[clamp(1.02rem,1.58cqw,1.5rem)] font-light leading-[1.5] text-[#303a50]">
                        {card.text}
                      </p>

                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 opacity-25 [background-image:linear-gradient(45deg,#d6b56e_1px,transparent_1px),linear-gradient(-45deg,#d6b56e_1px,transparent_1px)] [background-size:18px_18px]" />
                    </article>
                  );
                })}
              </section>

              <section className="system-detail-panel mt-[clamp(1rem,2cqh,2rem)] rounded-[26px] border-2 border-[#ead8b7] bg-white/60 px-[clamp(1rem,2.1cqw,2.5rem)] py-[clamp(1rem,2.2cqh,2rem)] shadow-[0_14px_35px_rgba(84,54,16,0.1)] backdrop-blur-md">
                <div className={`mb-[clamp(0.75rem,1.5cqh,1.5rem)] flex items-center gap-[clamp(0.5rem,1cqw,1rem)] ${displayFont} text-[clamp(1.2rem,2.2cqw,2rem)] font-light text-[#9b6d35]`}>
                  <span>{isAr ? "المجالات الرئيسية لعمل الحكومة" : isKu ? "بوارە سەرەکییەکانی کاری حکومەت" : "Key Areas of Government Work"}</span>
                  <span className="hidden h-0.5 flex-1 bg-[#c7a05d] sm:block" />
                  <span className="hidden h-3 w-3 rotate-45 border-2 border-[#c7a05d] sm:block" />
                </div>

                <div className="grid grid-cols-3 gap-[clamp(0.75rem,1.5cqw,1.5rem)]">
                  {localKeyAreas.map((item) => {
                    const Icon = item.icon;
                    return (
                      <article
                        key={item.title}
                        className="flex min-h-[clamp(8rem,14cqh,12rem)] flex-col items-center justify-start rounded-[18px] border border-[#ead8b7] bg-[#fffaf0]/80 px-[clamp(0.5rem,1cqw,1rem)] py-[clamp(0.75rem,1.4cqh,1.25rem)] text-center"
                      >
                        <Icon size={40} strokeWidth={1.5} style={{ color: item.color }} />
                        <h4 className={`mt-[clamp(0.5rem,1cqh,0.75rem)] ${displayFont} text-[clamp(1rem,1.8cqw,1.5rem)] font-light leading-tight text-[#17233b]`}>
                          {item.title}
                        </h4>
                        <p className="mt-[clamp(0.35rem,0.6cqh,0.5rem)] text-[clamp(0.85rem,1.3cqw,1.1rem)] font-light leading-snug text-[#35435b]">
                          {item.text}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>

              <section className="system-detail-panel mt-[clamp(1rem,2cqh,2rem)] flex items-center gap-[clamp(1rem,2cqw,2rem)] overflow-hidden rounded-[26px] border-2 border-[#ead8b7] bg-white/68 px-[clamp(1rem,2.1cqw,2.5rem)] py-[clamp(1rem,2.2cqh,2rem)] shadow-[0_14px_35px_rgba(84,54,16,0.1)] backdrop-blur-md">
                <div className="grid h-[clamp(4rem,7cqw,6rem)] w-[clamp(4rem,7cqw,6rem)] shrink-0 place-items-center rounded-full border-[6px] border-white bg-[#c59a4b] text-[#f8e5b8] shadow-md">
                  <FileText size={36} strokeWidth={1.45} />
                </div>
                <p className="max-w-[700px] flex-1 text-[clamp(1rem,1.8cqw,1.55rem)] font-light leading-tight text-[#2d3549]">
                  {isAr
                    ? "تعمل الحكومة على تحسين جودة الحياة وحماية الحقوق وبناء كوردستان أقوى."
                    : isKu
                      ? "حکومەت کاردەکات بۆ باشترکردنی کوالێتی ژیان، پاراستنی مافەکان، و بونیادنانی کوردستانێکی بەهێزتر."
                      : "The government works to improve quality of life, protect rights, and build a stronger Kurdistan."}
                </p>
                <img
                  src={bg2}
                  alt="Government background"
                  className="hidden h-[clamp(5rem,10cqh,8rem)] w-[clamp(8rem,14cqw,12rem)] shrink-0 object-cover object-center sm:block"
                />
              </section>

              {/* Cabinet — the Council of Ministers sits within the government */}
              <button
                type="button"
                onClick={onCabinetClick}
                className="system-detail-panel mt-[clamp(1rem,2cqh,2rem)] flex w-full cursor-pointer items-center gap-[clamp(1rem,2cqw,2rem)] overflow-hidden rounded-[26px] border-2 border-[#cfae72] bg-[#13213b] px-[clamp(1.2rem,2.4cqw,2.8rem)] py-[clamp(1rem,2.2cqh,2rem)] text-start text-[#f7edd7] shadow-[0_18px_45px_rgba(84,54,16,0.2)] transition-transform duration-300 active:scale-[0.99]"
              >
                <div className="grid h-[clamp(4rem,7cqw,6rem)] w-[clamp(4rem,7cqw,6rem)] shrink-0 place-items-center rounded-full border-[5px] border-[#e6c877]/40 bg-[#0f1a2f] text-[#e6c877]">
                  <UsersRound size={36} strokeWidth={1.45} />
                </div>
                <div className="flex-1">
                  <h3 className={`${displayFont} text-[clamp(1.5rem,2.6cqw,2.3rem)] font-light leading-tight`}>
                    {isAr ? "مجلس الوزراء" : isKu ? "ئەنجومەنی وەزیران" : "The Cabinet"}
                  </h3>
                  <p className="mt-1 text-[clamp(1rem,1.7cqw,1.4rem)] font-light leading-tight text-[#e7d6ab]">
                    {isAr
                      ? "تعرّف على مجلس الوزراء الذي يقود العمل التنفيذي."
                      : isKu
                        ? "ئەنجومەنی وەزیران بناسە کە ڕێبەری کاری جێبەجێکردن دەکات."
                        : "Meet the Council of Ministers that leads the executive."}
                  </p>
                </div>
                <ArrowRight size={34} strokeWidth={1.6} className="shrink-0 text-[#e6c877] rtl:rotate-180" />
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
