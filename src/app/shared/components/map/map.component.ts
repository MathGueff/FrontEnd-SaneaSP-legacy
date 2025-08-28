import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, Inject, PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-map",
  imports: [],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css",
  standalone:true
})
export class MapComponent implements AfterViewInit {
  private isBrowser!: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
   async ngAfterViewInit() {
    if(!this.isBrowser){
      return;
    }
    const L = await import('leaflet');
    const map = L.map('map').setView([-23.5062,-47.4559],13);


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
    var marker = L.marker([-23.5062,-47.4559]).addTo(map);
  }

}
