// npm packages
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// components
import UpdateBlogForm from '../../components/UpdateBlogForm/UpdateBlogForm'
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm'

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

  const handleGiveLike = async (blogId: number): Promise<void> => {
    try {
      await blogService.giveLike(blogId)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const handleRemoveLike = async (likeId: number): Promise<void> => {
    try {
      await blogService.removeLike(likeId)
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const handleDeleteComment = async (blog: Blog,commentId: number, index: number): Promise<void> => {
    try {
      await blogService.deleteComment(commentId)
      setBlogs(blogs.map(blogS => {
        if(blogS.id === blog.id)
          blogS.commentReceived.splice(index, 1)
        return blogS
      }))
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
            <>
              {blog.likeReceived.find(like => like.profileId === user.profile.id)?
              <>
              <button onClick={()=>handleRemoveLike(
                blog.likeReceived.find(like => like.profileId === user.profile.id)!.id
                )}>
                  {blog.likeReceived.length} 💗
              </button>
              </>
              :
              <button onClick={()=>handleGiveLike(blog.id)}>{blog.likeReceived.length} 💗</button> 
              }
            </>
          :
            <button onClick={()=>handleGiveLike(blog.id)}>💗</button> 
        }
        {
          blog.commentReceived.length?
          <>
            {blog.commentReceived.map((comment,index) =>
            <>
            <p>
              {`${comment.owner.name} : ${comment.content}`}
              {comment.owner.id === user.profile.id?
                <button onClick={()=>handleDeleteComment(blog, comment.id, index)}>X</button>
              :
                ""
              }
            </p> 
            </>
              )}
              <details id={`comment-${blog.id}`}>
                <summary>Add Comment</summary>
                <AddCommentForm blog={blog} blogs={blogs} setBlogs={setBlogs}/>
              </details>
          </>
          :
          <>
            <p>You will be the first one comments on this!</p>
            <details id={`comment-${blog.id}`}>
                <summary>Add Comment</summary>
                <AddCommentForm blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            </details>
          </>
        }
      </article>
      )}
    </main>
  )
}
 
export default Blogs
