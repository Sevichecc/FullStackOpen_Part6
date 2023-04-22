import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const createNew = async (content) => {
  const object = {
    content,
    votes: 0,
  }
  const { data } = await axios.post(baseUrl, object)
  return data
}

const addVote = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  const response = await axios.put(`${baseUrl}/${id}`, {
    ...data,
    votes: data.votes + 1,
  })
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, createNew, addVote }
