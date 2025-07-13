import { Component, type ChangeEvent, type FormEvent } from 'react';
import styles from './App.module.css';
import { swapiService } from './services/swapiService';
import type { PersonResult } from './types/personResult.type';
import Card from './card';

interface AppState {
  people: PersonResult[];
  loading: boolean;
  searchValue: string;
}

class App extends Component<object, AppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      people: [],
      loading: true,
      searchValue: localStorage.getItem('searchValue') || '',
    };
  }

  async componentDidMount(): Promise<void> {
    const response = await swapiService.getAllPeople(1);
    this.setState((prevState) => ({
      searchValue: prevState.searchValue,
      people: response,
      loading: false,
    }));
  }

  onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ searchValue: e.target.value });
    }
  };

  onSearch = (e: FormEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      localStorage.setItem('searchValue', this.state.searchValue);
    }
  };

  render() {
    const { people, loading } = this.state;
    if (loading)
      return (
        <div className={styles.spinnerContainer}>
          <div className={styles.spinner}></div>
        </div>
      );
    return (
      <div className={styles.wrapper}>
        <div className={styles.topControls}>
          <form onSubmit={this.onSearch}>
            <input
              type="text"
              onChange={this.onSearchChange}
              value={this.state.searchValue}
            />
            <button>Search</button>
          </form>
        </div>
        <div className={styles.cardsContainer}>
          {people.map((el) => {
            const { name, birth_year, eye_color, gender, height } =
              el.properties;
            return (
              <Card
                key={name}
                name={name}
                birthYear={birth_year}
                eyeColor={eye_color}
                gender={gender}
                height={height}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
export default App;
