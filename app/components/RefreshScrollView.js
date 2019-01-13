import React,{ PureComponent } from 'react';
import { COLOR } from '../themeColor';
import{
	ScrollView,
	RefreshControl,
} from 'react-native';

export default class RefreshContainer extends PureComponent{
	state={
		topRefresh:false
	}
	_onRefresh = (refreshAction:Promise) => {
		if(!refreshAction){
			refreshAction = e=>{
				return new Promise((resolve,reject)=>{
					resolve()
				})
			}
		}
		this.setState({refreshing: true});
		refreshAction().then(res=>{
			this.setState({refreshing: false});
		},err=>{
			this.setState({refreshing: false});
		});
	}
	render(){
		const { children,style,topRefreshAction} = this.props; 
		return(
			<ScrollView 
				style={[{backgroundColor:'#fff'},style]}
				refreshControl={
				  <RefreshControl
				    refreshing={this.state.refreshing}
				    colors={[COLOR.theme]}
				    onRefresh={e=>this._onRefresh(topRefreshAction)}
				  />
				}
				keyboardDismissMode='on-drag'
				bounces={true}
			>
				{children}
			</ScrollView>
		)
	}
}