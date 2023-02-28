// npm packages
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// components
import UpdateBlogForm from '../../components/UpdateBlogForm/UpdateBlogForm'

// types
import { Blog, User } from '../../types/models'
interface BlogsPageProps {
  user:User;
}

const Blogs = (props:BlogsPageProps): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const navigate = useNavigate()

  const {user} = props
  useEffect((): void => {
    const fetchBlogs = async (): Promise<void> => {
      try {
        const blogData: Blog[] = await blogService.getAllBlogs()
        setBlogs(blogData)
      } catch (error) {
        console.log(error)
      }
    }
    fetchBlogs()
  }, [])

  const handleDeleteBlog = async (blogId: number): Promise<void> => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(blog => 
        blog.id !== blogId
      ))
      navigate('/blogs')
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  if(!blogs.length) return <p>No blogs yet</p>

  return (
    <main>
      {blogs.map((blog: Blog) =>
      <article key={blog.id}>
        <div className='blog-header'>
          <h3>{`${blog.owner.name}:`}</h3>
          {blog.owner.id === user.profile.id?
          <>
            <button onClick={()=>handleDeleteBlog(blog.id)}>X</button>
            <details id={`update-${blog.id}`}>
              <summary>Edit</summary>
              <UpdateBlogForm blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            </details>
          </>
          : 
          ""
          }
        </div>
        <img src={blog.photo} alt={`${blog.id}'s photo`} />
        <p>{blog.content}</p>
        {
          blog.likeReceived.length?
            <p>Likes: {blog.likeReceived.length}</p>
          :
            <p>You will be the first one likes on this!</p>
        }
        {
          blog.commentReceived.length?
            <p>{`${blog.commentReceived[0]?.owner.name} : ${blog.commentReceived[0]?.content}`}</p>
          :
            <p>You will be the first one comments on this!</p> 
        }
      </article>
      )}
    </main>
  )
}
 
export default Blogs
