// stylesheets
import styles from './Landing.module.css'

// types
import { User } from '../../types/models'

interface LandingProps {
  user: User | null;
}

const Landing = (props: LandingProps): JSX.Element => {
  const { user } = props

  return (
    <main className={styles.container}>
      <h1>{user ? "Share your Fun with us!" : "Welcome to Fun Blog!"}</h1>
      <img src="/landing.gif" alt="landingGif" />
    </main>
  )
}

export default Landing
