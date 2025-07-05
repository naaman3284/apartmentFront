// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-header',
// //   imports: [],
// //   templateUrl: './header.component.html',
// //   styleUrl: './header.component.scss'
// // })
// // export class HeaderComponent {

// // }
// // src/app/core/components/home/home.component.ts
// import { Component, OnInit } from '@angular/core';
// import { Router, RouterModule } from '@angular/router'; // ייבוא לניתוב
// import { CommonModule } from '@angular/common'; // לשימוש ב-ngIf, ngFor (אם יהיה צורך)
// import { AuthService } from '../../service/auth.service';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
//   standalone: true, // חשוב: הגדרת הקומפוננטה כ-standalone
//   imports: [
//     CommonModule,
//     RouterModule // מאפשר שימוש ב-routerLink ב-HTML
//   ]
// })
// export class HomeComponent  {
//   userRole: string | null = null; // לשמירת תפקיד המשתמש המחובר

//   constructor(private router: Router, private authService: AuthService) { }

//   navigateTo(path: string): void {
//     this.router.navigate([path]);
//   }

//   logout(): void {
//     this.authService.logout();
//     this.router.navigate(['/login']); // ניתוב לדף ההתחברות לאחר יציאה
//   }
// }
// src/app/core/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // לשימוש ב-ngIf
import { RouterModule } from '@angular/router'; // לשימוש ב-routerLink
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true, // הגדרת הקומפוננטה כ-standalone
  imports: [
    CommonModule,
    RouterModule // חיוני לשימוש ב-routerLink
  ]
})
export class HeaderComponent  {
  isLoggedIn: boolean = false; // מצב התחברות
  userRole: string | null = null; // תפקיד המשתמש

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
    // הניתוב לדף הלוגין יתבצע אוטומטית כי ה-HomeComponent או Root Component מנתבים
  }
}