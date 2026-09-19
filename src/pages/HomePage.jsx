import { lazy, Suspense } from "react";

import Hero from "../components/sections/Hero";
import SiteLayout from "../components/layout/SiteLayout.jsx";
import {
  organizationSchema,
  localBusinessSchema,
} from "../lib/seo";

const Services = lazy(() => import("../components/sections/Services.jsx"));
const Works = lazy(() => import("../components/sections/Works.jsx"));
const Stats = lazy(() => import("../components/sections/Stats.jsx"));
const CTA = lazy(() => import("../components/sections/CTA.jsx"));

export default function HomePage() {
  return (
    <SiteLayout
      seo={{
        path: "/",
        description:
          "HIIIPE — digital marketing, custom software, and AI automation for ambitious brands in Lahore & London. SEO, Meta Ads, web apps, and intelligent systems.",
        schema: {
          "@context": "https://schema.org",
          "@graph": [organizationSchema(), localBusinessSchema()],
        },
      }}
    >
      <Hero />
      <Suspense fallback={null}>
        <Services compact />
        <Works compact />
        <Stats compact />
        <CTA compact />
      </Suspense>
    </SiteLayout>
  );
}
