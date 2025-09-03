import { getFieldLabel } from '../../utils/getFieldLabel';
import styles from './selectAdditionalColumns.module.css';
import { useState, useEffect, memo, useCallback } from 'react';

type Props = {
  allFields: string[];
  selectedFields: string[];
  onFieldsChange: (fields: string[]) => void;
  onClose: () => void;
};

function SelectAdditionalColumns({
  allFields,
  selectedFields,
  onFieldsChange,
  onClose,
}: Props) {
  const [tempSelectedFields, setTempSelectedFields] =
    useState<string[]>(selectedFields);

  useEffect(() => {
    setTempSelectedFields(selectedFields);
  }, [selectedFields]);

  const handleToggleField = useCallback(
    (field: string) => {
      if (tempSelectedFields.includes(field)) {
        setTempSelectedFields(tempSelectedFields.filter((el) => el !== field));
      } else {
        setTempSelectedFields([...tempSelectedFields, field]);
      }
    },
    [tempSelectedFields]
  );

  const handleSubmit = useCallback(() => {
    onFieldsChange(tempSelectedFields);
    onClose();
  }, [tempSelectedFields]);

  return (
    <div className={styles.selectColumns}>
      <div className={styles.columnsList}>
        {allFields.map((key) => (
          <div key={key} className={styles.selectColumnItem}>
            <input
              id={key}
              type="checkbox"
              checked={tempSelectedFields.includes(key)}
              onChange={() => handleToggleField(key)}
            />
            <label htmlFor={key} className={styles.fieldLabel}>
              {getFieldLabel(key)}
            </label>
          </div>
        ))}
      </div>
      <div className={styles.selectActions}>
        <button type="button" onClick={onClose} className={styles.cancelBtn}>
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className={styles.applyBtn}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default memo(SelectAdditionalColumns);
