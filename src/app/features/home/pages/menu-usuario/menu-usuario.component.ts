import { Component } from '@angular/core';

import { MenuUsuario } from '@features/usuario/models/menu-usuario.model';
import { RouterLink, Router} from '@angular/router';
import { GraphComponent } from '@shared/components/graph/graph.component';

@Component({
    selector: 'app-menu-usuario',
    imports: [RouterLink, GraphComponent],
    templateUrl: './menu-usuario.component.html',
    styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent{
    public barData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai'],
     datasets: [
      { label: 'Vendas', data: [12, 19, 3, 5, 2], backgroundColor: 'rgba(54, 162, 235, 0.6)' },
    ],
  };

  public pieData = {
    labels: ['Chrome', 'Firefox', 'Edge', 'Safari'],
    datasets: [
      { data: [60, 20, 10, 10], backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0'] },
    ],
  };

  public chartOptions = { responsive: true };
  
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  //Array com os links do menu
  cards : MenuUsuario[] = [
    {path: '/reclamacao', nome : 'Reclamações', titulo : 'Faça uma reclamação', src : 'icons/shared/black/reclamacao_icon.svg', info : 'Clique aqui para registrar sua reclamação e ajudar a melhorar a qualidade do abastecimento de água, coleta de esgoto e outros serviços essenciais em sua comunidade!'},
    {path: '/responsaveis', nome : 'Responsáveis', titulo : 'Responsáveis pelo saneamento básico', src : 'icons/shared/black/responsavel_icon.svg', info : 'Identifique os principais responsáveis pelo saneamento básico e descubra como você pode contribuir para melhorar o saneamento em sua cidade.'}
  ];
}
