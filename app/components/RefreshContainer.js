import React,{ PureComponent } from 'react';
import { COLOR } from '../themeColor';
import{
	ActivityIndicator,
	RefreshControl,
	StyleSheet,
	FlatList,
	View,
	Text
} from 'react-native';

let DataLength=0;
export default class RefreshContainer extends PureComponent{

	state={
		topRefresh:true,
		showFoot:0
	}

	_onTopRefresh = (topRefreshAction:Promise) => {
		if(!topRefreshAction){
			topRefreshAction = e=>{
				return new Promise((resolve,reject)=>{
					resolve()
				})
			}
		}
		this.setState({refreshing: true});
		topRefreshAction().then(res=>{
			this.setState({refreshing: false});
		},err=>{
			this.setState({refreshing: false});
		});
	}
	_onBottomRefresh = (bottomRefreshAction:Promise)=>{
		this.setState({showFoot:2})
		bottomRefreshAction().then(e=>{
			if(this.props.data.length === DataLength){
				this.setState({showFoot:1})
			}else{
				this.setState({showFoot:0})
			}
		})
	}

	render(){
		const {style,topRefreshAction,data,renderItem,bottomRefreshAction,loading} = this.props; 
		DataLength = data.length;
		if(loading){
			return(
				<View style={[{flex:1,alignItems:'center',justifyContent:'center'}]}>
					<ActivityIndicator 
						color={COLOR.theme}
						size='large'
					/>
				</View>
			)
		}else{
			return(
				<FlatList 
					style={[{backgroundColor:'#fff'},style]}
					refreshControl={
					  <RefreshControl
					    refreshing={this.state.refreshing}
					    colors={[COLOR.theme]}
					    onRefresh={e=>this._onTopRefresh(topRefreshAction)}
					  />
					}
					data={data}
					renderItem={renderItem}
					onEndReached={e=>{this._onBottomRefresh(bottomRefreshAction)}}
					onEndReachedThreshold={0.1}
					ListFooterComponent={this._renderFooter}
					initialNumToRender={3}
				/>
			)
		}
	}

	_renderFooter = ()=>{
	    if (this.state.showFoot === 1) {
	        return (
	            <View style={styles.footer}>
	                <Text style={styles.footerText}>
	                    没有更多数据了
	                </Text>
	            </View>
	        );
	    } else if(this.state.showFoot === 2) {
	        return (
	            <View style={styles.footer}>
	                <ActivityIndicator 
	                	color={COLOR.theme}
	                />
	                <Text>正在加载...</Text>
	            </View>
	        );
	    } else if(this.state.showFoot === 0){
	        return (
	            <View style={styles.footer}>
	                <Text></Text>
	            </View>
	        );
	    }
	}
}


const styles = StyleSheet.create({
    footer:{
        flexDirection:'row',
        height:24,
        justifyContent:'center',
        alignItems:'center',
        marginBottom:10,
    },
    footerText:{
    	color:'#999',
    	fontSize:14,
    	marginTop:5,
    	marginBottom:5,
    }
});
