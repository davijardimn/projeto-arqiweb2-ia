import { useEffect, useState } from 'react';
import Formulario from './components/Formulario.jsx';
import Resultados from './components/Resultados.jsx';
import Sobre from './components/Sobre.jsx';
import { supabaseConfigurado } from './lib/supabaseClient.js';
import styles from './App.module.css';

const pesquisa = {
  titulo: 'Inteligência artificial',
  pergunta: 'Com que frequência você usa IA nos trabalhos da escola?',
  pergunta2: 'De 1 a 5, quanto você confia nas respostas que a IA te dá?',
  pergunta3: 'Em que momento a IA já te deu uma resposta errada — e como você percebeu?',
  opcoes: ['Sempre', 'Às vezes', 'Raramente', 'Nunca']
};

function paginaAtual() {
  const caminho = window.location.hash.replace('#', '');
  if (caminho === '/formulario') return 'formulario';
  if (caminho === '/resultados') return 'resultados';
  return 'inicio';
}

export default function App() {
  const [pagina, setPagina] = useState(paginaAtual);

  useEffect(() => {
    function mudarPagina() {
      setPagina(paginaAtual());
      window.scrollTo(0, 0);
    }
    window.addEventListener('hashchange', mudarPagina);
    return () => window.removeEventListener('hashchange', mudarPagina);
  }, []);

  return (
    <div className={styles.app}>
      <header className={styles.cabecalho}>
        <nav className={styles.navegacao}>
          <a href="#/" className={pagina === 'inicio' ? styles.ativo : ''}>Início</a>
          <a href="#/formulario" className={pagina === 'formulario' ? styles.ativo : ''}>Questionário</a>
          <a href="#/resultados" className={pagina === 'resultados' ? styles.ativo : ''}>Resultados</a>
        </nav>
      </header>

      <main className={styles.principal}>
        {!supabaseConfigurado && (
          <p className={styles.aviso}>
            Banco não configurado.
          </p>
        )}

        {pagina === 'inicio' && (
          <>
            <section className={styles.apresentacao}>
              <h1>Inteligência Artificial e sua integração na vida dos estudantes</h1>
              <p>
                Pesquisa escolar sobre a frequência do uso de ferramentas de inteligência artificial.
              </p>
              <div className={styles.acoes}>
                <a className={styles.botao} href="#/formulario">Responder questionário</a>
                <a href="#/resultados">Ver resultados</a>
              </div>
            </section>
            <Sobre />
          </>
        )}

        {pagina === 'formulario' && <Formulario tema={pesquisa} />}
        {pagina === 'resultados' && <Resultados tema={pesquisa} />}
      </main>

      <footer className={styles.rodape}>
        Projeto IWB2 - 4º Bimestre
      </footer>
    </div>
  );
}
