import { Component, type ChangeEvent, type FormEvent } from 'react';
import styles from './search.module.css';

type SearchProps = {
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  searchValue: string;
};

class Search extends Component<SearchProps> {
  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      const searchValue = e.target.value;
      this.props.onSearchChange(searchValue);
    }
  };

  onSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      this.props.onSearchSubmit();
    }
  };

  render() {
    return (
      <form
        className={styles.topControls}
        onSubmit={this.onSearchSubmit}
        aria-label="Search form"
      >
        <input
          type="text"
          onChange={this.onSearchChange}
          value={this.props.searchValue}
        />
        <button>Search</button>
      </form>
    );
  }
}

export default Search;
