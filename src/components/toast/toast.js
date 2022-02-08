import React from 'react';
import s from './toast.module.scss';
import config from '../../settings/config.json';

function Toast({open, close, type = "info", text}) {
  React.useEffect(() => {
    open && setTimeout(function(){close()},(config.ToastHidingSecond*1000));
  },[open,close]);
  return (
    <>
    {open &&
        <div className={`${s.toast} ${s[type]}`}>{text}</div>
    }
  </>
  );
}

export default Toast;