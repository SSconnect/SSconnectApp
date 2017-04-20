// @flow

import React from 'react';
import { View, TouchableOpacity, Text, Linking } from 'react-native';
import { connect } from 'react-redux';

import moment from 'moment';

import { addRead } from '../../Containers/App/actions';
import { Colors } from '../../Themes/';
import type { Story } from '../../Types';

type Props = {
	story: Story,
	onAddRead: Function,
	readed: boolean,
};

type State = {
	readed: boolean,
};

class StoryCell extends React.PureComponent {
	props: Props;
	state: State = {
		readed: this.props.readed,
	};

	render() {
		const { story, onAddRead } = this.props;

		moment.updateLocale('ja');
		const timestamp = moment.utc(story.first_posted_at);
		const color = this.state.readed ? Colors.disable : Colors.black;
		return (
			<TouchableOpacity
				onPress={() => {
					onAddRead(story);
					const url = story.articles[0].url;
					this.setState({ readed: true });
					Linking.openURL(url);
				}}
			>
				<View style={{ padding: 10 }}>
					<View
						style={{
							marginBottom: 5,
							flex: 2,
							flexDirection: 'row',
							justifyContent: 'space-between',
						}}
					>
						<Text style={{ color: Colors.disable }}>{story.articles[0].blog.title}</Text>
						<Text style={{ color }}>{timestamp.fromNow()}</Text>
					</View>
					<Text style={{ fontSize: 20, color }}>{story.title}</Text>
					<Text style={{ marginTop: 5, color }}>{story.tag_list.join(',')}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	onAddRead: story => dispatch(addRead(story)),
});

export default connect(null, mapDispatchToProps)(StoryCell);
