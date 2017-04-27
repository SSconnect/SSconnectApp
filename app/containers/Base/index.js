// @flow

import React from 'react';
import { View, Text, ListView, ScrollView, Alert } from 'react-native';
import { Button } from 'react-native-elements';

import { connect } from 'react-redux';
import _ from 'lodash';

import config from '../../configs';

import { addProfile, loadStories, updatePage } from '../../reduxs/actions';
import {
	selectReads,
	selectProfilesCount,
	selectLoading,
	makeSelectStories,
	makeSelectPageInfo,
} from '../../reduxs/selectors';

import Indicator from '../../components/Indicator';
import StoryCell from '../../components/StoryCell';
import Paginator from '../../components/Paginator';

import realm from '../../models/RealmModel';

import type { Story, Profile, Read, PageInfo } from '../../types';
import { Scales, IconName } from '../../themes/';
import SearchBar from '../../components/StorySearchBar';

type Props = {
	profile: Profile,
	isHome: boolean,
	onAddProfile: Function,
	onLoadStories: Function,
	onUpdatePage: Function,
	reads: Array<Read>,
	profilesCount: number,
	loading: boolean,
	pageInfo: PageInfo,
	stories: Array<Story>,
};

type State = {
	dataSource: any,
	addDisable: boolean,
};

class BaseScreen extends React.PureComponent {
	props: Props;
	state: State = {
		dataSource: new ListView.DataSource({ rowHasChanged: BaseScreen.rowHasChanged }).cloneWithRows(
			this.props.stories,
		),
		addDisable: false,
	};

	static defaultProps = {
		profile: { q: '', tag: '' },
		pageInfo: { page: 1 },
		loading: true,
		isHome: false,
		reads: [],
		profilesCount: 0,
		stories: [],
	};

	static rowHasChanged(r1: Story, r2: Story) {
		return r1.id !== r2.id;
	}

	componentWillMount() {
		this.props.onLoadStories(this.props.profile, this.props.pageInfo.page);
	}

	componentWillReceiveProps(newProps: Props) {
		this.forceUpdate();
		if (this.props.pageInfo.page !== newProps.pageInfo.page) {
			this.props.onLoadStories(newProps.profile, newProps.pageInfo.page);
		}
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(newProps.stories),
		});
	}

	renderSubscribeButton() {
		const { profile, isHome, onAddProfile } = this.props;
		if (isHome || realm.existsProfile(profile)) {
			return null;
		}
		return (
			<View style={{ margin: 5 }}>
				<Button
					raised
					backgroundColor="black"
					title="ブックマーク"
					icon={{ name: IconName.add }}
					disabled={this.state.addDisable}
					onPress={() => {
						if (this.props.profilesCount >= config.LIMITS.PROFILE_MAX.FREE) {
							Alert.alert('失敗', 'タグは 3つまでしか登録できません。(Free プラン)');
							return;
						}
						onAddProfile(profile);
						this.setState({ addDisable: true });
						if (profile.q && profile.tag) {
							Alert.alert('完了', `「${profile.tag}|${profile.q}」を登録しました`);
						} else if (profile.tag) {
							Alert.alert('完了', `タグ「${profile.tag || ''}」を登録しました`);
						} else {
							Alert.alert('完了', `「${profile.q}」を登録しました`);
						}
					}}
				/>
			</View>
		);
	}

	renderListView() {
		if (this.props.loading || this.state.dataSource.getRowCount() === 0) {
			return null;
		}
		const { reads } = this.props;
		const readedIds = _.map(reads, e => e.story_id);
		return (
			<ListView
				renderRow={story => <StoryCell story={story} readed={readedIds.includes(story.id)} />}
				dataSource={this.state.dataSource}
				enableEmptySections
				distanceToLoadMore={100}
				// onRefresh={() => this.init()}
				refreshDescription=""
			/>
		);
	}

	renderNoHit() {
		if (this.props.loading || this.state.dataSource.getRowCount() > 0) {
			return null;
		}
		return <Text style={{ padding: 10 }}>作品は見つかりませんでした</Text>;
	}

	renderPager() {
		if (this.props.loading || this.state.dataSource.getRowCount() === 0) {
			return null;
		}
		return (
			<Paginator
				pageInfo={this.props.pageInfo}
				onPressPrev={() => {
					this.handlePageChange(this.props.pageInfo.page - 1);
				}}
				onPressNext={() => {
					this.handlePageChange(this.props.pageInfo.page + 1);
				}}
				onComplete={this.handlePageChange.bind(this)}
			/>
		);
	}

	handlePageChange(page) {
		this.props.onUpdatePage(this.props.profile, page);
	}

	render() {
		const { profile, isHome } = this.props;
		return (
			<ScrollView
				style={{ marginTop: Scales.navBarHeight, marginBottom: isHome ? Scales.footerHeight : 0 }}
			>
				<SearchBar profile={profile} />
				{this.renderPager()}
				{this.renderSubscribeButton()}
				{this.renderListView()}
				{this.renderPager()}
				<Indicator loading={this.props.loading} />
				{this.renderNoHit()}
			</ScrollView>
		);
	}
}

const makeMapStateToProps = () => {
	const selectStories = makeSelectStories();
	const selectPageInfo = makeSelectPageInfo();
	return (state, props) => ({
		reads: selectReads(state, props),
		stories: selectStories(state, props),
		pageInfo: selectPageInfo(state, props),
		profilesCount: selectProfilesCount(state, props),
		loading: selectLoading(state, props),
	});
};

const mapDispatchToProps = dispatch => ({
	onAddProfile: (profile: Profile) => dispatch(addProfile(profile)),
	onLoadStories: (profile: Profile, page: number) => dispatch(loadStories(profile, page)),
	onUpdatePage: (profile: Profile, page: number) => dispatch(updatePage(profile, page)),
});

export default connect(makeMapStateToProps, mapDispatchToProps)(BaseScreen);
