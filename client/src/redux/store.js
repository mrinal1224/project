import {configureStore} from "@reduxjs/toolkit"
import loaderReducer from './loadersSlice'


const store = configureStore({
    reducer : {
      loader : loaderReducer
    }
})


export default store