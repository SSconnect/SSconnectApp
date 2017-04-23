// @flow

import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { loadProfiles, loadReads } from '../../reduxs/actions';
import { makeSelectProfiles } from '../../reduxs/selectors';

import realm from '../../models/RealmModel';
import NavigationRouter from '../../routers/NavigationRouter';

import type { Profile } from '../../types';

// Styles
const styles = StyleSheet.create({
	applicationView: {
		flex: 1,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		// fontFamily: Fonts.type.base,
		// margin: Metrics.baseMargin,
	},
	myImage: {
		width: 200,
		height: 200,
		alignSelf: 'center',
	},
});

type Props = {
	profiles: Array<Profile>,
	loadProfiles: Function,
	loadReads: Function,
};

class RootContainer extends React.Component {
	props: Props;

	componentDidMount() {
		realm.getReads();
		// if redux persist is not active fire startup action
		// if (!ReduxPersist.active) {
		this.props.loadProfiles();
		this.props.loadReads();
		// }
	}

	componentWillReceiveProps() {
		this.forceUpdate();
	}

	render() {
		return (
			<View style={styles.applicationView}>
				<StatusBar barStyle="default" />
				<NavigationRouter profiles={this.props.profiles} />
			</View>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	profiles: makeSelectProfiles(),
});

const mapDispatchToProps = dispatch => ({
	loadProfiles: () => dispatch(loadProfiles()),
	loadReads: () => dispatch(loadReads()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);
