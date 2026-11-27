import styles from './Sobre.module.css';

export default function Sobre() {
  return (
    <section className={styles.sobre}>
      <h2>Sobre a pesquisa</h2>
      <p>
        Ferramentas de inteligência artificial fazem parte do dia a dia de muitos estudantes.
        Elas podem ajudar a tirar dúvidas, resumir conteúdos e organizar ideias para atividades escolares. No entanto, seu mau uso (como pedir trabalhos e tarefas prontos) no dia a dia acadêmico é algo frequente e deve ser analisado com atenção.<br></br>
        Com isso, desenvolvemos esta pesquisa para analisar como o uso da IA em trabalhos, projetos e tarefas escolares é realizado pelos alunos.
      </p>

      <img
        className={styles.imagem}
        src="https://tse4.mm.bing.net/th/id/OIP.ODNyHEjUcCaispmjjCDqTAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
      />

      <h2>Como funciona?</h2>
      <p>
        Para coletar as informações do uso de tais ferramentas digitais e seu impacto na educação, realizamos o questionário em três perguntas:<br></br> 
        1 - frequência de uso da IA nos trabalhos;<br></br>
        2 - nota de 1 a 5 para o grau de confiança nas respostas;<br></br>
        3 - relato opcional sobre algum erro
        encontrado durante o uso.<br></br>
      </p>

      <img
        className={styles.imagem}
        src="https://tse4.mm.bing.net/th/id/OIP.XBMWrPc4Hh0XPPI2jbrqdgHaEa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
      />
      <p>
        <br></br><br></br>
        Nenhum dado pessoal é solicitado. As respostas ficam disponíveis na aba de resultados
        para a consulta geral.
      </p>
    </section>
  );
}
