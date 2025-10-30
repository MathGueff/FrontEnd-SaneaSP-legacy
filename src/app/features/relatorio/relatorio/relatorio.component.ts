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
  public filtrosForm!: FormGroup;
  cidades = [
    { id: 1, cidade: 'São Paulo' },
    { id: 2, cidade: 'Guarulhos' },
    { id: 3, cidade: 'Campinas' },
    { id: 4, cidade: 'São Bernardo do Campo' },
    { id: 5, cidade: 'São José dos Campos' },
    { id: 6, cidade: 'Santo André' },
    { id: 7, cidade: 'Ribeirão Preto' },
    { id: 8, cidade: 'Osasco' },
    { id: 9, cidade: 'Sorocaba' },
    { id: 10, cidade: 'Mauá' },
    { id: 11, cidade: 'São José do Rio Preto' },
    { id: 12, cidade: 'Mogi das Cruzes' },
    { id: 13, cidade: 'Santos' },
    { id: 14, cidade: 'Diadema' },
    { id: 15, cidade: 'Jundiaí' },
    { id: 16, cidade: 'Piracicaba' },
    { id: 17, cidade: 'Carapicuíba' },
    { id: 18, cidade: 'Bauru' },
    { id: 19, cidade: 'Itaquaquecetuba' },
    { id: 20, cidade: 'São Vicente' },
    { id: 21, cidade: 'Franca' },
    { id: 22, cidade: 'Praia Grande' },
    { id: 23, cidade: 'Guarujá' },
    { id: 24, cidade: 'Taubaté' },
    { id: 25, cidade: 'Limeira' },
    { id: 26, cidade: 'Suzano' },
    { id: 27, cidade: 'Taboão da Serra' },
    { id: 28, cidade: 'Sumaré' },
    { id: 29, cidade: 'Barueri' },
    { id: 30, cidade: 'Embu das Artes' }
  ]
  private dataGraph = inject(DataGraph);
  graph!: IDataGraph;

  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filtrosForm = this.fb.group({
      cidade: [''],
      limite: [10, [Validators.min(1)]],
      habilitarCidade: [false]
    });
  }
  aplicarFiltros() {
    const { cidade, limite, habilitarCidade } = this.filtrosForm.value;
    let data!: BigPoints[]

    this.dataGraph.getBigPoints(limite, habilitarCidade ? cidade : undefined).subscribe({
      next: (values) => {
        data = values;
        this.graph = this.dataGraph.convertBigPointInChar(data);
      },
    });
  }
}
