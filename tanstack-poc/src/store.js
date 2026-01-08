import { Store } from '@tanstack/react-store'

export const store = new Store({
  count: 0,
})

export const incrementCount = () => {
  store.setState((state) => ({
    ...state,
    count: state.count + 1,
  }))
}

export const decrementCount = () => {
  store.setState((state) => ({
    ...state,
    count: state.count - 1,
  }))
}
