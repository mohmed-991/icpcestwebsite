# ICPC EST MINYA Training Platform


## الميزات الرئيسية

### 🔐 نظام المصادقة
- دخول عبر Codeforces API
- إدارة الملفات الشخصية
- تتبع التقدم والإنجازات

### 📚 المسارات التدريبية
- 15 مستوى تدريبي منظم
- دروس تفاعلية مع أمثلة
- مسائل برمجية متنوعة الصعوبة
- نظام تقييم تلقائي

### 🏆 لوحة المنافسة
- مسابقات يومية
- تصنيف الطلاب
- جوائز وإنجازات
- إحصائيات الأداء

### 👥 إدارة الفرق
- إنشاء وإدارة الفرق
- مسابقات الفرق
- تتبع أداء الفرق

### 📢 نظام الإعلانات
- إعلانات إدارية
- إشعارات مهمة
- جدولة المسابقات

## التقنيات المستخدمة

### Backend
- **Laravel 11** - PHP Framework
- **MySQL** - قاعدة البيانات
- **RESTful APIs** - للتفاعل مع الواجهة الأمامية

### Frontend
- **React** - مكتبة JavaScript للواجهة الأمامية
- **Material-UI** - مكونات واجهة المستخدم
- **Axios** - للتواصل مع APIs

## هيكل قاعدة البيانات

### الجداول الرئيسية
- `users` - بيانات المستخدمين
- `levels` - المستويات التدريبية
- `lessons` - الدروس
- `problems` - المسائل البرمجية
- `user_solutions` - حلول المستخدمين
- `teams` - الفرق
- `announcements` - الإعلانات
- `attendance` - الحضور
- `daily_challenges` - التحديات اليومية

## التثبيت والتشغيل

### متطلبات النظام
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- Git

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone https://github.com/your-repo/icpc-platform.git
cd icpc-platform
```

2. **تثبيت التبعيات**
```bash
composer install
npm install
```

3. **إعداد قاعدة البيانات**
```bash
cp .env.example .env
php artisan key:generate
```

4. **تحديث ملف .env**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=icpc_project
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

5. **تشغيل الهجرات**
```bash
php artisan migrate
```

6. **إضافة البيانات التجريبية**
```bash
php artisan db:seed
```

7. **تشغيل الخادم**
```bash
php artisan serve
npm run dev
```

## البيانات التجريبية

تم إضافة البيانات التجريبية التالية:
- **15 مستوى تدريبي** من المبتدئ إلى المتقدم
- **9 دروس** تغطي المواضيع الأساسية
- **9 مسائل برمجية** مع حلول
- **مستخدم تجريبي** للاختبار

## المساهمة

نرحب بالمساهمات! يرجى اتباع الخطوات التالية:

1. Fork المشروع
2. إنشاء فرع للميزة (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - راجع ملف [LICENSE](LICENSE) للتفاصيل.

## التواصل

- **المطور**: [اسمك]
- **البريد الإلكتروني**: your-email@example.com
- **الجامعة**: كلية الهندسة - جامعة مصر للعلوم والتكنولوجيا

---

**ملاحظة**: هذا المشروع قيد التطوير النشط. سيتم إضافة المزيد من الميزات والتحسينات قريباً.

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
