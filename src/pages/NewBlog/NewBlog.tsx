// npm modules
import { useState } from 'react'

// components
import NewBlogForm from '../../components/NewBlogForm/NewBlogForm'

// stylesheets
import styles from './NewBlog.module.css'



const NewBlogPage = (): JSX.Element => {
  const [message, setMessage] = useState('')

  const updateMessage = (msg: string): void => setMessage(msg)

  return (
    <main className={styles.container}>
      <h1>New Blog</h1>
      <p>{message}</p>
      <NewBlogForm updateMessage={updateMessage} />
    </main>
  )
}

export default NewBlogPage