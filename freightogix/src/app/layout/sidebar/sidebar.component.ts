import { Component, OnInit, HostBinding, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
 
import {animate, state, style, transition, trigger} from '@angular/animations';
 
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class SidebarComponent implements OnInit {

  isExpanded:boolean=true;
  expanded: boolean=false;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: any;
  @Input() depth: number;

  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
    }


  }
  onItemSelected(item: any) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.route]);
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }

  ngOnInit() {
    // this.sidenavMenuService.currentUrl.subscribe((url: string) => {
    //   if (this.item.route && url) {
    //     // console.log(`Checking '/${this.item.route}' against '${url}'`);
    //     this.expanded = url.indexOf(`/${this.item.route}`) === 0;
    //     this.ariaExpanded = this.expanded;
    //     // console.log(`${this.item.route} is expanded: ${this.expanded}`);
    //   }
    // });
  }

}
