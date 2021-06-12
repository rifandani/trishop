import { Dispatch } from 'react'

// context initial state type
export interface InitialState {
  user: null | UserPayload
  dispatchUser: Dispatch<Action>
}

export type UserPayload = {
  email: string
  name: string
  // password: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
  _id: string
}

export type Action =
  | {
      type: 'ADD_USER'
      payload: UserPayload
    }
  | {
      type: 'DEL_USER'
      payload?: never
    }

export default function UserReducer(state: InitialState, action: Action) {
  switch (action.type) {
    case 'ADD_USER':
      return {
        ...state,
        user: action.payload,
      }

    case 'DEL_USER':
      return {
        ...state,
        user: null,
      }

    default:
      throw new Error('Unhandled action type')
  }
}
