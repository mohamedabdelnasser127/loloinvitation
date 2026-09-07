import { useState } from "react";
import { LockKeyhole, Copy, Check, X } from "lucide-react";

const secretPassword = "momoloveslolo1392006";
const loveCode = String.raw`y=3(x+9)\left\{-9\le x\le-8\right\}
y=3-2(x+8)\left\{-8\le x\le-7\right\}
y=1+2(x+7)\left\{-7\le x\le-6\right\}
y=3-3(x+6)\left\{-6\le x\le-5\right\}
\left(\left(\frac{x+1}{1.3}\right)^2+\left(\frac{y-1.5}{1.3}\right)^2-1\right)^3=\left(\frac{x+1}{1.3}\right)^2\left(\frac{y-1.5}{1.3}\right)^3
y=2(x-3)\left\{3\le x\le5\right\}
y=2(7-x)\left\{5\le x\le7\right\}
y=1.5\left\{3.75\le x\le6.25\right\}`;

export function SecretMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function unlockMessage() {
    if (password.trim().toLowerCase() !== secretPassword) {
      setError("That is not the secret word. Try again, my love.");
      return;
    }

    setError("");
    setUnlocked(true);
  }

  async function copyCode() {
    await navigator.clipboard.writeText(loveCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function closePanel() {
    setIsOpen(false);
    setPassword("");
    setError("");
    setUnlocked(false);
    setCopied(false);
  }

  return (
    <>
      <button
        type="button"
        className="secret-lock-button"
        onClick={() => setIsOpen(true)}
        aria-label="Open the secret love letter"
      >
        <LockKeyhole className="size-4" aria-hidden />
      </button>

      {isOpen && (
        <div className="secret-message-backdrop" role="presentation" onClick={closePanel}>
          <section
            className="secret-message-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="secret-message-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="secret-message-close"
              onClick={closePanel}
              aria-label="Close secret letter"
            >
              <X className="size-4" aria-hidden />
            </button>

            {!unlocked ? (
              <>
                <p className="eyebrow text-ember">Sealed with love</p>
                <h2 id="secret-message-title" className="mt-3 text-3xl font-semibold">
                  A private note for Alaa
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Someone special left something here for you. Enter the secret word to reveal the
                  hidden letter.
                </p>
                <label
                  htmlFor="secret-password"
                  className="eyebrow mt-6 block text-muted-foreground"
                >
                  Secret password
                </label>
                <input
                  id="secret-password"
                  type="password"
                  value={password}
                  autoFocus
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") unlockMessage();
                  }}
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ember-soft"
                />
                {error && <p className="mt-2 text-sm text-ember">{error}</p>}
                <button
                  type="button"
                  onClick={unlockMessage}
                  className="eyebrow mt-5 w-full rounded-sm bg-ember px-5 py-4 text-primary-foreground"
                >
                  Unlock his message
                </button>
              </>
            ) : (
              <>
                <p className="eyebrow text-ember">From Mohamed — Momo, with all my heart</p>
                <h2 id="secret-message-title" className="mt-3 text-3xl font-semibold">
                  For my beautiful Alaa
                </h2>
                <p className="mt-5 font-[family-name:var(--font-display)] text-xl leading-relaxed text-muted-foreground italic">
                  “Lolo, I love you more than every candle, every song, and every beautiful chapter
                  still waiting for us. Your light makes ordinary days feel like celebrations. I
                  cannot wait to see you shine.”
                </p>
                <div className="mt-7 rounded-xl border border-border bg-secondary/60 p-5">
                  <p className="eyebrow text-muted-foreground">Secret math code</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    Copy this secret math code, then open Desmos and paste each equation into a new
                    line to reveal the hidden drawing.
                  </p>
                  <a
                    href="https://www.desmos.com/calculator"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex text-sm font-semibold text-ember underline underline-offset-4 transition-colors hover:text-ember-soft"
                  >
                    Open the Desmos calculator
                  </a>
                  <div className="mt-3 flex items-center gap-3">
                    <code className="min-w-0 flex-1 max-h-48 overflow-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-ember">
                      {loveCode}
                    </code>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="rounded-sm border border-ember p-3 text-ember transition-colors hover:bg-ember hover:text-primary-foreground"
                      aria-label="Copy secret math code"
                    >
                      {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                    </button>
                  </div>
                  {copied && <p className="mt-2 text-xs text-ember">Copied to your clipboard.</p>}
                </div>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
