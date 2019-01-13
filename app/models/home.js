import { test } from '../services/api.js';

export default {
  namespace: 'home',
  state: {
    
  },
  effects: {
  },
  reducers: {
  	default(state,aciton){
  		return{
  			...state,
  			...aciton.payload
  		}
  	}
  },
}
