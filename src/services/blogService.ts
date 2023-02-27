// services
import * as tokenService from './tokenService'

// types
import { 
  NewBlogFormData,
  PhotoFormData
} from '../types/forms'
import { Blog } from '../types/models'

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
  formData: NewBlogFormData, 
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
    console.log(photoFormData)
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
    const res = await fetch(`${BASE_URL}/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export { getAllBlogs, addPhoto, newBlog, deleteBlog }
