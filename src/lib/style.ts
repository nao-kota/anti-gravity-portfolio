export type Taste = "street" | "mix" | "unknown";

export interface StyleInput {
  height: number;
  weight: number;
  build: "slim" | "normal" | "solid";
  tastes: Taste[];
  budget: number; // 1アイテムあたりの上限(円)
  frequency: string;
  references: string; // 好きな芸能人・インスタアカウントなど
  note: string; // 悩み・着脱のしやすさなど
}

export interface StyleItem {
  name: string; // 例: オーバーサイズ ナイロンジャケット
  why: string;
  keyword: string; // ZOZO等で検索する語
  priceHint?: string;
}

export interface StyleResult {
  typeName: string; // スタイルタイプ名
  summary: string;
  silhouette: string;
  palette: string[];
  coordinates: { title: string; items: StyleItem[] }[];
  avoid: string[];
  source: "ai" | "rule";
}

export function buildLinks(keyword: string) {
  const q = encodeURIComponent(keyword);
  return [
    { label: "ZOZOTOWN", url: `https://zozo.jp/search/?p_keyv=${q}` },
    { label: "WEAR", url: `https://wear.jp/coordinate/?keyword=${q}` },
    {
      label: "画像",
      url: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(keyword + " コーデ")}`,
    },
  ];
}

export function bmi(h: number, w: number) {
  return w / Math.pow(h / 100, 2);
}

/** APIキーが無い時のルールベース診断 */
export function ruleBasedStyle(i: StyleInput): StyleResult {
  const b = bmi(i.height, i.weight);
  const isMix = i.tastes.includes("mix") || i.tastes.includes("unknown");
  const isStreet = i.tastes.includes("street");
  const tall = i.height >= 175;
  const small = i.height < 168;

  const silhouette =
    b < 20 || i.build === "slim"
      ? "細身を活かし、Iラインのワイドシルエット。トップスは肩落ち、ボトムはストレート〜ワイド。"
      : b > 25 || i.build === "solid"
        ? "ゆとりのあるTラインで重心を上に。ジャストよりワンサイズ上を、生地に落ち感のある素材で。"
        : "Aライン〜Yライン。トップスをややゆったり、ボトムはテーパードかストレートで抜け感を。";

  const heightTip = small
    ? "丈は短め〜ジャスト、ハイウエストで脚長に。"
    : tall
      ? "ロング丈やワイドパンツも映える。ボリュームを恐れず。"
      : "丈感は標準、足元でボリュームを調整。";

  const budgetHint =
    i.budget <= 5000
      ? "古着・H&M・GU系のトレンド品で1点だけ個性を足す"
      : i.budget <= 15000
        ? "国内セレクト系・ZOZO別注ブランドを中心に"
        : "ブランド/デザイナーズも視野に、1点豪華主義で";

  const streetItems: StyleItem[] = [
    { name: "オーバーサイズ ボックスTシャツ", why: "ストリートの基本。肩を落として抜け感を出す", keyword: "オーバーサイズ Tシャツ メンズ ストリート" },
    { name: "ワイド カーゴパンツ", why: "ボリューム差で一気に垢抜ける", keyword: "ワイド カーゴパンツ メンズ" },
    { name: "ナイロン ブルゾン", why: "軽く、1枚で雰囲気が出る", keyword: "ナイロン ブルゾン メンズ ストリート" },
    { name: "ボリュームソール スニーカー", why: "足元の存在感がコーデの軸になる", keyword: "ボリューム スニーカー メンズ" },
  ];
  const mixItems: StyleItem[] = [
    { name: "きれいめ テーラードジャケット(ゆったり)", why: "きれいめの骨格にストリートの余白を足す", keyword: "オーバーサイズ テーラードジャケット メンズ" },
    { name: "ワイド スラックス", why: "上品さを保ちつつ今っぽいシルエット", keyword: "ワイド スラックス メンズ" },
    { name: "ヘビーウェイト ロゴ無地Tシャツ", why: "インナーを無地で潔くまとめる", keyword: "ヘビーウェイト 無地 Tシャツ メンズ" },
    { name: "黒の厚底ローファー or チャンキースニーカー", why: "ハズしの足元で個性を出す", keyword: "厚底 ローファー メンズ" },
  ];

  const items = isMix && !isStreet ? mixItems : isStreet && !isMix ? streetItems : [...mixItems.slice(0, 2), ...streetItems.slice(0, 2)];

  return {
    typeName: isMix && !isStreet ? "きれいめストリートMIX" : isStreet && !isMix ? "モダンストリート" : "ハイブリッド・ストリート",
    summary: `身長${i.height}cm / ${i.weight}kg(BMI ${b.toFixed(1)})。${heightTip}予算目安: ${budgetHint}。`,
    silhouette,
    palette: ["ブラック", "チャコール", "オフホワイト", "差し色: アンバー or カーキ"],
    coordinates: [
      { title: "まず揃える4点(これだけで印象が変わる)", items },
    ],
    avoid: [
      "全身ジャスト〜タイトで揃える(無難に戻る)",
      "柄ものを同時に2点以上",
      "サイズ感が曖昧な「やや大きい」(上下どちらかは意図的に大きく)",
    ],
    source: "rule",
  };
}
