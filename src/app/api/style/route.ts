import { NextResponse } from "next/server";
import { ruleBasedStyle, type StyleInput, type StyleResult } from "@/lib/style";

export const runtime = "nodejs";

const MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-5-5";

const SYSTEM = `あなたは日本のメンズファッションのスタイリストです。
ユーザーの体型・予算・好みから、似合うスタイルを診断し、ZOZOTOWNで検索できる具体的な商品キーワードに落とし込みます。
- 抽象論ではなく、買うべきアイテムを具体名で。keywordはZOZOでヒットしやすい日本語2〜4語。
- 予算内で現実的に。体型の悩みや着脱のしやすさの要望があれば必ず反映。
- 参考画像や好きな人物の名前があれば、そこからテイストを読み取る。
出力はJSONのみ(前後に文章・コードフェンス不要)。形式:
{"typeName":string,"summary":string,"silhouette":string,"palette":string[],"coordinates":[{"title":string,"items":[{"name":string,"why":string,"keyword":string,"priceHint":string}]}],"avoid":string[]}
coordinatesは2〜3セット、各セット3〜5アイテム。`;

export async function POST(req: Request) {
  const { input, images = [] } = (await req.json()) as {
    input: StyleInput;
    images?: string[]; // data URL (jpeg)
  };

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return NextResponse.json(ruleBasedStyle(input));

  const content: unknown[] = images.slice(0, 3).map((d) => ({
    type: "image",
    source: { type: "base64", media_type: "image/jpeg", data: d.replace(/^data:image\/\w+;base64,/, "") },
  }));
  content.push({ type: "text", text: `ユーザー情報:\n${JSON.stringify(input, null, 2)}` });

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({ model: MODEL, max_tokens: 2500, system: SYSTEM, messages: [{ role: "user", content }] }),
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const data = await res.json();
    const text: string = data.content?.find((c: { type: string }) => c.type === "text")?.text ?? "";
    const json = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
    const result: StyleResult = { ...JSON.parse(json), source: "ai" };
    return NextResponse.json(result);
  } catch (e) {
    console.error("style api failed, falling back", e);
    return NextResponse.json(ruleBasedStyle(input));
  }
}
