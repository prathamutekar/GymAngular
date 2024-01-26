import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-bmi-calculator',
  templateUrl: './bmi-calculator.component.html',
  styleUrls: ['./bmi-calculator.component.css'],
  providers: [MessageService]
})
export class BmiCalculatorComponent {

  calculatedBMI: number = 0;
  weightStatus: string = '';

  highlightedRowIndex: number | null = null;

  constructor(private fb: FormBuilder, private router: Router, private messageService: MessageService, private global: GlobalService) { }

  BMIForm = this.fb.group({
    height: ["", Validators.required],
    weight: ["", Validators.required],
    age: ["", Validators.required],
    sex: ["", Validators.required],
  })

  calculateBMI() {
    if (this.BMIForm.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter valid values for height, weight, age, and sex.'
      });
      return;
    }

    // Perform BMI calculation here based on height and weight
    const height = this.BMIForm.get('height')?.value; // Use optional chaining
    const weight = this.BMIForm.get('weight')?.value; // Use optional chaining

    // Check if height and weight are not null or undefined
    if (height == null || weight == null) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Please enter valid values for height and weight.'
      });
      return;
    }

    this.calculatedBMI = +weight / ((+height / 100) ** 2); // Use '+' to convert string to number

    // Determine weight status based on calculated BMI
    this.determineWeightStatus();

    // Determine highlighted row index
    this.highlightedRowIndex = this.determineHighlightedRowIndex();

    // Show the toast message
    if (this.calculatedBMI >= 18.5 && this.calculatedBMI <= 24.9) {
      this.messageService.add({
        severity: 'success',
        summary: 'BMI Calculation',
        detail: `Your BMI is ${this.calculatedBMI.toFixed(2)} - ${this.weightStatus}`
      });
    } else {
      this.messageService.add({
        severity: 'info',
        summary: 'BMI Calculation',
        detail: `Your BMI is ${this.calculatedBMI.toFixed(2)} - ${this.weightStatus}`
      });
    }
    this.BMIForm.reset();
    this.BMIForm.controls['sex'].setValue('')
  }

  determineWeightStatus(): void {
    if (this.calculatedBMI < 18.5) {
      this.weightStatus = 'Underweight';
    } else if (this.calculatedBMI >= 18.5 && this.calculatedBMI <= 24.9) {
      this.weightStatus = 'Healthy';
    } else if (this.calculatedBMI >= 25 && this.calculatedBMI <= 29.9) {
      this.weightStatus = 'Overweight';
    } else {
      this.weightStatus = 'Obese';
    }
  }

  determineHighlightedRowIndex(): number | null {
    if (this.calculatedBMI < 18.5) {
      return 0; // Index of 'Underweight' row
    } else if (this.calculatedBMI >= 18.5 && this.calculatedBMI <= 24.9) {
      return 1; // Index of 'Healthy' row
    } else if (this.calculatedBMI >= 25 && this.calculatedBMI <= 29.9) {
      return 2; // Index of 'Overweight' row
    } else {
      return 3; // Index of 'Obese' row
    }
  }

  navigateTo(val: any) {
    this.router.navigate([val]);
    this.global.actTab = val;
    sessionStorage.setItem('userActiveTab', val)
  }

}
