import { Component, type ChangeEvent, type FormEvent } from 'react';
import styles from './App.module.css';
import { swapiService } from './services/swapiService';
import type { PersonResult } from './types/personResult.type';
import Card from './components/card';
import Spinner from './components/spinner';

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
    const response = await swapiService.getAllPeople(this.state.searchValue);
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

  onSearchSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      this.setState({ loading: true });
      const value = this.state.searchValue.trim();
      localStorage.setItem('searchValue', value);
      const response = await swapiService.getAllPeople(value);
      this.setState({ people: response, searchValue: value, loading: false });
    }
  };

  render() {
    const { people, loading } = this.state;
    if (loading)
      return (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      );
    return (
      <div className={styles.wrapper}>
        <form className={styles.topControls} onSubmit={this.onSearchSubmit}>
          <input
            type="text"
            onChange={this.onSearchChange}
            value={this.state.searchValue}
          />
          <button>Search</button>
        </form>
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
