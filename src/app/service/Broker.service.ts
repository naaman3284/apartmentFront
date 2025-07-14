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
export class BrokerService {
  private apiUrl = 'https://localhost:7175/api/'; // שנה לכתובת ה-API האמיתית שלך ב-C#
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
   
  }
  get(): Observable<any> { // החלף ב-LoginRequest Model
        return this.http.get<any>(`${this.apiUrl}`, {
            // headers:{'b\/'}
        }).pipe( // החלף ב-LoginResponse Model
            tap(response => {
                console.log(response)
                // שמור את הטוקן ב-localStorage או ב-sessionStorage
                this.isAuthenticatedSubject.next(true);
            })
        );
    }
     put(): Observable<any> { // החלף ב-LoginRequest Model
        return this.http.put<any>(`${this.apiUrl}`, {
            // headers:{'b\/'}
        }).pipe( // החלף ב-LoginResponse Model
            tap(response => {
                console.log(response)
                // שמור את הטוקן ב-localStorage או ב-sessionStorage
                this.isAuthenticatedSubject.next(true);
            })
        );
    }
    //  delete(): Observable<any> { // החלף ב-LoginRequest Model
    //     return this.http.delete<any>(`${this.apiUrl}`, {
    //         // headers:{'b\/'}
    //     }).pipe( // החלף ב-LoginResponse Model
    //         tap(response => {
    //             console.log(response)
    //             // שמור את הטוקן ב-localStorage או ב-sessionStorage
    //             this.isAuthenticatedSubject.next(true);
    //         })
    //     );
    // }
    // בקובץ השירות (לדוגמה: src/app/service/broker.service.ts, אם זה קשור לברוקרים)
// שימו לב: אם זו פונקציית DELETE כללית, ייתכן שתצטרכו לשקול שם אחר
// או להפוך אותה ליותר גנרית.

// כדי לתקן את השגיאה הנוכחית:
delete(id: number): Observable<any> { // שיניתי את השם ל-deleteBroker כדי שלא יתנגש עם delete כללי
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe( // הוספתי /${id} ל-URL
        tap(response => {
            console.log(response);
            // הקוד של this.isAuthenticatedSubject.next(true); נראה לא קשור לפונקציית מחיקה,
            // אלא יותר לפונקציית login. אולי תרצה להסיר אותו מכאן.
            // this.isAuthenticatedSubject.next(true); // שקול אם זה מתאים כאן
        })
    );
}
     post(): Observable<any> { // החלף ב-LoginRequest Model
        return this.http.post<any>(`${this.apiUrl}`, {
            // headers:{'b\/'}
        }).pipe( // החלף ב-LoginResponse Model
            tap(response => {
                console.log(response)
                // שמור את הטוקן ב-localStorage או ב-sessionStorage
                this.isAuthenticatedSubject.next(true);
            })
        );
    }
}

  // פונקציה לבדיקת סטטוס האימות מה-localStorage (לדוגמה)
//   private checkAuthenticationStatus(): void {
//     const token = localStorage.getItem('authToken');
//     this.isAuthenticatedSubject.next(!!token);
//   }

//   login(credentials: any): Observable<any> { // החלף ב-LoginRequest Model
//     return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe( // החלף ב-LoginResponse Model
//       tap(response => {
//         // שמור את הטוקן ב-localStorage או ב-sessionStorage
//         localStorage.setItem('authToken', response.token);
//         this.isAuthenticatedSubject.next(true);
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('authToken');
//     this.isAuthenticatedSubject.next(false);
//   }

//   isAuthenticated(): boolean {
//     return !!localStorage.getItem('authToken');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('authToken');
//   }
// }