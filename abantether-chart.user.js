// ==UserScript==
// @name         AbanTether USDT Chart UI Fix
// @namespace    https://github.com/shinraad/AbanTether-USDTChart-Userscript
// @version      1.0.0
// @description  Adjusts the USDT chart UI on AbanTether fast trade pages (client-side only).
// @match        https://abantether.ir/*
// @match        https://www.abantether.ir/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    // Broad @match rules improve injection reliability; this guard ensures that
    // changes are made ONLY on /trade/fast and paths starting with it.
    if (!location.pathname.startsWith('/trade/fast')) return;

    const DEBUG = false;
    const log = (...args) => {
        if (DEBUG) console.info('[AbanTether Chart Fix]', ...args);
    };

    function fixChart() {
        // Find chart wrappers using stable iframe attributes (the ID changes).
        document.querySelectorAll('iframe[title="Financial Chart"]').forEach((frame) => {
            const wrapper = frame.closest('div.pointer-events-none');
            if (!wrapper) return;

            // Match the requested markup exactly, retaining aria-hidden.
            wrapper.className = 'pointer-events h-full w-full select';
            // `pointer-events` is not a standard Tailwind utility. Set the
            // actual CSS property to make the chart interactive.
            wrapper.style.pointerEvents = 'auto';
            log('Updated chart wrapper');
        });

        // Remove ONLY the specific USDT-chart restriction overlay.
        document.querySelectorAll('div.absolute.inset-0.z-10').forEach((el) => {
            const message = el.textContent || '';
            if (
                message.includes('بنا به دستور نهاد ناظر') &&
                message.includes('نمودار قیمت تتر')
            ) {
                el.remove();
                log('Removed matching overlay');
            }
        });
    }

    let scheduled = false;
    function scheduleFix() {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
            scheduled = false;
            fixChart();
        });
    }

    function start() {
        fixChart();
        const observer = new MutationObserver(scheduleFix);
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class'],
        });
        log('Watching for chart re-renders');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
