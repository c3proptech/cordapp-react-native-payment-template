import { Dimensions, Platform, StyleSheet } from 'react-native';
import Theme  from 'payment/configs/theme';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default {
    deviceHeight: deviceHeight,
    deviceWidth: deviceWidth,
    headerView: {
        backgroundColor: Theme.defaultPrimaryColor,
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 44 : 55,
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: Theme.darkPrimaryColor
    },
};
