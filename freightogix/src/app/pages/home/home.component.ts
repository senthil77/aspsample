import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
 import {ChargeDetail} from '../../models/charge-detail'
import { Router, Params } from '@angular/router';
import { ApiClientService } from 'src/app/services/api-client.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileNameDialogComponent } from './EditUser';
import { filter } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit,AfterViewInit {


  options={
    timeOut: 3000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true
  };
displayedColumns = ['id',   'name', 'isActive', 'edit'];
dataSource: MatTableDataSource<any>;
@ViewChild(MatPaginator) paginator: MatPaginator;
@ViewChild(MatSort) sort: MatSort;
  fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;
 
 

  selectedProduct: ChargeDetail = new ChargeDetail();
  loading = false;

  constructor(public productService: ApiClientService,public dialog: MatDialog) {
  }

  ngOnInit() {
    this.refresh();
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
 
 addbut(){
   window.alert("addbutton");
 }
 editbut(){
   window.alert("editbutton");
 }

  ngAfterViewInit() {

  }

  async refresh() {
    this.loading = true;
     await this.productService.get('ChargeDetail').toPromise().then((data)=>
    {

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
 
      this.loading = false;
    });
   
  }

  async updateProduct() {
    // if (this.selectedProduct.id !== undefined) {
    //   await this.productService.updateProduct(this.selectedProduct);
    // } else {
    //   await this.productService.createProduct(this.selectedProduct);
    // }
    this.selectedProduct = new ChargeDetail();
    await this.refresh();
  }

 
  openFileDialog(file) {
    this.fileNameDialogRef = this.dialog.open(FileNameDialogComponent, {
      data: file
    });

    this.fileNameDialogRef.afterClosed().pipe(
      filter(name => name)
    ).subscribe(name => {
      if (file) {
        const index = this.dataSource.data.findIndex(f => f.id == file.id);
        if (index !== -1) {
          this.dataSource.data[index] = { file}
        }
      } else {
        this.dataSource.data.push(file);
      }
    });
  }


  clearProduct() {
    this.selectedProduct = new ChargeDetail();
  }

  async deleteProduct(product: ChargeDetail) {
    this.loading = true;
    if (confirm(`Are you sure you want to delete the product ${product.name}. This cannot be undone.`)) {
     // this.productService.deleteProduct(product.id);
    }
    await this.refresh();
  }
}


