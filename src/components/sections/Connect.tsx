"use client";

import { motion } from "framer-motion";
import { Container } from "@/lib/utils";
import { Mail, Instagram, Twitter } from "lucide-react";

export default function Connect() {
    return (
        <section className="relative py-24 md:py-48 bg-background border-t border-white/5">
            <Container>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <h2 className="text-accent text-xs font-sans tracking-[0.5em] uppercase">Connect</h2>
                        <div className="font-serif text-4xl md:text-6xl font-black leading-tight">
                            ここから先、<br />
                            もっと深く話しませんか？
                        </div>
                        <p className="text-muted text-lg max-w-md">
                            社交辞令はいらない。あなたの「納得」と、私の「覚悟」が交差する場所で、新しい物語を始めましょう。
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-8 md:p-12 border border-white/10 bg-white/[0.02] backdrop-blur-sm space-y-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -translate-y-16 translate-x-16 rounded-full group-hover:bg-accent/10 transition-colors duration-500" />

                        <a
                            href="mailto:example@gmail.com"
                            className="flex items-center gap-6 group/item"
                        >
                            <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover/item:border-accent transition-colors">
                                <Mail className="w-5 h-5 text-muted group-hover/item:text-accent transition-colors" />
                            </div>
                            <div>
                                <div className="text-[10px] text-muted tracking-widest uppercase mb-1">Email</div>
                                <div className="text-lg font-sans font-medium">tkd.naoya.official@gmail.com</div>
                            </div>
                        </a>

                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all"
                            >
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-accent hover:text-accent transition-all"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <p className="text-xs text-muted/60 font-sans tracking-wide">
                                ※初対面でも「サウナの話をしたい」「人生の相談をしたい」等、動機は何でも構いません。
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
