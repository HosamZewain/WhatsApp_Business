import { Link, Route, Routes } from 'react-router-dom';

function HomeRoute() {
  return (
    <section className="card" aria-labelledby="app-title">
      <p className="eyebrow">Foundation</p>
      <h1 id="app-title">WhatsApp Business Platform</h1>
      <p>Project routing is ready for future scoped features.</p>
    </section>
  );
}

export function App() {
  return (
    <main className="shell">
      <nav aria-label="Primary navigation">
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomeRoute />} />
      </Routes>
    </main>
  );
}
