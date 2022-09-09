const RANKING_KEY = 'ranking';

if (!localStorage.getItem(RANKING_KEY)) {
  localStorage.setItem(RANKING_KEY, JSON.stringify([]));
}

export const getRanking = () => JSON
  .parse(localStorage.getItem(RANKING_KEY));

const setRanking = (ranking) => localStorage
  .setItem(RANKING_KEY, JSON.stringify(ranking));

export const saveRanking = (ranking) => {
  const currentRanking = getRanking();
  const newRanking = [...currentRanking, ranking];
  setRanking(newRanking);
};
