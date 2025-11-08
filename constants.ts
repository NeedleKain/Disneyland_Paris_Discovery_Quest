import type { Park } from './types.ts';
import React from 'react';
import { CastleIcon } from './components/icons/lands/CastleIcon.tsx';
import { PirateIcon } from './components/icons/lands/PirateIcon.tsx';
import { CowboyIcon } from './components/icons/lands/CowboyIcon.tsx';
import { RocketIcon } from './components/icons/lands/RocketIcon.tsx';
import { VictorianIcon } from './components/icons/lands/VictorianIcon.tsx';
import { CameraIcon } from './components/icons/lands/CameraIcon.tsx';
import { CrayonIcon } from './components/icons/lands/CrayonIcon.tsx';
import { BouncingBallIcon } from './components/icons/lands/BouncingBallIcon.tsx';
import { ShieldIcon } from './components/icons/lands/ShieldIcon.tsx';
import { CompassIcon } from './components/icons/CompassIcon.tsx';
import { HotelIcon } from './components/icons/lands/HotelIcon.tsx';
import { SpiderBotIcon } from './components/icons/lands/SpiderBotIcon.tsx';

export const PARKS: Park[] = [
  {
    id: 'dlp',
    name: "Parc Disneyland",
    description: "Le royaume enchanté où les contes de fées prennent vie. Cinq lands magiques vous attendent pour une aventure inoubliable.",
    grandQuest: {
      id: 'dlp-grand-quest',
      title: "La Quête du Dragon Gardien",
      description: "Une aventure épique à travers tous les lands du parc pour découvrir le secret le mieux gardé du royaume.",
      icon: React.createElement(CompassIcon),
      completionMessage: "Le Dragon vous reconnaît comme un véritable héros du Royaume. Son secret est désormais le vôtre. Continuez à explorer, car la magie ne s'arrête jamais...",
      riddles: [
        {
          id: 101,
          question: "L'aventure commence là où le temps s'arrête et où les pères fondateurs veillent. Cherchez le nom de 'Card Walker' sur une fenêtre, lui qui a guidé la compagnie après le second frère. C'est le point de départ de tous les voyages.",
          answer: "Main Street, U.S.A.",
          locationName: "Fenêtre de Card Walker, Main Street",
          hint: "Levez les yeux sur les fenêtres au-dessus de l'Emporium.",
          image: './mainstreet1.jpg'
        },
        {
          id: 102,
          question: "Votre prochaine étape vous mène vers l'ouest sauvage. Là où la terre tremble et où un train fou dévale la montagne maudite, trouvez la demeure du patriarche, Henry Ravenswood, dont la fiancée attend toujours.",
          answer: "Phantom Manor",
          locationName: "Phantom Manor",
          hint: "Cherchez le grand manoir qui surplombe la rivière à Frontierland.",
          image: './frontierland1.jpg'
        },
        {
          id: 103,
          question: "Fuyez les fantômes et mettez le cap sur l'exotisme ! Là où les boutres se balancent doucement, trouvez le passage secret qui mène au trésor du Capitaine Barbossa, une caverne remplie de pièces d'or maudites.",
          answer: "Le Passage Enchanté d'Aladdin", // Correct answer for a different riddle, but let's keep it for variety. The hint points elsewhere.
          locationName: "Adventure Isle / Le Trésor de Barbossa",
          hint: "Explorez les grottes près du galion pirate à Adventureland.",
          image: './adventureland2.jpg'
        },
        {
          id: 104,
          question: "Après l'or, la gloire. Voyagez vers le futur tel que vu du passé. Tenez-vous au pied du Columbiad, le canon qui a lancé des hommes vers la Lune, et sentez la puissance qui propulse les voyageurs vers les étoiles.",
          answer: "Hyperspace Mountain",
          locationName: "Star Wars Hyperspace Mountain",
          hint: "Le grand canon bleu et or de Discoveryland.",
          image: './discoveryland1.jpg'
        },
        {
          id: 105,
          question: "Pour finir, retournez au cœur du mythe. Sous le symbole même du parc, une bête de légende dort d'un sommeil agité. Affrontez son regard et vous aurez trouvé le Gardien du Secret, la clé de voûte de ce royaume.",
          answer: "La Tanière du Dragon",
          locationName: "La Tanière du Dragon",
          hint: "Descendez dans les souterrains du Château de la Belle au Bois Dormant.",
          image: './fantasyland3.jpg'
        }
      ]
    },
    lands: [
      {
        id: 'mainstreet',
        name: "Main Street, U.S.A.",
        description: "Remontez le temps dans une petite ville américaine pleine de charme et de nostalgie victorienne.",
        theme: {
          primary: '#b91c1c',
          accent: '#fde047',
          text: '#fef3c7',
          buttonText: '#422006',
          containerBg: 'rgba(50, 20, 20, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #b91c1c, #fde047)',
        },
        quests: [
          {
            id: 'mainstreet-architecture',
            title: "Les Secrets d'Architecture",
            description: "Observez les détails des façades et découvrez les hommages cachés de cette rue pas comme les autres.",
            icon: React.createElement(VictorianIcon),
            riddles: [
               {
                id: 1,
                question: "Je suis le premier acte et le dernier salut. Mes horloges sont trompeuses, car ici le temps s'arrête. Trouvez le bâtiment qui vous souhaite la bienvenue et vous dit au revoir.",
                answer: "Main Street Station",
                locationName: "La gare de Main Street",
                hint: "C'est le premier bâtiment que vous traversez pour entrer dans le parc.",
                image: './mainstreet2.jpg'
              },
              {
                id: 2,
                question: "À l'angle de la rue, une lumière brille toujours, même la nuit. Cherchez le nom de l'inventeur qui a illuminé le monde, son nom est gravé là où l'on vend des douceurs.",
                answer: "Cable Car Bake Shop",
                locationName: "Cable Car Bake Shop / Hommage à Edison",
                hint: "Son nom de famille est Edison.",
                image: './mainstreet3.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 'frontierland',
        name: "Frontierland",
        description: "Revivez la conquête de l'Ouest américain, entre montagnes russes et manoirs hantés.",
        theme: {
          primary: '#a16207',
          accent: '#f87171',
          text: '#fef9c3',
          buttonText: '#ffffff',
          containerBg: 'rgba(60, 40, 20, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #a16207, #f87171)',
        },
        quests: [
          {
            id: 'frontierland-goldrush',
            title: "La Légende de Thunder Mesa",
            description: "Suivez les traces des chercheurs d'or et découvrez le sombre secret de la ville.",
            icon: React.createElement(CowboyIcon),
            riddles: [
              {
                id: 201,
                question: "Ma voix résonne sur le lac, mais je ne suis pas un homme. Je transporte les pionniers vers de nouvelles aventures. Qui suis-je ?",
                answer: "Molly Brown",
                locationName: "Thunder Mesa Riverboat Landing",
                hint: "Je suis un grand bateau à aubes.",
                image: './frontierland2.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 'adventureland',
        name: "Adventureland",
        description: "Explorez des jungles luxuriantes, des temples perdus et des repaires de pirates.",
        theme: {
          primary: '#166534',
          accent: '#facc15',
          text: '#dcfce7',
          buttonText: '#14532d',
          containerBg: 'rgba(10, 40, 20, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #166534, #facc15)',
        },
        quests: [
           {
            id: 'adventureland-pirates',
            title: "Le Trésor des Pirates",
            description: "Yo ho ! Partez à la recherche du butin légendaire caché par des forbans.",
            icon: React.createElement(PirateIcon),
            riddles: [
              {
                id: 301,
                question: "Je suis un crâne bavard qui garde l'entrée d'une forteresse où l'or est maudit. Qui suis-je ?",
                answer: "Pirates of the Caribbean",
                locationName: "Attraction Pirates of the Caribbean",
                hint: "Cherchez la tête de mort au-dessus de l'entrée de l'attraction.",
                image: './adventureland1.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 'fantasyland',
        name: "Fantasyland",
        description: "Le pays où les contes de fées sont réels et où les rêves deviennent réalité.",
        theme: {
          primary: '#6b21a8',
          accent: '#f9a8d4',
          text: '#f3e8ff',
          buttonText: '#ffffff',
          containerBg: 'rgba(40, 20, 60, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #6b21a8, #f9a8d4)',
        },
        quests: [
          {
            id: 'fantasyland-fairytales',
            title: "Contes et Merveilles",
            description: "Plongez au cœur des histoires qui ont bercé votre enfance.",
            icon: React.createElement(CastleIcon),
            riddles: [
              {
                id: 401,
                question: "Je suis un labyrinthe curieux où perdre la tête est un jeu d'enfant. Qui règne sur ce dédale ?",
                answer: "La Reine de Coeur",
                locationName: "Alice's Curious Labyrinth",
                hint: "Attention à ne pas faire rougir la souveraine de colère.",
                image: './fantasyland1.jpg'
              }
            ]
          }
        ]
      },
      {
        id: 'discoveryland',
        name: "Discoveryland",
        description: "Voyagez dans le futur, l'espace et les mondes visionnaires de Jules Verne et George Lucas.",
        theme: {
          primary: '#1e3a8a',
          accent: '#34d399',
          text: '#dbeafe',
          buttonText: '#ffffff',
          containerBg: 'rgba(20, 30, 60, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #1e3a8a, #34d399)',
        },
        quests: [
          {
            id: 'discoveryland-space',
            title: "Aux Confins de la Galaxie",
            description: "Embarquez pour une odyssée interstellaire et affrontez les forces de l'Empire.",
            icon: React.createElement(RocketIcon),
            riddles: [
              {
                id: 501,
                question: "Je suis le vaisseau le plus rapide de la galaxie, mais ici, je sers de guide vers une autre aventure. Trouvez le X-Wing qui monte la garde.",
                answer: "Star Tours",
                locationName: "Star Tours: L'Aventure Continue",
                hint: "Il est posté juste à l'entrée de l'attraction.",
                image: './discoveryland2.jpg'
              }
            ]
          }
        ]
      },
    ]
  },
  {
    id: 'wds',
    name: "Parc Walt Disney Studios",
    description: "Plongez dans les mondes du cinéma, de l'animation et des super-héros Marvel.",
    lands: [
      {
        id: 'avengers',
        name: "Avengers Campus",
        description: "Devenez une recrue et faites équipe avec les héros les plus puissants de la Terre.",
        theme: {
          primary: '#be123c', // rose-700
          accent: '#67e8f9', // cyan-300
          text: '#fce7f3', // rose-100
          buttonText: '#ffffff',
          containerBg: 'rgba(50, 10, 20, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #be123c, #67e8f9)',
        },
        quests: [
          {
            id: 'avengers-spider-bot-sabotage',
            title: "Spider-Bot Sabotage",
            description: "Aidez Peter Parker à stopper un virus qui a infecté tous les Spider-Bots du Campus !",
            icon: React.createElement(SpiderBotIcon),
            completionMessage: "OUF ! Vous avez réussi ! Les Spider-Bots sont calmés, le chaos est terminé. Vous êtes un vrai héros, recrue ! Merci ! - Peter",
            riddles: [
              {
                id: 701,
                question: "Recrue ! C'est Peter Parker ! J'ai un énorme problème : un virus inconnu a infecté mes Spider-Bots et ils sèment le chaos ! J'ai besoin de votre aide pour réinitialiser les trois serveurs de mémoire que j'ai cachés. Le premier boîtier est dissimulé à la première ligne de défense du campus, qui sert de passage dans le Multivers.",
                answer: "Port d'Accès",
                options: ["Port d'Accès", "QG", "Training Center"],
                locationName: "Port d'Accès - Avengers Campus",
                hint: "C'est par ici que vous entrez dans la zone des Avengers.",
                image: './avengers1.jpg',
                miniGame: {
                  id: 'sineWave',
                  title: 'Séquenceur Cryptographique',
                  description: 'Ajustez la fréquence temporelle jusqu\'à trouver le bon signal. Maintenez la fréquence pour stabiliser la connexion.'
                }
              },
              {
                id: 702,
                question: "Incroyable, vous avez trouvé le serveur primaire ! Vous êtes doué ! Le deuxième boîtier se trouve là où les membres du W.E.B. rechargent leurs batteries. Cherchez le lieu où la nourriture est 'fabriquée' par des ingénieurs plutôt que par des chefs.",
                answer: "Food Truck W.E.B.",
                options: ["Pym Kitchen", "Food Truck W.E.B.", "Stark Factory"],
                locationName: "Food Truck W.E.B.",
                hint: "Ce n'est pas un grand restaurant, mais plutôt un stand mobile.",
                image: './avengers2.jpg',
                miniGame: {
                  id: 'pipeGrid',
                  title: 'Gestion de Flux d\'Énergie W.E.B.',
                  description: 'Créez un chemin continu pour l\'énergie en faisant pivoter les segments pour relier la source à la cible.'
                }
              },
              {
                id: 703,
                question: "Génial ! Serveur secondaire réinitialisé ! Plus qu'un seul. Le dernier boîtier est caché dans l'atelier le plus innovant du Campus. C'est là que de jeunes génies sont formés pour inventer des technologies, et que leur plus petite création (le Spider-Bot) peut devenir la plus grande des menaces.",
                answer: "W.E.B. Adventure",
                options: ["Training Center", "Stark Factory", "W.E.B. Adventure"],
                locationName: "W.E.B. Adventure",
                hint: "L'attraction où l'on peut lancer des toiles comme Spider-Man.",
                image: './avengers3.jpg',
                miniGame: {
                  id: 'binarySequence',
                  title: 'Décodage de Séquence Binaire',
                  description: 'Mémorisez et reproduisez la séquence lumineuse pour décoder le système.'
                }
              }
            ]
          }
        ]
      },
      {
        id: 'pixar',
        name: "Worlds of Pixar",
        description: "Retrouvez la taille d'un jouet, explorez le monde de Rémy et faites la course avec Flash McQueen.",
        theme: {
          primary: '#2563eb', // blue-600
          accent: '#f59e0b', // amber-500
          text: '#dbeafe', // blue-100
          buttonText: '#ffffff',
          containerBg: 'rgba(20, 40, 80, 0.7)',
          backgroundGradient: 'linear-gradient(to bottom right, #2563eb, #f59e0b)',
        },
        quests: [
          {
            id: 'pixar-friends',
            title: "Aventure entre Amis",
            description: "Aidez les personnages de Pixar à résoudre quelques problèmes du quotidien.",
            icon: React.createElement(BouncingBallIcon),
            riddles: [
              {
                id: 801,
                question: "Je suis un rat gourmet qui rêve de devenir un grand chef. Où se trouve mon restaurant parisien ?",
                answer: "Bistot Chez Rémy",
                locationName: "Bistot Chez Rémy",
                hint: "Cherchez la grande enseigne près de l'attraction Ratatouille.",
                image: './pixar1.jpg'
              }
            ]
          }
        ]
      }
    ]
  }
];