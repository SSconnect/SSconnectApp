/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  Text,
  Linking,
  ListView,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

import Indicator from '../../Components/Indicator';

import feedClient from '../../Services/FeedClient';
import type {Article} from '../../Services/FeedClient';
import realm from '../../Models/RealmModel';

type Props = {
}

type State = {
  dataSource: any,
  loading: boolean
}

const rowHasChanged = (r1: Article, r2: Article) => r1 == r2;

class HomeScreen extends PureComponent {
	props: Props
	state: State = {
		dataSource: new ListView.DataSource({rowHasChanged}).cloneWithRows([]),
		loading: true
	}

	componentDidMount() {
		this.init();
	}

	async init() {
		const articles = await feedClient.getArticles();
		console.log(articles);
		this.setState({
			dataSource: this.state.dataSource.cloneWithRows(articles),
			loading: false
		});
	}

	renderRow(article: Article, sectionID: number) {
		return (
			<TouchableOpacity
				onPress={() => {
					realm.write(() => {
						realm.create('Read', {
							url: article.url
						});
					});
					Linking.openURL(article.url);
					// article.read = true;
				}}
				>
				<View style={{padding: 10}}>
					<Text>{article.blog.title}</Text>
					<Text style={{fontSize: 20}}>{article.title}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={{marginTop: 40, marginBottom: 50}}>
				<ListView
					renderRow={this.renderRow}
					dataSource={this.state.dataSource}
					enableEmptySections
					renderFooter={this.renderFooter.bind(this)}
					/>
			</View>
		);
	}

	renderFooter() {
		return (<Indicator loading={this.state.loading}/>);
	}
}

const styles = StyleSheet.create({
	readed: {
		color: 'gray'
	}
});

export default HomeScreen;
