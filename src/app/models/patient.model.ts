// src/app/models/patient.model.ts

export interface Patient {
    name: string;
    phoneNumber: number; // שינוי ל-camelCase והמרת int ל-number
    email: string;
    address: string;     // שינוי מ-"Adress" ל-"address" (תיקון כתיב נפוץ ו-camelCase)
  
    // כפי שצוין למעלה, סביר להניח שלמטופל יהיה גם ID.
    id?: number; // אופציונלי: הוסף אם המטופל מקבל/נשלח עם ID.
  }
