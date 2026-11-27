import { useEffect, useState } from 'react';
import { supabase, supabaseConfigurado } from '../lib/supabaseClient.js';
import Barra from './Barra.jsx';
import styles from './Resultados.module.css';

export default function Resultados({ tema }) {
  const [dados, setDados] = useState([]);
  const [status, setStatus] = useState('carregando');
  const [versao, setVersao] = useState(0);

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      if (!supabaseConfigurado) {
        setStatus('configuracao');
        return;
      }
      setStatus('carregando');
      try {
        const { data, error } = await supabase
          .from('opinioes')
          .select('id, resposta_1, resposta_2, resposta_3')
          .eq('tema', tema.titulo)
          .order('id', { ascending: true });

        if (error) throw error;
        if (ativo) {
          setDados(data || []);
          setStatus('carregado');
        }
      } catch (error) {
        console.error('Falha na consulta:', error);
        if (ativo) setStatus('erro');
      }
    }

    carregar();
    return () => {
      ativo = false;
    };
  }, [tema.titulo, versao]);

  const validos = dados.filter(
    (resposta) =>
      tema.opcoes.includes(resposta.resposta_1) &&
      Number.isInteger(resposta.resposta_2) &&
      resposta.resposta_2 >= 1 &&
      resposta.resposta_2 <= 5
  );

  const total = validos.length;
  const contagens = tema.opcoes.map((opcao) => ({
    opcao,
    quantidade: validos.filter((resposta) => resposta.resposta_1 === opcao).length
  }));

  const media = total
    ? (validos.reduce((soma, resposta) => soma + resposta.resposta_2, 0) / total)
        .toFixed(1)
        .replace('.', ',')
    : null;

  const comentarios = validos
    .filter((resposta) => resposta.resposta_3?.trim())
    .slice()
    .reverse();

  return (
    <section className={styles.pagina}>
      <a href="#/">Voltar ao início</a>
      <h1>Resultados da pesquisa</h1>

      {supabaseConfigurado && (
        <button
          className={styles.atualizar}
          type="button"
          disabled={status === 'carregando'}
          onClick={() => setVersao((anterior) => anterior + 1)}
        >
          Atualizar
        </button>
      )}

      {status === 'carregando' && <p>Carregando respostas...</p>}
      {status === 'configuracao' && <p>Banco de dados não configurado.</p>}
      {status === 'erro' && <p className={styles.erro}>Erro ao carregar resultados.</p>}

      {status === 'carregado' && (
        <div>
          <p className={styles.total}>Total de respostas válidas: {total}</p>

          {total === 0 ? (
            <p>
              Nenhuma resposta registrada ainda. <a href="#/formulario">Responder agora</a>.
            </p>
          ) : (
            <>
              <section className={styles.bloco}>
                <h2>1. {tema.pergunta}</h2>
                <div className={styles.barras}>
                  {contagens.map(({ opcao, quantidade }) => (
                    <Barra key={opcao} opcao={opcao} quantidade={quantidade} total={total} />
                  ))}
                </div>
              </section>

              <section className={styles.bloco}>
                <h2>2. {tema.pergunta2}</h2>
                <p className={styles.media}>
                  <strong>{media}</strong> de 5
                </p>
              </section>

              <section className={styles.bloco}>
                <h2>3. {tema.pergunta3}</h2>
                {comentarios.length === 0 ? (
                  <p>Nenhum comentário enviado.</p>
                ) : (
                  <div className={styles.comentarios}>
                    {comentarios.map((resposta) => (
                      <p className={styles.comentario} key={resposta.id}>
                        {resposta.resposta_3}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      )}
    </section>
  );
}
