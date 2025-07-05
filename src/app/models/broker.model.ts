// src/app/models/broker.model.ts

export interface Broker {
    name: string;
    phoneNumber: number; // שינוי ל-camelCase והמרת int ל-number
    email: string;
    address: string;     // שינוי מ-"Adress" ל-"address" (תיקון כתיב נפוץ ו-camelCase)
  
    // בהתאם למבנה ה-API שלך, סביר להניח שלמתווך יהיה גם ID.
    // אם זה DTO ליצירה בלבד, ייתכן שלא תצטרך ID כאן.
    // אם זה DTO שמגיע מהשרת (לדוגמה, בקריאה של GET), הוא כנראה יכלול ID.
    id?: number; // אופציונלי: הוסף אם המתווך מקבל/נשלח עם ID.
  }