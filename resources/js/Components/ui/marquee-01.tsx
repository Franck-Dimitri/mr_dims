"use client";

import React from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Marquee } from "@/Components/ui/marquee-01-utils/marquee";

const reviews = [
  {
    name: "Samuel Nsangou",
    username: "@snsangou_tech",
    body: "« L'architecture de notre WebApp Laravel + React a été livrée en un temps record. La fluidité et la propreté du code sont impressionnantes. »",
    profile: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Vanessa Kamga",
    username: "@vanessa_kamga",
    body: "« Notre espace administrateur est désormais ultra rapide et sécurisé. Une collaboration très fluide et professionnelle. »",
    profile: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Christian Ekwalla",
    username: "@cekwalla_dev",
    body: "« Le respect du cahier des charges et la qualité de l'intégration des APIs REST sont irréprochables. Un grand travail d'ingénierie ! »",
    profile: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&auto=format&fit=crop&q=80",
  },
  {
    name: "Brenda Mba",
    username: "@brenda_mba",
    body: "« La refonte de notre plateforme SaaS est un véritable succès. Le code est propre, structuré et très facile à faire évoluer. »",
    profile: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=150&auto=format&fit=crop&q=80",
  },
];

const firstRow = reviews.slice(0, 2);
const secondRow = reviews.slice(2);

interface ReviewCardProps {
  profile: string;
  name: string;
  username: string;
  body: string;
}

const ReviewCard = ({
  profile,
  name,
  username,
  body,
}: ReviewCardProps) => {
  return (
    <Card className="relative h-full w-80 cursor-pointer overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F19] hover:border-blueprint-bluePrimary dark:hover:border-blueprint-cyan transition-colors p-5 shadow-sm rounded-2xl">
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
      <Marquee pauseOnHover className="[--duration:25s] py-2">
        {firstRow.map((review, idx) => (
          <ReviewCard key={review.username + idx} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:25s] py-2">
        {secondRow.map((review, idx) => (
          <ReviewCard key={review.username + idx} {...review} />
        ))}
      </Marquee>
      
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-white dark:from-[#070A10] to-transparent z-10"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-white dark:from-[#070A10] to-transparent z-10"></div>
    </div>
  );
}
