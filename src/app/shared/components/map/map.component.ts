import { isPlatformBrowser } from "@angular/common";
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  PLATFORM_ID,
} from "@angular/core";
import { Map } from "leaflet";

@Component({
  selector: "app-map",
  imports: [],
  template: `<div id="map"></div>`,
  styleUrl: "./map.component.css",
  standalone: true,
  host: { ngSkipHydration: "true" },
})
export class MapComponent implements AfterViewInit {
  private isBrowser!: boolean;
  @Input() lat: number = 23.55052;
  @Input() lon: number = -46.633308;
  private L: any;
  private map!: Map;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Importar dinamicamente apenas no browser
      this.L = await import("leaflet");

      this.initMap(this.L);

      const container = this.L.DomUtil.get("map");
      if (container != null) {
        (container as any)._leaflet_id = null; // força reset do container
      }
    }
  }
  private initMap(L: any) {
    const DefaultIcon = this.L.icon({
      iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41], // largura, altura
      iconAnchor: [12, 41], // ponto que fica na coordenada
      popupAnchor: [1, -34], // onde o popup vai abrir
      shadowSize: [41, 41], // tamanho da sombra
    });

    this.map = L.map("map", {
      center: [-22.2963, -48.5587],
      zoom: 5.5,
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(this.map);
    L.Marker.prototype.options.icon = DefaultIcon;
  }
  public setMap(lat: number, lon: number, zoom?: number) {
    this.map.setView([lat, lon], zoom || 13);
  }
  public setMaker(lat: number, lon: number) {
    this.L.marker([lat, lon]).addTo(this.map);
  }
}
