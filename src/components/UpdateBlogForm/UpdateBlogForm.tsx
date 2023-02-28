// npm modules
import { useState } from 'react'

// services
import * as blogService from '../../services/blogService'

// stylesheets
import styles from './UpdateBlogForm.module.css'

// types
import { BlogFormData, PhotoFormData } from '../../types/forms'
import { Blog } from '../../types/models'

interface UpdateBlogProps {
  blog: Blog;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}


const UpdateBlogForm = (props:UpdateBlogProps): JSX.Element => {
  const {blog, blogs, setBlogs} = props
  
  const details = document.getElementById(`update-${blog.id}`)!

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<BlogFormData>({
    content: blog.content,
  })
  const [photoData, setPhotoData] = useState<PhotoFormData>({
    photo: null
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
      const newBlog = await blogService.updateBlog(formData, photoData, blog.id)
      setBlogs([newBlog,...blogs.filter(blog => blog.id !== newBlog.id)])
      details.removeAttribute("open")
      setIsSubmitted(false)
    } catch (err) {
      console.log(err)
      setIsSubmitted(false)
    }
  }

  const handleCancel = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    evt.preventDefault()
    details.removeAttribute("open")
    setPhotoData({photo: null})
    setFormData({content: blog.content})
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
        <img src={blog.photo} alt="This blog's photo" />
        <label htmlFor="photo-upload" className={styles.label}>
          Change Photo
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
          {!isSubmitted ? "Update" : "🚀 Sending..."}
        </button>
          <button onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default UpdateBlogForm
