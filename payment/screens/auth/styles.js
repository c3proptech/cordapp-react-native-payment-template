const React = require('react-native');
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
	marginTitle: {
		marginTop : -20
	},
	iconLogin :{
		width :'100%',
		height : 100,
		alignSelf : 'center',
	    justifyContent: 'center',
	    resizeMode:'contain',
	},
	slider: {
		height: 200,
		width :deviceWidth,
	},
	imageContainer: {
	    flex: 1,
	    width: deviceWidth,
	    height: deviceHeight,
	    flexDirection: 'row',
	    justifyContent: 'center',
	    alignItems: 'center',
		opacity: 0.9
	},
  	backgroundLogin:{
	  	backgroundColor: '#232629',
	  	flex: 1,
	  	resizeMode: 'stretch',
	},
	contentLogin : {
		marginLeft : 30,
		marginRight : 30,
	},
	labelStyle: {
	    marginLeft: 4,
	    fontSize: 14,
	    fontWeight: 'normal',
	    color: '#2f4f4f',
	},
	loginFormNew:{
		backgroundColor : '#ffffff',
		borderRadius : 5,
		paddingLeft : 15,
		paddingRight: 15,
		paddingBottom : 15,
	}

};
