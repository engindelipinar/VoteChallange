import s from './addItem.module.scss';
//import { NavLink } from 'react-router-dom';


function AddItem() {

  return (
    <>
        {/* <NavLink to="/add"> */}
            <div className={s.add_item} data-testid="add_item">
                <section className={s.icon_box}>
                    <span>+</span>
                </section>
                <section className={s.text}>SUBMIT A LINK</section>
            </div>
        {/* </NavLink> */}
    </>
  );
}

export default AddItem;