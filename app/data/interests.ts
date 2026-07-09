export interface InterestItem {
  id: string;
  name: string;
  image: string;
}

export interface InterestCategory {
  id: string;
  title: string;
  items: InterestItem[];
}

export const interests: InterestCategory[] = [
  {
    id: 'artists',
    title: 'Favorite Artists',
    items: [
      {
        id: 'c418',
        name: 'C418',
        image: '/images/carousels/artists/c418.webp',
      },
      {
        id: 'childish-gambino',
        name: 'Childish Gambino',
        image: '/images/carousels/artists/childishgambino.webp',
      },
      {
        id: 'don-toliver',
        name: 'Don Toliver',
        image: '/images/carousels/artists/dontoliver.webp',
      },
      {
        id: 'jeremy-soule',
        name: 'Jeremy Soule',
        image: '/images/carousels/artists/jeremysoule.webp',
      },
      {
        id: 'jpegmafia',
        name: 'JPEGMAFIA',
        image: '/images/carousels/artists/jpegmafia.webp',
      },
      {
        id: 'kanye',
        name: 'Kanye West',
        image: '/images/carousels/artists/kanye.webp',
      },
      {
        id: 'kendrick-lamar',
        name: 'Kendrick Lamar',
        image: '/images/carousels/artists/kendricklamar.webp',
      },
      {
        id: 'lamp',
        name: 'Lamp',
        image: '/images/carousels/artists/lamp.webp',
      },
      {
        id: 'mac-miller',
        name: 'Mac Miller',
        image: '/images/carousels/artists/macmiller.webp',
      },
      {
        id: 'smino',
        name: 'Smino',
        image: '/images/carousels/artists/smino.webp',
      },
      {
        id: 'travis-scott',
        name: 'Travis Scott',
        image: '/images/carousels/artists/travisscott.webp',
      },
    ],
  },
  {
    id: 'games',
    title: 'Favorite Games',
    items: [
      {
        id: 'celeste',
        name: 'Celeste',
        image: '/images/carousels/games/celeste.webp',
      },
      {
        id: 'cod-bo3',
        name: 'Call of Duty: Black Ops 3',
        image: '/images/carousels/games/codbo3.webp',
      },
      {
        id: 'doom-eternal',
        name: 'Doom Eternal',
        image: '/images/carousels/games/doometernal.webp',
      },
      {
        id: 'inscryption',
        name: 'Inscryption',
        image: '/images/carousels/games/inscryption.webp',
      },
      {
        id: 'silksong',
        name: 'Hollow Knight: Silksong',
        image: '/images/carousels/games/silksong.webp',
      },
      {
        id: 'skyrim',
        name: 'Skyrim',
        image: '/images/carousels/games/skyrim.webp',
      },
      {
        id: 'super-mario-galaxy-2',
        name: 'Super Mario Galaxy 2',
        image: '/images/carousels/games/supermariogalaxy2.webp',
      },
      {
        id: 'tunic',
        name: 'Tunic',
        image: '/images/carousels/games/tunic.webp',
      },
      {
        id: 'zelda-botw',
        name: 'The Legend of Zelda: Breath of the Wild',
        image: '/images/carousels/games/zeldabreathofthewild.webp',
      },
    ],
  },
  {
    id: 'creators',
    title: 'Favorite Content Creators',
    items: [
      {
        id: 'hank-green',
        name: 'Hank Green',
        image: '/images/carousels/contentCreators/hankgreen.webp',
      },
      {
        id: 'kurzgesagt',
        name: 'Kurzgesagt',
        image: '/images/carousels/contentCreators/kurzgesagt.webp',
      },
      {
        id: 'optimum',
        name: 'Optimum',
        image: '/images/carousels/contentCreators/optimum.webp',
      },
      {
        id: 'pewdiepie',
        name: 'PewDiePie',
        image: '/images/carousels/contentCreators/pewdiepie.webp',
      },
      {
        id: 'pokelawls',
        name: 'PokeLawls',
        image: '/images/carousels/contentCreators/pokelawls.webp',
      },
      {
        id: 'xqc',
        name: 'xQc',
        image: '/images/carousels/contentCreators/xqc.webp',
      },
    ],
  },
];