"use client";

import { motion } from "framer-motion";
import { Container } from "@/lib/utils";

export default function Identity() {
    return (
        <section className="relative py-24 md:py-32 overflow-hidden border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    {/* テキストコンテンツ */}
                    <div className="lg:col-span-12 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-4"
                        >
                            <h2 className="text-accent text-xs font-sans tracking-[0.5em] uppercase">
                                Identity
                            </h2>
                            <div className="font-serif text-4xl md:text-6xl font-black leading-tight">
                                武田 直也 <span className="text-xl md:text-2xl font-sans font-light tracking-widest text-muted">/ Naoya Takeda</span>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 1 }}
                                className="space-y-6 text-muted leading-relaxed"
                            >
                                <p>
                                    人は私を「身体障害者」と定義するかもしれない。<br />
                                    生まれつき手首から先がない左手。それが私のデフォルトだ。
                                </p>
                                <p>
                                    しかし、私にとってこの不全は「制約」ではなく、世界を深く観察し、他者の懐に飛び込むための「独自のOS」そのものだった。
                                </p>
                                <p className="text-foreground border-l-2 border-accent pl-6 py-2 bg-accent/5">
                                    「他人の正解をなぞっても、自分は強くならない。」
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, duration: 1 }}
                                className="space-y-6 text-muted leading-relaxed"
                            >
                                <p>
                                    かつて150万円という大金を払い、「成功への近道」を買おうとした。しかし、そこで得たのは知識ではなく、凄惨な虚無感だった。<br />
                                    その挫折の果てに、私は一つの真実に辿り着く。
                                </p>
                                <p className="font-serif text-xl text-foreground">
                                    自分の人生の責任を、自分で負う覚悟。
                                </p>
                                <p>
                                    身体の特性、過去の過ち、そして泥臭い実行力。
                                    それらすべてを「美学」へと昇華させ、私は今日を生きている。
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Container>

            {/* 装飾的な背景テキスト：大きな薄い文字 */}
            <div className="absolute top-0 right-[-5%] text-[20vw] font-serif font-black text-white/5 select-none pointer-events-none whitespace-nowrap leading-none transition-transform duration-1000">
                HETERODOXY
            </div>
        </section>
    );
}
