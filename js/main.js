
/* =========================================================
   ATLANTIC TOURS AND EXPERIENCES
   PREMIUM PAGE TRANSITION SYSTEM
   Version 1.0
========================================================= */

(function () {
    "use strict";

    const CONFIG = {
        logo: "logo.png",
        transitionDelay: 180,
        fadeDuration: 450,
        background: "#0A1725",
        accent: "#C6A66B"
    };

    // Prevent duplicate initialization
    if (window.__ATLANTIC_TRANSITIONS__) return;
    window.__ATLANTIC_TRANSITIONS__ = true;

    // -----------------------------------------------------
    // 1. PREMIUM LOADER STYLES
    // -----------------------------------------------------

    const styles = document.createElement("style");

    styles.textContent = `
        #atlantic-page-loader {
            position: fixed;
            inset: 0;
            z-index: 999999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background:
                radial-gradient(
                    circle at center,
                    #19344A 0%,
                    #0A1725 55%,
                    #07111C 100%
                );
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transition:
                opacity ${CONFIG.fadeDuration}ms ease,
                visibility ${CONFIG.fadeDuration}ms ease;
        }

        #atlantic-page-loader.active {
            opacity: 1;
            visibility: visible;
            pointer-events: all;
        }

        #atlantic-page-loader .atlantic-loader-logo {
            width: clamp(115px, 17vw, 190px);
            height: auto;
            max-height: 150px;
            object-fit: contain;
            opacity: 0;
            transform: translateY(14px) scale(.96);
            filter: drop-shadow(
                0 8px 30px rgba(198,166,107,.16)
            );
            animation: atlanticLogoAppear .8s ease forwards;
        }

        #atlantic-page-loader .atlantic-loader-line {
            width: 110px;
            height: 2px;
            margin-top: 35px;
            overflow: hidden;
            position: relative;
            background: rgba(255,255,255,.12);
        }

        #atlantic-page-loader .atlantic-loader-line::after {
            content: "";
            position: absolute;
            top: 0;
            left: -45%;
            width: 45%;
            height: 100%;
            background: ${CONFIG.accent};
            animation: atlanticLoaderMove 1.2s ease-in-out infinite;
        }

        #atlantic-page-loader .atlantic-loader-caption {
            margin-top: 18px;
            color: rgba(255,255,255,.68);
            font-family: Arial, sans-serif;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 3px;
            text-transform: uppercase;
        }

        @keyframes atlanticLogoAppear {
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }

        @keyframes atlanticLoaderMove {
            0% { left: -45%; }
            100% { left: 110%; }
        }

        @media (prefers-reduced-motion: reduce) {
            #atlantic-page-loader,
            #atlantic-page-loader * {
                animation-duration: .01ms !important;
                transition-duration: .01ms !important;
            }
        }
    `;

    document.head.appendChild(styles);

    // -----------------------------------------------------
    // 2. CREATE LOADER
    // -----------------------------------------------------

    function createLoader() {
        if (document.getElementById("atlantic-page-loader")) {
            return;
        }

        const loader = document.createElement("div");

        loader.id = "atlantic-page-loader";
        loader.setAttribute("aria-hidden", "true");

        loader.innerHTML = `
            <img
                class="atlantic-loader-logo"
                src="${CONFIG.logo}"
                alt="Atlantic Tours and Experiences"
            />

            <div class="atlantic-loader-line"></div>

            <div class="atlantic-loader-caption">
                Discover The Red Sea
            </div>
        `;

        document.body.appendChild(loader);
    }

    // -----------------------------------------------------
    // 3. SHOW LOADER
    // -----------------------------------------------------

    function showLoader() {
        createLoader();

        const loader = document.getElementById(
            "atlantic-page-loader"
        );

        if (!loader) return;

        loader.classList.add("active");
        loader.setAttribute("aria-hidden", "false");
    }

    // -----------------------------------------------------
    // 4. HIDE LOADER
    // -----------------------------------------------------

    function hideLoader() {
        const loader = document.getElementById(
            "atlantic-page-loader"
        );

        if (!loader) return;

        loader.classList.remove("active");
        loader.setAttribute("aria-hidden", "true");
    }

    // -----------------------------------------------------
    // 5. HANDLE INTERNAL PAGE NAVIGATION
    // -----------------------------------------------------

    function handleNavigation(event) {
        const link = event.target.closest("a[href]");

        if (!link) return;

        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        if (link.target && link.target !== "_self") return;
        if (link.hasAttribute("download")) return;

        const rawHref = link.getAttribute("href");

        if (
            !rawHref ||
            rawHref.startsWith("#") ||
            rawHref.startsWith("javascript:") ||
            rawHref.startsWith("mailto:") ||
            rawHref.startsWith("tel:")
        ) {
            return;
        }

        let destination;

        try {
            destination = new URL(rawHref, window.location.href);
        } catch (error) {
            return;
        }

        if (destination.origin !== window.location.origin) {
            return;
        }

        const current = new URL(window.location.href);

        const samePage =
            destination.pathname === current.pathname &&
            destination.search === current.search;

        if (samePage) {
            return;
        }

        event.preventDefault();

        showLoader();

        window.setTimeout(function () {
            window.location.assign(destination.href);
        }, CONFIG.transitionDelay);
    }

    // -----------------------------------------------------
    // 6. INITIALIZE
    // -----------------------------------------------------

    function initialize() {
        createLoader();

        document.addEventListener(
            "click",
            handleNavigation,
            true
        );

        // Restore page normally when using browser back/forward
        window.addEventListener("pageshow", function () {
            hideLoader();
        });

        // Hide loader if navigation is cancelled or page remains
        window.addEventListener("pagehide", function () {
            // Browser handles the next page transition.
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener(
            "DOMContentLoaded",
            initialize,
            { once: true }
        );
    } else {
        initialize();
    }

})();

