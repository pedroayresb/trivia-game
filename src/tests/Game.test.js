import React from 'react';
import userEvent from '@testing-library/user-event';
import { queryAllByAltText, screen, waitFor } from '@testing-library/react';
const { questionsResponse } = require('../../cypress/mocks/questions');
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Game />', () => {
  const INITIAL_STATE = {
    player: {
      name: 'alguém',
      assertions: 0,
      gravatarEmail: 'alguem@alguem.com',
      score: 0,
    }
  };
  test('Testa se, ao receber erro da API, retorna ao inicio', async () => {
    localStorage.setItem('token', 'aaaa');
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    expect(history.location.pathname).toBe('/game');
    await waitFor(() => {
      expect(history.location.pathname).toBe('/'),
      {timeout: 2000 };
    });
  });

  test('Testa se o jogo renderiza as perguntas', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');
    userEvent.click(playButton);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/game'),
      {timeout: 2000 };
    });
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    expect(question).toBeInTheDocument();
  });

  test('Testa se o botao nao esta na pagina inicialmente, mas aparece ao responder', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const nextButtonBefore = screen.queryByTestId('btn-next');
    expect(nextButtonBefore).not.toBeInTheDocument();
    const answer = screen.getByTestId('correct-answer');
    expect(answer).toBeInTheDocument();
    userEvent.click(answer);
    const nextButtonAfter = await screen.findByTestId('btn-next');
    expect(nextButtonAfter).toBeInTheDocument();
  });

  test('Testa se, ao responder as 5, o jogo termina', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const answer = screen.getByTestId('correct-answer');
    userEvent.click(answer);
    const nextButtonAfter = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter);
    const answer2 = screen.getByTestId('correct-answer');
    userEvent.click(answer2);
    const nextButtonAfter2 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter2);
    const answer3 = screen.getByTestId('correct-answer');
    userEvent.click(answer3);
    const nextButtonAfter3 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter3);
    const answer4 = screen.getByTestId('correct-answer');
    userEvent.click(answer4);
    const nextButtonAfter4 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter4);
    const answer5 = screen.getByTestId('correct-answer');
    userEvent.click(answer5);
    const nextButtonAfter5 = await screen.findByTestId('btn-next');
    userEvent.click(nextButtonAfter5);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/feedback'),
      {timeout: 2000 };
    });
  });

  jest.setTimeout(40000);

  test('Testa se ao demorar 30 segundos, nao pode responder', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const answer = screen.getByTestId('correct-answer');
    expect(answer).toBeEnabled();
    await waitFor(() =>
      expect(answer).not.toBeEnabled(),
      {timeout: 31000 },
    );
    await waitFor(() => {
      const correct = screen.queryByText(/correct answer/i);
      expect(correct).toBeInTheDocument();
    }, {timeout: 2000 });
  });

  test('Testa se ao responder errado ele indica o erro', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(questionsResponse),
    }));

    const { history } = renderWithRouterAndRedux(<App />);
    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');
    userEvent.click(playButton);
    const question = await screen.findByText(/The Republic of Malta is the smallest microstate worldwide./i);
    const answer = screen.getByTestId('wrong-answer-0');
    userEvent.click(answer);
    await waitFor(() => {
      const wrong = screen.queryByText(`Wrong!`);
      expect(wrong).toBeInTheDocument();
    }, {timeout: 2000 });
  });
});
