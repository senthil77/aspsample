import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
 
import { Router, NavigationEnd } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LoginService } from './services/login.service';
import {StoreService} from '../app/utils/store-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'freightogix';
  mobileQuery: MediaQueryList;
 
  private _mobileQueryListener: () => void;
  public url : any;
  constructor(private spinner: NgxSpinnerService, public router: Router,private dialog: MatDialog,
    private store:StoreService,public service:LoginService, 
    ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
      window.scrollTo(0, 0)
    } );

    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
           document.body.scrollTop = 0; // scroll top to body element
      }
  });

 
}

 

  navItems= [
    {
      displayName: 'My Quotes',
      iconName: 'recent_actors',
      hasChildren:false,
      route: '/home'
    },
    {
      displayName: 'My Profile',
      iconName: 'recent_actors',
      hasChildren:false,
      route: '/home'
    },
    {
      displayName: 'My Orders',
      iconName: 'group',
      hasChildren:false,
      route: '/pages/about'
    },

    
    {
      displayName: 'Veseel Charge',
          iconName: 'feedback',
          hasChildren:false,
          route: '/home/products/all'
    },

     
    {
      displayName: 'Port Charges',
          iconName: 'feedback',
          hasChildren:false,
          route: '/home/products/all'
    },

    {
      displayName: 'Shop',
      iconName: 'movie_filter',
      hasChildren:true,
      children: [
        {
          displayName: 'Emergency & Exit Lights & Systems',
          iconName: 'group',
          children: [
            {
              displayName: 'Central Monitoring Systems',
              iconName: 'person',
              route: 'michael-prentice',
            },
            {
              displayName: 'Central Battery Systems',
              iconName: 'person',
              route: 'stephen-fluin',
               },
            {
              displayName: 'LED Exit Lights',
              iconName: 'person',
              route: 'mike-brocchi',
           },
           {
            displayName: 'LED Emergency Light',
            iconName: 'person',
            route: 'mike-brocchi',
         }

          ]
        },
        {
          displayName: 'LED Lighting',
          iconName: 'speaker_notes',
          hasChildren:true,
          children: [
            {
              displayName: 'LED Downlights',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'LED Panels',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'LED Strips',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'LED Diodas',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'HVAC',
          iconName: 'feedback',
          hasChildren:true,
          children: [
            {
              displayName: 'HVAC Valves',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'HVAC Valve Actuators',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Heating Cables',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Thermostats',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        },
        {
          displayName: 'KNX',
          iconName: 'feedback',
          hasChildren:true,
          children: [
            {
              displayName: 'Car & Motorbike',
              iconName: 'star_rate',
              route: 'material-design'
            },
            {
              displayName: 'Shop for Bike',
              iconName: 'star_rate',
              route: 'what-up-web'
            },
            {
              displayName: 'Industrial Supplies',
              iconName: 'star_rate',
              route: 'my-ally-cli'
            },
            {
              displayName: 'Cold stores',
              iconName: 'star_rate',
              route: 'become-angular-tailer'
            }
          ]
        }
      ]
    },
    {
      displayName: 'Contact',
      iconName: 'feedback',
      hasChildren:true,
      children: [
        {
          displayName: 'FAQ',
          iconName: 'group',
          route: '/blog/blog-list'
        },
        {
          displayName: 'Call Us',
          iconName: 'speaker_notes',
          route: '/blog/blog-column',
        },
        {
          displayName: 'Mail Us',
          iconName: 'feedback',
          route: '/blog/blog-details'
        }
      ]
    },
    {
      displayName: 'Pages',
      hasChildren:true,
      iconName: 'report_problem',
      children: [
       
        {
          displayName: 'FAQ',
          iconName: 'speaker_notes',
          route: '/pages/faq',
        },
        {
          displayName: 'Contact',
          iconName: 'feedback',
          route: '/pages/contact'
        },
        {
          displayName: 'Wishlist',
          iconName: 'group',
          route: '/pages/wishlist'
        },
        {
          displayName: 'Compare',
          iconName: 'speaker_notes',
          route: '/pages/compare',
        },
        {
          displayName: 'Checkout',
          iconName: 'feedback',
          route: '/pages/checkout'
        },
        {
          displayName: 'Cart',
          iconName: 'group',
          route: '/pages/cart'
        },
        {
          displayName: 'My Account',
          iconName: 'speaker_notes',
          route: '/pages/my-account',
        },
        {
          displayName: '404',
          iconName: 'feedback',
          route: '/pages/error'
        }
      ]
    },
 
  ];

 
  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    })  
  }
}
