import { useSelector, useDispatch } from 'react-redux'
import { addVote  } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => {
    console.log(state.filter)
    return state.filter === 'ALL'
      ? state.anecdotes
      : state.anecdotes.filter((a) => a.content.includes(state.filter))
  })

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(addVote(anecdote.id))}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList
