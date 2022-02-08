import * as VOTE_ENUMS from './enums/itemActions';
import * as STORAGE_ENUMS from './enums/storageKeys';
import * as SORTING_ENUMS from './enums/sorting';
import config from '../settings/config.json';

export function saveLink(item) {
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    listStore.unshift(item);
    localStorage.setItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE, JSON.stringify(listStore));
}

export function getAllLinks(type) {
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    type && listStore.sort((a, b) => (type === SORTING_ENUMS.SORTING_MOST_VOTE ?  a.point < b.point : type === SORTING_ENUMS.SORTING_LESS_VOTE ? a.point > b.point : a.id < b.id) ? 1 : -1);
    return listStore;
}
export function getPageLinks(pageIndex) {
    const pageCount = config.PaginationPageSize;
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    return !!listStore && listStore.length ? listStore.slice((pageIndex-1)*pageCount,((pageIndex-1)*pageCount) +pageCount) : [];
}

export function removeLink(id) {
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    listStore = listStore.filter(function(item) {
        return item.id !== id
    });
    localStorage.setItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE, JSON.stringify(listStore));
}

export function updateLink(id, type) {
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    let itemPoint = listStore.filter(function(item) {
        return item.id === id
    })[0];
    itemPoint.point = type === VOTE_ENUMS.VOTE_UP ? itemPoint.point+1 : itemPoint.point-1;
    localStorage.setItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE, JSON.stringify(listStore));
}

export function sortList(type){
    let listStore = JSON.parse(localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE));
    listStore.sort((a, b) => (type === SORTING_ENUMS.SORTING_MOST_VOTE ?  a.point < b.point : type === SORTING_ENUMS.SORTING_LESS_VOTE ? a.point > b.point : a.id < b.id) ? 1 : -1);
    localStorage.setItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE, JSON.stringify(listStore));
}