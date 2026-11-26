
(() => {
  "use strict";

  const translations = {"de": {"← All experiences": "← Alle Erlebnisse", "Experience overview": "Überblick", "Experience Gallery": "Fotogalerie", "Experience Videos": "Videos", "Your booking": "Ihre Buchung", "Travel date": "Reisedatum", "Adults": "Erwachsene", "Children": "Kinder", "Hotel / pickup location": "Hotel / Abholort", "Request booking via WhatsApp": "Buchung per WhatsApp anfragen", "You may also like": "Das könnte Ihnen auch gefallen", "Request a quote": "Preis auf Anfrage", "From ": "Ab ", "Total guests: ": "Gäste insgesamt: ", "Close": "Schließen", "← Previous": "← Zurück", "Next →": "Weiter →", "Zoom": "Zoom", "Photo unavailable": "Foto nicht verfügbar", "Video unavailable": "Video nicht verfügbar", "Plan your experience": "Erlebnis planen", "The Atlantis experience": "Das Atlantis-Erlebnis", "Price and availability confirmed before booking.": "Preis und Verfügbarkeit werden vor der Buchung bestätigt.", "experience photos": "Fotos", "Open photo ": "Foto öffnen "}, "ar": {"← All experiences": "← كل الرحلات", "Experience overview": "نظرة عامة", "Experience Gallery": "معرض الصور", "Experience Videos": "الفيديوهات", "Your booking": "حجزك", "Travel date": "تاريخ الرحلة", "Adults": "البالغون", "Children": "الأطفال", "Hotel / pickup location": "الفندق / مكان الاستلام", "Request booking via WhatsApp": "اطلب الحجز عبر واتساب", "You may also like": "رحلات قد تعجبك", "Request a quote": "اطلب السعر", "From ": "من ", "Total guests: ": "إجمالي الضيوف: ", "Close": "إغلاق", "← Previous": "← السابق", "Next →": "التالي →", "Zoom": "تكبير", "Photo unavailable": "الصورة غير متاحة", "Video unavailable": "الفيديو غير متاح", "Plan your experience": "خطط لرحلتك", "The Atlantis experience": "تجربة أتلانتس", "Price and availability confirmed before booking.": "يتم تأكيد السعر والتوافر قبل الحجز.", "experience photos": "صور الرحلة", "Open photo ": "افتح الصورة "}, "fr": {"← All experiences": "← Toutes les expériences", "Experience overview": "Aperçu", "Experience Gallery": "Galerie photos", "Experience Videos": "Vidéos", "Your booking": "Votre réservation", "Travel date": "Date du voyage", "Adults": "Adultes", "Children": "Enfants", "Hotel / pickup location": "Hôtel / lieu de prise en charge", "Request booking via WhatsApp": "Demander via WhatsApp", "You may also like": "À découvrir aussi", "Request a quote": "Prix sur demande", "From ": "À partir de ", "Total guests: ": "Total voyageurs : ", "Close": "Fermer", "← Previous": "← Précédent", "Next →": "Suivant →", "Zoom": "Zoom", "Photo unavailable": "Photo indisponible", "Video unavailable": "Vidéo indisponible", "Plan your experience": "Planifiez votre expérience", "The Atlantis experience": "L’expérience Atlantis", "Price and availability confirmed before booking.": "Prix et disponibilité confirmés avant réservation.", "experience photos": "photos", "Open photo ": "Ouvrir la photo "}, "it": {"← All experiences": "← Tutte le esperienze", "Experience overview": "Panoramica", "Experience Gallery": "Galleria foto", "Experience Videos": "Video", "Your booking": "La tua prenotazione", "Travel date": "Data del viaggio", "Adults": "Adulti", "Children": "Bambini", "Hotel / pickup location": "Hotel / punto di prelievo", "Request booking via WhatsApp": "Richiedi su WhatsApp", "You may also like": "Potrebbe piacerti anche", "Request a quote": "Prezzo su richiesta", "From ": "Da ", "Total guests: ": "Ospiti totali: ", "Close": "Chiudi", "← Previous": "← Precedente", "Next →": "Successivo →", "Zoom": "Zoom", "Photo unavailable": "Foto non disponibile", "Video unavailable": "Video non disponibile", "Plan your experience": "Pianifica la tua esperienza", "The Atlantis experience": "L’esperienza Atlantis", "Price and availability confirmed before booking.": "Prezzo e disponibilità confermati prima della prenotazione.", "experience photos": "foto", "Open photo ": "Apri foto "}, "es": {"← All experiences": "← Todas las experiencias", "Experience overview": "Resumen", "Experience Gallery": "Galería de fotos", "Experience Videos": "Vídeos", "Your booking": "Tu reserva", "Travel date": "Fecha del viaje", "Adults": "Adultos", "Children": "Niños", "Hotel / pickup location": "Hotel / lugar de recogida", "Request booking via WhatsApp": "Solicitar por WhatsApp", "You may also like": "También te puede gustar", "Request a quote": "Precio a consultar", "From ": "Desde ", "Total guests: ": "Total de viajeros: ", "Close": "Cerrar", "← Previous": "← Anterior", "Next →": "Siguiente →", "Zoom": "Zoom", "Photo unavailable": "Foto no disponible", "Video unavailable": "Vídeo no disponible", "Plan your experience": "Planifica tu experiencia", "The Atlantis experience": "La experiencia Atlantis", "Price and availability confirmed before booking.": "Precio y disponibilidad confirmados antes de reservar.", "experience photos": "fotos", "Open photo ": "Abrir foto "}, "pl": {"← All experiences": "← Wszystkie atrakcje", "Experience overview": "Informacje", "Experience Gallery": "Galeria zdjęć", "Experience Videos": "Filmy", "Your booking": "Twoja rezerwacja", "Travel date": "Data wycieczki", "Adults": "Dorośli", "Children": "Dzieci", "Hotel / pickup location": "Hotel / miejsce odbioru", "Request booking via WhatsApp": "Zapytaj przez WhatsApp", "You may also like": "Może Ci się spodobać", "Request a quote": "Cena na zapytanie", "From ": "Od ", "Total guests: ": "Liczba gości: ", "Close": "Zamknij", "← Previous": "← Poprzednie", "Next →": "Następne →", "Zoom": "Powiększ", "Photo unavailable": "Zdjęcie niedostępne", "Video unavailable": "Film niedostępny", "Plan your experience": "Zaplanuj wycieczkę", "The Atlantis experience": "Atrakcje Atlantis", "Price and availability confirmed before booking.": "Cena i dostępność potwierdzane przed rezerwacją.", "experience photos": "zdjęć", "Open photo ": "Otwórz zdjęcie "}, "ru": {"← All experiences": "← Все экскурсии", "Experience overview": "Обзор", "Experience Gallery": "Фотогалерея", "Experience Videos": "Видео", "Your booking": "Ваше бронирование", "Travel date": "Дата поездки", "Adults": "Взрослые", "Children": "Дети", "Hotel / pickup location": "Отель / место встречи", "Request booking via WhatsApp": "Запрос через WhatsApp", "You may also like": "Вам также может понравиться", "Request a quote": "Цена по запросу", "From ": "От ", "Total guests: ": "Всего гостей: ", "Close": "Закрыть", "← Previous": "← Назад", "Next →": "Далее →", "Zoom": "Увеличить", "Photo unavailable": "Фото недоступно", "Video unavailable": "Видео недоступно", "Plan your experience": "Планируйте поездку", "The Atlantis experience": "Экскурсии Atlantis", "Price and availability confirmed before booking.": "Цена и наличие подтверждаются до бронирования.", "experience photos": "фото", "Open photo ": "Открыть фото "}};
  let lang = "en";
  try { lang = localStorage.getItem("atlantis_lang") || "en"; } catch {}
  if (!translations[lang]) lang = "en";
  const tr = key => translations[lang]?.[key] || key;
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

  const videos = uniqueMedia([t.coverVideo, ...videoGallery]);

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

  const master = e("main", "at-master");
  master.lang = lang;
  master.dir = lang === "ar" ? "rtl" : "ltr";

  old.before(master);

  document.body.classList.add("at-enhanced");

  // =====================================
  // BREADCRUMB AND TITLE
  // =====================================

  const crumb = add(
    master,
    "a",
    null,
    tr("← All experiences")
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

    big.classList.remove("at-zoomed");
    big.hidden = false;
    big.src = pics[idx];

    counter.textContent =
      (idx + 1) + " / " + pics.length;

    if (!dialog.open) {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    }
  }

  big.addEventListener("error", () => { big.hidden = true; counter.textContent = tr("Photo unavailable"); });
  const zoom = add(controls, "button", null, tr("Zoom"));
  zoom.type = "button";
  zoom.onclick = () => big.classList.toggle("at-zoomed");
  const previous = add(
    controls,
    "button",
    null,
    tr("← Previous")
  );

  previous.type = "button";

  previous.onclick = () => show(idx - 1);

  const next = add(
    controls,
    "button",
    null,
    tr("Next →")
  );

  next.type = "button";

  next.onclick = () => show(idx + 1);

  const close = add(
    controls,
    "button",
    null,
    tr("Close")
  );

  close.type = "button";

  close.onclick = () => typeof dialog.close === "function" ? dialog.close() : dialog.removeAttribute("open");

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
      typeof dialog.close === "function" ? dialog.close() : dialog.removeAttribute("open");
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
      tr("Open photo ") + (i + 1)
    );

    const image = add(button, "img");

    image.src = pics[i];

    image.alt =
      (t.title || "Atlantis") +
      " — Photo " + (i + 1);

    image.loading = parent.classList.contains("at-cover") && i === 0
      ? "eager"
      : "lazy";

    image.decoding = "async";
    image.addEventListener("error", () => { image.hidden = true; button.textContent = tr("Photo unavailable"); button.disabled = true; }, {once:true});

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
      pics.length + " " + tr("experience photos")
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
    tr("The Atlantis experience")
  );

  add(
    left,
    "h2",
    null,
    tr("Experience overview")
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
      tr("Experience Gallery")
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
      tr("Experience Videos")
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
      if (pics[0]) video.poster = pics[0];
      video.addEventListener("play", () => master.querySelectorAll("video").forEach(v => { if(v !== video) v.pause(); }));
      video.addEventListener("error", () => { video.hidden = true; add(grid,"p",null,tr("Video unavailable")); }, {once:true});

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

  if (pics.length || managedGallery) {
    old.querySelectorAll("img").forEach(img => {
      img.hidden = true;
      img.style.setProperty(
        "display",
        "none",
        "important"
      );
    });
  }

  if (videos.length || managedVideos) {
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

  const legacy = e("div", "at-legacy");
  while (old.firstChild) legacy.append(old.firstChild);
  original.append(legacy);
  old.remove();

  // =====================================
  // PRICE AND BOOKING
  // =====================================

  add(
    book,
    "div",
    "at-kicker",
    tr("Plan your experience")
  );

  add(
    book,
    "h2",
    null,
    tr("Your booking")
  );

  const price = Number.isFinite(t.price)
    ? (t.from || t.fromPrice ? tr("From ") : "") +
      "€" + t.price
    : tr("Request a quote");

  add(book, "div", "at-price", price);

  add(
    book,
    "small",
    null,
    tr("Price and availability confirmed before booking.")
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
    tr("Travel date"),
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
    tr("Adults"),
    "number",
    "adults",
    params.get("guests") || "2",
    1
  );

  const children = field(
    pair,
    tr("Children"),
    "number",
    "children",
    "0",
    0
  );

  adults.step = "1";
  children.step = "1";

  const hotel = field(
    form,
    tr("Hotel / pickup location"),
    "text",
    "hotel",
    ""
  );

  hotel.required = false;
  hotel.maxLength = 200;
  adults.max = "99";
  children.max = "99";

  const total = add(form, "p");

  function update() {
    total.textContent =
      tr("Total guests: ") +
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
    tr("Request booking via WhatsApp")
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

    location.href = "https://wa.me/201557745501?text=" + encodeURIComponent(message);
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
      tr("You may also like")
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

      const target = new URL(x.href, root);
      if (target.origin !== root.origin || !target.pathname.startsWith(root.pathname + "tours/")) { a.remove(); return; }
      a.href = target.href;
      const src = url(x.image);
      if(src){ const im = e("img"); im.src=src; im.alt=""; im.loading="lazy"; im.addEventListener("error",()=>im.remove(),{once:true}); a.prepend(im); }
      add(a,"small",null,Number.isFinite(x.price)? ((x.from || x.fromPrice ? tr("From "):"")+"€"+x.price):tr("Request a quote"));
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
