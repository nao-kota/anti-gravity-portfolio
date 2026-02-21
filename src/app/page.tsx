import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Odyssey from "@/components/sections/Odyssey";
import Manifesto from "@/components/sections/Manifesto";
import Connect from "@/components/sections/Connect";

export default function Home() {
  return (
    <main className="relative bg-background">
      <Hero />
      <Identity />
      <Odyssey />
      <Manifesto />
      <Connect />

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-[10px] tracking-[0.4em] text-muted/40 uppercase font-sans">
          © 2026 BEAUTIFUL HETERODOXY / NAAOYA TAKEDA
        </p>
      </footer>
    </main>
  );
}
