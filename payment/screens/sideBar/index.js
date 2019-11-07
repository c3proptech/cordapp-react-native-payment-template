import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AppRegistry, Platform, Image, StatusBar, TouchableOpacity, TouchableHighlight, View, AsyncStorage } from "react-native";
import { Drawer,Container, Content, Text, List, ListItem, Left, Right, Icon, Body, Button, Spinner } from "native-base";
import I18n from 'react-native-i18n';
import { ifIphoneX } from 'payment/configs';
import { DrawerActions } from 'react-navigation-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

export class SideBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogingOut: false,
			isSetting: false
		};
		
	}

	closeDrawer = () => {
      this.drawer.close()
    };
    openDrawer = () => {
      this.drawer.open()
    };

	onLogout() {
		
	}
	onPressMenuItem(category) {
		this.props.navigation.navigate('Home');
	}

	render() {
		return (
			<View style={{height: '100%'}}>
					<View style={{ height: ifIphoneX(220, 200), width: '100%', backgroundColor: '#027bcc', paddingTop: ifIphoneX(20, 0) }}>
						<View style={{ position: "absolute", right: 10, top: ifIphoneX(50, 30), zIndex: 1 }}>
							<TouchableOpacity onPress={() => this.onLogout()} hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}>
								<View style={{ height: 40, width: 40, borderRadius: 20, borderColor: '#027bcc', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
									
								</View>
							</TouchableOpacity>
						</View>
						<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
							<View style={{ backgroundColor: 'white', width: 100, height: 100, borderRadius: 50 }}>
								{/*<Text>222222222</Text>*/}
							</View>
						</View>
						<View style={{ alignItems: 'center', marginTop: 10, alignContent: 'center' }}>
							<Text style={{ fontWeight: 'bold', color: 'white' }}>Jay Nguyen</Text>
							<TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }} onPress={() => { this.setState({ isSetting: !this.state.isSetting }) }}>
								<View style={{ marginTop: 5, flexDirection: 'row' }}>
									<View style={{ width: '100%', alignItems: 'center' }}>
										<Text style={{ color: 'white' }}>ID : 14468337</Text>
									</View>
									<View style={{ position: 'absolute', right: 15 }}>
										<Icon active type="FontAwesome" name={this.state.isSetting ? 'caret-up' : 'caret-down'} style={{ color: 'white', fontSize: 15, marginLeft: 20 }} />
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
					<Content>
						<ListItem icon  noBorder onPress={() => this.onPressMenuItem()}>
							<Left>
								<Button transparent style={{ backgroundColor: "#ffffff" }}>
									<MaterialIcons active  name='inbox' style={{ color: 'black', fontSize: 18 }} />
								</Button>
							</Left>
							<Body>
								<Text>Item 1</Text>
							</Body>
							<Right>
								<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 5, backgroundColor: 'red' }}><Text style={{ color: 'white', fontSize: 12 }}>aaa</Text></View>
							</Right>
						</ListItem>
						<ListItem icon  noBorder onPress={() => this.onPressMenuItem()}>
							<Left>
								<Button transparent style={{ backgroundColor: "#ffffff" }}>
									<MaterialIcons active  name='inbox' style={{ color: 'black', fontSize: 18 }} />
								</Button>
							</Left>
							<Body>
								<Text>Item 2</Text>
							</Body>
							<Right>
								<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 5, backgroundColor: 'red' }}><Text style={{ color: 'white', fontSize: 12 }}>aaa</Text></View>
							</Right>
						</ListItem>
						<ListItem icon  noBorder onPress={() => this.onPressMenuItem()}>
							<Left>
								<Button transparent style={{ backgroundColor: "#ffffff" }}>
									<MaterialIcons active  name='inbox' style={{ color: 'black', fontSize: 18 }} />
								</Button>
							</Left>
							<Body>
								<Text>Item 3</Text>
							</Body>
							<Right>
								<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 5, backgroundColor: 'red' }}><Text style={{ color: 'white', fontSize: 12 }}>aaa</Text></View>
							</Right>
						</ListItem>
						<ListItem icon  noBorder onPress={() => this.onPressMenuItem()}>
							<Left>
								<Button transparent style={{ backgroundColor: "#ffffff" }}>
									<MaterialIcons active  name='inbox' style={{ color: 'black', fontSize: 18 }} />
								</Button>
							</Left>
							<Body>
								<Text>Item 4</Text>
							</Body>
							<Right>
								<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 5, backgroundColor: 'red' }}><Text style={{ color: 'white', fontSize: 12 }}>aaa</Text></View>
							</Right>
						</ListItem>
						<ListItem icon  noBorder onPress={() => this.onPressMenuItem()}>
							<Left>
								<Button transparent style={{ backgroundColor: "#ffffff" }}>
									<MaterialIcons active  name='inbox' style={{ color: 'black', fontSize: 18 }} />
								</Button>
							</Left>
							<Body>
								<Text>Item 5</Text>
							</Body>
							<Right>
								<View style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 2, paddingBottom: 2, borderRadius: 5, backgroundColor: 'red' }}><Text style={{ color: 'white', fontSize: 12 }}>aaa</Text></View>
							</Right>
						</ListItem>
					</Content>
				</View>
		);
	}
}

function mapStateToProps(state) {
	return {
		
	};
}

function mapDispatchToProps(dispatch) {
	return {
		
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);