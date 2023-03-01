// npm packages
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// services
import * as blogService from '../../services/blogService'

// components
import UpdateBlogForm from '../../components/UpdateBlogForm/UpdateBlogForm'
import AddCommentForm from '../../components/AddCommentForm/AddCommentForm'
import DateCard from '../../components/DateCard/DateCard'

// types
import { Blog, User } from '../../types/models'
interface BlogsPageProps {
  user:User;
}

// style
import styles from './Blogs.module.css'

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

  const handleGiveLike = async (blog: Blog, blogId: number): Promise<void> => {
    try {
      const newLike = await blogService.giveLike(blogId)
      setBlogs(blogs.map(blogS => {
        if(blogS.id === blog.id)
          blogS.likeReceived.push(newLike)
        return blogS
      }))
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  const handleRemoveLike = async (blog: Blog, likeId: number): Promise<void> => {
    try {
      await blogService.removeLike(likeId)
      setBlogs(blogs.map(blogS => {
        if(blogS.id === blog.id){
          const index = blogS.likeReceived.findIndex(like => like.id === likeId)
          blogS.likeReceived.splice(index, 1)
        }
        return blogS
      }))
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
  
  if(!blogs.length) 
    return (
    <main>
      <img src="/landing.gif" alt="landingGif" />
    </main>
    )

  return (
    <main>
      {blogs.map((blog: Blog) =>
      <article key={blog.id}>
        <div className= {styles.blogHeader}>
          <div className={styles.container}>
            <img src={blog.owner.photo} alt="The user's avatar" />
            <section>
            <h4>{blog.owner.name}</h4>
            <DateCard createdAt={blog.createdAt} />
            </section>
          </div>
          {blog.owner.id === user.profile.id?
          <div className={styles.blogEdit}>
            <details id={`update-${blog.id}`}>
              <summary>Edit</summary>
              <UpdateBlogForm blog={blog} blogs={blogs} setBlogs={setBlogs} handleDeleteBlog={handleDeleteBlog}/>
            </details>
          </div>
          : 
          ""
          }
        </div>
        <h3>{blog.content}</h3>
        <img src={blog.photo} alt={`${blog.id}'s photo`} />
        {
          blog.likeReceived.length?
            <>
              {blog.likeReceived.find(like => like.profileId === user.profile.id)?
              <>
              <button onClick={()=>handleRemoveLike(blog,
                blog.likeReceived.find(like => like.profileId === user.profile.id)!.id
                )}>
                  {blog.likeReceived.length} 💗
              </button>
              </>
              :
              <button onClick={()=>handleGiveLike(blog, blog.id)}>{blog.likeReceived.length} 💗</button> 
              }
            </>
          :
            <button onClick={()=>handleGiveLike(blog, blog.id)}>💗</button> 
        }
        {
          blog.commentReceived.length?
          <>
            <div className={styles.comments}>
              {blog.commentReceived.map((comment,index) =>
                <div className={styles.comment} key={`cc${comment.id}`}>
                  <div className={styles.container}>
                    <img src={comment.owner.photo} alt="The user's avatar" />
                    <section>
                    <h4>{comment.owner.name}</h4>
                    <DateCard createdAt={comment.createdAt} />
                    </section>
                  </div>
                  <p>
                    {`${comment.content}`}
                    {comment.owner.id === user.profile.id?
                      <button onClick={()=>handleDeleteComment(blog, comment.id, index)}>X</button>
                      :
                      ""
                    }
                  </p> 
                </div>
              )}
            </div>
            <details id={`comment-${blog.id}`}>
              <summary>Add Comment</summary>
              <AddCommentForm blog={blog} blogs={blogs} setBlogs={setBlogs}/>
            </details>
          </>
          :
          <>
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
