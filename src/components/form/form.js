import React from 'react';
import s from './form.module.scss';

import Toast from '../toast/toast';

import { saveLink} from '../../services/itemRequests';


function Form() {
  const [showToast, setShowToast] = React.useState(false);
  const [toastText, setToastText] = React.useState("");
  const [toastType, setToastType] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const linkName = formData.get('linkName');
    const linkUrl = formData.get('linkUrl');
    if(!linkName || !linkUrl){
      setToastText('Lütfen zorunlu alanları doldurun.');
      setShowToast(true);
      setToastType("error");
      return true;
    }

    
    let linkModel = {
      linkName: '',
      linkUrl: '',
      point: 0,
      id: new Date().getTime()
    }
    
    const data = {...linkModel, ...{linkName: linkName, linkUrl:linkUrl}} 
    saveLink(data);
    setToastText(linkName + ' added.');
    setShowToast(true);
    setToastType('success');
  }

  return React.useMemo(() => {
    return (
      <>
        <form className={s.addNew} id="newLink" onSubmit={(e) =>handleSubmit(e)}>
          <label>
            Link Name:
            <input type="text" placeholder="e.g. Alphabet" name="linkName" aria-label="name" />
          </label>
          <label>
            Link Url:
            <input type="text" placeholder="e.g. http://abc.xyz" name="linkUrl" aria-label="url" />
          </label>
          <input type="submit" value="ADD" aria-label="submit" />
        </form>
        <Toast close={() =>{setShowToast(false);setToastText('');setToastType('info');}} open={showToast} text={toastText} type={toastType}></Toast>
      </>
    );
  },[showToast,toastText,toastType]);
}

export default Form;
