import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './request'
import { useNotify } from './NotificationContext'

const App = () => {
  const dispatch = useNotify()
  const queryClient = useQueryClient()
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({
      type: 'SET',
      message: anecdote.content,
    })
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
  })

  if (result.isLoading) {
    return <p>anecdote service not available due to problems in server</p>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
