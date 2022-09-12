const RANKING_KEY = 'ranking';

export const getRanking = () => {
  if (!localStorage.getItem(RANKING_KEY)) {
    localStorage.setItem(RANKING_KEY, JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem(RANKING_KEY));
};

const setRanking = (ranking) => localStorage
  .setItem(RANKING_KEY, JSON.stringify(ranking));

export const saveRanking = (ranking) => {
  const currentRanking = getRanking();
  const newRanking = [...currentRanking, ranking];
  setRanking(newRanking);
};
