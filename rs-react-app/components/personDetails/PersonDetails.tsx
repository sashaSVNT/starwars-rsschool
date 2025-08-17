'use client';

import type { PersonAttributes } from '@/types/personResult.type';
import styles from './personDetails.module.css';
import Spinner from '@/components/spinner';
import formatPersonAttribute from '@/utils/formatPersonAttribute';
import { allowedPersonAttributes } from '@/utils/allowedPersonAttributes';
import { useGetPersonByIdQuery } from '@/features/api/api';

type PersonDetailsProps = {
  id: string;
  onCloseDetails: () => void;
};

export default function PersonDetails({
  id,
  onCloseDetails,
}: PersonDetailsProps) {
  const { data: person, isError, isFetching } = useGetPersonByIdQuery(id);

  return (
    <>
      {!isError && (
        <div className={styles.detailedView} data-testid="personDetails">
          {isFetching && (
            <div className={styles.spinnerContainer}>
              <Spinner isLoading={isFetching} />
            </div>
          )}
          {person && !isFetching && (
            <>
              <button
                className={styles.closeDetailsBtn}
                onClick={onCloseDetails}
              >
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
      )}
    </>
  );
}
