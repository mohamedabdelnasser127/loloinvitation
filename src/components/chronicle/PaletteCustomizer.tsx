import { useEffect, useState } from "react";
import { Palette, X } from "lucide-react";

const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY = "lolo-custom-palette";

const colorFields = [
  { key: "--paper", label: "Background", fallback: "#FFE5EC" },
  { key: "--paper-deep", label: "Soft pink", fallback: "#FFC2D1" },
  { key: "--gilt", label: "Accent", fallback: "#FFB3C6" },
  { key: "--ember-soft", label: "Highlight", fallback: "#FF8FAB" },
  { key: "--ember", label: "Primary", fallback: "#FB6F92" },
] as const;

type PaletteValues = Record<(typeof colorFields)[number]["key"], string>;

const defaultPalette = Object.fromEntries(
  colorFields.map(({ key, fallback }) => [key, fallback]),
) as PaletteValues;

function applyPalette(values: PaletteValues) {
  for (const [key, value] of Object.entries(values)) {
    document.documentElement.style.setProperty(key, value);
  }
}

export function PaletteCustomizer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [palette, setPalette] = useState<PaletteValues>(defaultPalette);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as Partial<PaletteValues>;
      const restored = { ...defaultPalette, ...parsed };
      setPalette(restored);
      applyPalette(restored);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  function unlock() {
    if (password !== ADMIN_PASSWORD) {
      setError("Incorrect admin password.");
      return;
    }

    setError("");
    setIsUnlocked(true);
  }

  function updateColor(key: (typeof colorFields)[number]["key"], value: string) {
    const nextPalette = { ...palette, [key]: value };
    setPalette(nextPalette);
    applyPalette(nextPalette);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPalette));
  }

  function resetPalette() {
    setPalette(defaultPalette);
    applyPalette(defaultPalette);
    window.localStorage.removeItem(STORAGE_KEY);
  }

  function close() {
    setIsOpen(false);
    setIsUnlocked(false);
    setPassword("");
    setError("");
  }

  return (
    <>
      <button
        type="button"
        className="palette-control"
        onClick={() => setIsOpen(true)}
        aria-label="Customize website colors"
        title="Customize website colors"
      >
        <Palette className="size-4" aria-hidden />
      </button>

      {isOpen && (
        <div className="palette-backdrop" role="presentation" onClick={close}>
          <section
            className="palette-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="palette-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="palette-close" onClick={close} aria-label="Close color editor">
              <X className="size-4" aria-hidden />
            </button>

            {!isUnlocked ? (
              <>
                <p className="eyebrow text-ember">Admin area</p>
                <h2 id="palette-title" className="mt-3 text-3xl font-semibold">Customize colors</h2>
                <label htmlFor="palette-password" className="eyebrow mt-6 block text-muted-foreground">
                  Admin password
                </label>
                <input
                  id="palette-password"
                  type="password"
                  value={password}
                  autoFocus
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError("");
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") unlock();
                  }}
                  className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none focus:border-ember-soft"
                />
                {error && <p className="mt-2 text-sm text-ember">{error}</p>}
                <button type="button" onClick={unlock} className="eyebrow mt-5 w-full rounded-sm bg-ember px-5 py-4 text-primary-foreground">
                  Unlock color editor
                </button>
              </>
            ) : (
              <>
                <p className="eyebrow text-ember">Admin color editor</p>
                <h2 id="palette-title" className="mt-3 text-3xl font-semibold">Website palette</h2>
                <div className="palette-fields mt-6">
                  {colorFields.map(({ key, label }) => (
                    <label key={key} className="palette-field">
                      <span>{label}</span>
                      <input type="color" value={palette[key]} onChange={(event) => updateColor(key, event.target.value)} />
                      <code>{palette[key].toUpperCase()}</code>
                    </label>
                  ))}
                </div>
                <button type="button" onClick={resetPalette} className="eyebrow mt-6 w-full rounded-sm border border-ember px-5 py-3 text-ember transition-colors hover:bg-ember hover:text-primary-foreground">
                  Reset default palette
                </button>
              </>
            )}
          </section>
        </div>
      )}
    </>
  );
}
