import axios from 'axios'
import authors from '@constants/urls.js'

/**
 * Fetches single author by given id. Returns parsed author or error.
 * @param {string | number} id Author's id.
 * @returns Parsed author or error.
 */

export async function fetchAuthor (id) {
  try {
    const response = await axios.get(`${authors.authors}/${id}`)

    if (response.status === 200) {
      return await response.data
    }
    throw new Error(`Error while getting author, status code: ${response.status}`)
  } catch (error) {
    return error
  }
}
