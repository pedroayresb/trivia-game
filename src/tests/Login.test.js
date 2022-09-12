import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';


import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa o componente <Login />', () => {
  test('Testa se ao clicar no botão settings o usuário é redirecionado para a página Settings', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();

    userEvent.click(settingsButton);

    expect(history.location.pathname).toBe('/settings');
  });

  test('Testa se ao preencher os inputs corretamente, o botão play é habilitado', () => {
    renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);
    const emailInput = screen.getByTestId('input-gravatar-email');
    const nameInput = screen.getByTestId('input-player-name');

    expect(playButton).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();

    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');

    expect(emailInput.value).toBe('usuario@usuario.com')
    expect(nameInput.value).toBe('usuario')
  });

  test('Testa se ao clicar no botão play o usuário é redirecionado para a página Game', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const emailLabel = screen.getByLabelText(/email/i);
    const nameLabel = screen.getByLabelText(/name/i);

    expect(playButton).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();

    userEvent.type(emailLabel, 'usuario@usuario.com');
    userEvent.type(nameLabel, 'usuario');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    const nameParagraph = await screen.findByText(/Carregando.../i);

    expect(nameParagraph).toBeInTheDocument();

    expect(history.location.pathname).toBe('/game');
  });
});

