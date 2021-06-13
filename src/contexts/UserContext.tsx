import { createContext, useReducer } from 'react'
// files
import UserReducer, { InitialState } from './UserReducer'
import { ChildrenProps } from 'types'

// context initial state
const initialState = {
  user: null,
  dispatchUser: () => null,
}

// create User context to consume
export const UserContext = createContext<InitialState>(initialState)

// User Context Provider
export const UserProvider = ({ children }: ChildrenProps): JSX.Element => {
  const [state, dispatchUser] = useReducer(UserReducer, initialState)

  return (
    <UserContext.Provider
      // value === return value dari useContext
      value={{
        user: state.user, // context state
        dispatchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
