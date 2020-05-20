import {createStore, compose} from 'redux'
import reducer from '../reducers'
import DevTools from '../containers/DevTools'

const enhancer = compose(DevTools.instrument())
export default function configureStore(initialState){
 const store = createStore(reducer, initialState, enhancer)
 return store;
}

// export default configureStore