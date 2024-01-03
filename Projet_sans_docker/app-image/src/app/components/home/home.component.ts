import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  beforeUnloadHandler = (event:any) => {
    // Recommended
    event.preventDefault();
    
    alert("vous vouler ")
    event.returnValue = true;
  };
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.addEventListener("beforeunload", this.beforeUnloadHandler);
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadHandler($event: Event): void {
    
  }
}
