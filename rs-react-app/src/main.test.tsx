import { beforeEach, describe, test, vi } from 'vitest';
import { createRoot } from 'react-dom/client';

vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}));

vi.mock('./App', () => ({
  default: () => <div>Test App</div>,
}));

describe('Application Entry Point', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.innerHTML = '';
    document.body.appendChild(rootElement);
  });

  test('Render app in root element', async () => {
    await import('./main');
    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(createRoot).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'root',
      })
    );
  });
});
