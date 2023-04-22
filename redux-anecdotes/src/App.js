import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import NewAnecdote from './components/NewAnecdote.js'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <NewAnecdote />
    </div>
  )
}

export default App
