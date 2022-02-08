import React from 'react';
import {ReactComponent as Logo} from '../assets/images/logo.svg';
import s from './header.module.scss';

export default function Header() {
  return (
      <div className={s.header}>
        <Logo/> 
      </div>
  );
}