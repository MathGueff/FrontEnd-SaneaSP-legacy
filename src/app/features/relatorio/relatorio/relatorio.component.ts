import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { GraphComponent } from "@shared/components/graph/graph.component";
import { IDataGraph } from '@shared/components/graph/graph.model';
import { BigPoints, DataGraph } from '@shared/services/dataGraph.service';




@Component({
  selector: 'app-relatorio',
  imports: [GraphComponent, ReactiveFormsModule],
  templateUrl: './relatorio.component.html',
  styleUrl: './relatorio.component.css',
  standalone: true
})
export class RelatorioComponent implements OnInit {
resetarFiltros() {
throw new Error('Method not implemented.');
}
  public filtrosForm!: FormGroup;
  cidades =[
    {
      id:1,
      cidade:'São Paulo'
    },
    {
      id:2,
      cidade:'Campinas'
    },
    {
      id:3,
      cidade:'Sorocaba'
    },
    {
      id:4,
      cidade:'Votorantim'
    },
  ] 
  private dataGraph = inject(DataGraph);
  graph!: IDataGraph;
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.filtrosForm = this.fb.group({
      cidade: ['', [Validators.pattern('[a-zA-Z]')]],
      limite: [10, [Validators.min(1)]],
      habilitarCidade:[false]
    });
  }
  aplicarFiltros() {
    const { cidade, limite } = this.filtrosForm.value;
    console.log('Filtros aplicados:', cidade, limite);

  }
}
