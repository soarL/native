import { NavigationActions } from '../utils';
import { test } from '../services/api';

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
    },
    *testAPI({payload},{call,put}){
      let data = yield call(test,payload);
      alert(data);
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
