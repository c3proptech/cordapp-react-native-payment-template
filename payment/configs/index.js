import {
    Platform,
    Dimensions
} from 'react-native';

export const js_yyyy_mm_dd_hh_mm_ss = () => {
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

export const AppSpinerSize = {
    small: Platform.OS == 'ios' ? 'small' : 14,
    medium: Platform.OS == 'ios' ? 'small' : 20,
    large: Platform.OS == 'ios' ? 'large' : 24
};

export function IsIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812))
    );
};

export function IsIphoneXSMax() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 896 || dimen.width === 896))
    );
};
export function getStatusBarHeightDevice(){
    let StatusBarHeightIos = IsIphoneXSMax() ? 85 : 65;
    let StatusBarHeight = Platform.OS === 'ios' ? StatusBarHeightIos : 65;
    return StatusBarHeight;
}
export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (IsIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: StatusBar.currentHeight
    });
}

export function getBottomSpace() {
    return IsIphoneX() ? 34 : 0;
}