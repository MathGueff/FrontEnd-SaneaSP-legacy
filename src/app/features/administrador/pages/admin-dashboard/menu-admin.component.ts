import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AdminSidebarOptions} from '@features/administrador/models/admin-sidebar-options.enum';
import { ModalType } from '@features/categoria/models/ModalType.enum';
import { TagModalComponent } from '@features/categoria/components/tag-modal/tag-modal.component';
import { ILinkPanelAdmin, ILinkSidebarAdmin } from '@features/administrador/models/link-admin.model';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector: 'app-menu-admin',
    imports: [CommonModule, RouterLink, TagModalComponent],
    templateUrl: './menu-admin.component.html',
    styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent implements OnInit {
  constructor(private router: Router, private authService : AuthService) {}

  ngOnInit(): void {
    if(!this.authService.getCurrentUser()){
      this.router.navigate([''])
    }
  }

  // ***** Modal *****
  modalTypes = ModalType;

  @ViewChild('botaoModal') botaoModal!: ElementRef;

  tipoModalAtual: ModalType = ModalType.None;

  alternarModal(tipoModal: ModalType) {
    this.tipoModalAtual = tipoModal;
    // Esperar que a variável seja atualizada antes de clicar no botão
    setTimeout(() => {
      this.botaoModal.nativeElement.click();
    });
  }

  private handleNumericNavigation(key: string) {
    //Evita que as teclas de atalho funcionem enquanto o modal está aberto
    if(document.querySelector('.modal')?.classList.contains('show'))return
    const index = parseInt(key) - 1;
    if (!isNaN(index) && index >= 0 && index < this.linksSidebar.length) {
      this.mudarOpcaoAtual(this.linksSidebar[index].opcao);
      return true;
    }
    return false;
  }

  private handleArrowNavigation(event: KeyboardEvent) {
    //Navegação por setas
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (this.handleNumericNavigation(event.key)) return;
    this.handleArrowNavigation(event);
  }

  //Array de Objetos de links da sidebar do Menu de Admin
  linksSidebar: ILinkSidebarAdmin[] = [
    {
      name: 'Gerenciar reclamações',
      img: 'assets/icones/white/reclamacao_icon.svg',
      opcao: AdminSidebarOptions.Reclamacao,
    },
    {
      name: 'Gerenciar comentários',
      img: 'assets/icones/white/reclamacao_icon.svg',
      opcao: AdminSidebarOptions.Comentario,
    },
    {
      name: 'Gerenciar categorias do site',
      img: 'assets/icones/white/tag_icon.svg',
      opcao: AdminSidebarOptions.Tag,
    },
    {
      name: 'Log',
      img: 'assets/icones/white/log_icon.svg',
      opcao: AdminSidebarOptions.Log,
    },
  ];

  /* Objeto com todas opções do menu, organizados por tipo de menu e os links dele
   *  AdminSidebarOptions se refere a Opção disponível no sidebar
   *  ILinkPanelAdmin é um array de links que estão ligadas a uma sessão do sidebar
   */
  menuLink: Record<AdminSidebarOptions, ILinkPanelAdmin[]> = {
    [AdminSidebarOptions.Reclamacao]: [
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Visualizar todas reclamações',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Excluir uma reclamação',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
      {
        type: 'link',
        path: '/',
        name: 'Gerar relatório de reclamação',
        img: 'assets/icones/white/log_icon.svg',
      },
      {
        type: 'link',
        path: '/',
        name: 'Visualizar filtragem geográfica',
        img: 'assets/icones/white/geo_icon.svg',
      },
    ],
    [AdminSidebarOptions.Comentario]: [
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Ver seus comentários',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Adicionar comentário',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Editar comentário',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'link',
        path: '/reclamacao',
        name: 'Remover um comentário',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
    ],
    [AdminSidebarOptions.Tag] : [
      {
        type: 'link',
        path: '/tag-tabela',
        name: 'Visualizar todas as categorias',
        img: 'assets/icones/operacoes/white/view_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Adicao,
        name: 'Criar nova categoria',
        img: 'assets/icones/operacoes/white/add_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Edicao,
        name: 'Editar uma categoria',
        img: 'assets/icones/operacoes/white/edit_icon.svg',
      },
      {
        type: 'modal',
        tipoModal: ModalType.Exclusao,
        name: 'Excluir uma categoria',
        img: 'assets/icones/operacoes/white/delete_icon.svg',
      },
    ],
    [AdminSidebarOptions.Log]: [
      {
        type: 'link',
        path: '/',
        name: 'Visualizar log de comentários',
        img: 'assets/icones/white/log_icon.svg',
      },
    ]
  };

  //Variável para guardar a opção atual selecionada no sidebar (inicia com o primeiro elemento de linksSidebar)
  sidebarAtual: AdminSidebarOptions = this.linksSidebar[0].opcao;

  //Variável para guardar o array de links referentes a opcao atual do sidebar selecionada
  opcoesMenuAtuais: ILinkPanelAdmin[] =
    this.menuLink[this.sidebarAtual] || [];

  mudarOpcaoAtual(opcao: AdminSidebarOptions) {
    this.sidebarAtual = opcao;
    this.opcoesMenuAtuais = this.menuLink[opcao] || [];
  }
}
