import { Directive, Input, HostListener } from '@angular/core';
import { EditableComponent } from './editable.component';

@Directive({
  selector: '[editableOnEnter]'
})


export class EditOnEnterDirective {

  constructor(private editable: EditableComponent) { }

  // @HostListener('click', ['onTouch()'])
  // onTouch() {
  //   alert('s');
  //   this.editable.toViewMode();
  // }
  // @HostListener('touchstart', ['$event'])
  // onClick(event: MouseEvent) {
  //   console.log(event.currentTarget);
  // }
 
    

 // @HostListener('touchstart')
  //@HostListener('click')
  @HostListener('keyup.enter')
  onEnter() {
 
    this.editable.toViewMode();
  }

 

}
