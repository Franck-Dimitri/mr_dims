import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Marquee } from "@/Components/ui/marquee-01-utils/marquee";

const reviews = [
  {
    name: "Alexandre Dupont",
    username: "@adupont_tech",
    body: "« L'architecture de notre application Laravel + React a été livrée en un temps record. La fluidité de l'interface et la propreté du code sont impressionnantes. »",
    profile: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Cynthia Mba",
    username: "@cynthia_m",
    body: "« Notre productivité a doublé depuis le lancement du nouvel espace administrateur. Tout est rapide, sécurisé et très simple d'utilisation. »",
    profile: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Marc Laurent",
    username: "@mlaurent_dev",
    body: "« Un travail d'ingénierie d'une grande rigueur. L'intégration des API REST et la gestion du VPS sont irréprochables. Un grand bravo ! »",
    profile: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Sophie Nsangou",
    username: "@sophie_ns",
    body: "« La refonte de notre plateforme SaaS est un véritable succès. Nos utilisateurs adorent le mode sombre et la réactivité instantanée des pages. »",
    profile: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Kevin Masters",
    username: "@kmasters_saas",
    body: "« Collaboration fluide, communication directe sur WhatsApp et livrable d'une qualité pro. Je recommande vivement pour tout projet d'envergure. »",
    profile: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Elodie Ekwalla",
    username: "@elodie_ek",
    body: "« Le devis et la livraison ont été respectés au jour près. Le code est parfaitement documenté et facile à maintenir. »",
    profile: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}) => {
  return (
    <Card className="relative h-full w-80 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors p-5 shadow-sm">
      <CardContent className="p-0 flex flex-col gap-3 font-sans">
        <div className="flex flex-row items-center gap-3">
          <img
            className="rounded-full w-10 h-10 object-cover border border-gray-200 dark:border-gray-700"
            width="40"
            height="40"
            alt={name}
            src={profile}
          />
          <div className="flex flex-col">
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-snug">{name}</p>
            <p className="text-xs font-mono text-gray-400">
              {username}
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans line-clamp-3">{body}</p>
      </CardContent>
    </Card>
  );
};

export default function TestimonialMarqueeDemo() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4 font-sans">
      <Marquee pauseOnHover className="[--duration:30s] py-2">
        {firstRow.map((review, idx) => (
          <ReviewCard key={review.username + idx} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:30s] py-2">
        {secondRow.map((review, idx) => (
          <ReviewCard key={review.username + idx} {...review} />
        ))}
      </Marquee>
      
      {/* Subtle fade edges matching theme */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white dark:from-[#070A10] to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white dark:from-[#070A10] to-transparent z-10"></div>
    </div>
  );
}

export { TestimonialMarqueeDemo as TestimonialMarquee };
