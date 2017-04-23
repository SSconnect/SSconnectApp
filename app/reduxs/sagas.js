import { fork, put, takeLatest } from 'redux-saga/effects';

import {
	LOAD_PROFILES,
	ADD_PROFILE,
	DELETE_PROFILE,
	MOVE_PROFILE,
	LOAD_READS,
	ADD_READ,
} from './constants';

import {
	loadProfilesEnd,
	addProfileEnd,
	deleteProfileEnd,
	moveProfileEnd,
	loadReadsEnd,
	addReadEnd,
} from './actions';

import type { Profile, Read } from '../types/index';
import realm from '../models/RealmModel';

export function* addProfile(profile: Profile) {
	const profiles = realm.addProfile(profile);
	yield put(addProfileEnd(profiles));
}

export function* getProfiles() {
	const profiles = realm.getProfiles();
	yield put(loadProfilesEnd(profiles));
}

export function* moveProfile({ from, to }: { from: number, to: number }) {
	const profiles = realm.moveProfile(from, to);
	yield put(moveProfileEnd(profiles));
}

export function* deleteProfile(profile: Profile) {
	const profiles = realm.deleteProfile(profile);
	yield put(deleteProfileEnd(profiles));
}

export function* addRead(story: Stroy) {
	realm.addRead(story);
	yield put(addReadEnd(realm.getReads()));
}

export function* getReads() {
	const reads = realm.getReads();
	yield put(loadReadsEnd(reads));
}

export function* appData() {
	yield takeLatest(LOAD_PROFILES, getProfiles);
	yield takeLatest(ADD_PROFILE, addProfile);
	yield takeLatest(DELETE_PROFILE, deleteProfile);
	yield takeLatest(MOVE_PROFILE, moveProfile);

	yield takeLatest(LOAD_READS, getReads);
	yield takeLatest(ADD_READ, addRead);
}

export default function* root() {
	yield [fork(appData)];
}
