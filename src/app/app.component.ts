import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eyehealth';
  constructor(private renderer:Renderer2){}
  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#loading');
    this.renderer.setStyle(loader, 'display', 'none');
  }
}
