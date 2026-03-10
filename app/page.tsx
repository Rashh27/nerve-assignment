'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { dateArray, strategyArray, type DateKey, type ViewType } from './data';

const VIEWS = ['Bullish', 'Bearish', 'Rangebound', 'Volatile'] as const;

function formatDateLabel(date: string) {
  const [day, month, year] = date.split('-');
  return `${day} ${month} ${year}`;
}

export default function Home() {
  const [selectedView, setSelectedView] = useState<ViewType>('Bearish');
  const [selectedDate, setSelectedDate] = useState<DateKey>('24-Apr-2024');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const strategies = useMemo(() => {
    const viewObj = strategyArray.find((item) => item.View === selectedView);
    const list = viewObj?.Value[selectedDate] ?? [];
    const map = new Map<string, number>();
    for (const name of list) map.set(name, (map.get(name) ?? 0) + 1);
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
  }, [selectedView, selectedDate]);

  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-100 space-y-4">

        <div className="rounded-2xl bg-white p-1.5 flex shadow-sm">
          {VIEWS.map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view as ViewType)}
              className={`flex-1 py-2.5 px-3 text-xs  rounded-xl transition-all font-bold
                ${selectedView === view
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {view}
            </button>
          ))}
        </div>

      
        <div ref={dropdownRef}>
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full bg-white text-sm font-bold text-gray-800 px-4 py-3.5 flex items-center justify-between rounded-2xl border border-gray-300 shadow-sm outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          >
            <span>{formatDateLabel(selectedDate)}</span>
            <svg className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="w-full mt-2 space-y-2">
              {dateArray.map((date) => (
                <button
                  key={date}
                  onClick={() => { setSelectedDate(date as DateKey); setIsOpen(false); }}
                  className={`w-full text-left px-4 py-3.5 text-sm font-bold rounded-2xl border transition-colors bg-white shadow-sm
                    ${date === selectedDate
                      ? 'border-blue-600 text-blue-600'
                      : 'border-gray-300 text-gray-800 hover:bg-slate-50'
                    }`}
                >
                  {formatDateLabel(date)}
                </button>
              ))}
            </div>
          )}
        </div>

      
        {strategies.length > 0 ? (
          <div className="space-y-2.5">
            {strategies.map(({ name, count }) => (
              <div key={name} className="bg-white rounded-2xl px-4 py-3.5 shadow-sm border border-gray-300 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">{name}</span>
                <span className="text-xs text-slate-400 font-medium">• {count} {count === 1 ? 'Strategy' : 'Strategies'}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-6 py-12 shadow-sm border border-dashed border-slate-200 text-center">
            <p className="text-sm text-slate-500">No strategies available for <span className="font-semibold">{formatDateLabel(selectedDate)}</span>.</p>
          </div>
        )}

      </div>
    </main>
  );
}