import { Injectable } from "@angular/core";
import { INoticia } from "../models/noticias.model";

@Injectable({providedIn: 'root'})

export class NoticiaService{
  private noticias : INoticia[] = [
    {
      id: 1,
      titulo: 'Despejo de esgoto sem tratamento no Rio Sorocaba afeta processo de despoluição, alertam especialistas',
      tags_noticia: ['Poluição'],
      descricao:
        'O lançamento de esgoto sem tratamento compromete o trabalho de décadas dedicado à despoluição no Rio Sorocaba. A opinião é de especialistas ouvidos pelo g1, que expõe os problemas e também apresentam possíveis soluções para reverter o cenário.',
      imagens_noticia: ['img/paginas/noticias/noticia1.webp'],
      fontes_noticia : ['https://g1.globo.com/sp/sorocaba-jundiai/noticia/2024/04/29/despejo-de-esgoto-sem-tratamento-no-rio-sorocaba-afeta-processo-de-despoluicao-alertam-especialistas.ghtml']
    },
    {
      id: 2,
      titulo: 'Projeto visa recuperação ambiental do Rio Sorocaba em parceria com ONGs.',
      tags_noticia: ['Saneamento'],
      descricao:
        'Iniciativa pretende reduzir o despejo irregular de resíduos e conscientizar a população.',
        imagens_noticia: ['img/paginas/noticias/noticia2.jpg'],
        fontes_noticia : ['https://www.saaesorocaba.com.br/programa-de-despoluicao-do-rio-sorocaba/']
    },
    {
      id: 3,
      titulo: 'Municípios se unem para investir em saneamento básico.',
      tags_noticia: ['Infraestrutura'],
      descricao:
        'Regiões próximas ao Rio Sorocaba estão adotando planos para melhorar o tratamento de esgoto.',
      imagens_noticia: ['img/paginas/noticias/noticia3.jpg'],
      fontes_noticia : ['https://cnm.org.br/comunicacao/noticias/munic%C3%ADpios-s%C3%A3o-reconhecidos-por-a%C3%A7%C3%B5es-em-saneamento-b%C3%A1sico']
    },
    {
      id: 4,
      titulo: 'Nova tecnologia promete eficiência no tratamento de águas residuais.',
      tags_noticia: ['Inovação'],
      descricao:
        'Soluções modernas podem acelerar o processo de despoluição e beneficiar comunidades locais.',
      imagens_noticia: ['img/paginas/noticias/noticia4.jpg'],
      fontes_noticia : ['https://www.digitalwater.com.br/inovacoes-e-solucoes-sustentaveis-no-tratamento-de-agua-e-efluentes-em-2024/']
    },
    {
      id: 5,
      titulo: 'População denuncia aumento de poluição no Rio Sorocaba.',
      tags_noticia: ['Denúncia'],
      descricao:
        'Moradores relatam impactos negativos na qualidade de vida devido ao esgoto não tratado.',
      imagens_noticia: ['img/paginas/noticias/noticia5.jpg'],
      fontes_noticia : ['https://www.jornalcruzeiro.com.br/sorocaba/noticias/2022/03/690635-qualidade-da-agua-do-rio-sorocaba-cai-para-ruim-indica-cetesb.html']
    },    
  ];

  /* Validação de Notícia */
  validateNoticia(newNoticia : string) : boolean{
    return this.noticias.some(noticia => noticia.titulo != newNoticia);
  }

  /* Criação de uma nova Noticia */
  newNoticia(newNoticia : INoticia){
    this.noticias.push(newNoticia);
    console.log(this.noticias);
  }

  getCurrentID() : number{
    return this.noticias.length + 1
  }

  getNoticias() : INoticia[]{
    return this.noticias;
  }
}
