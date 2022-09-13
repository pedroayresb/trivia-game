import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Ranking />', () => {
  const INITIAL_STATE = {
    player: {
      name: 'alguém',
      assertions: 0,
      gravatarEmail: 'alguem@alguem.com',
      score: 0,
    }
  };
  localStorage.setItem('ranking', JSON.stringify([
    {
      name: 'alguém1',
      score: 20,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      name: 'alguém2',
      score: 50,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
    {
      name: 'alguém3',
      score: 10,
      picture: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
    },
  ]));
  test('Testa se o ranking renderiza corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const rankingTitle = await screen.findByText(/ranking/i);
    expect(rankingTitle).toBeInTheDocument();
    const firstPlace = screen.queryByTestId('player-name-0');
    expect(firstPlace).toHaveTextContent('alguém2');
  });

  test('Testa se o botao de jogar novamente aparece', async () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const playAgainButton = await screen.findByTestId('btn-go-home');
    expect(playAgainButton).toBeInTheDocument();
    userEvent.click(playAgainButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/'),
      {timeout: 2000 };
    });
  });
});
