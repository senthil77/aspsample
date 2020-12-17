import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  template: `
 
<div class="container"   novalidate>
    <form [formGroup]="form" (ngSubmit)="submit(form)">
      <h1 mat-dialog-title>Add file</h1>
      <mat-dialog-content>
      <mat-form-field class="form-element">
          <input matInput formControlName="name" placeholder="Enter name">
        </mat-form-field>
        <mat-form-field class="form-element">
        <input matInput formControlName="id" placeholder="Enter id">
      </mat-form-field>
      <mat-form-field class="form-element">
      <input matInput formControlName="chargedAtId" placeholder="Enter chargedAtId">
    </mat-form-field>
 
      </mat-dialog-content>
      <mat-dialog-actions>
        <button mat-button type="submit">Add</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </mat-dialog-actions>
    </form>
   
  `
})
export class FileNameDialogComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FileNameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: this.data.name,

      chargedAtId: this.data.chargedAtId,
      id: this.data.id,
  
      createdBy: [''],
      updatedBy: [''],
      createdAt: [''],
      updatedAt: [''],
    })

   
  }

  submit(form) {
    console.log(form.value);
    this.dialogRef.close(`${form.value}`);
  }
}