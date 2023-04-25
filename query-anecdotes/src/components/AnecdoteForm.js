import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../request'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotify()
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes'),
    onError: (error) =>
      dispatch({
        type: 'SET',
        message: error.response.data.message
      }),
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    newAnecdoteMutation.mutate({ content, votes: 0 })
    dispatch({
      type: 'SET',
      message: content,
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
