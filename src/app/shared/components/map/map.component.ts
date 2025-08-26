import { Component, OnInit } from "@angular/core";
import L from "leaflet";

@Component({
  selector: "app-map",
  imports: [],
  templateUrl: "./map.component.html",
  styleUrl: "./map.component.css",
})
export class MapComponent implements OnInit {
  ngOnInit(): void {
    const start = { lat: -23.5015, lng: -47.4526 };
    const map = L.map("map", { zoomControl: true }).setView(start, 13);
  }
}
