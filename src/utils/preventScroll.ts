export const preventScroll = (modalState: boolean) => {
  if (modalState) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }
  return () => {
    document.body.style.overflowY = "auto";
  };
};
