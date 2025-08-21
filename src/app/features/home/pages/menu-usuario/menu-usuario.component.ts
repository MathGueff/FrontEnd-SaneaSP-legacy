import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuUsuario } from '@features/usuario/models/menu-usuario.model';
import { RouterLink, Router} from '@angular/router';

@Component({
    selector: 'app-menu-usuario',
    imports: [CommonModule, RouterLink],
    templateUrl: './menu-usuario.component.html',
    styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent{
  constructor(private router: Router) {}

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

  //Array com os links do menu
  cards : MenuUsuario[] = [
    {path: '/reclamacao', nome : 'Reclamações', titulo : 'Faça uma reclamação', src : 'assets/icones/black/reclamacao_icon.svg', info : 'Clique aqui para registrar sua reclamação e ajudar a melhorar a qualidade do abastecimento de água, coleta de esgoto e outros serviços essenciais em sua comunidade!'},
    {path: '/responsaveis', nome : 'Responsáveis', titulo : 'Responsáveis pelo saneamento básico', src : 'assets/icones/black/responsavel_icon.svg', info : 'Identifique os principais responsáveis pelo saneamento básico e descubra como você pode contribuir para melhorar o saneamento em sua cidade.'}
  ];
}
