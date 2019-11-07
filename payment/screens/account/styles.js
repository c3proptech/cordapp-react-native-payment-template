const React = require('react-native');
import Theme  from 'payment/configs/theme';
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
	iconLogin :{
		width :'100%',
		alignSelf : 'center',
	    justifyContent: 'center',
	    resizeMode:'contain',
	},
	imageContainer: {
	    flex: 1,
	    width: deviceWidth,
	    height: deviceHeight,
	    flexDirection: 'row',
	    //justifyContent: 'center',
	    //alignItems: 'center',
		opacity: 0.9
	},
	separator : {
		height : 55,
	},
	separatorText:{
		fontSize : 16
	},
	modal : {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(52, 52, 52, 0.3)',
		padding: 10
	},
	formPassWord:{
		backgroundColor : '#ffffff',
		borderRadius : 5,
		paddingLeft : 15,
		paddingRight: 15,
		paddingBottom : 15,
		width: deviceWidth - 50,
	}
};
