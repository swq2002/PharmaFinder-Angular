import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css'],
  animations: [
    trigger('scroll', [
      transition('* => *', [
        style({ transform: '{{ from }}' }),
        animate('50000ms ease-in-out', style({ transform: '{{ to }}' }))
      ])
    ])
  ]
})
export class TestimonialComponent implements OnInit, OnDestroy {
 
  private intervalId: any;
  private readonly cardsPerPage = 3;
  private readonly scrollAmount = this.cardsPerPage; 

  @Input() testimonials: any[] =[
        {
          content: "using pharmafinder was a fantastic experience.",
          author: "John Doe",
          date:"18/12/2023"
        },
        {
          content: "The team's attention to detail and commitment to excellence is commendable.",
          author: "Jane Smith",
          date:"18/12/2023"
        },
        {
          content: "It's both functional and visually stunning.",
          author: "Bob Johnson",
          date:"18/12/2023"
        },
        {
          content: "very good website.",
          author: "Jane Smith",
          date:"18/12/2023"
        },
        {
          content: "I highly recommend pharmafinde.",
          author: "Bob Johnson",
          date:"18/12/2023"
        }
      ];
      @ViewChild('testimonialContainer', { static: true }) testimonialContainer!: ElementRef;

  
      ngOnInit() {
        this.startAutoScroll();
      }
    
      ngOnDestroy() {
        this.stopAutoScroll();
      }
    
      scroll(direction: number): void {
        const container = this.testimonialContainer.nativeElement;
        const currentScroll = container.scrollLeft;
        const newScroll = currentScroll + direction * this.calculateCardWidth() * this.scrollAmount;
    
        container.scrollTo({
          left: newScroll,
          behavior: 'smooth'
        });
      }
    
      private startAutoScroll(): void {
        this.intervalId = setInterval(() => {
          this.scroll(1); 
        }, 3000); 
      }
    
      private stopAutoScroll(): void {
        clearInterval(this.intervalId);
      }
    
      private calculateCardWidth(): number {
        return 370;
      }
    
      
    }