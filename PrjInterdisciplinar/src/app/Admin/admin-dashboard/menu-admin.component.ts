import { Component } from '@angular/core';
import { MenuAdminDashOpcoesLink, MenuAdminSidebarLink } from '../../models/menu-admin';
import { CommonModule } from '@angular/common';
import { OpcoesMenuAdmin } from '../OpcoesMenuAdmin.enum';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css',
})
export class MenuAdminComponent {
  linksSidebar: MenuAdminSidebarLink[] = [
    {
      nome: 'Gerenciar Reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
      opcao: OpcoesMenuAdmin.Reclamacao,
    },
    {
      nome: 'Gerenciar notícias do site',
      img: 'assets/icones/icon_white_noticia.svg',
      opcao: OpcoesMenuAdmin.Noticia,
    },
    {
      nome: 'Gerenciar doenças do site',
      img: 'assets/icones/icon_white_doenca.svg',
      opcao: OpcoesMenuAdmin.Doenca,
    },
    {
      nome: 'Visualizar página sobre o responsável pelo saneamento',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesMenuAdmin.Responsaveis,
    },
    {
      nome: 'Visualizar Log',
      img: 'assets/icones/icon_white_responsavel.svg',
      opcao: OpcoesMenuAdmin.Log,
    },
  ];
 
  opcaoAtual : OpcoesMenuAdmin = OpcoesMenuAdmin.Reclamacao;

  noticia : MenuAdminDashOpcoesLink[] = [
    {
      path: '/noticia-form',
      nome: 'Cadastrar uma nova notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Editar uma notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Excluir uma notícia',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-form',
      nome: 'Visualizar suas notícias criadas',
      img: 'assets/icones/icon_white_noticia.svg',
    },
    {
      path: '/noticia-inicial',
      nome: 'Visualizar todas notícias',
      img: 'assets/icones/icon_white_noticia.svg',
    },
  ]

  doenca : MenuAdminDashOpcoesLink[] = [
    {
      path: '/doenca-form',
      nome: 'Cadastrar uma nova doença',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/doenca-form',
      nome: 'Editar uma doença',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/doenca-form',
      nome: 'Excluir uma doença',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/doenca-inicial',
      nome: 'Visualizar suas doenças cadastradas',
      img: 'assets/icones/icon_white_doenca.svg',
    },
    {
      path: '/doenca-inicial',
      nome: 'Visualizar todas doenças',
      img: 'assets/icones/icon_white_doenca.svg',
    },
  ]

  reclamacao : MenuAdminDashOpcoesLink[] = [
    {
      path: '/reclamacao',
      nome: 'Visualizar todas reclamações',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/reclamacao',
      nome: 'Seus comentários',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/reclamacao',
      nome: 'Excluir uma reclamação',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/',
      nome: 'Criar nova tag para os usuários',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/',
      nome: 'Gerar relatório de reclamação',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
    {
      path: '/',
      nome: 'Visualizar filtragem geográfica',
      img: 'assets/icones/icon_white_reclamacao.svg',
    },
  ]

  responsavel : MenuAdminDashOpcoesLink[] = [
    {
      path: '/responsaveis',
      nome: 'Visualizar página dos responsáveis pelo saneamento básico',
      img: 'assets/icones/icon_white_responsavel.svg',
    },
  ]

  log : MenuAdminDashOpcoesLink[] = [
    {
      path: '/',
      nome: 'Visualizar log de comentários',
      img: 'assets/icones/icon_white_responsavel.svg',
    },
  ]

  opcoes: MenuAdminDashOpcoesLink[] = this.reclamacao;

  mudarOpcaoAtual(opcao: OpcoesMenuAdmin) {
    this.opcaoAtual = opcao;
    switch (opcao) {
      case OpcoesMenuAdmin.Doenca:
        this.opcoes = this.doenca;
        break;
      case OpcoesMenuAdmin.Noticia:
        this.opcoes = this.noticia
        break;
      case OpcoesMenuAdmin.Reclamacao:
        this.opcoes = this.reclamacao;
        break;
      case OpcoesMenuAdmin.Responsaveis:
        this.opcoes = this.responsavel;
        break;
      case OpcoesMenuAdmin.Log:
        this.opcoes = this.log;
        break;
      default:
          this.opcoes = [];
    }
  }
}