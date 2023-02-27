// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// stylesheets
import styles from './NewBlogForm.module.css'

// types
import { NewBlogFormData, PhotoFormData } from '../../types/forms'
import { handleErrMsg } from '../../types/validators'

interface NewBlogProps {
  updateMessage: () => void;
}

const NewBlogForm = (props:NewBlogProps): JSX.Element => {
  const navigate = useNavigate()
  const {updateMessage} = props

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<NewBlogFormData>({
    content: '',
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (evt.target.files) setPhotoData({ photo: evt.target.files.item(0) })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      await blogService.newBlog(formData, photoData)
      navigate('/blogs')
    } catch (err) {
      console.log(err)
      handleErrMsg(err, updateMessage)
      setIsSubmitted(false)
    }
  }

  const { content } = formData

  const isFormInvalid = (): boolean => {
    return !(content)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <label htmlFor="content" className={styles.label}>Content</label>
        <input
          type="text"
          id="content"
          value={content}
          name="content"
          onChange={handleChange}
        />
      </div>
      
      <div className={styles.inputContainer}>
        <label htmlFor="photo-upload" className={styles.label}>
          Upload Photo
        </label>
        <input
          type="file"
          id="photo-upload"
          name="photo"
          onChange={handleChangePhoto}
        />
      </div>
      <div className={styles.inputContainer}>
        <button 
          disabled={isFormInvalid() || isSubmitted} 
          className={styles.button}
        >
          {!isSubmitted ? "Create" : "🚀 Sending..."}
        </button>
        <Link to="/blogs">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default NewBlogForm
