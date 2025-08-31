import Modal from './components/modal';
import UncontrolledForm from './components/uncontrolledForm/UncontrolledForm';
import styles from './App.module.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './app/store';
import { openModal, closeModal } from './features/modalSlice';
import ReactHookForm from './components/reactHookForm';

function App() {
  const activeModal = useSelector(
    (state: RootState) => state.modal.activeModal
  );
  const formData = useSelector((state: RootState) => state.form.formData);
  const dispatch = useDispatch();

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.openFormGroup}>
        <button
          className={styles.openFormBtn}
          onClick={() => dispatch(openModal('uncontrolledForm'))}
        >
          Uncontrolled form
        </button>
        <button
          className={styles.openFormBtn}
          onClick={() => dispatch(openModal('reactHookForm'))}
        >
          React Hook Form
        </button>
      </div>
      <div className={styles.formDataContainer}>
        {formData.length > 0 &&
          formData.map((el) => (
            <div key={el.name + el.age}>
              {el.picture && <img src={el.picture} alt="Profile picture" />}
              <p>Name: {el.name}</p>
              <p>Age: {el.age}</p>
              <p>Email: {el.email}</p>
              <p>Country: {el.country}</p>
            </div>
          ))}
      </div>
      {activeModal !== 'none' && (
        <Modal onClose={onCloseModal}>
          {activeModal === 'uncontrolledForm' ? (
            <UncontrolledForm onClose={onCloseModal} />
          ) : (
            <ReactHookForm onClose={onCloseModal} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default App;
