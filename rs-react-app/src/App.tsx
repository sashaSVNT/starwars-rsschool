import { useState } from 'react';
import Modal from './components/modal';
import UncontrolledForm from './components/uncontrolledForm/UncontrolledForm';
import styles from './App.module.css';
import { useSelector } from 'react-redux';
import type { RootState } from './app/store';

function App() {
  const [activeModal, setActiveModal] = useState<
    'uncontrolledForm' | 'reactHookForm' | 'none'
  >('uncontrolledForm');
  const formData = useSelector((state: RootState) => state.formData);

  const onCloseModal = () => {
    setActiveModal('none');
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.openFormGroup}>
        <button
          className={styles.openFormBtn}
          onClick={() => setActiveModal('uncontrolledForm')}
        >
          Uncontrolled form
        </button>
        <button
          className={styles.openFormBtn}
          onClick={() => setActiveModal('reactHookForm')}
        >
          React Hook Form
        </button>
      </div>
      <div className={styles.formDataContainer}>
        {formData.isDataSet &&
          Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
      </div>
      {activeModal === 'uncontrolledForm' && (
        <Modal onClose={onCloseModal}>
          <UncontrolledForm onClose={onCloseModal} />
        </Modal>
      )}
    </div>
  );
}

export default App;
