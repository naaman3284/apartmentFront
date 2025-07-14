// import { Injectable, signal } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { User } from '../models/user.model';
// // יצטרכו להיות לכם מודלים עבור בקשת כניסה ותגובת כניסה
// // לדוגמה: src/app/models/auth.model.ts
// // export interface LoginRequest { username: string; password: string; }
// // export interface LoginResponse { token: string; userId: number; role: string; }

// @Injectable({
//   providedIn: 'root' // שירות זה זמין לכל האפליקציה
// })
// export class AuthService {

//   user = signal<User | null>(null)

//   private apiUrl = 'https://localhost:7175/swagger/api'; // שנה לכתובת ה-API האמיתית שלך ב-C#
//   private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
//   isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

//   constructor(private http: HttpClient) {
    
//   }

//   get(): Observable<any> { // החלף ב-LoginRequest Model
//         return this.http.get<any>(`${this.apiUrl}`, {
//             // headers:{'b\/'}
//         }).pipe( // החלף ב-LoginResponse Model
//             tap(response => {
//                 console.log(response)
//                 // שמור את הטוקן ב-localStorage או ב-sessionStorage
//                 this.isAuthenticatedSubject.next(true);
//             })
//         );
//     }
//      put(): Observable<any> { // החלף ב-LoginRequest Model
//         return this.http.put<any>(`${this.apiUrl}`, {
//             // headers:{'b\/'}
//         }).pipe( // החלף ב-LoginResponse Model
//             tap(response => {
//                 console.log(response)
//                 // שמור את הטוקן ב-localStorage או ב-sessionStorage
//                 this.isAuthenticatedSubject.next(true);
//             })
//         );
//     }
//      delete(): Observable<any> { // החלף ב-LoginRequest Model
//         return this.http.delete<any>(`${this.apiUrl}`, {
//             // headers:{'b\/'}
//         }).pipe( // החלף ב-LoginResponse Model
//             tap(response => {
//                 console.log(response)
//                 // שמור את הטוקן ב-localStorage או ב-sessionStorage
//                 this.isAuthenticatedSubject.next(true);
//             })
//         );
//     }
//      post(): Observable<any> { // החלף ב-LoginRequest Model
//         return this.http.post<any>(`${this.apiUrl}`, {
//             // headers:{'b\/'}
//         }).pipe( // החלף ב-LoginResponse Model
//             tap(response => {
//                 console.log(response)
//                 // שמור את הטוקן ב-localStorage או ב-sessionStorage
//                 this.isAuthenticatedSubject.next(true);
//             })
//         );
//     }
// }


// //   // פונקציה לבדיקת סטטוס האימות מה-localStorage (לדוגמה)
// //   private checkAuthenticationStatus(): void {
// //     const token = localStorage.getItem('authToken');
// //     this.isAuthenticatedSubject.next(!!token);
// //   }

// //   login(credentials: any): Observable<any> { // החלף ב-LoginRequest Model
// //     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe( // החלף ב-LoginResponse Model
// //       tap(response => {
// //         // שמור את הטוקן ב-localStorage או ב-sessionStorage
// //         localStorage.setItem('authToken', response.token);
// //         this.isAuthenticatedSubject.next(true);
// //       })
// //     );
// //   }

// //   logout(): void {
// //     localStorage.removeItem('authToken');
// //     this.isAuthenticatedSubject.next(false);
// //   }

// //   isAuthenticated(): boolean {
// //     return !!localStorage.getItem('authToken');
// //   }

// //   getToken(): string | null {
// //     return localStorage.getItem('authToken');
// //   }
// // }


import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model'; // וודא שהנתיב לקובץ user.model.ts נכון

// יצטרכו להיות לכם מודלים עבור בקשת כניסה ותגובת כניסה
// לדוגמה: src/app/models/auth.model.ts
// ודא שאתה יוצר את הקבצים האלה אם הם עדיין לא קיימים
export interface LoginRequest { 
  username?: string; // הוספתי ? כי לא בטוח אם הם חובה
  password?: string; // הוספתי ? כי לא בטוח אם הם חובה
}
export interface LoginResponse { 
  token: string; 
  userId: number; 
  role: string; 
  // הוסף כאן שדות נוספים שאתה מצפה לקבל מהשרת בתגובת ההתחברות
}

@Injectable({
  providedIn: 'root' // שירות זה זמין לכל האפליקציה
})
export class AuthService {

  user = signal<User | null>(null); // שימוש ב-Signal עבור מצב משתמש

  // שנה לכתובת ה-API האמיתית שלך ב-C#
  // אם אתה מריץ על אותה מכונה, localhost עשוי לעבוד, אבל תלוי איך ה-C# API מוגדר
  private apiUrl = 'https://localhost:7175/api'; // שיניתי את הנתיב מ-swagger/api לרוב זה פשוט /api
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    // בדוק סטטוס אימות בעת טעינת השירות (לדוגמה, אם יש טוקן שמור)
    this.checkAuthenticationStatus();
  }

  // פונקציה לבדיקת סטטוס האימות מה-localStorage
  private checkAuthenticationStatus(): void {
    const token = localStorage.getItem('authToken');
    this.isAuthenticatedSubject.next(!!token);
  }

  // שיטות HTTP בסיסיות
  // מומלץ למצוא שם מתאים יותר לפונקציות אלה מאשר get/put/delete/post כלליות
  // ולכלול פרמטרים מתאימים לכל בקשה.
  
  get(): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}`).pipe( 
      tap((response: any) => { // טיפוסיות 'any' כדי להשתיק את אזהרת TS7006
        console.log(response);
      })
    );
  }
  
  put(data: any): Observable<any> { // הוספתי פרמטר data ל-PUT
    return this.http.put<any>(`${this.apiUrl}`, data).pipe( // שלח את ה-data בבקשת ה-PUT
      tap((response: any) => {
        console.log(response);
      })
    );
  }
  
  delete(id: number): Observable<any> { // הוספתי פרמטר id ל-DELETE (לרוב מוחקים לפי ID)
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe( 
      tap((response: any) => {
        console.log(response);
      })
    );
  }
  
  post(data: any): Observable<any> { // הוספתי פרמטר data ל-POST
    return this.http.post<any>(`${this.apiUrl}`, data).pipe( 
      tap((response: any) => {
        console.log(response);
      })
    );
  }

  /**
   * פונקציית התחברות
   * @param credentials אובייקט עם שם משתמש וסיסמה (או LoginRequest)
   * @returns Observable של תגובת השרת (או LoginResponse)
   */
  login(credentials: LoginRequest): Observable<LoginResponse> { 
    // שימו לב: נתיב ה-API ל-login צריך להיות מדויק.
    // ברוב המקרים זה יהיה 'api/login' או 'api/auth/login'
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe( 
      tap((response: LoginResponse) => { // טיפוסיות LoginResponse
        // שמור את הטוקן ב-localStorage או ב-sessionStorage
        localStorage.setItem('authToken', response.token);
        this.isAuthenticatedSubject.next(true);
        // ייתכן ותרצו גם לשמור את פרטי המשתמש כאן ב-signal
        // לדוגמה: this.user.set(response.user); אם ה-API מחזיר גם אובייקט user
      })
    );
  }

  /**
   * פונקציית התנתקות
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.isAuthenticatedSubject.next(false);
    this.user.set(null); // נקה את פרטי המשתמש ב-Signal
  }

  /**
   * בודק אם המשתמש מאומת (על בסיס קיום טוקן)
   * @returns true אם המשתמש מאומת, false אחרת
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * מחזיר את הטוקן השמור
   * @returns הטוקן כשורה, או null אם אינו קיים
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}