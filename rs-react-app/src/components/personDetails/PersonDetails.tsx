import { useEffect, useState } from 'react';
import { swapiService } from '../../services/swapiService';
import type { PersonAttributes } from '../../types/personResult.type';
import styles from './personDetails.module.css';
import Spinner from '../spinner';
import formatPersonAttribute from '../../utils/formatPersonAttribute';
import { allowedPersonAttributes } from '../../utils/allowedPersonAttributes';

type PersonDetailsProps = {
  id: string;
  onCloseDetails: () => void;
};

export default function PersonDetails({
  id,
  onCloseDetails,
}: PersonDetailsProps) {
  const [person, setPerson] = useState<PersonAttributes>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await swapiService.getPersonById(id);
        setPerson(data.result.properties);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
          setError(error.message);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [id]);

  return (
    <div className={styles.detailedView}>
      {isLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner isLoading={isLoading} />
        </div>
      )}
      {person && !isLoading && (
        <>
          <button className={styles.closeDetailsBtn} onClick={onCloseDetails}>
            ×
          </button>
          {Object.keys(person)
            .filter((el) => allowedPersonAttributes.includes(el))
            .map((key) => {
              return (
                <div key={key} className={styles.detailedRow}>
                  <span>{formatPersonAttribute(key)}</span>
                  <span>{person[key as keyof PersonAttributes]}</span>
                </div>
              );
            })}
        </>
      )}
    </div>
  );
}
