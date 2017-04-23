// @flow

import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { profileSerialKey } from '../types/utils';

const selectGlobal = (state: Object) => fromJS(state).get('app');
const selectStories = state => selectGlobal(state).get('stories');
const selectProfiles = state => selectGlobal(state).get('profiles');

const makeSelectLoading = createSelector(selectGlobal, state => state.get('loading'));

const makeSelectError = createSelector(selectGlobal, state => state.get('error'));

const makeSelectProfiles = createSelector(selectProfiles, state => state);

const makeExistsProfiles = createSelector(selectProfiles, state => state.includes(''));

const makeSelectProfilesCount = createSelector(selectProfiles, state => state.size);

const makeSelectReads = createSelector(selectGlobal, state => state.get('reads'));

const selectProfileStories = (state, props) =>
	selectStories(state).getIn([profileSerialKey(props.profile), props.page]);

const makeSelectStories = createSelector(selectStories, state => state || []);

export {
	selectGlobal,
	makeSelectLoading,
	makeSelectError,
	makeSelectProfiles,
	makeSelectProfilesCount,
	makeSelectReads,
	makeExistsProfiles,
	makeSelectStories,
};