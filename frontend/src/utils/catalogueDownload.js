import logoAsset from "../assets/imgs/logo.png";
import indiaMartAsset from "../assets/imgs/india_mart.png";
import tradeIndiaAsset from "../assets/imgs/tradeindia.png";
import facebookAsset from "../assets/imgs/facebook.png";
import instagramAsset from "../assets/imgs/instagram.png";
import googleAsset from "../assets/imgs/google.png";
import linkedinAsset from "../assets/imgs/linkedin.png";
import twitterAsset from "../assets/imgs/twitter.png";
import youtubeAsset from "../assets/imgs/youtube.png";
import { getAssetUrl } from "./api";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../styles/catalogueDownload.css";

/* ─── Brand tokens ─────────────────────────────────────────────── */
const B = {
  tradeName: "Krrish Ecoware Industries PVT. LTD.",
  name: "Krrish Impex",
  tagline: "Eco-Friendly Disposable Solutions Since 2001",
  tagline2: "House-Hold Disposable Cutlery & Tableware",
  obsidian:    "#0D0F14",
  ink:         "#1A1D26",
  ash:         "#6B7280",
  white:       "#FFFFFF",
  crimson:     "#C41230",
  gold:        "#B8922A",
  navy:        "#0A3D6B",
  paperWarm:   "#FAF6EF",
  paperLine:   "#EDE8DF",
};

/* ─── Content ──────────────────────────────────────────────────── */
const COMPANY_COPY =
  "Founded in 2001, Krrish Ecoware Industries PVT. LTD. has grown from a modest manufacturing unit into a trusted name in the disposable products industry. We manufacture, import, export, and trade a comprehensive range of eco-friendly house-hold disposable cutlery & tableware — serving businesses across India and internationally.";

const VISION_COPY =
  "A world where convenience and sustainability coexist harmoniously — where every disposable product leaves a lighter footprint.";

const MISSION_COPY =
  "To provide high-quality, eco-friendly disposable solutions that serve businesses reliably, while championing sustainable manufacturing practices.";

const PILLARS = [
  { icon: "◈", title: "Sustainable Sourcing",  body: "We source only the finest eco-friendly materials from trusted suppliers, ensuring minimal environmental impact at every step." },
  { icon: "◎", title: "Certified Quality",      body: "ISO 9001:2015 & ISO 14001:2015 certified. MSME, UDYAM, GST, IEC, and Trademark registered." },
  { icon: "◇", title: "Expert Craftsmanship",   body: "Over two decades of manufacturing experience — precision, reliability, and consistent quality in every product." },
  { icon: "◉", title: "Timely Delivery",         body: "Streamlined logistics from our 30,000 sq. ft. Delhi facility ensures orders reach you on schedule, every time." },
];

const CONTACT_INFO = [
  ["Phone",   "+91 70119 49384  ·  +91 98993 73580"],
  ["Email",   "support@krrishimpex.com  ·  sales@krrishimpex.com"],
  ["Address", "Gali No 4, 692/1, Dharma Raja Marg, Siraspur, Delhi 110042"],
  ["Hours",   "Monday – Saturday  ·  10:00 AM – 7:00 PM"],
];

const SOCIAL_LINKS = [
  ["instagram",  "Instagram"],
  ["facebook",   "Facebook"],
  ["youtube",    "YouTube"],
  ["google",     "Google"],
  ["indiamart",  "IndiaMART"],
  ["tradeindia", "TradeIndia"],
  ["linkedin",   "LinkedIn"],
  ["x",          "X (Twitter)"],
];

const SOCIAL_ASSETS = {
  facebook:   facebookAsset,
  google:     googleAsset,
  instagram:  instagramAsset,
  indiamart:  indiaMartAsset,
  linkedin:   linkedinAsset,
  tradeindia: tradeIndiaAsset,
  x:          twitterAsset,
  youtube:    youtubeAsset,
};

const CAT_ACCENTS = [
  { bar: "#0A3D6B", bg: "#E4EEF8", light: "#F0F5FB" },
  { bar: "#1A5C3A", bg: "#E0F0E8", light: "#F0F7F3" },
  { bar: "#6B3A0A", bg: "#F5EBD9", light: "#FBF5ED" },
  { bar: "#C41230", bg: "#FBE9EC", light: "#FEF3F5" },
  { bar: "#4A1A6B", bg: "#EEE4F8", light: "#F7F2FB" },
  { bar: "#1A4A5C", bg: "#E0EDF5", light: "#F0F6FB" },
];

/* ─── Helpers ──────────────────────────────────────────────────── */
const esc = (v = "") =>
  String(v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export const formatSizes = (sizes) => {
  if (!sizes) return [];
  if (Array.isArray(sizes)) return sizes.filter(Boolean);
  if (typeof sizes === "string") {
    const trimmed = sizes.trim();
    if (!trimmed) return [];
    if (trimmed.startsWith("[")) {
      try {
        const parsed = JSON.parse(trimmed);
        return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
      } catch (_) {
        return [];
      }
    }
    return trimmed.split(",").map((s) => s.trim()).filter(Boolean);
  }
  return [];
};

const chunk = (arr, n) =>
  arr.reduce((out, item, i) => {
    if (i % n === 0) out.push([]);
    out[out.length - 1].push(item);
    return out;
  }, []);

const groupByCategory = (products) =>
  products.reduce((g, p) => {
    const cat = p.category?.trim() || "Uncategorised";
    (g[cat] = g[cat] || []).push(p);
    return g;
  }, {});

/* ─── Shared sub-components ────────────────────────────────────── */
const socialIcon = (key) =>
  SOCIAL_ASSETS[key]
    ? `<img src="${esc(SOCIAL_ASSETS[key])}" alt="" />`
    : "";

const logoLockup = (dark = false) => `
  <div class="logo-lockup">
    <div class="logo-circle">
      <img src="${esc(logoAsset)}" alt="${esc(B.tradeName)} logo" />
    </div>
    <div class="logo-text">
      <strong style="color:${dark ? B.white : B.ink}">${esc(B.tradeName)}</strong>
      <span style="color:${dark ? "rgba(255,255,255,0.55)" : B.ash}">${esc(B.name)}</span>
    </div>
  </div>`;

const contactBlock = () => `
  <div class="contact-block">
    <div class="cb-social">
      <p class="cb-label">Connect With Us</p>
      <div class="cb-icons">
        ${SOCIAL_LINKS.map(([key, label]) => `
          <div class="cb-icon-item">
            <span class="cb-icon cb-${esc(key)}">${socialIcon(key)}</span>
            <span>${esc(label)}</span>
          </div>`).join("")}
      </div>
    </div>
    <div class="cb-info">
      <p class="cb-label">Contact Information</p>
      ${CONTACT_INFO.map(([label, val]) => `
        <div class="cb-row">
          <b>${esc(label)}</b>
          <span>${esc(val)}</span>
        </div>`).join("")}
    </div>
  </div>`;

const metaRows = (product) => {
  const sizes = formatSizes(product.sizes);
  const rows = [
    product.category && ["Category", product.category],
    product.material && ["Material", product.material],
    sizes.length     && ["Sizes",    sizes.join("  ·  ")],
  ].filter(Boolean);
  if (!rows.length) return "";
  return `<div class="meta-rows">${rows.map(([label, val]) => `
    <div class="meta-row">
      <span class="mr-label">${esc(label)}</span>
      <span class="mr-val">${esc(val)}</span>
    </div>`).join("")}</div>`;
};

/* =================================================================
   PAMPHLET — luxury split-layout with full-bleed image
================================================================= */
const renderPamphlet = (product) => `
  <div class="pam-wrap">

    <!-- LEFT: full-bleed image panel -->
    <div class="pam-visual">
      <img class="pam-bg-img" src="${esc(getAssetUrl(product.image))}" alt="${esc(product.name)}" />
      <div class="pam-visual-overlay"></div>
      <div class="pam-visual-top">${logoLockup(true)}</div>
      <div class="pam-visual-bottom">
        <div class="pam-category-pill">${esc(product.category || "Product")}</div>
        <h1 class="pam-visual-name">${esc(product.name)}</h1>
        <div class="pam-tagline-row">${esc(B.tagline)}</div>
      </div>
      <div class="pam-corner-tl"></div>
      <div class="pam-corner-br"></div>
    </div>

    <!-- RIGHT: details panel -->
    <div class="pam-details">
      <div class="pam-details-inner">
        <div class="pam-eyebrow">
          <span class="pam-eyebrow-line"></span>
          Product Pamphlet
          <span class="pam-eyebrow-line"></span>
        </div>
        <h2 class="pam-name">${esc(product.name)}</h2>
        <p class="pam-desc">${esc(product.description || "A high-quality eco-friendly disposable product crafted for food-service, hospitality, and retail use. Manufactured to international standards from sustainable materials.")}</p>
        <div class="pam-divider"></div>
        ${metaRows(product)}
        <div class="pam-note">
          <span class="pam-note-icon">ⓘ</span>
          <p>Packing configurations and pricing may vary by order volume. Please request a quotation for accurate, tailored pricing.</p>
        </div>
        <div class="pam-details-footer">
          <div class="pam-contact-grid">
            ${CONTACT_INFO.map(([label, val]) => `
              <div class="pam-cg-row">
                <b>${esc(label)}</b>
                <span>${esc(val)}</span>
              </div>`).join("")}
          </div>
          <div class="pam-social-strip">
            ${SOCIAL_LINKS.map(([key]) => `
              <div class="pam-social-icon cb-${esc(key)}">${socialIcon(key)}</div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>`;

/* =================================================================
   CATALOGUE — COVER
================================================================= */
const renderCover = (products) => {
  const catCount = Object.keys(groupByCategory(products)).length;
  return `
  <div class="cov-wrap">
    <div class="cov-left">
      <div class="cov-left-top">${logoLockup(true)}</div>
      <div class="cov-left-body">
        <div class="cov-eyebrow"><span class="cov-eyebrow-dash"></span>Official Product Catalogue</div>
        <h1 class="cov-headline">A Trusted Brand<br/>In Disposable<br/>Industry &amp;<br/>Since 2001</h1>
        <p class="cov-sub">${esc(B.tagline2)}</p>
      </div>
      <div class="cov-stats">
        <div class="cov-stat"><span>${products.length}</span><b>Products</b></div>
        <div class="cov-stat-sep"></div>
        <div class="cov-stat"><span>${catCount}</span><b>Categories</b></div>
        <div class="cov-stat-sep"></div>
        <div class="cov-stat"><span>24+</span><b>Years of excellence</b></div>
      </div>
      <div class="cov-arc cov-arc1"></div>
      <div class="cov-arc cov-arc2"></div>
    </div>
    <div class="cov-right">
      <div class="cov-right-inner">
        <div class="cov-watermark">${esc(B.name)}</div>
        <div class="cov-gold-stripe"></div>
        <div class="cov-dot-grid"></div>
      </div>
    </div>
    <div class="cov-footer">${contactBlock()}</div>
  </div>`;
};

/* =================================================================
   CATALOGUE — ABOUT
================================================================= */
const renderAbout = () => `
  <div class="abt-wrap">
    <div class="abt-header">
      ${logoLockup(false)}
      <div class="abt-header-right">
        <span class="abt-eyebrow">About the company</span>
        <div class="abt-est">Est. 2001</div>
      </div>
    </div>
    <div class="abt-grid">
      <div class="abt-main">
        <h2 class="abt-headline">Reliable, Eco-Friendly Disposable Products For Everyday Business.</h2>
        <p class="abt-para">${esc(COMPANY_COPY)}</p>
        <div class="abt-pillars">
          ${PILLARS.map((p, i) => `
            <div class="abt-pillar" style="--p-color:${CAT_ACCENTS[i % CAT_ACCENTS.length].bar}">
              <div class="abt-pillar-icon">${esc(p.icon)}</div>
              <div>
                <strong>${esc(p.title)}</strong>
                <span>${esc(p.body)}</span>
              </div>
            </div>`).join("")}
        </div>
      </div>
      <div class="abt-side">
        <div class="abt-vm">
          <div class="abt-vm-card abt-vm-vision">
            <p class="abt-vm-label">Vision</p>
            <p>${esc(VISION_COPY)}</p>
          </div>
          <div class="abt-vm-card abt-vm-mission">
            <p class="abt-vm-label">Mission</p>
            <p>${esc(MISSION_COPY)}</p>
          </div>
        </div>
        <div class="abt-facility">
          <div class="abt-fac-item"><span>30,000 sq. ft.</span><b>Manufacturing facility, Delhi</b></div>
          <div class="abt-fac-item"><span>100+</span><b>Skilled professionals</b></div>
          <div class="abt-fac-item"><span>ISO</span><b>9001 : 2015 &amp; 14001 : 2015</b></div>
        </div>
        <div class="abt-certs">
          <p class="abt-certs-label">Also registered under</p>
          <p class="abt-certs-list">MSME  ·  UDYAM  ·  GST  ·  IEC  ·  Customs  ·  Trademark  ·  IndiaMART  ·  TradeIndia  ·  JustDial</p>
        </div>
      </div>
    </div>
  </div>`;

/* =================================================================
   CATALOGUE — PRODUCT CARD
================================================================= */
const renderCatCard = (product, accent) => `
  <article class="cat-card" style="--acc:${accent.bar};--acc-bg:${accent.bg};--acc-light:${accent.light}">
    <div class="cat-card-img">
      <img src="${esc(getAssetUrl(product.image))}" alt="${esc(product.name)}" />
      <div class="cat-card-img-fade"></div>
    </div>
    <div class="cat-card-body">
      <p class="cat-card-category">${esc(product.category || "")}</p>
      <h3 class="cat-card-name">${esc(product.name)}</h3>
      ${product.description ? `<p class="cat-card-desc">${esc(product.description)}</p>` : ""}
      <div class="cat-card-meta">
        ${product.material ? `<div class="ccm-row"><b>Material</b><span>${esc(product.material)}</span></div>` : ""}
        ${formatSizes(product.sizes).length ? `<div class="ccm-row"><b>Sizes</b><span>${esc(formatSizes(product.sizes).join(" · "))}</span></div>` : ""}
      </div>
    </div>
    <div class="cat-card-accent-bar"></div>
  </article>`;

/* =================================================================
   CATALOGUE — CATEGORY SECTION
================================================================= */
const renderCategorySection = ([category, items], catIdx) => {
  const accent = CAT_ACCENTS[catIdx % CAT_ACCENTS.length];
  return chunk(items, 6).map((pageItems, pageIdx) => `
    <div class="cat-page" style="--acc:${accent.bar};--acc-bg:${accent.bg};--acc-light:${accent.light}">
      <div class="cat-page-header">
        <div class="cat-page-header-left">
          <div class="cat-page-tab">PRODUCT CATEGORY</div>
          <h2 class="cat-page-title">
            ${esc(category)}
            ${pageIdx > 0 ? `<span class="cat-page-cont">continued</span>` : ""}
          </h2>
        </div>
        <div class="cat-page-header-right">${logoLockup(false)}</div>
      </div>
      <div class="cat-page-grid">
        ${pageItems.map((p) => renderCatCard(p, accent)).join("")}
      </div>
      <div class="cat-page-footer">
        <span>${esc(B.tradeName)}</span>
        <span class="cat-pf-center">Packing &amp; rates may vary — request a quotation for final pricing.</span>
        <span>Page ${pageIdx + 1} of ${Math.ceil(items.length / 6)}</span>
      </div>
    </div>`).join("");
};

/* =================================================================
   CATALOGUE — FULL ASSEMBLY
================================================================= */
const renderCatalogue = (products) => {
  const groups = Object.entries(groupByCategory(products));
  return [renderCover(products), renderAbout(), ...groups.map(renderCategorySection)].join("\n");
};

/* =================================================================
   STYLES — premium design from doc 59
================================================================= */
const getCatalogueStyles = () =>
  Array.from(document.styleSheets)
    .flatMap((sheet) => {
      try {
        return Array.from(sheet.cssRules || []).map((rule) => rule.cssText);
      } catch (_) {
        return [];
      }
    })
    .join("\n");

/* =================================================================
   ENGINE — iframe capture with html2canvas + jsPDF
================================================================= */
const openWindow = async (title, bodyHtml) => {
  const iframe = document.createElement("iframe");
  iframe.style.position = "fixed";
  iframe.style.left = "-99999px";
  iframe.style.top = "0";
  iframe.style.width = "1120px";
  iframe.style.height = "0";
  iframe.style.border = "none";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${esc(title)}</title>
        <style>${getCatalogueStyles()}</style>
      </head>
      <body>
        <main class="download-page" style="margin:0;padding:28px;background:#fff;">
          ${bodyHtml}
        </main>
      </body>
    </html>
  `);
  doc.close();

  // Wait for all images to load
  const images = Array.from(doc.images);
  await Promise.all(images.map(img => {
    if (img.complete) return Promise.resolve();
    return new Promise((resolve) => {
      img.onload = resolve;
      img.onerror = resolve; // resolve even on error to not block
    });
  }));

  // Extra tick for layout
  await new Promise(r => setTimeout(r, 150));

  const target = doc.querySelector(".download-page");
  if (!target) {
    console.error("Target element not found");
    document.body.removeChild(iframe);
    return;
  }

  try {
    const canvas = await html2canvas(target, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: target.scrollWidth,
      windowHeight: target.scrollHeight,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = canvas.width;
    const pdfHeight = canvas.height;
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? "landscape" : "portrait",
      unit: "px",
      format: [pdfWidth, pdfHeight],
      compress: true,
    });
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${title}.pdf`);
  } catch (err) {
    console.error("PDF generation failed:", err);
  } finally {
    document.body.removeChild(iframe);
  }
};

/* ─── Public API ────────────────────────────────────────────────── */
export const downloadProductPamphlet = (product) => {
  if (!product) return;
  openWindow(`${product.name} — ${B.name}`, renderPamphlet(product));
};

export const downloadProductCatalogue = (products) => {
  const active = (products || []).filter(Boolean);
  if (!active.length) return;
  openWindow(`${B.tradeName} — Product Catalogue`, renderCatalogue(active));
};