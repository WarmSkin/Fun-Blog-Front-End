// npm modules
import { useState } from 'react'

// services
import * as blogService from '../../services/blogService'

// stylesheets
import styles from './AddCommentForm.module.css'

// types
import { CommentFormData } from '../../types/forms'
import { Blog, Comment } from '../../types/models'

interface AddCommentProps {
  blog: Blog;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
}


const AddCommentForm = (props:AddCommentProps): JSX.Element => {
  const {blog, blogs, setBlogs} = props
  
  const details = document.getElementById(`comment-${blog.id}`)!

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<CommentFormData>({
    content: ""
  })

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async (evt: React.FormEvent): Promise<void> => {
    evt.preventDefault()
    if(isSubmitted) return
    try {
      setIsSubmitted(true)
      const newComment = await blogService.leaveComment(formData, blog.id)
      setBlogs(blogs.map(blogS => 
        {if(blogS.id === blog.id) 
          blogS.commentReceived.push(newComment)
        return blogS
        }))
      details.removeAttribute("open")
      setIsSubmitted(false)
      setFormData({content: ""})
    } catch (err) {
      console.log(err)
      setIsSubmitted(false)
    }
  }

  const handleCancel = async (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
    evt.preventDefault()
    details.removeAttribute("open")
    setFormData({content: ""})
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

export default AddCommentForm
