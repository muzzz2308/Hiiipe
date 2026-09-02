export const SITE = {
  name: "HIIIPE",
  title: "HIIIPE — Digital Marketing, Software & AI Agency",
  description:
    "HIIIPE is a Lahore & London agency for digital marketing, custom software, and AI automation. SEO, Meta Ads, web apps, and intelligent systems for growing brands.",
  url: "https://hiiipe.com",
  email: "info@hiiipe.com",
  locale: "en_US",
  twitter: "@hiiipe",
  keywords: [
    "digital marketing agency",
    "SEO agency Lahore",
    "Meta Ads agency",
    "software development agency",
    "AI automation agency",
    "web design agency",
    "restaurant marketing",
    "custom software development",
    "AI chatbot development",
    "growth marketing",
    "HIIIPE",
    "hiiipe",
  ],
  locations: ["Lahore, Pakistan", "London, UK"],
  social: {
    instagram: "https://www.instagram.com/hiiipe",
    facebook: "https://www.facebook.com/hiiipe",
    linkedin: "https://www.linkedin.com/company/hiiipe",
    github: "https://github.com/muzzz2308/Hiiipe",
  },
};

export const ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/studio", changefreq: "monthly", priority: "0.8" },
  { path: "/team", changefreq: "monthly", priority: "0.8" },
  { path: "/industries", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/journals", changefreq: "weekly", priority: "0.8" },
];

export function pageTitle(title) {
  return title ? `${title} — ${SITE.name}` : SITE.title;
}

export function absoluteUrl(path = "/") {
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    sameAs: [
      SITE.social.instagram,
      SITE.social.facebook,
      SITE.social.linkedin,
      SITE.social.github,
    ],
    areaServed: SITE.locations,
    knowsAbout: [
      "Digital Marketing",
      "Search Engine Optimization",
      "Software Development",
      "Artificial Intelligence",
      "Marketing Automation",
    ],
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    description: SITE.description,
    priceRange: "$$",
    areaServed: [
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "London" },
    ],
    serviceType: [
      "Digital Marketing",
      "Software Development",
      "AI Automation",
    ],
  };
}

export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}
