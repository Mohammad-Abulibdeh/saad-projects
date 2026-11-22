# Saad Projects | مشاريع سعد 🧰

مجموعة مشاريع صغيرة متنوعة — مساعد صوتي، مشغّل أناشيد، متجر إلكتروني، ومشاريع متحكّمات (Arduino / ESP32). كل مشروع بمجلد لحاله.

```
saad-projects/
├── voice-assistant/        مساعد صوتي ثنائي اللغة (كلام ↔ كلام)
├── nasheed-player/         موقع مشغّل أناشيد
├── ecommerce-store/        متجر إلكتروني بسيط (Supabase)
└── microcontroller/        مشاريع Arduino و ESP32
    ├── arduino-water-sensor/
    ├── esp32-led/
    └── servo/
```

> 🔑 كل المفاتيح وكلمات السر (Wi-Fi، Supabase) **انشالت من الكود** وصارت قيم مكان (placeholders). بدّلها بقيمك قبل التشغيل.

---

## 🎙️ voice-assistant — مساعد صوتي ثنائي اللغة

برنامج Python بيسمعك وبيحكي معك، بيدعم **العربي والإنجليزي** تلقائياً:

- بياخد صوتك من المايكروفون ويحوّله نص (`SpeechRecognition` + Google).
- بيحاول يتعرّف على الكلام بالعربي والإنجليزي، وبيعطي الأولوية للعربي إذا لقي حروف عربية.
- بيكتشف لغة النص (`langdetect`).
- بيردّ صوتياً عبر **Edge TTS** (صوت `ar-SA-HamedNeural` للعربي و `en-US-GuyNeural` للإنجليزي) ويشغّله بـ `pygame`.

```bash
pip install SpeechRecognition edge-tts pygame langdetect pyaudio
python voice-assistant/audio_controller.py
```

---

## 🎵 nasheed-player — مشغّل أناشيد

موقع ويب (HTML/CSS/JS) لتشغيل الأناشيد مع:
- أزرار تشغيل/إيقاف، التالي/السابق، إعادة، كتم، وتكرار.
- شريط تقدّم ووقت، وتحكّم بمستوى الصوت.
- عرض كلمات النشيد وصورة الغلاف.

افتح `nasheed-player/index.html` بالمتصفح. ملفات الصوت بمجلد `audio/` والصور بمجلد `images/`.

---

## 🛒 ecommerce-store — متجر إلكتروني

متجر بسيط بيستخدم **Supabase** كقاعدة بيانات:
- صفحة رئيسية بتعرض المنتجات من جدول `products`.
- لوحة أدمن (`admin-login.html` → `admin-dashboard.html`) لإضافة منتجات وتعديل إعدادات الموقع.
- عند الشراء بيفتح رسالة واتساب فيها اسم المنتج والسعر وموقعك (GPS).

**الإعداد:** عدّل `supabaseUrl` و `supabaseKey` في `app.js`، وأنشئ جدولَي `products` و `admin_settings`.

> ⚠️ **تنبيه أمني مهم:** النسخة الحالية بتقرا كلمة سر الأدمن من جدول `admin_settings` باستخدام مفتاح الـ anon من المتصفح — يعني أي حدا بيقدر يقرا كلمة السر. قبل أي استخدام حقيقي:
> - فعّل **Row Level Security (RLS)** على جداولك.
> - لا تخزّن كلمة سر الأدمن بجدول يُقرأ من العميل؛ استخدم Supabase Auth بدلها.

---

## 🔧 microcontroller — مشاريع متحكّمات

### arduino-water-sensor
حسّاس مستوى ماء مع شاشة **LCD 16×2** وجرس (Piezo). لما يكتشف ماء بيطلّع صوت وبيكتب "Water detected!" على الشاشة.
- حساس الماء: Pin 7 · الجرس: Pin 8 · LCD: Pins 12, 11, 5, 4, 3, 2

### esp32-led
**ESP32** بيعمل خادم ويب صغير. بتفتح `http://<ESP32-IP>/toggle` من المتصفح لتشغيل/إطفاء LED على Pin 2.
- حط اسم شبكة الـ Wi-Fi وكلمة سرها مكان `YOUR_WIFI_SSID` / `YOUR_WIFI_PASSWORD`.

### servo
تحكّم بسيط بموتور سيرفو على Arduino.

---

## 🧰 التقنيات

- **Python:** SpeechRecognition، edge-tts، pygame، langdetect
- **Web:** HTML / CSS / JavaScript، Supabase
- **Embedded:** Arduino (LiquidCrystal)، ESP32 (WiFi + WebServer)

## ⚠️ ملاحظات

- **لو كنت تستخدم أي من المفاتيح أو كلمات السر القديمة** (كلمة سر الـ Wi-Fi، مفتاح Supabase) فهي ظهرت سابقاً داخل الكود — يُفضّل تغييرها.
- بعض الملفات الأصلية (خطوط عبرية منزّلة، ملفات صوت مؤقتة من TTS، ومستند Word) ما انرفعت للمستودع لأنها مش جزء من الكود.
