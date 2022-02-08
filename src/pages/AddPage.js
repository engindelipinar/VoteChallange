import React from 'react';
import { Link } from 'react-router-dom';
import s from './AddPage.module.scss';
import {ReactComponent as ArrowBack} from '../assets/icons/arrow_back.svg';

import Header from '../contents/header';
import Form from '../components/form/form';

function AddPage() {
  return (
    <>
    <Header/>
    <div className={s.add_page_container}>
      <Link className={s.return_back} to="/"><ArrowBack width="20" height="20"  aria-label="return" />Return to List</Link>
      <h1>Add New Link</h1>
      <Form />
    </div>
    </>
  );
}

export default AddPage;