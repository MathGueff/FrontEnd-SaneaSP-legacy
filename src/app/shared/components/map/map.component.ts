import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-map",
  imports: [],
  template: `<div id="map"></div>`,
  styleUrl: "./map.component.css",
  standalone:true,
  host:{ ngSkipHydration: 'true' }
})
export class MapComponent implements AfterViewInit {
  private isBrowser!: boolean;
  @Input() lat ?: number;
  @Input() lon ?: number;
  constructor(@Inject(PLATFORM_ID) private platformId: Object){
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
   async ngAfterViewInit() {
    if(!this.isBrowser){
      return;
    }
    const L = await import('leaflet');
    let map = L.map('map')
    
    if(this.lat && this.lon){
      map.setView([this.lat,this.lon],13);
    }

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }

}
