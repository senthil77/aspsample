import { Component, OnInit } from '@angular/core';
import { VesselHeader } from 'src/app/models/vessel-header';
import { ApiClientService } from 'src/app/services/api-client.service';
import { HelperService } from 'src/app/services/helper.service';
declare var $:any;
@Component({
  selector: 'app-vessel-subscription',
  templateUrl: './vessel-subscription.component.html',
  styleUrls: ['./vessel-subscription.component.css']
})
export class VesselSubscriptionComponent implements OnInit {
  data:any;
  constructor(private apiService:ApiClientService, private helperService : HelperService) { }
 

  calculateDiff(stDate,enDate)
  {
    var dt= this.helperService.calculateDiff(enDate,stDate);
    
    return dt;
  }
  ngOnInit(): void {

    $(document).ready(function() {

      var animating = false;
      var step1 = 500;
      var step2 = 500;
      var step3 = 500;
      var reqStep1 = 600;
      var reqStep2 = 800;
      var reqClosingStep1 = 500;
      var reqClosingStep2 = 500;
      var $scrollCont = $(".phone__scroll-cont");
    
       
      $(document).on("click", ".card:not(.active)", function() {
        if (animating) return;
        animating = true;
        
        var $card = $(this);
        var cardTop = $card.position().top;
        var scrollTopVal = cardTop - 30;
        $card.addClass("flip-step1 active");
    
        $scrollCont.animate({scrollTop: scrollTopVal}, step1);
    
        setTimeout(function() {
          $scrollCont.animate({scrollTop: scrollTopVal}, step2);
          $card.addClass("flip-step2");
    
          setTimeout(function() {
            $scrollCont.animate({scrollTop: scrollTopVal}, step3);
            $card.addClass("flip-step3");
    
            setTimeout(function() {
              animating = false;
            }, step3);
    
          }, step2*0.5);
    
        }, step1*0.65);
      });
    
      $(document).on("click", ".card:not(.req-active1) .card__header__close-btn", function() {
        if (animating) return;
        animating = true;
        
        var $card = $(this).parents(".card");
        $card.removeClass("flip-step3 active");
    
        setTimeout(function() {
          $card.removeClass("flip-step2");
    
          setTimeout(function() {
            $card.removeClass("flip-step1");
    
            setTimeout(function() {
              animating = false;
            }, step1);
    
          }, step2*0.65);
    
        }, step3/2);
      });
    
      $(document).on("click", ".card:not(.req-active1) .card__request-btn", function(e) {
        if (animating) return;
        animating = true;
    
        var $card = $(this).parents(".card");
        var cardTop = $card.position().top;
        var scrollTopVal = cardTop - 30;
    
        $card.addClass("req-active1 map-active");
    
     
    
        setTimeout(function() {
          $card.addClass("req-active2");
          $scrollCont.animate({scrollTop: scrollTopVal}, reqStep2);
    
          setTimeout(function() {
            animating = false;
          }, reqStep2);
    
        }, reqStep1);
      });
      
      $(document).on("click", 
                     ".card.req-active1 .card__header__close-btn, .card.req-active1 .card__request-btn", 
                     function() {
        if (animating) return;
        animating = true;
        
        var $card = $(this).parents(".card");
        
        $card.addClass("req-closing1");
        
        setTimeout(function() {
          $card.addClass("req-closing2");
          
          setTimeout(function() {
            $card.addClass("no-transition hidden-hack")
            $card.css("top");
            $card.removeClass("req-closing2 req-closing1 req-active2 req-active1 map-active flip-step3 flip-step2 flip-step1 active");
            $card.css("top");
            $card.removeClass("no-transition hidden-hack");
            animating = false;
          }, reqClosingStep2);
          
        }, reqClosingStep1);
      });
    
    });
   
    
    let data ={

      code: '0'
    }


    this.apiService.getWithActionColls<VesselHeader>('VesselSchedules','getList', data).toPromise().then((data=> 
      {
  
        this.data = data})).catch((err => {console.log(err)}));
  }
  

}
