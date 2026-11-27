import { useState } from 'react';
import { supabase, supabaseConfigurado } from '../lib/supabaseClient.js';
import styles from './Formulario.module.css';

export default function Formulario({ tema }) {
  const [resposta1, setResposta1] = useState('');
  const [resposta2, setResposta2] = useState(0);
  const [resposta3, setResposta3] = useState('');
  const [status, setStatus] = useState('inicial');

  async function enviar(event) {
    event.preventDefault();
    if (status === 'enviando') return;

    if (!tema.opcoes.includes(resposta1) || resposta2 < 1 || resposta2 > 5) {
      setStatus('validacao');
      return;
    }
    if (!supabaseConfigurado) {
      setStatus('configuracao');
      return;
    }

    setStatus('enviando');
    try {
      const { error } = await supabase.from('opinioes').insert({
        tema: tema.titulo,
        resposta_1: resposta1,
        resposta_2: resposta2,
        resposta_3: resposta3.trim() || null
      });
      if (error) throw error;
      setStatus('enviado');
    } catch (error) {
      console.error('Falha no envio:', error);
      setStatus('erro');
    }
  }

  if (status === 'enviado') {
    return (
      <section className={styles.pagina}>
        <h1>Resposta registrada</h1>
        <p>Sua participação foi salva com sucesso.</p>
        <div className={styles.acoes}>
          <a className={styles.botao} href="#/resultados">Ver resultados</a>
          <a href="#/">Voltar ao início</a>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.pagina}>
      <a href="#/">Voltar ao início</a>
      <h1>Questionário</h1>
      <p>As perguntas 1 e 2 são obrigatórias. A pergunta 3 é opcional e o envio é anônimo.</p>

      <form className={styles.formulario} onSubmit={enviar}>
        <div className={styles.campo}>
          <p className={styles.pergunta}>1. {tema.pergunta}</p>
          <div className={styles.opcoes}>
            {tema.opcoes.map((opcao) => (
              <label className={styles.opcao} key={opcao}>
                <input
                  type="radio"
                  name="resposta1"
                  value={opcao}
                  checked={resposta1 === opcao}
                  onChange={(event) => {
                    setResposta1(event.target.value);
                    setStatus('inicial');
                  }}
                />
                {opcao}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.campo}>
          <p className={styles.pergunta}>2. {tema.pergunta2}</p>
          <div className={styles.escala}>
            {[1, 2, 3, 4, 5].map((numero) => (
              <label className={styles.nota} key={numero}>
                <input
                  type="radio"
                  name="resposta2"
                  value={numero}
                  checked={resposta2 === numero}
                  onChange={() => {
                    setResposta2(numero);
                    setStatus('inicial');
                  }}
                />
                {numero}
              </label>
            ))}
          </div>
          <div className={styles.extremos}>
            <span>1: Não confio</span>
            <span>5: Confio totalmente</span>
          </div>
        </div>

        <div className={styles.campo}>
          <p className={styles.pergunta}>3. {tema.pergunta3} (opcional)</p>
          <textarea
            rows="4"
            maxLength="500"
            value={resposta3}
            placeholder="Escreva aqui sem incluir nomes ou dados pessoais."
            onChange={(event) => {
              setResposta3(event.target.value);
              setStatus('inicial');
            }}
          />
          <p className={styles.contador}>{resposta3.length} / 500</p>
        </div>

        {status === 'validacao' && <p className={styles.erro}>Responda às perguntas 1 e 2 antes de enviar.</p>}
        {status === 'configuracao' && <p className={styles.erro}>Banco de dados não configurado.</p>}
        {status === 'erro' && <p className={styles.erro}>Erro ao enviar resposta. Tente novamente.</p>}

        <button className={styles.botao} type="submit" disabled={status === 'enviando'}>
          {status === 'enviando' ? 'Enviando...' : 'Enviar resposta'}
        </button>
      </form>
    </section>
  );
}
