import styles from './skeleton.module.css';

export function SkeletonLoading() {
  return (
    <div className={styles.skeletonTableContainer}>
      <table>
        <thead>
          <tr>
            <th scope="col">Moeda</th>
            <th scope="col">Valor mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume</th>
            <th scope="col">Mudança 24h</th>
          </tr>
        </thead>
        <tbody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <tr key={index}>
                <td>
                  <div className={styles.skeleton}></div>
                </td>
                <td>
                  <div className={styles.skeleton}></div>
                </td>
                <td>
                  <div className={styles.skeleton}></div>
                </td>
                <td>
                  <div className={styles.skeleton}></div>
                </td>
                <td>
                  <div className={styles.skeleton}></div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
