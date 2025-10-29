import React from 'react';
export default function ErrorBox({ message }) {
  return <div className="bg-red-50 text-red-700 border border-red-100 p-3 rounded">{message}</div>;
}
