import styles from './Barra.module.css';

export default function Barra({ opcao, quantidade, total }) {
  const percentual = total ? (quantidade / total) * 100 : 0;

  return (
    <div>
      <div className={styles.rotulo}>
        <span>{opcao}</span>
        <strong>{quantidade} ({percentual.toFixed(0)}%)</strong>
      </div>
      <div className={styles.trilho}>
        <div className={styles.preenchimento} style={{ width: `${percentual}%` }} />
      </div>
    </div>
  );
}
