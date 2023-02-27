// npm packages
import { useState, useEffect } from 'react'

// services
import * as blogService from '../../services/blogService'

// types
import { Blog } from '../../types/models'

const Blogs = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([])

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

  if(!blogs.length) return <p>No blogs yet</p>

  return (
    <main>
      {blogs.map((blog: Blog) =>
      <article key={blog.id}>
        <h3>{`${blog.owner.name}:`}</h3>
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
