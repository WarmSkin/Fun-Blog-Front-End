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
    <>
      {/* <h1>Hello. This is a list of all the blogs.</h1> */}
      {blogs.map((blog: Blog) =>
      <div>
        <img src={blog.photo} alt={`${blog.id}'s photo`} />
        <p key={blog.id}>{blog.content}</p>
      </div>
      )}
    </>
  )
}
 
export default Blogs
