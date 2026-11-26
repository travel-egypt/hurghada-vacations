
(() => {
  "use strict";

  const data = window.ATLANTIS_TOURS;

  if (!Array.isArray(data)) return;

  const filename = location.pathname.split("/").pop();

  const t = data.find(x =>
    typeof x.href === "string" &&
    x.href.split("/").pop() === filename
  );

  const old = document.querySelector("main");

  if (!t || !old) return;

  if (document.querySelector(".at-master")) return;

  // =====================================
  // ATLANTIS CENTRAL EXPERIENCE SYSTEM
  // =====================================

  const e = (tag, cls, txt) => {
    const n = document.createElement(tag);

    if (cls) n.className = cls;
    if (txt != null) n.textContent = txt;

    return n;
  };

  const add = (parent, tag, cls, txt) => {
    const n = e(tag, cls, txt);
    parent.append(n);
    return n;
  };

  const root = new URL("../", location.href);

  function url(value) {
    if (typeof value !== "string" || !value.trim()) {
      return "";
    }

    try {
      const result = new URL(
        value.startsWith("assets/")
          ? value
          : value,
        value.startsWith("assets/")
          ? root
          : location.href
      );

      if (
        result.protocol !== "https:" &&
        result.protocol !== "http:"
      ) {
        return "";
      }

      if (result.username || result.password) {
        return "";
      }

      return result.href;

    } catch {
      return "";
    }
  }

  function uniqueMedia(values) {
    return [...new Set(
      values.filter(Boolean).map(url).filter(Boolean)
    )];
  }

  // =====================================
  // ORIGINAL TOUR MEDIA
  // =====================================

  const originalImages = Array.from(
    old.querySelectorAll("img[src]"),
    image => image.getAttribute("src")
  );

  const originalVideos = Array.from(
    old.querySelectorAll("video[src], video source[src]"),
    video => video.getAttribute("src")
  );

  // =====================================
  // CENTRAL MEDIA DATABASE
  // =====================================

  const managedGallery = Array.isArray(t.gallery);
  const managedVideos = Array.isArray(t.videos);

  const gallery = managedGallery
    ? t.gallery
    : originalImages;

  const videoGallery = managedVideos
    ? t.videos
    : originalVideos;

  const pics = uniqueMedia([
    t.image,
    ...gallery
  ]);

  const videos = uniqueMedia(videoGallery);

  // =====================================
  // PAGE DESIGN
  // =====================================

  const style = document.createElement("style");

  style.textContent = `
    .at-media-section {
      margin: 30px 0;
    }

    .at-media-grid {
      display: grid;
      grid-template-columns:
        repeat(auto-fit,minmax(145px,1fr));
      gap: 12px;
      margin-top: 16px;
    }

    .at-media-grid button {
      display: block;
      width: 100%;
      padding: 0;
      border: 0;
      border-radius: 10px;
      overflow: hidden;
      background: #092a3a;
      cursor: zoom-in;
    }

    .at-media-grid img {
      display: block;
      width: 100%;
      aspect-ratio: 4/3;
      object-fit: cover;
      transition: transform .3s ease;
    }

    .at-media-grid button:hover img {
      transform: scale(1.04);
    }

    .at-video-grid {
      display: grid;
      grid-template-columns:
        repeat(auto-fit,minmax(240px,1fr));
      gap: 16px;
    }

    .at-video-grid video {
      display: block;
      width: 100%;
      border-radius: 12px;
      background: #061c29;
      aspect-ratio: 16/9;
      object-fit: contain;
    }

    .at-gallery-count {
      margin: 10px 0;
      font-size: 13px;
      opacity: .75;
    }

    .at-master dialog {
      max-width: min(94vw,1100px);
      max-height: 94vh;
      padding: 14px;
      border: 1px solid #53666d;
      border-radius: 14px;
      background: #061c29;
      color: #eee9df;
    }

    .at-master dialog::backdrop {
      background: rgba(0,0,0,.88);
    }

    .at-master dialog img {
      display: block;
      max-width: 100%;
      max-height: 74vh;
      margin: auto;
      object-fit: contain;
    }

    .at-dialog-controls {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 14px;
    }

    .at-dialog-controls button {
      padding: 10px 15px;
      background: #123746;
      color: #eee9df;
      border: 1px solid #997b49;
      border-radius: 7px;
      cursor: pointer;
    }

    .at-dialog-counter {
      text-align: center;
      margin: 10px 0 0;
      color: #dfb35e;
      font-size: 13px;
    }

    .at-cover button img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media(max-width:600px) {
      .at-media-grid {
        grid-template-columns: repeat(2,1fr);
        gap: 8px;
      }

      .at-video-grid {
        grid-template-columns: 1fr;
      }

      .at-master dialog {
        padding: 8px;
      }
    }
  `;

  document.head.append(style);

  const master = e("section", "at-master");

  old.before(master);

  document.body.classList.add("at-enhanced");

  // =====================================
  // BREADCRUMB AND TITLE
  // =====================================

  const crumb = add(
    master,
    "a",
    null,
    "← All experiences"
  );

  crumb.href = new URL(
    "all-tours.html",
    root
  ).href;

  add(
    master,
    "div",
    "at-kicker",
    String(t.category || "Experience")
      .replaceAll("-", " ") +
      " / Atlantis experiences"
  );

  add(master, "h1", null, t.title);

  add(master, "p", null, t.desc);

  // =====================================
  // PHOTO LIGHTBOX
  // =====================================

  const dialog = add(master, "dialog");

  const big = add(dialog, "img");

  big.alt = t.title || "Atlantis experience";

  const counter = add(
    dialog,
    "div",
    "at-dialog-counter"
  );

  const controls = add(
    dialog,
    "div",
    "at-dialog-controls"
  );

  let idx = 0;

  function show(i) {
    if (!pics.length) return;

    idx = (i + pics.length) % pics.length;

    big.src = pics[idx];

    counter.textContent =
      (idx + 1) + " / " + pics.length;

    if (!dialog.open) {
      dialog.showModal();
    }
  }

  const previous = add(
    controls,
    "button",
    null,
    "← Previous"
  );

  previous.type = "button";

  previous.onclick = () => show(idx - 1);

  const next = add(
    controls,
    "button",
    null,
    "Next →"
  );

  next.type = "button";

  next.onclick = () => show(idx + 1);

  const close = add(
    controls,
    "button",
    null,
    "Close"
  );

  close.type = "button";

  close.onclick = () => dialog.close();

  dialog.addEventListener("keydown", ev => {
    if (ev.key === "ArrowLeft") {
      show(idx - 1);
    }

    if (ev.key === "ArrowRight") {
      show(idx + 1);
    }
  });

  dialog.addEventListener("click", ev => {
    if (ev.target === dialog) {
      dialog.close();
    }
  });

  let touchStart = 0;

  big.addEventListener(
    "touchstart",
    ev => {
      touchStart = ev.changedTouches[0].screenX;
    },
    { passive: true }
  );

  big.addEventListener(
    "touchend",
    ev => {
      const distance =
        ev.changedTouches[0].screenX -
        touchStart;

      if (distance > 50) show(idx - 1);
      if (distance < -50) show(idx + 1);
    },
    { passive: true }
  );

  // =====================================
  // MAIN COVER
  // =====================================

  function tile(parent, i) {
    const button = add(parent, "button");

    button.type = "button";

    button.setAttribute(
      "aria-label",
      "Open photo " + (i + 1)
    );

    const image = add(button, "img");

    image.src = pics[i];

    image.alt =
      (t.title || "Atlantis") +
      " — Photo " + (i + 1);

    image.loading = i === 0
      ? "eager"
      : "lazy";

    image.decoding = "async";

    button.onclick = () => show(i);

    return button;
  }

  if (pics.length) {
    const cover = add(
      master,
      "div",
      "at-cover" +
      (pics.length === 1 ? " single" : "")
    );

    tile(cover, 0);

    if (pics.length > 1) {
      const thumbs = add(
        cover,
        "div",
        "at-thumbs"
      );

      pics.slice(1, 3).forEach(
        (_, i) => tile(thumbs, i + 1)
      );
    }

    add(
      master,
      "p",
      "at-gallery-count",
      pics.length + " experience photos"
    );
  }

  // =====================================
  // MAIN CONTENT AND BOOKING
  // =====================================

  const layout = add(
    master,
    "div",
    "at-layout"
  );

  const left = add(layout, "article");

  const book = add(
    layout,
    "aside",
    "at-book"
  );

  add(
    left,
    "div",
    "at-kicker",
    "The Atlantis experience"
  );

  add(
    left,
    "h2",
    null,
    "Experience overview"
  );

  add(left, "p", null, t.detail);

  // =====================================
  // FULL PHOTO GALLERY
  // =====================================

  if (pics.length > 1) {
    const section = add(
      left,
      "section",
      "at-media-section"
    );

    add(
      section,
      "h2",
      null,
      "Experience Gallery"
    );

    const grid = add(
      section,
      "div",
      "at-media-grid"
    );

    pics.forEach(
      (_, i) => tile(grid, i)
    );
  }

  // =====================================
  // TOUR VIDEO GALLERY
  // =====================================

  if (videos.length) {
    const section = add(
      left,
      "section",
      "at-media-section"
    );

    add(
      section,
      "h2",
      null,
      "Experience Videos"
    );

    const grid = add(
      section,
      "div",
      "at-video-grid"
    );

    videos.forEach(src => {
      const video = add(grid, "video");

      video.controls = true;

      video.preload = "none";

      video.playsInline = true;

      video.src = src;

      video.setAttribute(
        "aria-label",
        t.title + " video"
      );
    });
  }

  // =====================================
  // PRESERVE ORIGINAL TOUR CONTENT
  // =====================================

  const original = add(
    left,
    "div",
    "at-original"
  );

  // Central media replaces old inline media.
  // Other original text and sections remain.

  if (managedGallery) {
    old.querySelectorAll("img").forEach(img => {
      img.hidden = true;
      img.style.setProperty(
        "display",
        "none",
        "important"
      );
    });
  }

  if (managedVideos) {
    old.querySelectorAll("video").forEach(video => {
      video.pause();
      video.hidden = true;

      video.style.setProperty(
        "display",
        "none",
        "important"
      );
    });
  }

  original.append(old);

  // =====================================
  // PRICE AND BOOKING
  // =====================================

  add(
    book,
    "div",
    "at-kicker",
    "Plan your experience"
  );

  add(
    book,
    "h2",
    null,
    "Your booking"
  );

  const price = Number.isFinite(t.price)
    ? (t.from || t.fromPrice ? "From " : "") +
      "€" + t.price
    : "Request a quote";

  add(book, "div", "at-price", price);

  add(
    book,
    "small",
    null,
    "Price and availability confirmed before booking."
  );

  const form = add(book, "form");

  function field(
    parent,
    label,
    type,
    name,
    value,
    min
  ) {
    const l = add(
      parent,
      "label",
      null,
      label
    );

    const input = add(l, "input");

    input.type = type;
    input.name = name;
    input.value = value ?? "";
    input.required = true;

    if (min != null) {
      input.min = min;
    }

    return input;
  }

  const params = new URLSearchParams(
    location.search
  );

  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");

  const date = field(
    form,
    "Travel date",
    "date",
    "date",
    params.get("date")
  );

  date.min = today;

  const pair = add(
    form,
    "div",
    "at-pair"
  );

  const adults = field(
    pair,
    "Adults",
    "number",
    "adults",
    params.get("guests") || "2",
    1
  );

  const children = field(
    pair,
    "Children",
    "number",
    "children",
    "0",
    0
  );

  adults.step = "1";
  children.step = "1";

  const hotel = field(
    form,
    "Hotel / pickup location",
    "text",
    "hotel",
    ""
  );

  hotel.required = false;

  const total = add(form, "p");

  function update() {
    total.textContent =
      "Total guests: " +
      (
        Number(adults.value) +
        Number(children.value)
      );
  }

  form.addEventListener("input", update);

  update();

  const submit = add(
    form,
    "button",
    null,
    "Request booking via WhatsApp"
  );

  submit.type = "submit";

  form.onsubmit = ev => {
    ev.preventDefault();

    if (!form.reportValidity()) return;

    const message = [
      "Hello Atlantis Tours and Experiences",
      "",
      "Experience: " + t.title,
      "Date: " + date.value,
      "Adults: " + adults.value,
      "Children: " + children.value,
      "Hotel: " + (hotel.value || "Not specified"),
      "",
      "Please confirm availability and final price."
    ].join("\n");

    window.open(
      "https://wa.me/201557745501?text=" +
      encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer"
    );
  };

  // =====================================
  // RELATED EXPERIENCES
  // =====================================

  const recommendations = data.filter(x =>
    x.id !== t.id &&
    x.category === t.category &&
    typeof x.href === "string"
  ).slice(0, 3);

  if (recommendations.length) {
    add(
      master,
      "h2",
      null,
      "You may also like"
    );

    const related = add(
      master,
      "div",
      "at-related"
    );

    recommendations.forEach(x => {
      const a = add(
        related,
        "a",
        null,
        x.title
      );

      a.href = new URL(
        x.href,
        root
      ).href;
    });
  }

  console.info(
    "Atlantis Experience Manager",
    {
      experience: t.id,
      photos: pics.length,
      videos: videos.length,
      managedGallery,
      managedVideos
    }
  );

})();
