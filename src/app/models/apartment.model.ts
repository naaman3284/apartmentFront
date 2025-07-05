// src/app/models/apartment.model.ts

export interface Apartment {
    // NumRooms (int) ב-C# הופך ל-numRooms (number) ב-TypeScript
    numRooms: number;
  
    // Floor (int) ב-C# הופך ל-floor (number) ב-TypeScript
    floor: number;
  
    // City (string) ב-C# הופך ל-city (string) ב-TypeScript
    city: string;
  
    // Amount (int) ב-C# הופך ל-amount (number) ב-TypeScript
    amount: number;
  
    // כפי שצוין קודם, אם לדירה יש ID ב-DB (וכנראה שכן)
    // וה-DTO הזה מגיע כחלק מאובייקט דירה מלא מה-API,
    // סביר להניח שתצטרך להוסיף גם את ה-ID.
    // למשל:
    id?: number; // אופציונלי, תלוי אם ה-API שלך מחזיר ID עם ה-DTO הזה
                 // או שמדובר ב-DTO לצורך יצירה בלבד ואז ה-ID ייווצר בשרת.
                 // אם ה-ID הוא חלק קבוע מכל דירה, הסר את סימן השאלה.
  }