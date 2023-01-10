import sendRequest from './send-request'

const BASE_URL = '/api/categories'

export function fetchCategories() {
  return sendRequest(BASE_URL, 'GET', )
}


