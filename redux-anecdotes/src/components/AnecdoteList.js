import { useSelector, useDispatch } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import { updateNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    const filteredAnecdotes =
      state.filter === 'ALL'
        ? state.anecdotes
        : state.anecdotes.filter((a) => a.content.includes(state.filter))
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  })

  const handleVote = ({ id, content }) => {
    dispatch(incrementVote(id))
    dispatch(updateNotification(content, 5))
  }

  return (
    <div>
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

export default AnecdoteList
