export const css = `
  .restaurant { background: #fff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 20px; }
  .restaurant__empty { display: grid; justify-items: center; gap: 4px; padding: 56px 16px; color: #78716c; text-align: center; }
  .restaurant__empty strong { color: #1c1917; font-size: 1.15rem; }
  .restaurant__empty p { margin: 0; }
  .restaurant__header { display: flex; align-items: center; gap: 16px; padding-bottom: 16px; border-bottom: 1px solid #e7e5e4; }
  .restaurant__header h2 { margin: 0; font-size: 1.4rem; }
  .restaurant__header p { margin: 2px 0 0; color: #78716c; }
  .restaurant__photo {
    flex: none; width: 112px; height: 72px; border-radius: 12px;
    object-fit: cover; background: #f0fdf4;
  }
  .restaurant__menu { margin: 0; padding: 0; list-style: none; }
  .restaurant__dish {
    display: grid; grid-template-columns: 1fr auto auto; align-items: center; gap: 16px;
    padding: 14px 0; border-bottom: 1px solid #f5f5f4;
  }
  .restaurant__dish:last-child { border-bottom: 0; }
  .restaurant__dish small { display: block; color: #78716c; font-size: 0.9rem; }
  .restaurant__price { font-weight: 700; white-space: nowrap; }

  .button {
    background: #16a34a; color: #fff; border: 1px solid #16a34a; border-radius: 10px;
    padding: 10px 16px; font-family: inherit; font-size: 0.95rem; font-weight: 600; cursor: pointer;
  }
  .button:hover { background: #15803d; }

  @media (max-width: 520px) {
    .restaurant__dish { grid-template-columns: 1fr auto; }
    .restaurant__dish .button { grid-column: 1 / -1; }
  }
`;
