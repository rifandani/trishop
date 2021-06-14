import { Dispatch } from 'react'

// context initial state type
export interface InitialState {
  user: null | UserPayload
  dispatchUser: Dispatch<Action>
}

export type UserPayload = {
  _id: string
  name: string
  email: string
  // password: string
  role: 'ADMIN' | 'USER'
  createdAt: string
  updatedAt: string
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

export default function UserReducer(
  state: InitialState,
  action: Action
): InitialState {
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
