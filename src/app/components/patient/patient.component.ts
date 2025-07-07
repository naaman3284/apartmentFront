// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-patient',
// //   imports: [],
// //   templateUrl: './patient.component.html',
// //   styleUrl: './patient.component.scss'
// // })
// // export class PatientComponent {

// // }
// // src/app/patients/components/patient-list/patient-list.component.ts
// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { Observable, of } from 'rxjs';
// import { Patient } from '../../models/patient.model';
// import { patientService } from '../../service/PatientService';

// @Component({
//   selector: 'app-patient-list',
//   templateUrl: './patient.component.html',
//   styleUrls: ['./patient.component.scss'],
//   standalone: true,
//   imports: [
//     CommonModule
//   ]
// })
// export class PatientListComponent implements OnInit {
//   patients$: Observable<Patient[]> = of([]);
//   isLoading: boolean = true;
//   errorMessage: string | null = null;

//   constructor(private patientService: patientService) { }

//   ngOnInit(): void {
//     this.loadPatients();
//   }

//   loadPatients(): void {
//     this.isLoading = true;
//     this.errorMessage = null;
//     this.patients$ = this.patientService.get(); // קריאה לשירות הלקוחות

//     this.patients$.subscribe({
//       next: (data) => {
//         console.log('Patients loaded:', data);
//         this.isLoading = false;
//       },
//       error: (error) => {
//         console.error('Error loading patients:', error);
//         this.errorMessage = 'שגיאה בטעינת הלקוחות. אנא נסה שוב מאוחר יותר.';
//         this.isLoading = false;
//       }
//     });
//   }

//   editPatient(patient: Patient): void {
//     console.log('Edit patient:', patient);
//   }

//   deletePatient(id: number): void {
//     if (confirm('האם אתה בטוח שברצונך למחוק לקוח זה?')) {
//       this.patientService.(id).subscribe({
//         next: () => {
//           console.log('Patient deleted successfully');
//           this.loadPatients();
//         },
//         error: (error) => {
//           console.error('Error deleting patient:', error);
//           this.errorMessage = 'שגיאה במחיקת הלקוח.';
//         }
//       });
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http'; // **חשוב: הוספת ייבוא זה**

import { Observable, of } from 'rxjs';
import { Patient } from '../../models/patient.model';
import { patientService } from '../../service/PatientService'; // שים לב לשם הקטן patientService - וודא שהוא תואם לייבוא בפועל

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class PatientListComponent implements OnInit {
  patients$: Observable<Patient[]> = of([]);
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private patientService: patientService) { }

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients(): void {
    this.isLoading = true;
    this.errorMessage = null;
    this.patients$ = this.patientService.get(); // קריאה לשירות הלקוחות

    this.patients$.subscribe({
      next: (data) => {
        console.log('Patients loaded:', data);
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => { // **תיקון: הוספת טיפוס HttpErrorResponse**
        console.error('Error loading patients:', error);
        this.errorMessage = 'שגיאה בטעינת הלקוחות. אנא נסה שוב מאוחר יותר.';
        this.isLoading = false;
      }
    });
  }

  editPatient(patient: Patient): void {
    console.log('Edit patient:', patient);
    // לכאן תצטרך להוסיף לוגיקה לעריכת מטופל (למשל, ניווט לדף עריכה)
  }

  deletePatient(id: number): void {
    if (confirm('האם אתה בטוח שברצונך למחוק לקוח זה?')) {
      // **תיקון: קריאה נכונה לפונקציית המחיקה בסרביס**
      this.patientService.deletePatient(id).subscribe({ // קריאה לפונקציה ששמה 'deletePatient'
        next: () => {
          console.log('Patient deleted successfully');
          this.loadPatients(); // טען מחדש את רשימת הלקוחות לאחר המחיקה
        },
        error: (error: HttpErrorResponse) => { // **תיקון: הוספת טיפוס HttpErrorResponse**
          console.error('Error deleting patient:', error);
          this.errorMessage = 'שגיאה במחיקת הלקוח.';
        }
      });
    }
  }
}