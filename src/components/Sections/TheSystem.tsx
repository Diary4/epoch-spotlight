import React from "react";
import { Home, ArrowLeft, ChevronRight } from "lucide-react";
import "./SystemPage.css";

export default function SystemPage() {
  return (
    <div className="system-page">
      <header className="system-header">
        <div className="brand">
          <div className="brand-icon">⌘</div>
          <h1>Gate of Kurdistan</h1>
        </div>

        <div className="langs">
          <span>Kurdish</span>
          <span className="active">English</span>
          <span>Arabic</span>
        </div>

        <div className="nav-icons">
          <div>
            <button><Home size={28} /></button>
            <p>Home</p>
          </div>
          <div>
            <button><ArrowLeft size={28} /></button>
            <p>Back</p>
          </div>
        </div>
      </header>

      <main className="system-content">
        <section className="hero">
          <div className="hero-text">
            <h2>The System</h2>
            <h3>How Kurdistan’s institutions work together.</h3>
            <div className="gold-line" />
            <p>
              The Kurdistan Region operates through a parliamentary system
              in which institutions work together to support public life.
            </p>
          </div>

          <div className="building">
            <div className="flag">🇹🇯</div>
          </div>
        </section>

        <section className="diagram">
          <div className="circle parliament">
            <div className="icon">▰</div>
            <h4>PARLIAMENT</h4>
          </div>

          <div className="circle government">
            <div className="icon">⌂</div>
            <h4>GOVERNMENT</h4>
          </div>

          <div className="circle presidency">
            <div className="icon">🦅</div>
            <h4>PRESIDENCY</h4>
          </div>

          <div className="center-symbol">✺</div>
          <div className="orbit orbit1" />
          <div className="orbit orbit2" />
          <div className="line l1" />
          <div className="line l2" />
          <div className="line l3" />
        </section>

        <button className="pm-button">
          <span className="pm-pattern">✺</span>
          <span>Prime Minister</span>
          <ChevronRight size={46} />
        </button>
      </main>

      <footer className="system-footer">
        <div className="footer-badge">✺</div>
        <p>
          Together, these institutions support governance, law, and public
          administration.
        </p>
      </footer>
    </div>
  );
}