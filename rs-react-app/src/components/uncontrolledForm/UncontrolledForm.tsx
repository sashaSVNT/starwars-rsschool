import { useRef, type FormEvent } from 'react';
import styles from './uncontrolledForm.module.css';
import { addFormData } from '../../features/formDataSlice';
import type { FormDataState } from '../../types/formDataState';
import { useDispatch } from 'react-redux';

type Props = {
  onClose: () => void;
};

export default function UncontrolledForm({ onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: FormDataState = {
        isDataSet: true,
        name: formData.get('name') as string,
        age: Number(formData.get('age')),
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        gender: formData.get('gender') as string,
      };
      dispatch(addFormData(data));
      onClose();
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className={styles.block}>
        <input type="text" name="name" />
        <input type="number" name="age" />
        <input type="email" name="email" />
        <input type="password" name="password" />
        <input type="text" name="gender" />
      </div>
      <button>Submit</button>
    </form>
  );
}
