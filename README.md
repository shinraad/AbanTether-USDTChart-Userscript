# AbanTether USDT Chart Userscript

[فارسی](#فارسی) | [English](#english)

A small, open-source **Tampermonkey userscript** that changes the **client-side UI** of the USDT/IRT chart on AbanTether's fast-trade pages.

> **Disclaimer:** This project is independent and is **not affiliated with, endorsed by, or supported by AbanTether**. It locally hides a notice describing a regulatory restriction; it does **not** remove that restriction, grant access to unavailable market data, alter server responses, or guarantee chart accuracy. Respect applicable laws and the website's terms.

---

<div dir="rtl" align="right">

<h2 id="فارسی">فارسی</h2>

<h3>معرفی</h3>

<p>این پروژه یک UserScript برای <strong>Tampermonkey</strong> است که ظاهر نمودار تتر در صفحات معاملات سریع آبان‌تتر را <strong>فقط در مرورگر کاربر</strong> تغییر می‌دهد.</p>

<p><strong>آدرس هدف:</strong></p>

<pre dir="ltr"><code>https://abantether.ir/trade/fast?symbol=USDT</code></pre>

<p>اسکریپت برای آدرس‌هایی که مسیرشان با <code dir="ltr">/trade/fast</code> شروع شود فعال است؛ پارامترهایی مثل <code dir="ltr">?symbol=USDT</code> مانعی برای اجرا نیستند.</p>

<h3>عملکرد</h3>

<ol>
<li>عنصری را که حاوی iframe با عنوان <code dir="ltr">Financial Chart</code> است پیدا می‌کند.</li>
<li>کلاس‌های عنصر پیرامونی نمودار را از مقدار زیر:</li>
</ol>

<pre dir="ltr"><code>pointer-events-none h-full w-full select-none blur-[6px]</code></pre>

<p>به مقدار زیر تغییر می‌دهد و ویژگی <code dir="ltr">pointer-events: auto</code> را اعمال می‌کند:</p>

<pre dir="ltr"><code>pointer-events h-full w-full select</code></pre>

<ol start="3">
<li><strong>فقط</strong> لایه‌ای را حذف می‌کند که متن آن شامل «بنا به دستور نهاد ناظر» و «نمودار قیمت تتر» باشد.</li>
<li>با <code dir="ltr">MutationObserver</code> در صورت رندر مجدد عناصر، تغییرات را دوباره اعمال می‌کند.</li>
</ol>

<p><strong>محدوده اجرا:</strong> در هدر اسکریپت، مجوز اجرا برای <code dir="ltr">abantether.ir/*</code> و <code dir="ltr">www.abantether.ir/*</code> درخواست شده است تا مشکل شناسایی اسکریپت در Tampermonkey کاهش یابد؛ با این حال شرط داخلی کد، تغییر DOM را به مسیرهای شروع‌شونده با <code dir="ltr">/trade/fast</code> محدود می‌کند.</p>

<h3>نصب</h3>

<ol>
<li><a href="https://www.tampermonkey.net/">Tampermonkey</a> را روی مرورگر نصب کنید.</li>
<li>از داشبورد Tampermonkey گزینه <strong>Create a new script</strong> را انتخاب کنید.</li>
<li>محتوای فایل <a href="./abantether-chart.user.js"><code>abantether-chart.user.js</code></a> را کپی و جایگزین کد پیش‌فرض کنید.</li>
<li>با <code dir="ltr">Ctrl + S</code> ذخیره کنید و مطمئن شوید اسکریپت فعال است.</li>
<li>در مرورگرهایی که لازم است، مجوز <strong>Allow User Scripts</strong> و دسترسی افزونه به سایت را فعال کنید.</li>
<li>صفحه <a href="https://abantether.ir/trade/fast?symbol=USDT">معاملات سریع تتر</a> را باز کرده و بازخوانی (Refresh) کنید.</li>
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

This is a **Tampermonkey userscript** that modifies the USDT/IRT chart interface on AbanTether fast-trade pages **in your own browser only**.

**Example URL:**

```text
https://abantether.ir/trade/fast?symbol=USDT
```

The script targets paths beginning with `/trade/fast`, including URLs with query parameters such as `?symbol=USDT`.

### Features

1. Locates the chart by the iframe title `Financial Chart` (without relying on its changing ID).
2. Replaces the wrapper classes:

   ```text
   pointer-events-none h-full w-full select-none blur-[6px]
   ```

   with:

   ```text
   pointer-events h-full w-full select
   ```

   and sets `pointer-events: auto`.
3. Removes **only** an overlay whose text contains both `بنا به دستور نهاد ناظر` and `نمودار قیمت تتر`.
4. Uses a `MutationObserver` to reapply changes after dynamic DOM updates.

**Scope:** The userscript metadata matches both `abantether.ir/*` and `www.abantether.ir/*` to improve injection reliability. An additional runtime check ensures that DOM modifications happen only when the path starts with `/trade/fast`.

### Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/).
2. Open its dashboard and select **Create a new script**.
3. Replace the template with the contents of [`abantether-chart.user.js`](./abantether-chart.user.js).
4. Save with `Ctrl + S` and ensure the script is enabled.
5. Where required, enable your browser's **Allow User Scripts** setting and grant site access.
6. Open the [USDT fast-trade page](https://abantether.ir/trade/fast?symbol=USDT) and refresh.

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
