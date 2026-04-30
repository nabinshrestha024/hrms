export const getCurrentBSYear = () => {
  const today = new Date();
  const adYear = today.getFullYear();
  const adMonth = today.getMonth() + 1;
  if (adMonth < 4) return adYear + 56;
  if (adMonth === 4 && today.getDate() < 14) return adYear + 56;

  return adYear + 57;
};
