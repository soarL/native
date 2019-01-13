import React from 'react';
import { AppRegistry,View } from 'react-native';
import dva from './utils/dva';
import Router, { routerMiddleware, routerReducer } from './app';
import * as models from './models';

const Model = (models=>{
	let ModelsArr = [];
	for(let i in models){
		ModelsArr.push(models[i])
	}
	return ModelsArr;
})(models)

const app = dva({
  initialState: {},
  models: Model,
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware],
  onError(e) {
    console.log('onError', e)
  },
})

const App = app.start(<Router />)


AppRegistry.registerComponent('car', () => App)
