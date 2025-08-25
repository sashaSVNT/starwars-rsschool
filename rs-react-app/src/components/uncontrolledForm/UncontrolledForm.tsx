import { useRef, useState, type FormEvent } from 'react';
import styles from './uncontrolledForm.module.css';
import { addFormData } from '../../features/formDataSlice';
import type { FormDataState } from '../../types/formDataState.type';
import { useDispatch } from 'react-redux';
import { COUNTRIES } from '../../app/countries';
import Input from '../input';

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
      newErrors.gender = 'You must select a gender';
    }
    if (!data.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }
    if (!data.country) {
      newErrors.country = 'You must select a country';
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
      <Input
        id="name"
        label="Name:"
        name="name"
        type="text"
        errorMessage={errors.name}
      />
      <Input
        id="age"
        label="Age:"
        name="age"
        type="number"
        errorMessage={errors.age}
      />
      <Input
        id="email"
        label="Email:"
        name="email"
        type="email"
        errorMessage={errors.email}
      />
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
      <Input
        id="password"
        label="Password:"
        name="password"
        type="password"
        errorMessage={errors.password}
      />
      <Input
        id="conf-password"
        label="Confirm password:"
        name="conf-password"
        type="password"
      />
      <Input
        id="picture"
        label="Load profile picture:"
        name="picture"
        type="file"
        errorMessage={errors.picture}
      />
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
      <Input
        id="terms"
        label="I accept the Terms and Conditions"
        name="terms"
        type="checkbox"
        errorMessage={errors.terms}
      />
      <button>Submit</button>
    </form>
  );
}
