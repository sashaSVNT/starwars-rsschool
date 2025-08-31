import { Provider } from 'react-redux';
import App from './App';
import { render } from '@testing-library/react';
import { store } from './app/store';

describe('App Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  const renderWithProvider = () =>
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  test('Render component successfully', () => {
    renderWithProvider();
  });
});
