const React = require('react-native');
import Theme  from 'payment/configs/theme';
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
	slider: {
		height: 200,
		width :deviceWidth,
	},
	qrcode : {
		width : 150,
		height : 150,
		alignSelf : 'center',
	    justifyContent: 'center',
	    resizeMode:'contain',
	},
	imageContainer: {
	    flex: 1,
	    width: deviceWidth,
	    height: deviceHeight,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
		//opacity: 0.9
	},
	modal : {
	    zIndex : 3,
	    flex: 1,
	    flexDirection: 'column',
	    justifyContent: 'center',
	    alignItems: 'center',
	    backgroundColor: Theme.darkPrimaryColor,
	    paddingTop: 10,
	    paddingLeft: 10,
	    paddingRight: 10,
	    //borderRadius : 5
	},
};
