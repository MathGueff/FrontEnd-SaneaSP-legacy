import { Component, inject, OnInit } from '@angular/core';
import { GraphComponent } from "@shared/components/graph/graph.component";
import { IDataGraph } from '@shared/components/graph/graph.model';
import { DataGraph } from '@shared/services/dataGraph.service';




@Component({
  selector: 'app-relatorio',
  imports: [GraphComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
  standalone: true
})
export class RelatorioComponent implements OnInit {
  private dataGraph = inject(DataGraph);
  ngOnInit(): void {
    this.dataGraph.getBigPoints(10).subscribe({
      next:(datas)=>{
        console.log(datas)
      }
    });
  }

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
