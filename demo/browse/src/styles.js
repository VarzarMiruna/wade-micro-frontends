export const baseCss = `
  .browse { background: #fff; border: 1px solid #e7e5e4; border-radius: 16px; padding: 20px; }
  .browse__title { margin: 0 0 14px; font-size: 1.25rem; }
  .browse__chips { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
  .browse__list { display: grid; gap: 10px; margin: 0; padding: 0; list-style: none; }
  .browse__card {
    display: flex; align-items: center; gap: 14px; padding: 12px 14px;
    border: 1px solid #e7e5e4; border-radius: 12px; color: inherit; text-decoration: none;
    transition: border-color 0.15s, background 0.15s;
  }
  .browse__card:hover { border-color: #93c5fd; background: #f8fbff; }
  .browse__card--active { border-color: #2563eb; background: #eff6ff; box-shadow: inset 4px 0 0 #2563eb; }
  .browse__photo {
    flex: none; width: 64px; height: 48px; border-radius: 10px;
    object-fit: cover; background: #f5f5f4;
  }
  .browse__info { display: grid; }
  .browse__info small { color: #78716c; font-size: 0.9rem; }
`;

const calmButtons = `
  .button {
    background: #fff; color: #1c1917; border: 1px solid #d6d3d1; border-radius: 999px;
    padding: 6px 14px; font-family: inherit; font-size: 0.9rem; font-weight: 600; cursor: pointer;
  }
  .button:hover { background: #f5f5f4; }
  .button[aria-pressed='true'] { background: #1d4ed8; color: #fff; border-color: #1d4ed8; }
`;

const loudButtons = `
  .button {
    background: #e11d48; color: #fff; border: 3px solid #111; border-radius: 0;
    padding: 8px 18px; font-family: inherit; font-size: 1rem; font-weight: 800; cursor: pointer;
    text-transform: uppercase; letter-spacing: 0.08em; box-shadow: 4px 4px 0 #111; transform: rotate(-2deg);
  }
  .button:hover { background: #be123c; }
  .button[aria-pressed='true'] { background: #facc15; color: #111; }
`;

export function buttonCss(release) {
  if (release === 'leaky') return loudButtons;
  if (release === 'scoped') return `@scope (.browse) { ${loudButtons} }`;
  return `@scope (.browse) { ${calmButtons} }`;
}
