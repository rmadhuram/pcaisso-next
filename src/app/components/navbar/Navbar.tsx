import styles from './Navbar.module.scss';

export default function Navbar() {
  return (
    <div className={styles['navbar']}>
      <h3>
        Pc<span>ai</span>sso
      </h3>
    </div>
  );
}
