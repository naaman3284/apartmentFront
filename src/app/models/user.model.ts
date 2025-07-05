// src/app/models/user.model.ts
export interface User {
  id: number;
  username: string;
  // password: string; // לא מומלץ לשמור סיסמה במודל בצד הלקוח אחרי הכניסה
  role: string; // לדוגמה: 'Admin' | 'Broker' | 'Client';
  // ... הוסף כאן שדות נוספים מתוך DTO המשתמש שלך ב-C# (כמו firstName, lastName, email, phoneNumber)
}

// ממשקים עבור בקשות ותגובות ספציפיות לאימות (כמו שכתבת ב-auth.service.ts)
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
  role: string; // לדוגמה: 'Admin' | 'Broker' | 'Client';
  username: string; // אולי תרצה גם את שם המשתמש בתגובה
}