import axios from 'axios'
import authors from '@constants/urls.js'

/**
 * Calls API to fetch list of authots, then returns parsed response or error.
 * @returns Parsed array of authors or error.
 */
export async function fetchAuthors () {
  try {
    const response = await axios.get(authors.authors)

    if (response.status === 200) {
      return await response.data
    }

    throw new Error(`Error while fetching authors, status code: ${response.status}`)
  } catch (error) {
    return error
  }
}
