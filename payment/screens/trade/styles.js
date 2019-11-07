const React = require('react-native');
import Theme  from 'payment/configs/theme';
const { StyleSheet, Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
export default {
	circleRed: {
	    width: 15,
	    height: 15,
	    borderRadius: 100/2,
	    backgroundColor: '#E84F61',
	    marginBottom : 2,
	    marginLeft : 2
	},
	circleBlue: {
	    width: 15,
	    height: 15,
	    borderRadius: 100/2,
	    backgroundColor: '#56B787',
	    marginBottom : 2,
	    marginLeft : 2
	},
	circleNull: {
	    width: 15,
	    height: 15,
	    borderRadius: 100/2,
	    backgroundColor: '#282C35',
	    marginBottom : 2,
	    marginLeft : 2
	},
	circleRedSmall: {
	    width: 7,
	    height: 7,
	    borderRadius: 100/2,
	    backgroundColor: '#E84F61',
	    marginBottom : 2,
	    marginLeft : 2
	},
	circleBlueSmall: {
	    width: 7,
	    height: 7,
	    borderRadius: 100/2,
	    backgroundColor: '#56B787',
	    marginBottom : 2,
	    marginLeft : 2
	},
	buyButton : {
		height :45,
		resizeMode:'contain',
		width :'100%' ,
		
	},
	icoinImage : {
		height :60,
		resizeMode:'contain',
		width :'95%' ,
	}

};
