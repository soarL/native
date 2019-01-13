import { NavigationActions } from '../utils';

export default {
  namespace: 'global',
  state: {

  },
  subscriptions: {

  },
  effects: {
    //页面跳转这里做权限处理
    *routerTo({payload},{call,put}){
      yield put(NavigationActions.navigate(payload))
    }
  },
  reducers: {
    default(state,action) {
      return { 
        ...state,
        ...action 
      }
    },
  }
}
