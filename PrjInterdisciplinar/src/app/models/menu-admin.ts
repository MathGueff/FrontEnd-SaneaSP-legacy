import { OpcoesMenuAdmin } from "../Admin/OpcoesMenuAdmin.enum";

export class MenuAdminLink{
  nome : string = '';
  img : string = '';
}
export class MenuAdminDashOpcoesLink extends MenuAdminLink{
  path : string = '';
}

export class MenuAdminSidebarLink extends MenuAdminLink{
  opcao : OpcoesMenuAdmin = OpcoesMenuAdmin.Doenca;
}