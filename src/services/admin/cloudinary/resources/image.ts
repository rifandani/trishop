import axios from 'axios'
// files
import { API_BASE_URL } from 'config/constants'

// create axios instance
const adminCloudinaryResourcesApi = axios.create({
  baseURL: `${API_BASE_URL}/admin/cloudinary/resources`,
})

/* ------------------------------------ resource_type = image ----------------------------------- */

// delete images resources in cloudinary
export async function deleteAdminCloudinaryImages(
  public_ids: string[]
): Promise<void> {
  await adminCloudinaryResourcesApi.delete(
    `/image?public_ids=${public_ids.join(',')}`
  )
}
