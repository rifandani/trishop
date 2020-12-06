export interface Image {
  imageName: string;
  imageUrl: string;
}

export interface Product {
  createdAt: string;
  desc: string;
  images: Image[];
  labels: string[];
  price: number;
  stock: number;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

export interface InitialState {
  cart: Payload[];
}

export interface Payload extends Product {
  quantity: number;
}

export interface Action {
  type: string;
  payload: Payload | string;
}

export default (state: InitialState, { type, payload }: Action) => {
  switch (type) {
    case 'ADD_PRODUCT':
      return {
        ...state,
        cart: [...state.cart, payload],
      };
    default:
      return state;
  }
};
