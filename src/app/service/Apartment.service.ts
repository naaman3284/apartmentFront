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
export class ApartmeneService {
    appartments: [] = [];
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
     delete(): Observable<any> { // החלף ב-LoginRequest Model
        return this.http.delete<any>(`${this.apiUrl}`, {
            // headers:{'b\/'}
        }).pipe( // החלף ב-LoginResponse Model
            tap(response => {
                console.log(response)
                // שמור את הטוקן ב-localStorage או ב-sessionStorage
                this.isAuthenticatedSubject.next(true);
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
