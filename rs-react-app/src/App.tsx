import { Component } from 'react';
import styles from './App.module.css';
import { swapiService } from './services/swapiService';
import type { PersonResult } from './types/personResult.type';
import Search from './components/search';
import CardsList from './components/cardsList';

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

  onSearchChange = (value: string) => {
    this.setState({ searchValue: value });
  };

  onSearchSubmit = async () => {
    this.setState({ loading: true });
    const value = this.state.searchValue.trim();
    localStorage.setItem('searchValue', value);
    const response = await swapiService.getAllPeople(value);
    this.setState({ people: response, searchValue: value, loading: false });
  };

  render() {
    const { people, loading } = this.state;
    return (
      <div className={styles.wrapper}>
        <Search
          onSearchSubmit={this.onSearchSubmit}
          onSearchChange={this.onSearchChange}
          searchValue={this.state.searchValue}
        />
        <CardsList data={people} loading={loading} />
      </div>
    );
  }
}
export default App;
