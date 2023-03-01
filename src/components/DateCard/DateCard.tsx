import styles from './DateCard.module.css'

interface DateCardProps {
  createdAt: string
}

const DateCard = (props: DateCardProps) => {
  const {createdAt} = props
  const date = new Date(createdAt).toLocaleDateString()
  return (
    <div className={styles.container}>
      <h5>{date}</h5>
    </div>
  )
}

export default DateCard