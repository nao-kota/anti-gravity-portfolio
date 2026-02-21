"use client";

import { motion } from "framer-motion";
import { Container } from "@/lib/utils";

const timelineEvents = [
    {
        year: "Childhood",
        title: "不完全というデフォルト",
        description: "身体障害という特性を、ハンデではなく「世界を別解で解くための道具」として再定義し始めた原点。",
        tag: "Origin",
    },
    {
        year: "University",
        title: "100台以上のヒッチハイクと実験",
        description: "未知の懐に飛び込む人間力を磨く。ベストボディへの挑戦など、極端な実験を繰り返す日々。",
        tag: "Experiment",
    },
    {
        year: "Crisis",
        title: "150万円の代償と覚悟",
        description: "誰かの正解を買おうとして失敗した過去。自分の人生の責任を自分で負うことの重さと尊さを知る。",
        tag: "Awakening",
    },
    {
        year: "Business",
        title: "泥臭い実弾の経験",
        description: "サウナ制作、テレアポ、SNSマーケティング。一見バラバラな『偏愛』が、ビジネスという戦場で一本の線に繋がった。",
        tag: "Execution",
    },
];

export default function Odyssey() {
    return (
        <section className="relative py-24 md:py-32 bg-background">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20 space-y-4"
                >
                    <h2 className="text-accent text-xs font-sans tracking-[0.5em] uppercase">The Odyssey</h2>
                    <p className="font-serif text-3xl md:text-5xl font-black">バラバラな点、繋がる覚悟。</p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {/* 中央の線 */}
                    <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

                    <div className="space-y-24 md:space-y-32">
                        {timelineEvents.map((event, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className={`relative flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                    } items-start md:items-center gap-8 md:gap-0`}
                            >
                                {/* タイムラインの点 */}
                                <div className="absolute left-[20px] md:left-1/2 w-3 h-3 bg-accent rounded-full -translate-x-1/2 z-10 border-4 border-black" />

                                {/* コンテンツパネル */}
                                <div className="w-full md:w-5/12 ml-12 md:ml-0 md:px-8 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="text-accent font-serif text-xl italic">{event.year}</span>
                                        <span className="text-[10px] tracking-widest text-muted border border-white/20 px-2 py-0.5 rounded uppercase">
                                            {event.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground leading-tight">
                                        {event.title}
                                    </h3>
                                    <p className="text-muted text-sm leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>

                                {/* 反対側のスペース（装飾用または空） */}
                                <div className="hidden md:block md:w-5/12" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
}
