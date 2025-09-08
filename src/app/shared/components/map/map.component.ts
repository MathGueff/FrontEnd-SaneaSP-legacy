import { isPlatformBrowser } from "@angular/common";
import { AfterViewInit, Component, Inject, Input, PLATFORM_ID } from "@angular/core";

@Component({
  selector: "app-map",
  imports: [],
  template: `<div id="map"></div>`,
  styleUrl: "./map.component.css",
  standalone: true,
  host: { ngSkipHydration: 'true' }
})
export class MapComponent implements AfterViewInit {
  private isBrowser!: boolean;
  @Input() lat: number = 23.55052;
  @Input() lon: number = -46.633308;
 
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Importar dinamicamente apenas no browser
      const L = await import('leaflet');

        (L.Icon.Default as any).mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      // Corrigir problema de ícones do Leaflet no Angular
      (L.Icon.Default as any).mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const container = L.DomUtil.get('map');
      if (container != null) {
        (container as any)._leaflet_id = null; // força reset do container
      }
      const map = L.map('map').setView([this.lat, this.lon], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      L.marker([this.lat, this.lon]).addTo(map);
    }
  }

}
