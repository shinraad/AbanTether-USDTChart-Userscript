# AbanTether USDT Chart Userscript

[فارسی](#فارسی) | [English](#english)

A small, open-source **Tampermonkey userscript** that changes the **client-side UI** of the USDT/IRT chart on AbanTether's fast-trade pages.

> **Disclaimer:** This project is independent and is **not affiliated with, endorsed by, or supported by AbanTether**. It locally hides a notice describing a regulatory restriction; it does **not** remove that restriction, grant access to unavailable market data, alter server responses, or guarantee chart accuracy. Respect applicable laws and the website's terms.

---

## فارسی

### معرفی

این پروژه یک UserScript برای **Tampermonkey** است که ظاهر نمودار تتر در صفحات معاملات سریع آبان‌تتر را **فقط در مرورگر کاربر** تغییر می‌دهد.

**آدرس هدف:**

```text
https://abantether.ir/trade/fast?symbol=USDT
```

اسکریپت برای آدرس‌هایی که مسیرشان با `/trade/fast` شروع شود فعال است؛ پارامترهای Query مانند `?symbol=USDT` مانعی برای اجرا نیستند.

### عملکرد

1. عنصری را که حاوی iframe با عنوان `Financial Chart` است پیدا می‌کند.
2. کلاس‌های wrapper نمودار را از:

   ```text
   pointer-events-none h-full w-full select-none blur-[6px]
   ```

   به:

   ```text
   pointer-events h-full w-full select
   ```

   تغییر می‌دهد و `pointer-events: auto` را اعمال می‌کند.
3. **فقط** لایه‌ای را حذف می‌کند که متن آن شامل «بنا به دستور نهاد ناظر» و «نمودار قیمت تتر» باشد.
4. با `MutationObserver` در صورت رندر مجدد عناصر، تغییرات را دوباره اعمال می‌کند.

**محدوده اجرا:** در هدر اسکریپت، مجوز اجرا برای `abantether.ir/*` و `www.abantether.ir/*` درخواست شده است تا مشکل شناسایی اسکریپت در Tampermonkey کاهش یابد؛ با این حال شرط داخلی کد، هرگونه تغییر DOM را به مسیرهای شروع‌شونده با `/trade/fast` محدود می‌کند.

### نصب

1. [Tampermonkey](https://www.tampermonkey.net/) را روی مرورگر نصب کنید.
2. از داشبورد Tampermonkey گزینه **Create a new script** را انتخاب کنید.
3. محتوای فایل [`abantether-chart.user.js`](./abantether-chart.user.js) را کپی و جایگزین کد پیش‌فرض کنید.
4. با `Ctrl + S` ذخیره کنید و مطمئن شوید اسکریپت فعال است.
5. در مرورگرهایی که لازم است، مجوز **Allow User Scripts** و دسترسی افزونه به سایت را فعال کنید.
6. صفحه [معاملات سریع تتر](https://abantether.ir/trade/fast?symbol=USDT) را باز کرده و Refresh کنید.

### عیب‌یابی

- اگر اسکریپت در فهرست Tampermonkey برای صفحه نشان داده نمی‌شود، وضعیت فعال بودن افزونه، **Site access** و **Allow User Scripts** را بررسی کنید.
- اگر اسکریپت فعال است اما نتیجه‌ای دیده نمی‌شود، ممکن است ساختار HTML یا متن لایه سایت تغییر کرده باشد.
- برای مشاهده گزارش‌ها مقدار `DEBUG` را در فایل JavaScript برابر `true` قرار دهید و Console مرورگر را بررسی کنید.
- خطاهای دریافت داده، احراز هویت و ترتیب زمانی TradingView با تغییر DOM رفع نمی‌شوند.

### محدودیت‌ها

- این ابزار فقط رابط کاربری محلی را تغییر می‌دهد؛ **هیچ درخواستی به API ارسال یا دستکاری نمی‌کند**.
- حذف لایه هشدار به معنی رفع محدودیت اعلام‌شده یا در دسترس بودن داده‌ها نیست.
- تغییرات احتمالی سایت ممکن است باعث توقف عملکرد اسکریپت شوند.
- این پروژه توصیه مالی یا معاملاتی نیست.

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
