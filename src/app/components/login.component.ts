// src/app/auth/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // ייבוא לטפסים ריאקטיביים
import { CommonModule } from '@angular/common'; // נדרש לדירקטיבות כמו *ngIf
import { Router, RouterModule } from '@angular/router'; // לייבוא ניתוב
import { HttpErrorResponse } from '@angular/common/http'; // לטיפול בשגיאות HTTP
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../models/user.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: true, // חשוב: הגדרת הקומפוננטה כ-standalone
    imports: [
        CommonModule,
        ReactiveFormsModule, // הוסף את זה עבור טפסים ריאקטיביים
        RouterModule // הוסף את זה עבור RouterLink (אם תשתמש בקישור הרשמה)
    ]
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup; // סימן קריאה כדי לציין שהוא יאותחל ב-ngOnInit
    errorMessage: string | null = null;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.loginForm = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onSubmit(): void {
        this.errorMessage = null; // איפוס הודעת שגיאה

        if (this.loginForm.valid) {
            const loginRequest: LoginRequest = this.loginForm.value;
            this.authService.login(loginRequest).subscribe({
                next: (response) => {
                    // בדיקה האם ה-token וה-role קיימים בתגובה
                    if (response.token && response.role) {
                        // ה-AuthService כבר שומר את הטוקן, אז רק ננווט
                        console.log('Login successful', response);
                        // this.router.navigate([`/${response.role.toLowerCase()}/dashboard`]); // או נתיב מתאים

                        // ניתוב מבוסס תפקיד
                        switch (response.role.toLowerCase()) { // ודא שאתה משווה ל-lowercase כדי למנוע בעיות case-sensitivity
                            case 'admin':
                                this.router.navigate([`/admin/dashboard`]); // או נתיב מתאים
                                break;
                            case 'broker':
                                this.router.navigate(['/brokers/dashboard']); // או נתיב מתאים
                                break;
                            case 'patient': // או patient כפי שהגדרת את ה-DTO
                                this.router.navigate(['/patients/dashboard']); // או נתיב מתאים
                                break;
                            default:
                                this.router.navigate(['/']); // ניתוב ברירת מחדל או הודעת שגיאה
                                break;
                        }
                    } else {
                        this.errorMessage = 'Login failed: Invalid response from server.';
                    }
                },
                error: (error: HttpErrorResponse) => {
                    console.error('Login failed:', error);
                    if (error.status === 401) { // Unauthorized
                        this.errorMessage = 'שם משתמש או סיסמה שגויים.';
                    } else if (error.status === 400) { // Bad Request
                        this.errorMessage = error.error?.message || 'בקשה שגויה. אנא בדוק את הנתונים.';
                    }
                    else {
                        this.errorMessage = 'אירעה שגיאה בעת ההתחברות. אנא נסה שוב מאוחר יותר.';
                    }
                }
            });
        } else {
            this.errorMessage = 'אנא הזן שם משתמש וסיסמה.';
        }
    }
}