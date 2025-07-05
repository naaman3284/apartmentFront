// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-apartment',
//   imports: [],
//   templateUrl: './apartment.component.html',
//   styleUrl: './apartment.component.scss'
// })
// export class ApartmentComponent {

// }
// src/app/apartments/components/apartment-list/apartment-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // נדרש ל-*ngFor, *ngIf

import { Observable, of } from 'rxjs'; // להשתמש ב-Observable
import { Apartment } from '../../models/apartment.model';
import { ApartmeneService } from '../../service/Apartment.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss'],
  standalone: true, // חשוב: הגדרת הקומפוננטה כ-standalone
  imports: [
    CommonModule // הוסף את CommonModule
  ]
})
export class ApartmentListComponent implements OnInit {
  apartments$: Observable<Apartment[]> = of([]); // רשימת הדירות כ-Observable
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private apartmentService: ApartmeneService) { }

  ngOnInit(): void {
    this.loadApartments();
  }

  loadApartments(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.apartments$ = this.apartmentService.get(); // קריאה לשירות הדירות

    this.apartments$.subscribe({
      next: (data) => {
        console.log('Apartments loaded:', data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading apartments:', error);
        this.errorMessage = 'שגיאה בטעינת הדירות. אנא נסה שוב מאוחר יותר.';
        this.isLoading = false;
      }
    });
  }

  // פונקציות לעריכה/מחיקה יתווספו כאן בעתיד
  editApartment(apartment: Apartment): void {
    console.log('Edit apartment:', apartment);
    // לכאן יגיע קוד ניתוב לדף עריכה או פתיחת מודאל
  }

  deleteApartment(id: number): void {
    if (confirm('האם אתה בטוח שברצונך למחוק דירה זו?')) {
      this.apartmentService.delete().subscribe({
        next: () => {
          console.log('Apartment deleted successfully');
          this.loadApartments(); // רענן את הרשימה לאחר המחיקה
        },
        error: (error) => {
          console.error('Error deleting apartment:', error);
          this.errorMessage = 'שגיאה במחיקת הדירה.';
        }
      });
    }
  }
}
