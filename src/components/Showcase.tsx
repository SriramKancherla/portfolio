import { useState } from "react";
import { Play, Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";

const tickers = ["AAPL", "TSLA", "NVDA", "MSFT", "GOOGL"];

type Result = {
  ticker: string;
  score: number;
  sentiment: "Bullish" | "Bearish" | "Neutral";
  signals: { label: string; value: string; tone: "good" | "bad" | "neutral" }[];
};

const seed: Record<string, Result> = {
  AAPL: {
    ticker: "AAPL", score: 82, sentiment: "Bullish",
    signals: [
      { label: "P/E Ratio", value: "28.4", tone: "neutral" },
      { label: "Revenue Growth", value: "+11.2%", tone: "good" },
      { label: "News Sentiment", value: "+0.71", tone: "good" },
      { label: "Volatility (30d)", value: "Low", tone: "good" },
    ],
  },
  TSLA: {
    ticker: "TSLA", score: 64, sentiment: "Neutral",
    signals: [
      { label: "P/E Ratio", value: "71.2", tone: "bad" },
      { label: "Revenue Growth", value: "+4.8%", tone: "neutral" },
      { label: "News Sentiment", value: "+0.32", tone: "neutral" },
      { label: "Volatility (30d)", value: "High", tone: "bad" },
    ],
  },
  NVDA: {
    ticker: "NVDA", score: 91, sentiment: "Bullish",
    signals: [
      { label: "P/E Ratio", value: "42.1", tone: "neutral" },
      { label: "Revenue Growth", value: "+89.4%", tone: "good" },
      { label: "News Sentiment", value: "+0.88", tone: "good" },
      { label: "Volatility (30d)", value: "Medium", tone: "neutral" },
    ],
  },
  MSFT: {
    ticker: "MSFT", score: 78, sentiment: "Bullish",
    signals: [
      { label: "P/E Ratio", value: "34.2", tone: "neutral" },
      { label: "Revenue Growth", value: "+15.7%", tone: "good" },
      { label: "News Sentiment", value: "+0.62", tone: "good" },
      { label: "Volatility (30d)", value: "Low", tone: "good" },
    ],
  },
  GOOGL: {
    ticker: "GOOGL", score: 74, sentiment: "Bullish",
    signals: [
      { label: "P/E Ratio", value: "25.8", tone: "good" },
      { label: "Revenue Growth", value: "+13.5%", tone: "good" },
      { label: "News Sentiment", value: "+0.54", tone: "good" },
      { label: "Volatility (30d)", value: "Low", tone: "good" },
    ],
  },
};

export const Showcase = () => {
  const [selected, setSelected] = useState("NVDA");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<Result | null>(seed["NVDA"]);

  const run = () => {
    setRunning(true);
    setResult(null);
    setTimeout(() => {
      setResult(seed[selected]);
      setRunning(false);
    }, 1200);
  };

  const toneClass = (t: "good" | "bad" | "neutral") =>
    t === "good" ? "text-emerald-400" : t === "bad" ? "text-rose-400" : "text-muted-foreground";

  const SentimentIcon = result?.sentiment === "Bullish" ? TrendingUp : result?.sentiment === "Bearish" ? TrendingDown : Minus;

  return (
    <section id="showcase" className="relative py-28">
      <div className="container">
        <Reveal>
          <div className="mb-12 max-w-3xl">
            <p className="mono text-xs text-primary mb-3">// 06 — interactive demo</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Try a live AI <span className="text-gradient">stock analysis</span>.
            </h2>
            <p className="text-lg text-muted-foreground">
              Pick a ticker and watch a mock ML pipeline combine fundamentals with news sentiment to score the opportunity.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="glass-strong rounded-3xl p-6 md:p-10 relative overflow-hidden">
            <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-start">
              <div>
                <p className="mono text-xs text-muted-foreground mb-3">SELECT TICKER</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tickers.map((t) => (
                    <button
                      key={t}
                      onClick={() => setSelected(t)}
                      className={`mono text-sm px-4 py-2 rounded-lg border transition-all ${
                        selected === t
                          ? "bg-gradient-to-r from-primary to-accent text-primary-foreground border-transparent"
                          : "border-border bg-card/40 text-muted-foreground hover:text-foreground hover:border-primary/40"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <Button onClick={run} disabled={running} size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 w-full sm:w-auto glow">
                  {running ? (
                    <><Sparkles size={16} className="mr-2 animate-spin" /> Running pipeline...</>
                  ) : (
                    <><Play size={16} className="mr-2" /> Run Analysis</>
                  )}
                </Button>

                <div className="mt-8 space-y-2 mono text-xs text-muted-foreground">
                  <div className={`flex items-center gap-2 ${running ? "text-primary" : ""}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Fetching market data...
                  </div>
                  <div className={`flex items-center gap-2 ${running ? "text-primary" : ""}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/70" /> Parsing news feed (12 sources)
                  </div>
                  <div className={`flex items-center gap-2 ${running ? "text-primary" : ""}`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-primary/40" /> Scoring with XGBoost + LightGBM ensemble
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 min-h-[340px]">
                {result ? (
                  <div className="animate-fade-in">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="mono text-xs text-muted-foreground">RESULT FOR</div>
                        <div className="text-2xl font-bold font-display">{result.ticker}</div>
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                        result.sentiment === "Bullish" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" :
                        result.sentiment === "Bearish" ? "bg-rose-500/10 border-rose-500/30 text-rose-400" :
                        "bg-muted/30 border-border text-muted-foreground"
                      }`}>
                        <SentimentIcon size={14} />
                        <span className="text-sm font-medium">{result.sentiment}</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Confidence Score</span>
                        <span className="text-3xl font-bold text-gradient font-display">{result.score}</span>
                      </div>
                      <div className="h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      {result.signals.map((s) => (
                        <div key={s.label} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                          <span className="text-sm text-muted-foreground">{s.label}</span>
                          <span className={`mono text-sm font-medium ${toneClass(s.tone)}`}>{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground mono text-sm">
                    <Sparkles className="mr-2 animate-pulse" size={16} /> Processing...
                  </div>
                )}
              </div>
            </div>
            <p className="relative mono text-[11px] text-muted-foreground mt-6">
              * Demo uses simulated outputs. The underlying methodology mirrors my Ainvestify project.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
