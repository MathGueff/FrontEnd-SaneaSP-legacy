import { Component, inject } from '@angular/core';
import { MenuUsuario } from '@features/usuario/models/menu-usuario.model';
import { RouterLink, Router } from '@angular/router';
//import { GraphComponent } from '@shared/components/graph/graph.component';

@Component({
  selector: 'app-menu-usuario',
  imports: [RouterLink],
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css',
  standalone: true
})
export class MenuUsuarioComponent {
  constructor(private router: Router) { }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  //Array com os links do menu
  cards: MenuUsuario[] = [
    { path: '/reclamacao', nome: 'Reclamações', titulo: 'Faça uma reclamação', src: 'icons/shared/black/reclamacao_icon.svg', info: 'Clique aqui para registrar sua reclamação e ajudar a melhorar a qualidade do abastecimento de água, coleta de esgoto e outros serviços essenciais em sua comunidade!' },
    { path: '/responsaveis', nome: 'Responsáveis', titulo: 'Responsáveis pelo saneamento básico', src: 'icons/shared/black/responsavel_icon.svg', info: 'Identifique os principais responsáveis pelo saneamento básico e descubra como você pode contribuir para melhorar o saneamento em sua cidade.' }
  ];
}
