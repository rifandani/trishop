import { API_BASE_URL_ADMIN_CLOUDINARY_RESOURCE } from 'config/constants.config'
import { httpDelete } from 'services/http'

/* ------------------------------------ resource_type = image ----------------------------------- */

// delete images resources in cloudinary
export async function deleteAdminCloudinaryImages(
  public_ids: string[]
): Promise<void> {
  await httpDelete(
    `${API_BASE_URL_ADMIN_CLOUDINARY_RESOURCE}/image?public_ids=${public_ids.join(
      ','
    )}`
  )
}
