import {
	LOAD_PROFILES,
	LOAD_PROFILES_END,
	ADD_PROFILE,
	ADD_PROFILE_END,
	DELETE_PROFILE,
	DELETE_PROFILE_END,
	LOAD_STORIES,
	LOAD_STORIES_END,
	LOAD_READS,
	LOAD_READS_END,
	LOAD_PREMIUM,
	LOAD_PREMIUM_END,
	ADD_READ,
	ADD_READ_END,
	MOVE_PROFILE,
	MOVE_PROFILE_END,
	UPDATE_PAGE,
	LOAD_CONFIG,
	LOAD_CONFIG_END,
	TOGGLE_IAB_CONFIG,
} from './constants';

export function loadProfiles() {
	return {
		type: LOAD_PROFILES,
	};
}

export function loadProfilesEnd(profiles) {
	return {
		type: LOAD_PROFILES_END,
		profiles,
	};
}

export function addProfile(profile) {
	return {
		type: ADD_PROFILE,
		profile,
	};
}

export function addProfileEnd(profiles) {
	return {
		type: ADD_PROFILE_END,
		profiles,
	};
}

export function deleteProfile(profile) {
	return {
		type: DELETE_PROFILE,
		profile,
	};
}

export function deleteProfileEnd(profiles) {
	return {
		type: DELETE_PROFILE_END,
		profiles,
	};
}

export function moveProfile(from, to) {
	return {
		type: MOVE_PROFILE,
		from,
		to,
	};
}

export function moveProfileEnd(profiles) {
	return {
		type: MOVE_PROFILE_END,
		profiles,
	};
}

export function loadPremium() {
	return {
		type: LOAD_PREMIUM,
	};
}

export function loadPremiumEnd(isPremium) {
	return {
		type: LOAD_PREMIUM_END,
		isPremium,
	};
}

export function loadReads() {
	return {
		type: LOAD_READS,
	};
}

export function loadReadsEnd(reads) {
	return {
		type: LOAD_READS_END,
		reads,
	};
}

export function addRead(story) {
	return {
		type: ADD_READ,
		story,
	};
}

export function addReadEnd(reads) {
	return {
		type: ADD_READ_END,
		reads,
	};
}

export function loadStories(profile, page) {
	return {
		type: LOAD_STORIES,
		profile,
		page,
	};
}

export function loadStoriesEnd(profile, pageInfo, stories) {
	return {
		type: LOAD_STORIES_END,
		profile,
		pageInfo,
		stories,
	};
}

export function updatePage(profile, page) {
	return {
		type: UPDATE_PAGE,
		profile,
		page,
	};
}

export const loadConfig = () => ({ type: LOAD_CONFIG });
export const loadConfigEnd = config => ({ type: LOAD_CONFIG_END, config });
export const toggleConfigIAB = () => ({ type: TOGGLE_IAB_CONFIG });
