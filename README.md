# AbanTether USDT Chart UI Fix

A lightweight Tampermonkey userscript for client-side UI adjustments to AbanTether's USDT chart and price display.

**Version:** `1.2.0`

## Features

- Restores the visibility of TradingView charts by adjusting chart blur and overlay elements.
- Supports the USDT fast-trade and coin information pages.
- Removes the visual blur from restricted price labels using CSS overrides.
- Hides price-related login tooltips.
- Attempts to make price text selectable and prevent login-triggering click interactions.
- Automatically reapplies chart adjustments when the page dynamically renders new content.
- Runs entirely in the browser.

## Supported Pages

- `https://abantether.ir/trade/fast?symbol=USDT`
- `https://abantether.ir/coin/USDT`

Both `abantether.ir` and `www.abantether.ir` are covered by the userscript metadata.

## Installation

1. Install the Tampermonkey browser extension.
2. Open the `abantether-chart.user.js` file in this repository.
3. Click **Raw** or copy the complete script.
4. Create a new script in Tampermonkey and paste the code.
5. Save the script and enable it.
6. Refresh one of the supported pages.

## How It Works

The userscript uses CSS overrides to modify the presentation of restricted price elements without removing their underlying HTML nodes.

It also identifies chart wrappers and restriction overlays and adjusts them directly. A `MutationObserver` helps reapply these changes when the website updates its DOM.

## Limitations

- This project changes the browser UI only.
- It does not modify server-side permissions, account authentication, API responses, or trading data.
- The script depends on the website's current HTML structure and CSS classes.
- Text selection and click interception may behave differently depending on browser and website changes.
- TradingView datafeed errors, including time-order violations, are outside the scope of this project.
- Displayed information should not be treated as independently verified market data.

## Disclaimer

This is an independent, unofficial project and is not affiliated with, endorsed by, or maintained by AbanTether.

Use at your own discretion.

---

<div dir="rtl" align="right">

# اصلاح رابط کاربری نمودار تتر آبان‌تتر

اسکریپت سبک Tampermonkey برای اصلاح نمایش نمودار تتر و برخی بخش‌های نمایش قیمت در وب‌سایت آبان‌تتر.

**نسخه: `1.2.0`**

## قابلیت‌ها

- اصلاح نمایش نمودار TradingView از طریق حذف تاری و لایه پوشاننده.
- پشتیبانی از صفحه معاملات سریع و صفحه اختصاصی تتر.
- حذف ظاهری تاری برچسب‌های قیمت با استفاده از CSS.
- مخفی کردن پیام‌های راهنمای ورود به حساب کاربری در محدوده قیمت.
- تلاش برای فراهم‌کردن امکان انتخاب متن قیمت و جلوگیری از برخی رویدادهای کلیک.
- اعمال مجدد اصلاحات نمودار هنگام به‌روزرسانی محتوای صفحه.
- اجرای تغییرات صرفاً در مرورگر کاربر.

## صفحات پشتیبانی‌شده

- `https://abantether.ir/trade/fast?symbol=USDT`
- `https://abantether.ir/coin/USDT`

## روش نصب

۱. افزونه Tampermonkey را روی مرورگر نصب کنید.

۲. فایل `abantether-chart.user.js` را از همین مخزن باز کنید.

۳. محتوای فایل را در یک اسکریپت جدید Tampermonkey قرار دهید.

۴. اسکریپت را ذخیره و فعال کنید.

۵. صفحه موردنظر در آبان‌تتر را بارگذاری مجدد کنید.

## نکات فنی

این نسخه به‌جای حذف مستقیم ساختار HTML مربوط به قیمت، از بازنویسی قوانین CSS استفاده می‌کند.

در بخش نمودار، لایه تارکننده و پوشاننده به‌صورت مستقیم اصلاح می‌شوند.

برای مدیریت تغییرات پویای صفحه نیز از `MutationObserver` استفاده شده است.

## محدودیت‌ها

- اسکریپت فقط رابط کاربری مرورگر را تغییر می‌دهد.
- مجوزهای سرور، اطلاعات حساب، پاسخ API و داده‌های معاملات را تغییر نمی‌دهد.
- عملکرد آن به ساختار فعلی وب‌سایت وابسته است.
- انتخاب متن و جلوگیری از باز شدن پنجره ورود ممکن است در شرایط مختلف یکسان عمل نکند.
- خطاهای داده‌ای TradingView، از جمله ناهماهنگی زمانی کندل‌ها، توسط این اسکریپت اصلاح نمی‌شوند.
- نمایش نمودار به معنای تأیید مستقل صحت قیمت‌ها نیست.

## سلب مسئولیت

این پروژه مستقل و غیررسمی است و هیچ وابستگی یا تأییدی از طرف آبان‌تتر ندارد.

استفاده از آن بر عهده کاربر است.

</div>