export const FILTER_ACTIVITIES = 'FILTER_ACTIVITIES';
export const ALL = 'all';
export const NEARBY = 'nearby';
export const FRIENDS = 'friends';
export const TITLES = {'all':'All', 'nearby' : 'Nearby', 'friends': 'Friends'};

export function filterActivities(mode){
    return {type: FILTER_ACTIVITIES, mode}
}
