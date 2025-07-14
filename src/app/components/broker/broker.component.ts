// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-broker',
//   imports: [],
//   templateUrl: './broker.component.html',
//   styleUrl: './broker.component.scss'
// })
// export class BrokerComponent {

// }
// src/app/brokers/components/broker-list/broker-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { Broker } from '../../models/broker.model';
import { BrokerService } from '../../service/Broker.service';

@Component({
  selector: 'app-broker-list',
  templateUrl: './broker.component.html',
  styleUrls: ['./broker.component.scss'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class BrokerListComponent implements OnInit {
  brokers$: Observable<Broker[]> = of([]);
  isLoading: boolean = true;
  errorMessage: string | null = null;

  constructor(private brokerService: BrokerService) { }

  ngOnInit(): void {
    this.loadBrokers();
  }

  loadBrokers(): void {
    this.isLoading = true;
    this.errorMessage = null;
    // this.brokers$ = this.brokerService.getToken\/(); // קריאה לשירות המתווכים

    this.brokers$.subscribe({
      next: (data) => {
        console.log('Brokers loaded:', data);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading brokers:', error);
        this.errorMessage = 'שגיאה בטעינת המתווכים. אנא נסה שוב מאוחר יותר.';
        this.isLoading = false;
      }
    });
  }

  editBroker(broker: Broker): void {
    console.log('Edit broker:', broker);
  }

  deleteBroker(id: number): void {
    if (confirm('האם אתה בטוח שברצונך למחוק מתווך זה?')) {
      this.brokerService.delete(id).subscribe({
        next: () => {
          console.log('Broker deleted successfully');
          this.loadBrokers();
        },
        error: (error:any) => {
          console.error('Error deleting broker:', error);
          this.errorMessage = 'שגיאה במחיקת המתווך.';
        }
      });
    }
  }
}