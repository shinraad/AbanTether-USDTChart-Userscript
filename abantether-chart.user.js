
 // ==UserScript==
 // @name         AbanTether USDT Chart UI Fix
 // @namespace    https://github.com/shinraad/AbanTether-USDTChart-Userscript
 // @version      1.2.0
 // @description  Restore USDT charts and selectable price text.
 // @match        https://abantether.ir/*
 // @match        https://www.abantether.ir/*
 // @run-at       document-start
 // @grant        none
 // @noframes
 // ==/UserScript==

(function () {
    'use strict';

    const isSupported = () => {
        const path = location.pathname.replace(/\/+$/, '');

        return (
            path === '/trade/fast' ||
            path === '/coin/USDT'
        );
    };

    if (!isSupported()) return;

    const STYLE_ID = 'aban-chart-price-fix';

    const CSS = `
        /* Restricted price container */
        span.group.relative.lg\\:cursor-help {
            cursor: text !important;
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        /* Convert login button appearance into plain text */
        span.group.relative.lg\\:cursor-help > button {
            cursor: text !important;
            pointer-events: none !important;
            user-select: text !important;
            -webkit-user-select: text !important;
            background: transparent !important;
            border: none !important;
        }

        /* Remove blur and restore selectable text */
        span.group.relative.lg\\:cursor-help .blur-\\[6px\\] {
            filter: none !important;
            user-select: text !important;
            -webkit-user-select: text !important;
        }

        /* Make all price text selectable */
        span.group.relative.lg\\:cursor-help span,
        span.group.relative.lg\\:cursor-help div {
            user-select: text !important;
            -webkit-user-select: text !important;
            cursor: text !important;
        }

        /* Hide price tooltips */
        span.group.relative.lg\\:cursor-help [role="tooltip"] {
            display: none !important;
        }
    `;

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) {
            return;
        }

        const style = document.createElement('style');

        style.id = STYLE_ID;
        style.textContent = CSS;

        (document.head || document.documentElement)
            .appendChild(style);
    }

    function fixChart() {
        const fast = location.pathname.startsWith('/trade/fast');

        const blur = fast
            ? 'blur-[6px]'
            : 'blur-[12px]';

        document.querySelectorAll(
            'div.pointer-events-none.select-none'
        ).forEach(el => {
            if (
                !el.classList.contains(blur) ||
                !el.classList.contains('h-full') ||
                !el.classList.contains('w-full')
            ) return;

            if (
                fast &&
                !el.querySelector(
                    'iframe[title="Financial Chart"]'
                )
            ) return;

            el.classList.remove(
                'pointer-events-none',
                'select-none',
                blur
            );

            el.classList.add('pointer-events', 'select');
            el.style.pointerEvents = 'auto';
            el.style.filter = 'none';
        });

        document.querySelectorAll(
            'div.absolute.inset-0.z-10'
        ).forEach(el => {
            if (
                el.textContent.includes('بنا به دستور نهاد ناظر') &&
                el.textContent.includes('نمودار قیمت تتر')
            ) {
                el.remove();
            }
        });
    }

    // Protect price selection without preventing mouse dragging.
    function protectPriceClick(event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        const price = target.closest(
            'span.group.relative.lg\\:cursor-help'
        );

        if (!price) return;

        if (event.type === 'click') {
            event.preventDefault();
        }

        event.stopPropagation();
        event.stopImmediatePropagation();
    }

    function applyFixes() {
        injectStyles();
        fixChart();
    }

    let scheduled = false;

    function scheduleFix() {
        if (scheduled) return;

        scheduled = true;

        requestAnimationFrame(() => {
            scheduled = false;
            applyFixes();
        });
    }

    function start() {
        applyFixes();

        for (const type of [
            'pointerdown',
            'mousedown',
            'click'
        ]) {
            window.addEventListener(
                type,
                protectPriceClick,
                true
            );
        }

        const observer = new MutationObserver(scheduleFix);

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            start,
            { once: true }
        );
    } else {
        start();
    }
})();
