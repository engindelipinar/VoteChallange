import React from 'react';
import AddItem from '../components/addItem/addItem';
import List from '../components/list/list';
import Header from '../contents/header';
import s from './ListPage.module.scss';

import * as STORAGE_ENUMS from '../services/enums/storageKeys';
import { Link } from 'react-router-dom';


function ListPage() {
  React.useEffect(() => {
    if(!localStorage.getItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE)){
      console.log("Local storage empty");
      localStorage.setItem(STORAGE_ENUMS.LOCAL_STORAGE_KEY_STORE, JSON.stringify([]));
    }
  },[]);
  
  return (
    <>
      <Header/>
      <div id="list_container" className={s.list_container}>
        <Link to="/add"><AddItem/></Link>
        <List />
      </div>
    </>
  );
}

export default ListPage;