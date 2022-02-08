import React from 'react';
import s from './listItem.module.scss';
import {ReactComponent as RemoveIcon} from '../../assets/icons/remove_icon.svg';
import {ReactComponent as UpIcon} from '../../assets/icons/up_arrow.svg';
import {ReactComponent as DownIcon} from '../../assets/icons/down_arrow.svg';
import {updateLink} from '../../services/itemRequests';
import * as VOTE_ENUMS from '../../services/enums/itemActions';
import * as LOCALIZATION from '../../settings/localization';


function ListItem({data, itemKey, updateStore, remove}) {
    const removeItem = (data) => {
        remove(data);
    };

    const voteItem = (id, type) => {
        updateLink(id, type);
        updateStore();
    };

  return (
    <>
        <li className={s.list_item} key={itemKey}>
            <span className={s.remove} onClick={()=>removeItem(data)}>
                <RemoveIcon width="24" height="24"/>
            </span>
            <section className={s.point_box}>
                <span className={s.point}>{data.point}</span>
                <span>{LOCALIZATION.POINTS}</span>
            </section>
            <section className={s.description}>
                <h3>{data.linkName}</h3>
                <span>({data.linkUrl})</span>
                <div className={s.vote_buttons}>
                    <span onClick={(e)=>voteItem(data.id, VOTE_ENUMS.VOTE_UP)}><UpIcon width="20" height="20"/>{LOCALIZATION.UP_VOTE}</span>
                    <span onClick={(e)=>{data.point > 0 && voteItem(data.id, VOTE_ENUMS.VOTE_DOWN)}}><DownIcon width="20" height="20"/>{LOCALIZATION.DOWN_VOTE}</span>
                </div>
            </section>
            
        </li>
    </>
  );
}

export default ListItem;