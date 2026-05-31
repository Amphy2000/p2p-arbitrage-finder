'use client';

import React, { useState } from 'react';

interface Opportunity {
  id: number;
  platform: string;
  type: string;
  price: number;
  profitPercent: number;
  pair: string;
}

interface LoggedTrade {
  id: number;
  time: string;
  from: string;
  to: string;
  amount: number;
  profit: number;
}

export default function P2PArbitrageFinder() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([
    { id: 1, platform: 'Noones', type: 'Buy USDT', price: 1648, profitPercent: 2.1, pair: 'NGN' },
    { id: 2, platform: 'Binance P2P', type: 'Sell USDT', price: 1685, profitPercent: 1.9, pair: 'NGN' },
    { id: 3, platform: 'Bybit P2P', type: 'Buy USDT', price: 1642, profitPercent: 2.4, pair: 'NGN' },
    { id: 4, platform: 'Remitano', type: 'Sell USDT', price: 1690, profitPercent: 1.7, pair: 'NGN' },
  ]);

  const [trades, setTrades] = useState<LoggedTrade[]>([]);
  const [totalProfit, setTotalProfit] = useState(0);

  const refreshRates = () => {
    setOpportunities(prev => prev.map(opp => ({
      ...opp,
      price: Math.floor(opp.price + (Math.random() * 12 - 6)),
      profitPercent: parseFloat((Math.max(1.2, Math.min(3.5, opp.profitPercent + (Math.random() * 0.8 - 0.4)))).toFixed(1))
    })));
  };

  const logFlip = (opp: Opportunity) => {
    const stake = 2000; // Default small stake
    const profit = Math.round(stake * (opp.profitPercent / 100));

    const newTrade: LoggedTrade = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      from: opp.platform,
      to: opp.type.includes('Buy') ? 'Your Bank / Binance' : opp.platform,
      amount: stake,
      profit: profit
    };

    setTrades(prev => [newTrade, ...prev]);
    setTotalProfit(prev => prev + profit);

    alert(`✅ Flip Logged!\n\nPlatform: ${opp.platform}\nStake: ₦${stake}\nProfit: ₦${profit}\n\nKeep going. Small consistent wins.`);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-emerald-400">P2P ARBITRAGE</h1>
            <p className="text-zinc-400 mt-1">Your Personal Edge • Abuja, Nigeria</p>
          </div>
          <button 
            onClick={refreshRates}
            className="btn px-6 py-3 bg-zinc-800 hover:bg-zinc-700 rounded-2xl flex items-center gap-2 font-medium border border-zinc-700"
          >
            🔄 Refresh Live Rates
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm font-medium">TOTAL PROFIT</div>
            <div className="text-5xl font-semibold mt-3 text-white">₦{totalProfit.toLocaleString()}</div>
            <div className="text-xs text-zinc-500 mt-1">From logged flips</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm font-medium">FLIPS LOGGED</div>
            <div className="text-5xl font-semibold mt-3">{trades.length}</div>
            <div className="text-xs text-zinc-500 mt-1">This session</div>
          </div>
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <div className="text-emerald-400 text-sm font-medium">AVG EDGE</div>
            <div className="text-5xl font-semibold mt-3">2.0%</div>
            <div className="text-xs text-zinc-500 mt-1">Per flip</div>
          </div>
        </div>

        {/* Opportunities */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Live Opportunities</h2>
            <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full">Updated moments ago</span>
          </div>

          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.id} className="card rounded-3xl p-6 hover:border-emerald-500/30 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-xl">{opp.platform}</div>
                    <div className="text-zinc-400">{opp.type} • {opp.pair}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold text-emerald-400">+{opp.profitPercent}%</div>
                    <div className="text-xs text-zinc-500">EST. PROFIT</div>
                  </div>
                </div>

                <div className="my-6 text-3xl font-mono">₦{opp.price}</div>

                <button 
                  onClick={() => logFlip(opp)}
                  className="btn w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl font-bold text-lg"
                >
                  LOG ₦2,000 FLIP
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trade History */}
        {trades.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Your Flip History</h2>
            <div className="bg-zinc-900 rounded-3xl p-5 space-y-4 border border-zinc-800">
              {trades.map((trade) => (
                <div key={trade.id} className="flex justify-between items-center border-b border-zinc-800 pb-4 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{trade.from} → {trade.to}</div>
                    <div className="text-xs text-zinc-500">{trade.time} • ₦{trade.amount} stake</div>
                  </div>
                  <div className="text-right">
                    <div className="text-emerald-400 font-semibold">+₦{trade.profit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center text-xs text-zinc-500 mt-12 pb-8">
          For personal use only • Always double-check live rates on the platforms before trading • Discipline wins
        </div>
      </div>
    </div>
  );
}
