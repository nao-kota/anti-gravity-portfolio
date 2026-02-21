"use client";

import { motion } from "framer-motion";
import { Container } from "@/lib/utils";

export default function Manifesto() {
    return (
        <section className="relative py-24 md:py-48 overflow-hidden bg-background">
            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-6"
                    >
                        <h2 className="text-accent text-xs font-sans tracking-[0.5em] uppercase">Manifesto</h2>
                        <div className="font-serif text-4xl md:text-7xl font-black leading-tight">
                            正解を捨てる。<br />
                            <span className="text-highlight">納得を生きる。</span>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="space-y-8 text-lg md:text-xl text-muted leading-relaxed font-serif italic"
                    >
                        <p>
                            4月、私は東京へと向かう。<br />
                            ワンキャリアという新しい戦場で、私は何を見るのか。
                        </p>
                        <p>
                            誰かが敷いたレールの先には、私の欲しい「熱」はなかった。<br />
                            これからは、自分の直感と、泥を啜って磨き上げた実行力だけで、<br />
                            この世界という海に巨大な波を立てていく。
                        </p>
                        <p className="text-foreground not-italic font-sans font-bold text-2xl md:text-3xl pt-8">
                            「武田直也」という生き様に、一切の出し惜しみはしない。
                        </p>
                    </motion.div>
                </div>
            </Container>

            {/* 背景の大きな矢印（未来への指向性） */}
            <motion.div
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 0.05, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute bottom-0 left-0 w-full h-1/2 flex items-end justify-start p-12 pointer-events-none"
            >
                <div className="text-[30vw] font-black leading-none select-none">NEXT➜</div>
            </motion.div>
        </section>
    );
}
