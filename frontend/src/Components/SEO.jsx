import { useEffect } from "react";

const SITE_URL = "https://www.krrishimpex.com";
const SITE_NAME = "Krrish Ecoware Industries";
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;

const setMeta = (selector, attribute, value) => {
  if (!value) return;

  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) tag.setAttribute(match[1], match[2]);
    document.head.appendChild(tag);
  }
  tag.setAttribute(attribute, value);
};

const setLink = (rel, href) => {
  if (!href) return;

  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", rel);
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
};

const SEO = ({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  noIndex = false,
}) => {
  useEffect(() => {
    const canonical = `${SITE_URL}${path}`;
    const fullTitle = title.includes(SITE_NAME)
      ? title
      : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[name="robots"]', "content", noIndex ? "noindex, nofollow" : "index, follow");

    setLink("canonical", canonical);

    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:site_name"]', "content", SITE_NAME);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
    setMeta('meta[property="og:image"]', "content", image);
    setMeta('meta[property="og:image:alt"]', "content", fullTitle);

    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", fullTitle);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", image);
  }, [title, description, path, image, noIndex]);

  return null;
};

export default SEO;
