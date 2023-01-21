import axios from 'axios'

const useHTTP = () => {
  const request = async (url, method = 'get', data) => {
    try {
      const response = await axios.request({ method, url, data })

      return response.data
    } catch (error) {
      if (error.response) {
        console.log('Status:', error.response.status, error.response.data)
      } else if (error.request) {
        console.log('Error!', error.request)
      } else {
        console.log('Error!', error.message)
      }
    }
  }

  return { request }
}

export default useHTTP
