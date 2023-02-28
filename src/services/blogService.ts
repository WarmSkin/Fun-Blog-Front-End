// services
import * as tokenService from './tokenService'

// types
import { 
  BlogFormData,
  PhotoFormData,
  CommentFormData
} from '../types/forms'
import { Blog, Comment } from '../types/models'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/blogs`

async function getAllBlogs(): Promise<Blog[]> {
  try {
    const res = await fetch(BASE_URL, {
      headers: { 'Authorization': `Bearer ${tokenService.getToken()}` },
    })
    return await res.json() as Blog[]
  } catch (error) {
    throw error
  }
}

async function addPhoto(
  photoData: FormData, 
  blogId: number
): Promise<string> {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}/add-photo`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

async function newBlog(
  formData: BlogFormData, 
  photoFormData: PhotoFormData,
): Promise<Blog> {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const blog = await res.json()
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      blog.photo = await addPhoto(photoData, blog.id)
    }
    return blog as Blog
  } catch (error) {
    throw error
  }
}

async function deleteBlog(blogId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

async function giveLike(blogId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${blogId}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

async function removeLike(likeId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${likeId}/like`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

async function updateBlog(
  formData: BlogFormData, 
  photoFormData: PhotoFormData,
  blogId: number,
): Promise<Blog> {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`, 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const blog = await res.json()
    if (photoFormData.photo) {
      const photoData = new FormData()
      photoData.append('photo', photoFormData.photo)
      blog.photo = await addPhoto(photoData, blog.id)
    }
    return blog as Blog
  } catch (error) {
    throw error
  }
}

async function leaveComment(
    formData: CommentFormData, 
    blogId: number,
  ): Promise<Comment> {
  try {
    const res = await fetch(`${BASE_URL}/${blogId}/comment`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    return await res.json()
  } catch (error) {
    throw error
  }
}

async function deleteComment(commentId: number): Promise<void> {
  try {
    await fetch(`${BASE_URL}/${commentId}/comment`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export {
  getAllBlogs,
  addPhoto, 
  newBlog, 
  deleteBlog, 
  updateBlog, 
  giveLike, 
  removeLike, 
  leaveComment, 
  deleteComment,
}
