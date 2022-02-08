import React from 'react';
import s from './pagination.module.scss';
import {ReactComponent as ArrowLeft} from '../../assets/icons/arrow_left.svg';
import {ReactComponent as ArrowRight} from '../../assets/icons/arrow_right.svg';


function Pagination({itemCount, pageSize, setPageList, setSelectedPage}) {
  const [selectedPageIndex, setSelectedPageIndex] = React.useState(1);
  const [pageCount, setPageCount] = React.useState();

  React.useEffect(() => {
      //setPageCount(parseInt(itemCount / pageSize) + (itemCount % pageSize > 0 ? 1 : 0));
  },[]);
  React.useEffect(() => {
      setPageCount(parseInt(itemCount / pageSize + ((itemCount % pageSize) > 0 ? 1 : 0),10));
  },[itemCount,pageSize]);

  function createElements(n){
      let elements = [];
      for(let i=1; i < n+1; i++){
          elements.push(<li className={`${selectedPageIndex === i ? s.active : ''}`} key={i} onClick={() => {setSelectedPage(i);setSelectedPageIndex(i);setPageList(i)}}>{i}</li>);
      }
      return elements;
  }
  return (
    <>
      <ul className={s.pagination}>
          {selectedPageIndex !== 1 && <li className={`${s.arrow} ${s.prev}`} onClick={() => {setSelectedPage(selectedPageIndex-1);setSelectedPageIndex(selectedPageIndex-1);setPageList(selectedPageIndex-1)}}><ArrowLeft width="20" height="20"/></li>}
          {createElements(pageCount)}
          {selectedPageIndex !== pageCount && <li className={`${s.arrow} ${s.next}`} onClick={() => {setSelectedPage(selectedPageIndex+1);setSelectedPageIndex(selectedPageIndex+1);setPageList(selectedPageIndex+1)}}><ArrowRight width="20" height="20"/></li>}
      </ul>
    </>
  );
}

export default Pagination;
