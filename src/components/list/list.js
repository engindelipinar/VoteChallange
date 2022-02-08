import React from 'react';
import s from './list.module.scss';

import ListItem from '../listItem/listItem';
import Pagination from '../pagination/pagination';
import Popup from '../popup/popup';
import Toast from '../toast/toast';


import { getAllLinks, getPageLinks, sortList, removeLink } from '../../services/itemRequests';

import * as SORTING_ENUMS from '../../services/enums/sorting';
import * as LOCALIZATION from '../../settings/localization'
import config from '../../settings/config.json';

function List() {
  const [linkList, setLinkList] = React.useState([]);
  const [pageLinkList, setPageLinkList] = React.useState([]);
  const [sortValue, setSortValue] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState(1);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [removedItemData, setRemovedItemData] = React.useState({});
  const [showToast, setShowToast] = React.useState(false);
  const [toastText, setToastText] = React.useState("");

  const sortOptions = [
    {name:'Order by', value: SORTING_ENUMS.SORTING_DEFAULT},
    {name:'Most Voted(Z>A)', value: SORTING_ENUMS.SORTING_MOST_VOTE},
    {name:'Less Voted(A>Z)', value: SORTING_ENUMS.SORTING_LESS_VOTE},
  ];

  React.useEffect(() => {
    setLinkList(getAllLinks(sortValue));
    setPageLinkList(getPageLinks(selectedPage));
  },[]);

  React.useEffect(() => {
    changeSort(sortValue);
  },[sortValue]);

  function updateStore(val){
    sortList(!!val ? val : sortValue);
    setLinkList(getAllLinks(!!val ? val : sortValue));
    setPageLinkList(getPageLinks(selectedPage));
  }

  const changeSort = () => {
    if(linkList.length > 1){
      sortList(sortValue);
      updateStore(sortValue);
    }
  }

  function removeItem(data){
    setRemovedItemData(data);
    setPopupOpen(true);
  }

  function popupRemoveButton(){
    removeLink(removedItemData.id);
    updateStore();
    setPopupOpen(false);
    setToastText(removedItemData.linkName + ' removed.');
    setShowToast(true);
    setRemovedItemData({});
  }

  function setPageList(pageIndex){
    setPageLinkList(getPageLinks(pageIndex));
  }

  function closePopup(){
    setPopupOpen(false);
    setRemovedItemData({});
  }

  return React.useMemo(() => {
    return (
      <>
          {!!linkList && linkList.length > 1 &&
            <select value={sortValue} onChange={(event) => setSortValue(parseInt(event.target.value,10))} className={s.sort}> 
              {sortOptions.map((option)=>{
                return (<option key={option.value} value={option.value}>{option.name}</option>);
              })}
            </select>
          }
          <ul className={s.list}>
            {pageLinkList?.map((link, key) => {
              return (
                <ListItem remove={removeItem} updateStore={updateStore} data={link} key={key}/>
              );
            })}
          </ul>
          {!!linkList && linkList.length > config.PaginationPageSize && <Pagination setPageList={setPageList} setSelectedPage={setSelectedPage} itemCount={linkList.length} pageSize={config.PaginationPageSize}/>}
          <Popup open={popupOpen} title="Remove Link" closeButton={true} closePopup={closePopup} closeOnOverflowClick={true}>
              <h3>{LOCALIZATION.REMOVE_TITLE}</h3>
              <h2>{removedItemData.linkName}</h2>
              <div className={s.button_container}>
                <button onClick={() => popupRemoveButton()}>{LOCALIZATION.OK_BUTTON}</button>
                <button onClick={() => closePopup()}>{LOCALIZATION.CANCEL_BUTTON}</button>
              </div>
          </Popup>
          <Toast close={() =>setShowToast(false)} open={showToast} text={toastText} type="success"></Toast>
      </>
    );
  },[linkList, pageLinkList, sortValue, popupOpen, removedItemData, showToast, toastText]);
}

export default List;
