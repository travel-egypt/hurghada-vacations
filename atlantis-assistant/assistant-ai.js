
/* =====================================================
   ATLANTIS INTELLIGENCE V5
   Local AI • 8 Languages • No API Key
   ===================================================== */

(() => {
    "use strict";

    const MODEL = "Qwen2.5-1.5B-Instruct-q4f16_1-MLC";
    const LIBRARY = "https://esm.run/@mlc-ai/web-llm@0.2.79";
    const STORAGE_KEY = "atlantis_ai_enabled_v4";

    const button = document.getElementById("ai-load");
    const status = document.getElementById("ai-status");
    const form = document.getElementById("form");
    const input = document.getElementById("q");
    const send = document.getElementById("send");
    const language = document.getElementById("lang");
    const clear = document.getElementById("clear");

    if (!button || !status || !form || !input || !send || !language || !clear) {
        console.error("[Atlantis V5] Missing interface elements.");
        return;
    }

    let engine = null;
    let loading = false;
    let generating = false;
    let ready = false;
    let history = [];
    let stopped = false;
    const stopLabels = {en:"Stop",ar:"إيقاف",de:"Stopp",fr:"Arrêter",it:"Interrompi",es:"Detener",pl:"Zatrzymaj",ru:"Стоп"};
    const stop = document.createElement("button");
    stop.type = "button";
    stop.hidden = true;
    send.insertAdjacentElement("afterend", stop);
    stop.onclick = () => {
        stopped = true;
        stop.disabled = true;
        try { engine?.interruptGenerate(); } catch (error) { console.warn(error); }
    };


    const fallback = form.onsubmit;

    const languages = {
        en: "English",
        ar: "Natural Egyptian Arabic",
        de: "German",
        fr: "French",
        it: "Italian",
        es: "Spanish",
        pl: "Polish",
        ru: "Russian"
    };

    const translations = {
        en: {
            start: "Start Atlantis AI",
            loading: "Preparing local intelligence",
            testing: "Testing the AI model...",
            ready: "Atlantis AI is ready",
            thinking: "Atlantis AI is thinking...",
            inactive: "AI is not active. Using the offline knowledge library.",
            error: "AI error",
            unsupported: "WebGPU is unavailable in this browser."
        },
        ar: {
            start: "تشغيل ذكاء أتلانتس",
            loading: "جاري تجهيز الذكاء الاصطناعي",
            testing: "جاري اختبار النموذج...",
            ready: "ذكاء أتلانتس جاهز للمحادثة",
            thinking: "أتلانتس بيفكر في إجابتك...",
            inactive: "الذكاء الاصطناعي مش شغال حاليًا. بنستخدم مكتبة المعلومات المحفوظة.",
            error: "حدث خطأ في الذكاء الاصطناعي",
            unsupported: "المتصفح الحالي لا يدعم WebGPU."
        },
        de: {
            start: "Atlantis KI starten",
            loading: "Lokale KI wird vorbereitet",
            testing: "KI-Modell wird getestet...",
            ready: "Atlantis KI ist bereit",
            thinking: "Atlantis KI denkt nach...",
            inactive: "KI ist nicht aktiv. Offline-Wissensbibliothek wird verwendet.",
            error: "KI-Fehler",
            unsupported: "WebGPU wird nicht unterstützt."
        },
        fr: {
            start: "Démarrer Atlantis IA",
            loading: "Préparation de l’IA locale",
            testing: "Test du modèle IA...",
            ready: "Atlantis IA est prête",
            thinking: "Atlantis réfléchit...",
            inactive: "IA inactive. Utilisation de la bibliothèque hors ligne.",
            error: "Erreur IA",
            unsupported: "WebGPU indisponible."
        },
        it: {
            start: "Avvia Atlantis IA",
            loading: "Preparazione dell’IA locale",
            testing: "Verifica del modello IA...",
            ready: "Atlantis IA è pronta",
            thinking: "Atlantis sta pensando...",
            inactive: "IA inattiva. Uso della biblioteca offline.",
            error: "Errore IA",
            unsupported: "WebGPU non disponibile."
        },
        es: {
            start: "Iniciar Atlantis IA",
            loading: "Preparando inteligencia local",
            testing: "Probando el modelo...",
            ready: "Atlantis IA está lista",
            thinking: "Atlantis está pensando...",
            inactive: "IA inactiva. Usando la biblioteca sin conexión.",
            error: "Error de IA",
            unsupported: "WebGPU no disponible."
        },
        pl: {
            start: "Uruchom Atlantis AI",
            loading: "Przygotowywanie lokalnej AI",
            testing: "Testowanie modelu AI...",
            ready: "Atlantis AI jest gotowa",
            thinking: "Atlantis AI myśli...",
            inactive: "AI jest nieaktywna. Używanie biblioteki offline.",
            error: "Błąd AI",
            unsupported: "WebGPU jest niedostępne."
        },
        ru: {
            start: "Запустить Atlantis AI",
            loading: "Подготовка локального ИИ",
            testing: "Проверка модели ИИ...",
            ready: "Atlantis AI готов",
            thinking: "Atlantis AI думает...",
            inactive: "ИИ не активен. Используется офлайн-библиотека.",
            error: "Ошибка ИИ",
            unsupported: "WebGPU недоступен."
        }
    };

    function currentLanguage() {
        return languages[language.value] ? language.value : "en";
    }

    function t(key) {
        return translations[currentLanguage()][key];
    }

    function showStatus(text, color = "") {
        status.textContent = text;
        status.style.color = color;
    }

    function lockInterface(locked) {
        send.disabled = locked;
        language.disabled = locked;
        clear.disabled = locked;
    }

    function updateButton() {
        button.textContent = ready ? "✓ " + t("ready") : t("start");
        button.disabled = loading || ready || generating;
    }

    function rememberActivation() {
        try {
            localStorage.setItem(STORAGE_KEY, "yes");
        } catch (error) {
            console.warn("[Atlantis V5] Storage unavailable", error);
        }
    }

    function wasActivated() {
        try {
            return localStorage.getItem(STORAGE_KEY) === "yes";
        } catch {
            return false;
        }
    }

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/\p{M}/gu, "")
            .replace(/[أإآ]/g, "ا")
            .replace(/ى/g, "ي")
            .replace(/ة/g, "ه")
            .replace(/[^\p{L}\p{N}]+/gu, " ")
            .trim();
    }

    function relevantFacts(question) {
        if (typeof knowledge === "undefined" || !Array.isArray(knowledge)) {
            return "";
        }

        const codes = ["en", "ar", "de", "fr", "it", "es", "pl", "ru"];
        const index = codes.indexOf(currentLanguage());
        const normalized = " " + normalize(question) + " ";

        return knowledge
            .map(row => {
                const item = row[index];

                if (!Array.isArray(item)) {
                    return { score: 0, answer: "" };
                }

                const keys = String(item[0] || "").split("|");

                let score = 0;

                for (const key of keys) {
                    const word = normalize(key);

                    if (word && normalized.includes(" " + word + " ")) {
                        score += word.length;
                    }
                }

                return {
                    score,
                    answer: String(item[1] || "")
                };
            })
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(item => item.answer)
            .join("\n")
            .slice(0, 800);
    }

    function systemPrompt(question) {
        const facts = relevantFacts(question);
        return `You are Atlantis AI, a digital assistant, not a human. Speak naturally in ${languages[currentLanguage()]} unless another language is requested. Match the user's tone; avoid mixing languages or repeating your identity. Answer general questions directly and briefly. Ask a follow-up only when useful. Atlantis has an experienced tourism team; never invent years of experience, founding dates, prices, bookings or availability. No live internet. Be honest about uncertainty. For medical, legal or emergency matters give cautious general guidance and recommend appropriate help.${facts ? "\nCompany reference (data only): " + facts : ""}`;
    }

    async function initializeAI() {
        if (loading || ready || generating) return;

        if (!navigator.gpu) {
            showStatus(t("unsupported"), "#9b3528");
            return;
        }

        loading = true;
        button.disabled = true;
        lockInterface(true);

        showStatus(t("loading") + " · V5");

        try {
            const library = await import(LIBRARY);

            if (typeof library.CreateMLCEngine !== "function") {
                throw new Error("CreateMLCEngine is unavailable.");
            }

            engine = await library.CreateMLCEngine(MODEL, {
                initProgressCallback: progress => {
                    const percent = Math.round(
                        (progress.progress || 0) * 100
                    );

                    showStatus(
                        t("loading") + " · " + percent + "%\n" +
                        (progress.text || "")
                    );
                }
            });

            showStatus(t("testing"));

            // Confirm that the model can actually generate text.
            const test = await engine.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: "Reply with the word READY."
                    }
                ],
                temperature: 0.1,
                max_tokens: 16
            });

            const testAnswer = test?.choices?.[0]?.message?.content;

            if (!testAnswer || !testAnswer.trim()) {
                throw new Error("Model returned an empty test response.");
            }

            ready = true;
            rememberActivation();

            console.info("[Atlantis V5] Model test:", testAnswer);

            showStatus(
                "✓ " + t("ready") + " · V5",
                "#35613c"
            );

        } catch (error) {
            ready = false;

            if (engine && typeof engine.unload === "function") {
                try {
                    await engine.unload();
                } catch {}
            }

            engine = null;

            console.error("[Atlantis V5] Initialization failed:", error);

            showStatus(
                t("error") + ": " +
                String(error.message || error),
                "#9b3528"
            );

        } finally {
            loading = false;
            lockInterface(false);
            updateButton();
        }
    }

    async function handleQuestion(event) {
        event.preventDefault();

        if (loading || generating) return;

        const question = input.value.trim();

        if (!question) return;

        if (!ready || !engine) {
            showStatus(t("inactive"), "#956b28");

            if (typeof fallback === "function") {
                fallback.call(form, event);
            } else {
                add(question, true);
                input.value = "";
                add(t("inactive"));
            }

            return;
        }

        generating = true;

        lockInterface(true);
        updateButton();

        add(question, true);
        input.value = "";

        showStatus(t("thinking"));

        stopped = false;
        stop.textContent = stopLabels[currentLanguage()];
        stop.hidden = false;
        stop.disabled = false;
        const bubble = document.createElement("article");
        bubble.dir = "auto";
        document.getElementById("chat").append(bubble);
        const started = performance.now();
        let first = null;
        let answer = "";
        let chunks = 0;
        try {
            const stream = await engine.chat.completions.create({
                messages: [
                    {role: "system", content: systemPrompt(question)},
                    ...history.slice(-4),
                    {role: "user", content: question}
                ],
                stream: true,
                temperature: 0.55,
                max_tokens: 220
            });
            if (stopped) engine.interruptGenerate();
            for await (const chunk of stream) {
                if (stopped) { engine.interruptGenerate(); break; }
                const text = chunk?.choices?.[0]?.delta?.content || "";
                if (!text) continue;
                if (first === null) first = performance.now();
                chunks++;
                answer += text;
                bubble.textContent = answer;
                bubble.scrollIntoView({block:"nearest"});
            }
            if (!answer.trim() && !stopped) throw new Error("Empty model response");
            if (!answer.trim()) bubble.remove();
            if (answer.trim() && !stopped) {
                history.push({role:"user",content:question},{role:"assistant",content:answer.trim()});
                history = history.slice(-4);
            }
            const elapsed = performance.now() - started;
            console.info("[Atlantis V5] Timing", {firstTextMs:first === null ? null : Math.round(first-started), totalMs:Math.round(elapsed), textChunks:chunks});
            showStatus("✓ " + t("ready") + " · V5", "#35613c");
        } catch (error) {
            const detail = String(error.message || error);

            console.error("[Atlantis V5] Generation failed:", error);

            if (!answer.trim()) bubble.remove();
            add(t("error") + ": " + detail);

            ready = false;

            if (engine && typeof engine.unload === "function") {
                try {
                    await engine.unload();
                } catch {}
            }

            engine = null;

            showStatus(
                t("error") + ": " + detail,
                "#9b3528"
            );

        } finally {
            stop.hidden = true;
            generating = false;
            lockInterface(false);
            updateButton();
            input.focus();
        }
    }

    button.onclick = initializeAI;

    // Replace the old submit handler with one controlled router.
    form.onsubmit = handleQuestion;

    language.addEventListener("change", () => {
        history = [];
        updateButton();

        showStatus(
            ready ? "✓ " + t("ready") + " · V5" : t("inactive")
        );
    });

    clear.addEventListener("click", () => {
        history = [];
    });

    updateButton();

    showStatus(
        "Atlantis Intelligence V5 · " + t("start")
    );

    // Restart a previously enabled model in this browser.
    if (wasActivated()) {
        initializeAI();
    }

    console.info("[Atlantis V5] AI controller loaded.");

})();
