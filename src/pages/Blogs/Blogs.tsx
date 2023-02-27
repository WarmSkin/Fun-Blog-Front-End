// npm packages
import { useState, useEffect, useReducer } from 'react'

// services
import * as blogService from '../../services/blogService'

// types
import { Blog, User } from '../../types/models'
interface BlogsPageProps {
  user:User;
}

const Blogs = (props:BlogsPageProps): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([])
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

  // const handleDeleteBlog = async (evt: React.FormEvent): Promise<void> => {
  //   evt.preventDefault()
  //   try {
  //     await blogService.deleteBlog(blogId)
  //     navigate('/blogs')
  //   } catch (err) {
  //     console.log(err)
  //     throw err
  //   }
  // }

  if(!blogs.length) return <p>No blogs yet</p>

  return (
    <main>
      {blogs.map((blog: Blog) =>
      <article key={blog.id}>
        <div className='blog-header'>
          <h3>{`${blog.owner.name}:`}</h3>
          {blog.owner.id === user.profile.id? "X" : ""}
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
