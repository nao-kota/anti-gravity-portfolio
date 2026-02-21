"use client";

import { motion } from "framer-motion";
import { Container } from "@/lib/utils";

export default function Hero() {
    return (
        <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
            <Container className="z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-black tracking-tighter leading-tight">
                        あなたは、
                        <br className="md:hidden" />
                        自分の
                        <span className="text-accent underline decoration-accent/30 underline-offset-8">
                            納得
                        </span>
                        で生きているか？
                    </h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1.5 }}
                        className="text-muted text-sm md:text-lg tracking-[0.2em] font-light max-w-2xl mx-auto"
                    >
                        BEAUTIFUL HETERODOXY / Portfolo Odyssey of Naoya Takeda
                    </motion.p>
                </motion.div>
            </Container>

            {/* 背景の装飾的な要素：かすかに光るアンバーの光球 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

            {/* スクロールを促すインジケーター */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-12 flex flex-col items-center gap-4"
            >
                <span className="text-[10px] tracking-[0.3em] text-muted uppercase">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-accent/50 to-transparent" />
            </motion.div>
        </section>
    );
}
