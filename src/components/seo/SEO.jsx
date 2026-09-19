import { Helmet } from "react-helmet-async";
import { SITE, pageTitle, absoluteUrl } from "../../lib/seo";

export default function SEO({
  title,
  description = SITE.description,
  path = "/",
  keywords = SITE.keywords,
  image = SITE.ogImage,
  type = "website",
  noindex = false,
  schema,
}) {
  const url = absoluteUrl(path);
  const fullTitle = pageTitle(title);
  const keywordString = Array.isArray(keywords) ? keywords.join(", ") : keywords;
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywordString} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE.name} — digital marketing, software & AI agency`} />
      <meta property="og:locale" content={SITE.locale} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE.twitter} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${SITE.name} — digital marketing, software & AI agency`} />

      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
