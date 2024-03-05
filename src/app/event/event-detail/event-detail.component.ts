import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';


@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
  ],
  templateUrl: './event-detail.component.html',
  styleUrl: './event-detail.component.scss',
})


export class EventDetailComponent implements OnInit {
  
  timeline(){
  const timelineWrapper: any = document.querySelectorAll('.timeline-wrapper'),
   timelines: any = document.querySelectorAll('.timeline li .data');
  for(const time of timelines){
    time.onclick = ()=>time.classList.toggle('show');
    }

    // timelineWrapper.addEventListener('mousemove', (ev: { pageX: any; })=>{
    //   const timeline = document.querySelector('.timeline');
    //  let scroll_width = 0;
    //   if(timeline){
    //      scroll_width = ev.pageX/ timelineWrapper.clientWidth * (timelineWrapper.clientWidth -timeline.clientWidth);
    //     //  timeline.style.left = scroll_width.toFixed(1)	+ 'px';
    //   }
    //   console.log({
    //     'timeline_width': scroll_width.toFixed(1)
    
    //   });
    // })
}
  ngOnInit(): void {
    this.timeline();
  }


}
