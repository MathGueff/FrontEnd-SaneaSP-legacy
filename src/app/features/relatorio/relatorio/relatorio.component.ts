import { Component, inject, OnInit } from '@angular/core';
import { GraphComponent } from "@shared/components/graph/graph.component";
import { IDataGraph } from '@shared/components/graph/graph.model';
import { BigPoints, DataGraph } from '@shared/services/dataGraph.service';




@Component({
  selector: 'app-relatorio',
  imports: [GraphComponent],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
  standalone: true
})
export class RelatorioComponent implements OnInit {
  private dataGraph = inject(DataGraph);
  graph!:IDataGraph;
  ngOnInit(): void {
    this.dataGraph.getBigPoints(10).subscribe({
      next:(datas)=>{
        console.log(datas)
        this.graph = this.dataGraph.convertBigPointInChar(datas);
        
      }
    });
  }

}
