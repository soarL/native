export { NavigationActions, StackActions } from 'react-navigation';

export const AuthorityNavigationActions = (payload,params)=>({type:'global/Authority',payload,params});

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const createAction = type => payload => ({ type, payload });

export const RouteTo = payload=>({type:'global/routerTo',payload});