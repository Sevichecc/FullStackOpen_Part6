import { useReducer, createContext, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.message
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ''
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotify = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  const dispatch = notificationAndDispatch[1]
  return (message) => {
    dispatch({ type: 'SET', message })
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
  }
}

export default NotificationContext
