

import { Component } from '@angular/core';
import { GraphComponent } from "@shared/components/graph/graph.component";
import { IDataGraph } from '@shared/components/graph/graph.model';



@Component({
  selector: 'app-relatorio',
  imports: [GraphComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
  standalone: true
})
export class RelatorioComponent {

  data: IDataGraph = {
    labels: ['Sorocaba', 'Votorantim'],
    datasets:
      [{
        label: "Numero de chamados",
        data: [20, 30],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
        borderWidth: 1
      }]
  }
}
