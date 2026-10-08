// ==UserScript==
// @name         AbanTether USDT Chart UI Fix
// @namespace    https://github.com/shinraad/AbanTether-USDTChart-Userscript
// @version      1.1.0
// @description  Adjusts AbanTether USDT chart UI on fast-trade and coin pages (client-side only).
// @match        https://abantether.ir/*
// @match        https://www.abantether.ir/*
// @run-at       document-idle
// @grant        none
// @noframes
// ==/UserScript==

(function () {
    'use strict';

    const path = window.location.pathname;
    const onFastTrade = path === '/trade/fast' || path.startsWith('/trade/fast/');
    const onCoinUSDT = path === '/coin/USDT' || path === '/coin/USDT/';
    if (!onFastTrade && !onCoinUSDT) return;

    const DEBUG = false;
    const log = (...args) => {
        if (DEBUG) console.info('[AbanTether Chart Fix]', ...args);
    };

    // The chart blur is 6px on fast-trade and 12px on the USDT coin page.
    const blurClass = onFastTrade ? 'blur-[6px]' : 'blur-[12px]';

    function fixChart() {
        // Narrow selector to the exact disabled wrapper on the selected page.
        document.querySelectorAll('div.pointer-events-none.select-none').forEach((el) => {
            if (!el.classList.contains(blurClass)) return;
            // Fast-trade: verify the wrapper belongs to the TradingView chart.
            // Coin page: the requested wrapper is identified by its full classes.
            if (onFastTrade && !el.querySelector('iframe[title="Financial Chart"]')) return;
            if (!el.classList.contains('h-full') || !el.classList.contains('w-full')) return;

            el.className = 'pointer-events h-full w-full select';
            el.style.pointerEvents = 'auto';
            log('Updated chart wrapper on', path);
        });

        // Remove only the overlay with the exact USDT chart restriction wording.
        document.querySelectorAll('div.absolute.inset-0.z-10').forEach((el) => {
            const message = el.textContent || '';
            if (message.includes('بنا به دستور نهاد ناظر') &&
                message.includes('نمودار قیمت تتر')) {
                el.remove();
                log('Removed matching overlay on', path);
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
        log('Watching for chart re-renders on', path);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start, { once: true });
    } else {
        start();
    }
})();
