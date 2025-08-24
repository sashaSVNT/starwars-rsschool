import { useRef, useState, type FormEvent } from 'react';
import styles from './uncontrolledForm.module.css';
import { addFormData } from '../../features/formDataSlice';
import type { FormDataState } from '../../types/formDataState';
import { useDispatch } from 'react-redux';
import { COUNTRIES } from '../../app/countries';

type Props = {
  onClose: () => void;
};

export default function UncontrolledForm({ onClose }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useDispatch();

  const validateForm = (data: FormDataState) => {
    const newErrors: Record<string, string> = {};

    if (
      !data.name ||
      data.name.charAt(0) !== data.name.charAt(0).toUpperCase()
    ) {
      newErrors.name = 'First letter must be uppercase';
    }
    if (!data.age || data.age <= 0) {
      newErrors.age = 'Age must be more than 0';
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]/;
    if (!data.password || !passwordRegex.test(data.password)) {
      newErrors.password =
        'Password must contain at least 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character';
    }
    const emailRegex = /[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!data.email || !emailRegex.test(data.email)) {
      newErrors.email = 'Email is not valid';
    }
    if (!data.gender) {
      newErrors.gender = 'Select a gender';
    }
    if (!data.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    if (!data.country) {
      newErrors.country = 'Select a country';
    }
    return newErrors;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data: FormDataState = {
        name: formData.get('name') as string,
        age: Number(formData.get('age')),
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        gender: formData.get('gender') as string,
        terms: formData.get('terms') === 'on',
        picture: null,
        country: formData.get('country') as string,
      };

      const validateResult = validateForm(data);
      if (Object.keys(validateResult).length > 0) {
        setErrors(validateResult);
        return;
      }
      const fileInput = formRef.current.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        const file = fileInput.files[0];
        const pictureTypes = ['image/jpeg', 'image/png'];
        if (!pictureTypes.includes(file.type)) {
          setErrors({ picture: 'Input allows only png or jpeg' });
          return;
        }
        if (file.size > 15 * 1024 ** 2) {
          setErrors({
            picture: 'File size should be less than 15Mb',
          });
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          data.picture = e.target?.result as string;

          dispatch(addFormData(data));
          onClose();
        };
        reader.readAsDataURL(file);
      } else {
        dispatch(addFormData(data));
        onClose();
      }
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className={styles.block}>
        <label htmlFor="name" className={styles.lable}>
          Name:
        </label>
        <input id="name" type="text" name="name" />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
      </div>
      <div className={styles.block}>
        <label htmlFor="age" className={styles.lable}>
          Age:
        </label>
        <input id="age" type="number" name="age" />
        {errors.age && <p className={styles.errorMessage}>{errors.age}</p>}
      </div>
      <div className={styles.block}>
        <label htmlFor="email" className={styles.lable}>
          Email:
        </label>
        <input id="email" type="email" name="email" />
        {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
      </div>
      <div className={styles.block}>
        <label htmlFor="country">Country</label>
        <select id="country" name="country">
          <option value="">Select a country:</option>
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className={styles.errorMessage}>{errors.country}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="password" className={styles.lable}>
          Password:
        </label>
        <input id="password" type="password" name="password" />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="conf-password" className={styles.lable}>
          Confirm password:
        </label>
        <input id="conf-password" type="password" name="conf-password" />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="picture" className={styles.lable}>
          Load profile picture:
        </label>
        <input id="picture" type="file" name="picture" />
        {errors.picture && (
          <p className={styles.errorMessage}>{errors.picture}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="age" className={styles.lable}>
          Gender:
        </label>
        <div>
          <input type="radio" name="gender" value="male" />
          Male
          <input
            type="radio"
            name="gender"
            value="female"
            style={{ marginLeft: 10 }}
          />
          Female
        </div>
        {errors.gender && (
          <p className={styles.errorMessage}>{errors.gender}</p>
        )}
      </div>
      <div className={styles.block}>
        <label htmlFor="terms" className={styles.lable}>
          I accept the Terms and Conditions
        </label>
        <input id="terms" type="checkbox" name="terms" />
        {errors.terms && <p className={styles.errorMessage}>{errors.terms}</p>}
      </div>
      <button>Submit</button>
    </form>
  );
}
