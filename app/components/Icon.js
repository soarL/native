import React from 'react'; 
import { Image } from 'react-native';

const SRC = {
	home:require('../images/house.png')
	,person:require('../images/person.png')
}

export default ({type,...params})=>{
	return(
		<Image
		  style={[{...params}]}
		  source={SRC[type]}
		/>
	)
}

