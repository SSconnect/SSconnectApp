// @flow

import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Slider } from 'react-native-elements';

import { IconName } from '../../themes/';
import PagingButton from '../../components/PagingButton';
import type { PageInfo } from '../../types';

type Props = {
	pageInfo: PageInfo,
	onComplete: Function,
	onPressNext: Function,
	onPressPrev: Function,
};

type State = {
	previewPage: number,
};

class Pager extends React.PureComponent {
	props: Props;
	state: State = {
		previewPage: this.props.pageInfo.current,
	};

	render() {
		const { pageInfo, onComplete, onPressNext, onPressPrev } = this.props;
		return (
			<View style={{ flexDirection: 'row' }}>
				<PagingButton icon={{ name: IconName.prev }} onPress={onPressPrev} />
				<Text
					style={{
						flex: 1,
						textAlign: 'center',
						paddingTop: 12,
					}}
				>
					{pageInfo.current}/{pageInfo.max}
				</Text>
				<Slider
					value={pageInfo.current}
					style={{ flex: 4 }}
					step={1}
					thumbTintColor="#333"
					maximumValue={pageInfo.max}
					minimumValue={1}
					onSlidingComplete={onComplete}
					onValueChange={(value) => {
						this.setState({ previewPage: value });
					}}
				/>
				<PagingButton icon={{ name: IconName.next }} onPress={onPressNext} />
			</View>
		);
	}
}

export default Pager;
