"use client";

import { useState } from "react";
import { ExternalLink, Loader2, Sparkles, X } from "lucide-react";
import { buildLinks, type StyleInput, type StyleResult, type Taste } from "@/lib/style";
import { cn } from "@/lib/utils";

const TASTES: { id: Taste; label: string }[] = [
  { id: "street", label: "ストリート" },
  { id: "mix", label: "きれいめ × ストリート" },
  { id: "unknown", label: "まだ分からない" },
];
const BUILDS = [
  { id: "slim", label: "細め" },
  { id: "normal", label: "普通" },
  { id: "solid", label: "がっしり" },
] as const;

const field = "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-accent";

/** 画像を長辺768pxのJPEGに縮小(送信サイズ削減) */
async function shrink(file: File): Promise<string> {
  const bmp = await createImageBitmap(file);
  const s = Math.min(1, 768 / Math.max(bmp.width, bmp.height));
  const c = document.createElement("canvas");
  c.width = Math.round(bmp.width * s);
  c.height = Math.round(bmp.height * s);
  c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
  return c.toDataURL("image/jpeg", 0.8);
}

export default function StylePage() {
  const [input, setInput] = useState<StyleInput>({
    height: 172, weight: 62, build: "normal", tastes: ["mix"],
    budget: 10000, frequency: "月1回くらい", references: "", note: "",
  });
  const [images, setImages] = useState<string[]>([]);
  const [result, setResult] = useState<StyleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = <K extends keyof StyleInput>(k: K, v: StyleInput[K]) => setInput((p) => ({ ...p, [k]: v }));
  const toggleTaste = (t: Taste) =>
    set("tastes", input.tastes.includes(t) ? input.tastes.filter((x) => x !== t) : [...input.tastes, t]);

  async function addImages(files: FileList | null) {
    if (!files) return;
    const next = await Promise.all(Array.from(files).slice(0, 3 - images.length).map(shrink));
    setImages((p) => [...p, ...next].slice(0, 3));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/style", {
        method: "POST", headers: { "content-type": "application/json" },
        body: JSON.stringify({ input, images }),
      });
      if (!res.ok) throw new Error();
      setResult(await res.json());
    } catch {
      setError("診断に失敗しました。もう一度お試しください。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen px-6 py-16 md:py-24 max-w-3xl mx-auto">
      <p className="text-[10px] tracking-[0.4em] text-accent uppercase mb-4">Style Finder</p>
      <h1 className="font-serif text-3xl md:text-5xl font-black mb-4">服選びの時間を、ゼロに近づける。</h1>
      <p className="text-muted text-sm mb-12">一度入力すれば、似合う服と「そのままZOZOで開ける検索リンク」まで出します。</p>

      <form onSubmit={submit} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs text-muted">身長 (cm)
            <input type="number" className={cn(field, "mt-2")} value={input.height} min={140} max={210} onChange={(e) => set("height", +e.target.value)} />
          </label>
          <label className="text-xs text-muted">体重 (kg)
            <input type="number" className={cn(field, "mt-2")} value={input.weight} min={30} max={150} onChange={(e) => set("weight", +e.target.value)} />
          </label>
        </div>

        <div>
          <p className="text-xs text-muted mb-2">体型</p>
          <div className="flex gap-2">
            {BUILDS.map((b) => (
              <button type="button" key={b.id} onClick={() => set("build", b.id)}
                className={cn("flex-1 py-3 rounded-lg border text-sm", input.build === b.id ? "border-accent text-accent" : "border-white/10")}>
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs text-muted mb-2">目指したいテイスト(複数可)</p>
          <div className="flex flex-wrap gap-2">
            {TASTES.map((t) => (
              <button type="button" key={t.id} onClick={() => toggleTaste(t.id)}
                className={cn("px-4 py-2 rounded-full border text-sm", input.tastes.includes(t.id) ? "border-accent bg-accent/10 text-accent" : "border-white/10")}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs text-muted">1アイテムの予算上限 (円)
            <input type="number" step={1000} className={cn(field, "mt-2")} value={input.budget} onChange={(e) => set("budget", +e.target.value)} />
          </label>
          <label className="text-xs text-muted">買う頻度
            <input className={cn(field, "mt-2")} value={input.frequency} onChange={(e) => set("frequency", e.target.value)} />
          </label>
        </div>

        <label className="block text-xs text-muted">好きな芸能人・インスタのアカウント名
          <input className={cn(field, "mt-2")} placeholder="例: 〇〇、@xxxxx" value={input.references} onChange={(e) => set("references", e.target.value)} />
        </label>

        <div>
          <p className="text-xs text-muted mb-2">好きなコーデの画像(最大3枚・任意)</p>
          <div className="flex gap-3 items-center flex-wrap">
            {images.map((src, i) => (
              <div key={i} className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="w-20 h-20 object-cover rounded-lg" />
                <button type="button" aria-label="削除" onClick={() => setImages(images.filter((_, j) => j !== i))}
                  className="absolute -top-2 -right-2 bg-black border border-white/20 rounded-full p-1"><X size={12} /></button>
              </div>
            ))}
            {images.length < 3 && (
              <label className="w-20 h-20 rounded-lg border border-dashed border-white/20 flex items-center justify-center text-2xl text-muted cursor-pointer">
                +<input type="file" accept="image/*" multiple hidden onChange={(e) => addImages(e.target.files)} />
              </label>
            )}
          </div>
        </div>

        <label className="block text-xs text-muted">悩み・要望(着脱のしやすさ、隠したい体型など)
          <textarea rows={3} className={cn(field, "mt-2")} value={input.note} onChange={(e) => set("note", e.target.value)} />
        </label>

        <button disabled={loading} className="w-full py-4 rounded-lg bg-accent text-black font-bold flex items-center justify-center gap-2 disabled:opacity-60">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
          {loading ? "診断中…" : "似合うスタイルを診断する"}
        </button>
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </form>

      {result && (
        <section className="mt-20 space-y-10">
          <div>
            <p className="text-[10px] tracking-[0.4em] text-accent uppercase mb-2">
              Your Type {result.source === "rule" && "· 簡易診断"}
            </p>
            <h2 className="font-serif text-3xl font-black mb-3">{result.typeName}</h2>
            <p className="text-sm text-muted leading-relaxed">{result.summary}</p>
          </div>
          <div className="border-l-2 border-accent pl-4">
            <p className="text-xs text-accent mb-1">シルエット</p>
            <p className="text-sm leading-relaxed">{result.silhouette}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.palette.map((p) => <span key={p} className="px-3 py-1 text-xs border border-white/10 rounded-full">{p}</span>)}
          </div>

          {result.coordinates.map((c) => (
            <div key={c.title}>
              <h3 className="font-bold mb-4">{c.title}</h3>
              <ul className="space-y-3">
                {c.items.map((it) => (
                  <li key={it.name} className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <p className="font-bold text-sm">{it.name} {it.priceHint && <span className="text-muted font-normal">· {it.priceHint}</span>}</p>
                    <p className="text-xs text-muted mt-1 mb-3">{it.why}</p>
                    <div className="flex gap-2 flex-wrap">
                      {buildLinks(it.keyword).map((l) => (
                        <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-3 py-1.5 rounded-full border border-accent/40 text-accent inline-flex items-center gap-1">
                          {l.label}<ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="font-bold mb-3">避けたほうがいいこと</h3>
            <ul className="list-disc pl-5 text-sm text-muted space-y-1">{result.avoid.map((a) => <li key={a}>{a}</li>)}</ul>
          </div>
        </section>
      )}
    </main>
  );
}
