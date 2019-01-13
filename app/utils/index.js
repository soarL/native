import { Dimensions ,Platform} from 'react-native';

export { NavigationActions, StackActions } from 'react-navigation';

export const AuthorityNavigationActions = (payload,params)=>({type:'global/Authority',payload,params});

export const delay = time => new Promise(resolve => setTimeout(resolve, time));

export const createAction = type => payload => ({ type, payload });

export const RouteTo = payload=>({type:'global/routerTo',payload});


const screenW = Dimensions.get('window').width;
const screenH = Dimensions.get('window').height;

const X_WIDTH = 375;
const X_HEIGHT = 812;

export const  isIphoneX = ()=> {
    return (
        Platform.OS === 'ios' &&((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}
