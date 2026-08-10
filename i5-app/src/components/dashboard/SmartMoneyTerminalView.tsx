"use client";

import React, { useState } from "react";
import { Brain, Copy, SlidersHorizontal } from "lucide-react";
import styles from "./SmartMoneyTerminalView.module.css";
import TokenSmartMoneyView from "../../views/TokenSmartMoneyView";
import WalletProfileView from "../../views/WalletProfileView";

interface SmartMoneyItem {
  id: string;
  symbol: string;
  name: string;
  avatar: string;
  age: string;
  address: string;
  price: string;
  priceSubscript?: string;
  priceRest?: string;
  change: string;
  changeType: "green" | "red" | "grey";
  mc: string;
  volumeInflow: string;
  brainCount: number;
}

const mockSmartMoneyData: SmartMoneyItem[] = [
  { id: "sm-1", symbol: "GOOGLx", name: "Alphabet xStock", avatar: "https://cryptologos.cc/logos/google-logo.png", age: "1y", address: "XsCPL9dN", price: "$357.45", change: "+0.18%", changeType: "green", mc: "$28.67M", volumeInflow: "$102.48K", brainCount: 1 },
  { id: "sm-2", symbol: "jlWSOL", name: "Jupiter Lend WSOL", avatar: "https://cryptologos.cc/logos/solana-sol-logo.png", age: "1y", address: "2uQzoy0f", price: "$79.20", change: "+0.28%", changeType: "green", mc: "$17.53M", volumeInflow: "$95.09K", brainCount: 2 },
  { id: "sm-3", symbol: "NBISon", name: "Nebius Group", avatar: "https://cryptologos.cc/logos/nexo-nexo-logo.png", age: "5mo", address: "DiRshqND", price: "$190.09", change: "0%", changeType: "grey", mc: "$1.96M", volumeInflow: "$87.58K", brainCount: 1 },
  { id: "sm-4", symbol: "Fartcoin", name: "Fartcoin", avatar: "https://cryptologos.cc/logos/dogecoin-doge-logo.png", age: "2y", address: "9BB6NFEc", price: "$0.1363", change: "+5.12%", changeType: "green", mc: "$136.36M", volumeInflow: "$81.36K", brainCount: 4 },
  { id: "sm-5", symbol: "TNOS", name: "TNOS", avatar: "https://cryptologos.cc/logos/stellar-xlm-logo.png", age: "1d", address: "Achv8vsk", price: "$0.0", priceSubscript: "5", priceRest: "19999", change: "-99.96%", changeType: "red", mc: "$1.99K", volumeInflow: "$80.24K", brainCount: 1 },
  { id: "sm-6", symbol: "USOF", name: "U. S. Oil Fund", avatar: "https://cryptologos.cc/logos/tether-usdt-logo.png", age: "10h", address: "HmDETCAV", price: "$0.007111", change: "+41.12%", changeType: "green", mc: "$7.1M", volumeInflow: "$76.68K", brainCount: 1 },
  { id: "sm-7", symbol: "HYPE", name: "HYPE", avatar: "https://cryptologos.cc/logos/hypercash-hc-logo.png", age: "10mo", address: "98sMhvDw", price: "$55.19", change: "+1.71%", changeType: "green", mc: "$41.14M", volumeInflow: "$74.02K", brainCount: 4 },
  { id: "sm-8", symbol: "META", name: "MetaDAO", avatar: "https://cryptologos.cc/logos/facebook-logo.png", age: "1y", address: "METAwkXc", price: "$5.2985", change: "+4.93%", changeType: "green", mc: "$120.19M", volumeInflow: "$63.25K", brainCount: 6 },
  { id: "sm-9", symbol: "CARDS", name: "Collector Crypt", avatar: "https://cryptologos.cc/logos/cardano-ada-logo.png", age: "1y", address: "CARDSccu", price: "$0.1339", change: "-4.22%", changeType: "red", mc: "$51.99M", volumeInflow: "$62.77K", brainCount: 8 },
  { id: "sm-10", symbol: "ANSEM", name: "The Black Bull", avatar: "https://cryptologos.cc/logos/bitcoin-cash-bch-logo.png", age: "2mo", address: "9cRCn9rG", price: "$0.1807", change: "+3.41%", changeType: "green", mc: "$164.12M", volumeInflow: "$52.35K", brainCount: 24 },
  { id: "sm-11", symbol: "WBTC", name: "Wrapped BTC (Wormhole)", avatar: "https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.png", age: "4y", address: "3vFx...", price: "$65,127.73", change: "+0.36%", changeType: "green", mc: "$175.86M", volumeInflow: "$45.21K", brainCount: 15 }
];

export default function SmartMoneyTerminalView() {
  const [selectedToken, setSelectedToken] = useState<SmartMoneyItem | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);

  return (
    <>
      {selectedWallet && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "var(--bg-app)" }}>
          <WalletProfileView walletAddress={selectedWallet} onClose={() => setSelectedWallet(null)} />
        </div>
      )}
      {selectedToken && !selectedWallet && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9998, background: "var(--bg-app)" }}>
          <TokenSmartMoneyView 
            tokenSymbol={selectedToken.symbol} 
            tokenName={selectedToken.name} 
            onClose={() => setSelectedToken(null)}
            onSelectWallet={setSelectedWallet}
          />
        </div>
      )}

    
      {/* Subheader */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--border-color-default)", fontSize: 13, color: "var(--text-tertiary)" }}>
        <div>Discover what high-PnL traders are trading, grouped by their risk profiles.</div>
        <div style={{ display: "flex", gap: 16 }}>
          <span style={{ color: "var(--orange-500)", fontWeight: 500, cursor: "pointer" }}>Net Flow ($) ↓</span>
          <span style={{ cursor: "pointer" }}>Smart Traders ↓</span>
        </div>
      </div>

      <div className={styles.container} style={{ flex: 1 }}>
      {/* 3 Columns */}
      <div className={styles.column}>
        <div className={`${styles.header} ${styles.blueHeader}`}>
          <div className={styles.headerLeft}>
             <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=100&auto=format&fit=crop&q=80" alt="Risk Averse Mascot" className={styles.mascot} />
             <h3 className={styles.headerTitle}>RISK AVERSE</h3>
          </div>
        </div>
        <div className={styles.statsBar}>
          <span className={styles.statPill} style={{color:"var(--text-tertiary)"}}>💬 2.68K</span>
          <span className={styles.statPill} style={{color:"var(--color-price-up)"}}>💰 $30.52K</span>
          <span className={styles.statPill} style={{color:"var(--purple-400)"}}>📊 $295.7K</span>
          <span className={styles.statPill} style={{color:"var(--yellow-500)"}}>🪙 5</span>
          <span className={styles.statPill} style={{color:"var(--red-400)"}}>⇆ 320.63</span>
          <span className={styles.statPill} style={{color:"var(--red-400)"}}>U 2.41%</span>
        </div>
        <div className={styles.list}>
          {mockSmartMoneyData.map(item => (
            <div key={item.id} className={styles.smartCard} onClick={() => setSelectedToken(item)}>
              <div className={styles.smartLeft}>
                <div className={styles.smartAvatarWrapper}>
                  <img src={item.avatar} alt={item.symbol} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div className={styles.smartIdentity}>
                  <div className={styles.symbolNameRow}>
                    <span className={styles.symbol}>{item.symbol}</span>
                    <span className={styles.name}>{item.name}</span>
                  </div>
                  <div className={styles.subMetaRow}>
                    <span className={styles.ageBadge}>{item.age}</span>
                    <span className={styles.contractAddress}>
                      {item.address}
                      <button className={styles.copyBtn} title="Copy"><Copy size={10} /></button>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.smartRight}>
                <div className={styles.priceRow}>
                  <span className={styles.priceText}>
                    {item.price}
                    {item.priceSubscript && <sub style={{ fontSize: "9px" }}>{item.priceSubscript}</sub>}
                    {item.priceRest}
                  </span>
                  <span className={item.changeType === "red" ? styles.changeRed : item.changeType === "green" ? styles.changeGreen : styles.changeGrey}>
                    {item.change}
                  </span>
                  <span className={styles.mcSpan}>
                    MC <span className={styles.mcBold}>{item.mc}</span>
                  </span>
                </div>
                <div className={styles.bottomSignalsRow}>
                  <span className={styles.volSignal} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <SlidersHorizontal size={10} /> {item.volumeInflow}
                  </span>
                  <span className={styles.brainBadge} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Brain size={10} /> {item.brainCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <div className={`${styles.header} ${styles.yellowHeader}`}>
          <div className={styles.headerLeft}>
             <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=100&auto=format&fit=crop&q=80" alt="Risk Balancers Mascot" className={styles.mascot} />
             <h3 className={styles.headerTitle}>RISK BALANCERS</h3>
          </div>
        </div>
        <div className={styles.statsBar}>
          <span className={styles.statPill} style={{color:"var(--text-tertiary)"}}>💬 828</span>
          <span className={styles.statPill} style={{color:"var(--color-price-up)"}}>💰 $30.86K</span>
          <span className={styles.statPill} style={{color:"var(--purple-400)"}}>📊 $384.68K</span>
          <span className={styles.statPill} style={{color:"var(--yellow-500)"}}>🪙 100</span>
          <span className={styles.statPill} style={{color:"var(--red-400)"}}>⇆ 752.36</span>
          <span className={styles.statPill} style={{color:"var(--red-400)"}}>U 21.54%</span>
        </div>
        <div className={styles.list}>
          {mockSmartMoneyData.map(item => (
            <div key={item.id} className={styles.smartCard} onClick={() => setSelectedToken(item)}>
              <div className={styles.smartLeft}>
                <div className={styles.smartAvatarWrapper}>
                  <img src={item.avatar} alt={item.symbol} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div className={styles.smartIdentity}>
                  <div className={styles.symbolNameRow}>
                    <span className={styles.symbol}>{item.symbol}</span>
                    <span className={styles.name}>{item.name}</span>
                  </div>
                  <div className={styles.subMetaRow}>
                    <span className={styles.ageBadge}>{item.age}</span>
                    <span className={styles.contractAddress}>
                      {item.address}
                      <button className={styles.copyBtn} title="Copy"><Copy size={10} /></button>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.smartRight}>
                <div className={styles.priceRow}>
                  <span className={styles.priceText}>
                    {item.price}
                    {item.priceSubscript && <sub style={{ fontSize: "9px" }}>{item.priceSubscript}</sub>}
                    {item.priceRest}
                  </span>
                  <span className={item.changeType === "red" ? styles.changeRed : item.changeType === "green" ? styles.changeGreen : styles.changeGrey}>
                    {item.change}
                  </span>
                  <span className={styles.mcSpan}>
                    MC <span className={styles.mcBold}>{item.mc}</span>
                  </span>
                </div>
                <div className={styles.bottomSignalsRow}>
                  <span className={styles.volSignal} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <SlidersHorizontal size={10} /> {item.volumeInflow}
                  </span>
                  <span className={styles.brainBadge} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Brain size={10} /> {item.brainCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.column}>
        <div className={`${styles.header} ${styles.redHeader}`}>
          <div className={styles.headerLeft}>
             <img src="https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?w=100&auto=format&fit=crop&q=80" alt="Trenchers Mascot" className={styles.mascot} />
             <h3 className={styles.headerTitle}>TRENCHERS</h3>
          </div>
        </div>
        <div className={styles.statsBar}>
          <span className={styles.statPill} style={{color:"var(--text-tertiary)"}}>💬 8.4K</span>
          <span className={styles.statPill} style={{color:"var(--color-price-up)"}}>💰 $28.26K</span>
          <span className={styles.statPill} style={{color:"var(--purple-400)"}}>📊 $175.43K</span>
          <span className={styles.statPill} style={{color:"var(--yellow-500)"}}>🪙 292</span>
          <span className={styles.statPill} style={{color:"var(--color-price-up)"}}>⇆ 1.12K</span>
          <span className={styles.statPill} style={{color:"var(--red-400)"}}>U 83.46%</span>
        </div>
        <div className={styles.list}>
          {mockSmartMoneyData.map(item => (
            <div key={item.id} className={styles.smartCard} onClick={() => setSelectedToken(item)}>
              <div className={styles.smartLeft}>
                <div className={styles.smartAvatarWrapper}>
                  <img src={item.avatar} alt={item.symbol} style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                </div>
                <div className={styles.smartIdentity}>
                  <div className={styles.symbolNameRow}>
                    <span className={styles.symbol}>{item.symbol}</span>
                    <span className={styles.name}>{item.name}</span>
                  </div>
                  <div className={styles.subMetaRow}>
                    <span className={styles.ageBadge}>{item.age}</span>
                    <span className={styles.contractAddress}>
                      {item.address}
                      <button className={styles.copyBtn} title="Copy"><Copy size={10} /></button>
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.smartRight}>
                <div className={styles.priceRow}>
                  <span className={styles.priceText}>
                    {item.price}
                    {item.priceSubscript && <sub style={{ fontSize: "9px" }}>{item.priceSubscript}</sub>}
                    {item.priceRest}
                  </span>
                  <span className={item.changeType === "red" ? styles.changeRed : item.changeType === "green" ? styles.changeGreen : styles.changeGrey}>
                    {item.change}
                  </span>
                  <span className={styles.mcSpan}>
                    MC <span className={styles.mcBold}>{item.mc}</span>
                  </span>
                </div>
                <div className={styles.bottomSignalsRow}>
                  <span className={styles.volSignal} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <SlidersHorizontal size={10} /> {item.volumeInflow}
                  </span>
                  <span className={styles.brainBadge} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <Brain size={10} /> {item.brainCount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
