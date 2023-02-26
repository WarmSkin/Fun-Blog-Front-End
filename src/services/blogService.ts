// services
import * as tokenService from './tokenService'

// types
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
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: photoData
    })
    return await res.json() as string
  } catch (error) {
    throw error
  }
}

export { getAllBlogs, addPhoto }
