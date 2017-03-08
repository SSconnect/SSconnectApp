/* @flow */

import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

// Used via Metrics.baseMargin
const scales = {
	marginHorizontal: 10,
	marginVertical: 10,
	section: 25,
	baseMargin: 10,
	doubleBaseMargin: 20,
	smallMargin: 5,
	halfSmallMargin: 2.5,
	horizontalLineHeight: 1,
	searchBarHeight: 30,
	footerHeight: 120,
	footerRowHeight: 50,
	footerRow: {
		height: 50,
		paddingVertical: 5
	},
	screenWidth: width < height ? width : height,
	screenHeight: width < height ? height : width,
	navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
	statusBarHeight: (Platform.OS === 'ios') ? 20 : 20,
	buttonRadius: 4,
	icons: {
		tiny: 15,
		small: 20,
		medium: 30,
		large: 45,
		xl: 60
	},
	images: {
		small: 20,
		medium: 40,
		large: 60,
		logo: 300
	}
};

export default scales;
