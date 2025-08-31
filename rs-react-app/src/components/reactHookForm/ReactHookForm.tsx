import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './reactHookForm.module.css';
import { ASSERT_IMAGE_TYPES } from '../../constants';
import { addFormData } from '../../features/formSlice';
import { convertToBase64 } from '../../utils/convertToBase64';
import type { RootState } from '../../app/store';

type Props = {
  onClose: () => void;
};

const schema = z.object({
  name: z
    .string()
    .min(1, 'Enter your name')
    .refine(
      (value) => value.charAt(0) === value.charAt(0).toUpperCase(),
      'First letter must be uppercase'
    ),
  age: z.number().refine((value) => value >= 0, 'Age must be more than 0'),
  email: z.email({ message: 'Email is not valid' }),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_-])[A-Za-z\d@$!%*?&_-]/,
      'Password must contain at least 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    ),
  confirmPassword: z.string(),
  gender: z.string().min(1, 'You must select a gender'),
  terms: z
    .boolean()
    .refine((value) => value, 'You must accept the terms and conditions'),
  country: z.string().min(1, 'You must select a country'),
  picture: z
    .any()
    .refine(
      (files) => files?.[0]?.size <= 15 * 1024 ** 2,
      'File size should be less than 15Mb'
    )
    .refine(
      (files) => ASSERT_IMAGE_TYPES.includes(files?.[0]?.type),
      'Input allows only .png or .jpeg'
    ),
});

type FormData = z.infer<typeof schema>;

export default function ReactHookForm({ onClose }: Props) {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.form.countries);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    const {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      terms,
      country,
      picture,
    } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', { message: "Passwords don't match" });
      return;
    }
    const convertedPicture = await convertToBase64(picture[0]);

    const formData = {
      name,
      age,
      email,
      password,
      gender,
      terms,
      country,
      picture: convertedPicture,
    };

    dispatch(addFormData(formData));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-name" className={styles.label}>
            Name:
          </label>
          <input {...register('name')} type="text" id="hook-name" />
        </div>
        <div className={styles.errorContainer}>
          {errors.name && (
            <p className={styles.errorMessage}>{errors.name.message}</p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-age" className={styles.label}>
            Age:
          </label>
          <input
            {...register('age', { valueAsNumber: true })}
            type="number"
            id="hook-age"
          />
        </div>
        <div className={styles.errorContainer}>
          {errors.age && (
            <p className={styles.errorMessage}>{errors.age.message}</p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-email" className={styles.label}>
            Email:
          </label>
          <input {...register('email')} type="email" id="hook-email" />
        </div>
        <div className={styles.errorContainer}>
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-password" className={styles.label}>
            Password:
          </label>
          <input {...register('password')} type="password" id="hook-password" />
        </div>
        <div className={styles.errorContainer}>
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password.message}</p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-confirm-password" className={styles.label}>
            Confirm password:
          </label>
          <input
            {...register('confirmPassword')}
            type="password"
            id="hook-confirm-password"
          />
        </div>
        <div className={styles.errorContainer}>
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <label className={styles.lable}>Gender:</label>
        <div>
          <input type="radio" {...register('gender')} value="male" />
          Male
          <input
            type="radio"
            value="female"
            {...register('gender')}
            style={{ marginLeft: 10 }}
          />
          Female
        </div>
        {errors.gender && (
          <p className={styles.errorMessage}>{errors.gender.message}</p>
        )}
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-country" className={styles.label}>
            Country:
          </label>
          <select id="unc-country" {...register('country')} autoComplete="on">
            <option value="">Select a country:</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.errorContainer}>
          {errors.country && (
            <p className={styles.errorMessage}>{errors.country.message}</p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-picture" className={styles.label}>
            Load profile picture:
          </label>
          <input {...register('picture')} type="file" id="hook-picture" />
        </div>
        <div className={styles.errorContainer}>
          {errors.picture && (
            <p className={styles.errorMessage}>
              {String(errors.picture.message)}
            </p>
          )}
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.inputContainer}>
          <label htmlFor="hook-terms" className={styles.label}>
            I accept the Terms and Conditions
          </label>
          <input {...register('terms')} type="checkbox" id="hook-terms" />
        </div>
        <div className={styles.errorContainer}>
          {errors.terms && (
            <p className={styles.errorMessage}>{errors.terms.message}</p>
          )}
        </div>
      </div>
      <button disabled={!isValid} className={styles.submitButton}>
        Submit
      </button>
    </form>
  );
}
