import axios from 'axios'

const useHTTP = () => {
  const request = async (url, method = 'get', data) => {
    try {
      const response = await axios.request({ method, url, data })

      return response.data
    } catch (error) {
      if (error.response) {
        console.log('Response: ', error.response)
      }
      if (error.request) {
        console.log('Request: ', error.request)
      }

      // console.log(error.toJSON())

      throw error.toJSON()
    }
  }

  return { request }
}

export default useHTTP
