import { useState } from 'react';

export default function SearchBar({ onSearch, onRandom }) {
  const [q, setQ] = useState('');
  return (
    <form
      className="flex gap-2"
      onSubmit={e => { e.preventDefault(); if(q.trim()) onSearch(q); }}
    >
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Enter ingredient(s) e.g., chicken, rice"
        className="flex-1 px-4 py-2 border rounded-lg"
        aria-label="Search ingredients"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
        > Search
        </button>

    <button
        type="button"
        onClick={onRandom}
        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 hover:border-gray-500 transition-colors duration-300"
        >Surprise
</button>

    </form>
  );
}
