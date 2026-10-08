# AbanTether USDT Chart Userscript

[فارسی](#فارسی) | [English](#english)

A small, open-source **Tampermonkey userscript** that customizes the **client-side UI** of the USDT/IRT chart on AbanTether's fast-trade and USDT coin pages.

> **Disclaimer:** This project is independent and is **not affiliated with, endorsed by, or supported by AbanTether**. It locally hides a notice describing a regulatory restriction; it does **not** remove that restriction, grant access to unavailable market data, alter server responses, or guarantee chart accuracy. Respect applicable laws and the website's terms.

---

<div dir="rtl" align="right">

<h2 id="فارسی">فارسی</h2>

<h3>معرفی</h3>

<p>این پروژه یک UserScript برای <strong>Tampermonkey</strong> است که ظاهر نمودار تتر در آبان‌تتر را <strong>فقط در مرورگر کاربر</strong> تغییر می‌دهد. نسخه <code dir="ltr">1.1.0</code> علاوه بر صفحه معاملات سریع، صفحه اختصاصی تتر را نیز پوشش می‌دهد.</p>

<h3>صفحات پشتیبانی‌شده</h3>
<ul>
<li>ابتدا، در ساعات معمول معاملات (طبق بازه اعلام‌شده ۹ صبح تا ۹ شب)، صفحه <a href="https://abantether.ir/trade/fast?symbol=USDT">معاملات سریع تتر</a> با نشانی زیر در دسترس است:</li>
</ul>
<pre dir="ltr"><code>https://abantether.ir/trade/fast?symbol=USDT</code></pre>
<ul>
<li>همچنین، برای مراجعه به نمودار در خارج از ساعات معاملات، صفحه <a href="https://abantether.ir/coin/USDT">اختصاصی تتر</a> با این نشانی پشتیبانی می‌شود:</li>
</ul>
<pre dir="ltr"><code>https://abantether.ir/coin/USDT</code></pre>
<p>بازه زمانی فوق مطابق وضعیت گزارش‌شده هنگام نگارش این راهنماست و ممکن است تغییر کند.</p>

<h3>عملکرد</h3>
<p><strong>در صفحه معاملات سریع:</strong> کلاس‌های اطراف نمودار از:</p>
<pre dir="ltr"><code>pointer-events-none h-full w-full select-none blur-[6px]</code></pre>
<p>به این مقدار تغییر می‌کنند:</p>
<pre dir="ltr"><code>pointer-events h-full w-full select</code></pre>
<p><strong>در صفحه اختصاصی تتر:</strong> کلاس‌های اطراف نمودار از:</p>
<pre dir="ltr"><code>pointer-events-none h-full w-full select-none blur-[12px]</code></pre>
<p>به همین مقدار تبدیل می‌شوند:</p>
<pre dir="ltr"><code>pointer-events h-full w-full select</code></pre>
<p>در هر دو صفحه، ویژگی <code dir="ltr">pointer-events: auto</code> اعمال می‌شود و تنها لایه‌ای حذف می‌شود که پیام «بنا به دستور نهاد ناظر» درباره «نمودار قیمت تتر» را نشان دهد. اسکریپت با <code dir="ltr">MutationObserver</code> تغییرات ساختار صفحه را نیز دنبال می‌کند.</p>
<p><strong>محدوده اجرا:</strong> قواعد <code dir="ltr">@match</code> هر دو دامنه <code dir="ltr">abantether.ir</code> و <code dir="ltr">www.abantether.ir</code> را پوشش می‌دهند، ولی کد فقط در مسیرهای <code dir="ltr">/trade/fast</code> و <code dir="ltr">/coin/USDT</code> تغییر ایجاد می‌کند.</p>

<h3>نصب</h3>

<p><strong>مرورگرهای پشتیبانی‌شده:</strong> این اسکریپت برای اجرا در <strong>گوگل کروم (Google Chrome)</strong> و <strong>موزیلا فایرفاکس (Mozilla Firefox)</strong> با افزونه Tampermonkey طراحی شده است.</p>

<ol>
<li>ابتدا افزونه <a href="https://www.tampermonkey.net/">Tampermonkey</a> را روی گوگل کروم یا فایرفاکس نصب کنید.</li>
<li>سپس داشبورد Tampermonkey را باز کرده و گزینه <strong>Create a new script</strong> را انتخاب کنید.</li>
<li>اکنون محتوای فایل <a href="./abantether-chart.user.js"><code dir="ltr">abantether-chart.user.js</code></a> را کپی کرده و جایگزین کد پیش‌فرض کنید.</li>
<li>بعد از آن، با کلیدهای <code dir="ltr">Ctrl + S</code> کد را ذخیره کنید و از فعال بودن اسکریپت مطمئن شوید.</li>
<li>در صورت نیاز، مجوز <strong>Allow User Scripts</strong> و دسترسی افزونه به سایت را در تنظیمات مرورگر فعال کنید.</li>
<li>در پایان، <a href="https://abantether.ir/trade/fast?symbol=USDT">صفحه معاملات سریع</a> یا <a href="https://abantether.ir/coin/USDT">صفحه اختصاصی تتر</a> را باز کرده و آن را بازخوانی (Refresh) کنید.</li>
</ol>

<h3>عیب‌یابی</h3>

<ul>
<li>اگر اسکریپت در فهرست Tampermonkey برای صفحه نشان داده نمی‌شود، وضعیت فعال بودن افزونه، <strong>Site access</strong> و <strong>Allow User Scripts</strong> را بررسی کنید.</li>
<li>اگر اسکریپت فعال است اما نتیجه‌ای دیده نمی‌شود، ممکن است ساختار HTML یا متن لایه سایت تغییر کرده باشد.</li>
<li>برای مشاهده گزارش‌ها مقدار <code dir="ltr">DEBUG</code> را در فایل JavaScript برابر <code dir="ltr">true</code> قرار دهید و Console مرورگر را بررسی کنید.</li>
<li>خطاهای دریافت داده، احراز هویت و ترتیب زمانی TradingView با تغییر DOM رفع نمی‌شوند.</li>
</ul>

<h3>محدودیت‌ها</h3>

<ul>
<li>این ابزار فقط رابط کاربری محلی را تغییر می‌دهد؛ <strong>هیچ درخواستی به API ارسال یا دستکاری نمی‌کند</strong>.</li>
<li>حذف لایه هشدار به معنی رفع محدودیت اعلام‌شده یا در دسترس بودن داده‌ها نیست.</li>
<li>تغییرات احتمالی سایت ممکن است باعث توقف عملکرد اسکریپت شوند.</li>
<li>این پروژه توصیه مالی یا معاملاتی نیست.</li>
</ul>

</div>

---

## English

### Overview

This is a **Tampermonkey userscript** that customizes the USDT/IRT chart interface **locally in your browser**. Version **1.1.0** covers both the fast-trade page and the USDT coin page.

### Supported pages

- **Fast trade:** [USDT fast trade](https://abantether.ir/trade/fast?symbol=USDT) — reported as accessible during trading hours (9:00 AM–9:00 PM).
- **USDT coin page:** [USDT coin](https://abantether.ir/coin/USDT) — an alternative page available outside those hours, as reported at the time of writing.

The reported hours may change; this project does not control page availability.

### Features

On **`/trade/fast`**, the wrapper classes change from:

```text
pointer-events-none h-full w-full select-none blur-[6px]
```

to:

```text
pointer-events h-full w-full select
```

On **`/coin/USDT`**, the wrapper classes change from:

```text
pointer-events-none h-full w-full select-none blur-[12px]
```

to the same unblurred classes:

```text
pointer-events h-full w-full select
```

On both pages, the script sets `pointer-events: auto`, removes only the overlay containing the specific Persian USDT chart restriction message, and uses `MutationObserver` to handle dynamic DOM re-renders. It does not depend on TradingView's changing iframe ID.

**Scope:** Broad `@match` rules include `abantether.ir/*` and `www.abantether.ir/*` for injection reliability; an explicit runtime guard limits DOM modifications to `/trade/fast` and `/coin/USDT`.

### Installation

**Supported browsers:** Google Chrome and Mozilla Firefox, with the Tampermonkey extension.

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open its dashboard and select **Create a new script**.
3. Replace the template with the contents of [`abantether-chart.user.js`](./abantether-chart.user.js).
4. Save with `Ctrl + S` and ensure the script is enabled.
5. Where required, enable your browser's **Allow User Scripts** setting and grant site access.
6. Open either the [USDT fast-trade page](https://abantether.ir/trade/fast?symbol=USDT) or the [USDT coin page](https://abantether.ir/coin/USDT) and refresh.

### Troubleshooting

- If Tampermonkey does not list the script on the page, check the extension's enabled state, **Site access**, and **Allow User Scripts** permission.
- If it runs but nothing changes, the website's DOM structure or restriction-message text may have changed.
- Set `DEBUG = true` in the JavaScript file and check the browser console for diagnostic messages.
- TradingView data-feed, authentication, and time-ordering errors are outside the scope of this script.

### Limitations

- This is **client-side UI customization only**. It does not intercept or modify API traffic.
- Hiding the notice does **not** lift a regulatory restriction or ensure that market data is available.
- Site changes may break the script.
- This software does not provide financial or trading advice.

---

## Files

```text
AbanTether-USDTChart-Userscript/
├── README.md
├── abantether-chart.user.js
├── LICENSE
└── .gitignore
```

## License

Released under the [MIT License](./LICENSE).
