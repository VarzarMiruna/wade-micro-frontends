import { useEffect, useState } from 'react';
import { cuisines, restaurants } from './data.js';

const readSelected = () => new URLSearchParams(location.search).get('restaurant');

// Browse does not talk to Restaurant directly. It only changes the URL,
// and every app that cares reads the URL. The URL is the contract.
function openRestaurant(event, id) {
  event.preventDefault();
  const url = new URL(location.href);
  url.searchParams.set('restaurant', id);
  history.pushState(null, '', url);
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export default function App() {
  const [cuisine, setCuisine] = useState('All');
  const [selected, setSelected] = useState(readSelected);

  useEffect(() => {
    const onRouteChange = () => setSelected(readSelected());
    window.addEventListener('popstate', onRouteChange);
    return () => window.removeEventListener('popstate', onRouteChange);
  }, []);

  const visible = cuisine === 'All' ? restaurants : restaurants.filter((r) => r.cuisine === cuisine);

  return (
    <section className="browse">
      <h2 className="browse__title">Restaurants in Iași</h2>

      <div className="browse__chips">
        {cuisines.map((c) => (
          <button key={c} className="button" aria-pressed={c === cuisine} onClick={() => setCuisine(c)}>
            {c}
          </button>
        ))}
      </div>

      <ul className="browse__list">
        {visible.map((r) => (
          <li key={r.id}>
            <a
              href={`?restaurant=${r.id}`}
              className={r.id === selected ? 'browse__card browse__card--active' : 'browse__card'}
              onClick={(event) => openRestaurant(event, r.id)}
            >
              <img className="browse__photo" src={r.image} alt="" loading="lazy" />
              <span className="browse__info">
                <strong>{r.name}</strong>
                <small>{r.cuisine} · ★ {r.rating} · {r.time} min</small>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
