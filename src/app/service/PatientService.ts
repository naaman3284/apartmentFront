// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, BehaviorSubject } from 'rxjs';
// import { tap } from 'rxjs/operators';
// // יצטרכו להיות לכם מודלים עבור בקשת כניסה ותגובת כניסה
// // לדוגמה: src/app/models/auth.model.ts
// // export interface LoginRequest { username: string; password: string; }
// // export interface LoginResponse { token: string; userId: number; role: string; }

// @Injectable({
//   providedIn: 'root' // שירות זה זמין לכל האפליקציה
// })
// export class patientService {
//   private apiUrl = 'https://localhost:7175/api/'; // שנה לכתובת ה-API האמיתית שלך ב-C#
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

//   // פונקציה לבדיקת סטטוס האימות מה-localStorage (לדוגמה)
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


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
// יצטרכו להיות לכם מודלים עבור בקשת כניסה ותגובת כניסה
// לדוגמה: src/app/models/auth.model.ts
// export interface LoginRequest { username: string; password: string; }
// export interface LoginResponse { token: string; userId: number; role: string; }

@Injectable({
  providedIn: 'root' // שירות זה זמין לכל האפליקציה
})
export class patientService { // שם הקלאס צריך להתחיל באות גדולה, אבל השארתי כפי שהיה בקוד המקורי שלך: PatientService
  // **חשוב: שנה את ה-API URL לכתובת הנכונה של ה-API שלך ב-C#.**
  // לדוגמה, אם ה-endpoint למטופלים הוא /api/Patients:
  private apiUrl = 'https://localhost:7175/api/Patients/'; 
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) { }

  // פונקציית Get (קבלת רשימת מטופלים)
  get(): Observable<any> { // החלף את `any` במודל Patient[] אם תטמיע מודל מלא למטופל
    return this.http.get<any>(this.apiUrl).pipe(
      tap(response => {
        console.log("Get Patients response:", response);
        // בהנחה שקבלת רשימת מטופלים אינה קשורה לאימות המשתמש, אולי תרצה להסיר את השורה הבאה
        // this.isAuthenticatedSubject.next(true); 
      })
    );
  }

  // פונקציית Put (עדכון מטופל) - תצטרך לקבל ID ואת אובייקט המטופל
  put(id: number, patientData: any): Observable<any> { // החלף ב-Patient Model
    return this.http.put<any>(`${this.apiUrl}${id}`, patientData).pipe(
      tap(response => {
        console.log("Put Patient response:", response);
        // this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // **תיקון: פונקציית Delete (מחיקת מטופל) - מקבלת ID ומעבירה אותו ל-URL**
  deletePatient(id: number): Observable<any> { // שינוי שם מ-`delete` ל-`deletePatient`
    return this.http.delete<any>(`${this.apiUrl}${id}`).pipe( // הוספת ה-ID ל-URL
      tap(response => {
        console.log("Delete Patient response:", response);
        // this.isAuthenticatedSubject.next(true); // זה כנראה לא רלוונטי כאן
      })
    );
  }

  // פונקציית Post (יצירת מטופל חדש) - תצטרך לקבל את אובייקט המטופל החדש
  post(patientData: any): Observable<any> { // החלף ב-Patient Model
    return this.http.post<any>(this.apiUrl, patientData).pipe(
      tap(response => {
        console.log("Post Patient response:", response);
        // this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // הערה: קטעי הקוד המודגשים מטה (login, logout וכו') הם הערות מקוריות בקוד שלך
  // אם אתה רוצה להשתמש בהם, תצטרך להסיר את ההערות ולדאוג לייבוא המודלים המתאימים.

  //   // פונקציה לבדיקת סטטוס האימות מה-localStorage (לדוגמה)
  //   private checkAuthenticationStatus(): void {
  //     const token = localStorage.getItem('authToken');
  //     this.isAuthenticatedSubject.next(!!token);
  //   }

  //   login(credentials: any): Observable<any> { // החלף ב-LoginRequest Model
  //     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe( // החלף ב-LoginResponse Model
  //       tap(response => {
  //         // שמור את הטוקן ב-localStorage או ב-sessionStorage
  //         localStorage.setItem('authToken', response.token);
  //         this.isAuthenticatedSubject.next(true);
  //       })
  //     );
  //   }

  //   logout(): void {
  //     localStorage.removeItem('authToken');
  //     this.isAuthenticatedSubject.next(false);
  //   }

  //   isAuthenticated(): boolean {
  //     return !!localStorage.getItem('authToken');
  //   }

  //   getToken(): string | null {
  //     return localStorage.getItem('authToken');
  //   }
}