import { MenuUsuarioComponent } from '@features/home/pages/menu-usuario/menu-usuario.component';
import { Routes } from '@angular/router';
import { ReclamacaoDescricaoComponent } from '@features/reclamacao/pages/reclamacao-descricao/reclamacao-descricao.component';
import { ReclamacaoInicialComponent } from '@features/reclamacao/pages/reclamacao-inicial/reclamacao-inicial.component';
import { SobrenosComponent } from '@features/sobre-nos/pages/sobrenos/sobrenos.component';
import { MenuAdminComponent } from '@features/administrador/pages/admin-dashboard/menu-admin.component';
import { FormLoginComponent } from '@features/autenticacao/pages/form-login/form-login.component';
import { FormCadastroComponent } from '@features/autenticacao/pages/form-cadastro/form-cadastro.component';
import { ComentarioCentralComponent } from '@features/comentario/components/comentario-central/comentario-central.component';
import { ReclamacaoFormComponent } from "@features/reclamacao/pages/reclamacao-form/reclamacao-form.component";
import { EdicaoPerfilComponent } from '@features/usuario/pages/edicao-perfil/edicao-perfil.component';
import { ResponsaveisComponent } from '@features/responsavel/pages/responsaveis/responsaveis.component';
import { ReclamacaoUsuariosComponent } from '@features/reclamacao/pages/reclamacao-usuarios/reclamacao-usuarios.component';
import { ReclamacaoEdicaoComponent } from '@features/reclamacao/pages/reclamacao-edicao/reclamacao-edicao.component';
import { TagTabelaComponent } from '@features/categoria/pages/tag-tabela/tag-tabela.component';
import { AuthGuard } from '@core/guards/auth.guard';
import { AdminGuard } from '@core/guards/auth-admin.guard';
import { ConfirmationCadastroComponent } from '@features/autenticacao/pages/confirmation-cadastro/confirmation-cadastro.component';
import { RelatorioComponent } from '@features/relatorio/relatorio/relatorio.component';


export const routes: Routes = [
  //Home
  { path: '', component: MenuUsuarioComponent },
  { path: 'pagina-admin', component: MenuAdminComponent, canActivate: [AdminGuard] },

  //Reclamações
  { path: 'reclamacao', component: ReclamacaoInicialComponent },
  { path: 'reclamacao/reclamacao-form', component: ReclamacaoFormComponent, canActivate: [AuthGuard] },
  { path: 'suas-reclamacoes/:id', component: ReclamacaoEdicaoComponent, canActivate: [AuthGuard] },
  { path: 'reclamacao/reclamacao-descricao/:id', component: ReclamacaoDescricaoComponent },
  { path: 'suas-reclamacoes', component: ReclamacaoUsuariosComponent, canActivate: [AuthGuard] },
  { path: 'suas-reclamacoes/reclamacao-descricao/:id', component: ReclamacaoDescricaoComponent, canActivate: [AuthGuard] },

  //Tags
  { path: 'tag-tabela', component: TagTabelaComponent, canActivate: [AdminGuard] },

  //Outros
  { path: 'confirmar-cadastro', component: ConfirmationCadastroComponent },
  { path: 'sobre-nos', component: SobrenosComponent },
  { path: 'login', component: FormLoginComponent },
  { path: 'cadastro', component: FormCadastroComponent },
  { path: 'comentario/:idReclamamacao', component: ComentarioCentralComponent },
  { path: 'editar-perfil', component: EdicaoPerfilComponent, canActivate: [AuthGuard] },
  { path: 'responsaveis', component: ResponsaveisComponent },
  { path: 'relatorio', component:RelatorioComponent}
];
