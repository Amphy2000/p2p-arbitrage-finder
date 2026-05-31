'use client';

import React, { useState } from 'react';

interface Trade {
  id: number;
  time: string;
  platform: string;
  type: string;
  stake: number;
  profit: number;
  profitPercent: number;
}

export default function P2PFlipTracker() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);

  // Form states
  const [platform, setPlatform] = useState('Noones');
  const [type, setType] = useState('Buy USDT');
  const [stake, setStake] = useState(2000);
  const [profitPercent, setProfitPercent] = useState(2.0);

  const platforms = ['Noones', 'Binance P2P', 'Bybit P2P', 'Remitano'];
  const types = ['Buy USDT', 'Sell USDT'];

  const logTrade = () => {
    const profit = Math.round(stake * (profitPercent / 100));

    const newTrade: Trade = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      platform,
      type,
      stake,
      profit,
      profitPercent
    };

    setTrades([newTrade, ...trades]);
    setTotalProfit(prev => prev + profit);
    setTotalStaked(prev => prev + stake);

    // Reset form slightly
    setProfitPercent(2.0);
  };

  const deleteTrade = (id: number) => {
    const tradeToDelete = trades.find(t => t.id === id);
    if (!tradeToDelete) return;

    setTrades(trades.filter(t => t.id !== id));
    setTotalProfit(prev => prev - tradeToDelete.profit);
    setTotalStaked(prev => prev - tradeToDelete.stake);
  };

  const winRate = trades.length > 0 ? 100 : 0; // Simple for now

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-2xl mx-auto p-4">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-4xl font-bold tracking-tight text-emerald-400">P2P FLIP TRACKER</h1>
          <p className="text-zinc-400 mt-2">Personal • Fast Logging • Small Stakes • Abuja</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-emerald-400 text-xs font-medium tracking-widest">TOTAL PROFIT</div>
            <div className="text-4xl font-semibold mt-3">₦{totalProfit}</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-emerald-400 text-xs font-medium tracking-widest">TOTAL STAKED</div>
            <div className="text-4xl font-semibold mt-3">₦{totalStaked}</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-5 border border-zinc-800">
            <div className="text-emerald-400 text-xs font-medium tracking-widest">FLIPS</div>
            <div className="text-4xl font-semibold mt-3">{trades.length}</div>
          </div>
        </div>

        {/* Quick Log Form */}
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 mb-8">
          <h2 className="text-xl font-semibold mb-5">Quick Log Flip</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">PLATFORM</label>
              <select 
                value={platform} 
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
              >
                {platforms.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">TYPE</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
              >
                {types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">STAKE (₦)</label>
              <input 
                type="number" 
                value={stake} 
                onChange={(e) => setStake(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white font-mono"
              />
            </div>

            <div>
              <label className="text-xs text-zinc-400 block mb-1.5">PROFIT %</label>
              <input 
                type="number" 
                step="0.1" 
                value={profitPercent} 
                onChange={(e) => setProfitPercent(Number(e.target.value))}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white font-mono"
              />
            </div>
          </div>

          <button 
            onClick={logTrade}
            className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg active:scale-[0.985] transition"
          >
            LOG THIS FLIP
          </button>

          <p className="text-center text-xs text-zinc-500 mt-3">
            Estimated profit: ₦{Math.round(stake * (profitPercent / 100))}
          </p>
        </div>

        {/* History */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Flip History</h2>
            {trades.length > 0 && (
              <span className="text-xs text-zinc-500">{trades.length} flips</span>
            )}
          </div>

          {trades.length === 0 ? (
            <div className="bg-zinc-900 rounded-3xl p-8 text-center text-zinc-400 border border-zinc-800">
              No flips logged yet.<br />
              Use the form above to start tracking.
            </div>
          ) : (
            <div className="space-y-3">
              {trades.map((trade) => (
                <div key={trade.id} className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{trade.platform} • {trade.type}</div>
                    <div className="text-xs text-zinc-500">{trade.time} • ₦{trade.stake} stake @ {trade.profitPercent}%</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-emerald-400 font-semibold">+₦{trade.profit}</div>
                    </div>
                    <button 
                      onClick={() => deleteTrade(trade.id)}
                      className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 rounded-xl transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="text-center text-xs text-zinc-500 mt-12 pb-8">
          Track every small win. Discipline compounds.<br />
          Personal use only • Start small, stay consistent.
        </div>
      </div>
    </div>
  );
}
