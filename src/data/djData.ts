export interface TrackMix {
  id: string;
  title: string;
  series: string;
  year: string;
  bpm: number;
  duration: string;
  genres: string[];
  description: string;
  artwork: string;
  soundcloudUrl: string;
  tracklist?: string[];
  featuredArtists?: string[];
}

export interface GigEvent {
  id: string;
  title: string;
  venue: string;
  location: string;
  date: string;
  year: string;
  type: 'Headline & B2B' | 'Festival' | 'Club Night' | 'Charity Stream';
  lineup: string[];
  description: string;
  ticketPrice?: string;
  flyerUrl?: string;
  highlight?: string;
}

export interface ReleaseTrack {
  id: string;
  title: string;
  artists: string;
  label: string;
  releaseDate: string;
  bpm: number;
  beatportUrl?: string;
  soundcloudUrl?: string;
  artworkUrl: string;
  note: string;
}

export const DJ_PROFILE = {
  name: "DJ Beano",
  realName: "Luke Watkins",
  location: "Hereford, Herefordshire, UK",
  genres: ["UK Hardcore", "Happy Hardcore", "Powerstomp", "Bounce", "Techno & Trance", "Classics"],
  bpms: "160 - 175+ BPM",
  bookingEmails: ["djbeano90@gmail.com", "tios@ravemail.com"],
  socials: {
    facebook: "https://www.facebook.com/beanodj",
    soundcloud: "https://soundcloud.com/beanodj",
    twitch: "https://www.twitch.tv/beano_dj",
  },
  affiliations: [
    "Sound Intentionz (Founder & Resident)",
    "The Rave Alliance (Core Resident & Promoter)",
    "TIOS Digital (Artist & Label Family)",
    "Charley's Beats (#ItsOkNotToBeOk Resident)"
  ],
  bioFull: [
    "Luke 'Beano' Watkins is a DJ and performer born and bred in Hereford, UK. First introduced to the euphoric, uplifting energy of UK and Happy Hardcore in 2004, Luke learned the craft in 2005 at age 15 on iconic Technics 1200 MK2 turntables.",
    "Cutting his teeth on the underground circuit across the West Midlands and Welsh borders, Beano quickly made waves at local 'Spunky' events in Hereford, earning the legendary 'Golden Glow Stick Award' on the microphone.",
    "After mastering digital CDJs, Luke won 1st Place in the Core Unity Nubreed DJ Competition and runner-up in the Rave Logic DJ Competition. In 2019, he took his sound international to Unity In The Sun in Corfu/Kavos, performing on the main stage alongside the legendary MC Whizzkid, before headlining stadium-level crowds at the Hereford FC Stadium Music Festival with Clubland.",
    "As founder of Sound Intentionz and a stalwart resident of The Rave Alliance, DJ Beano has shared decks and stages with titans of the scene including DJ Hixxy, Klubfiller, DJ Sy, MC Wotsee, MC Energy, Rob IYF, Joey Riot, and Hypo-Tinx. Beyond the rave, Luke has been a driving force for charity, raising thousands of pounds through Charley's Beats and memorial events to shatter mental health stigmas across the UK."
  ]
};

export const DJ_MIXES: TrackMix[] = [
  {
    id: "spill-the-beanz-1",
    title: "Spill The Beanz Vol. 1",
    series: "Spill The Beanz Series",
    year: "2025",
    bpm: 172,
    duration: "64:20",
    genres: ["Trance", "Techno", "UK Hardcore"],
    description: "The debut volume in Beano's brand new mix series, blending euphoric trance melodies, driving techno baselines, and peak-time UK hardcore slammers.",
    artwork: "/src/assets/images/dj_beano_album_art_1790843114461.jpg",
    soundcloudUrl: "https://on.soundcloud.com/5rTGVJdrhHfgyTHCA",
    featuredArtists: ["SMC Designs (Artwork)", "Beano"],
    tracklist: [
      "Intro: The Awakening",
      "Klubfiller - Re-Wired",
      "Pez & Beano - Diverse Motion",
      "Techno Trance Slammer (Beano Bootleg)",
      "High Energy 172 Peak Drop",
      "Classics Re-visited Euphoric Outro"
    ]
  },
  {
    id: "back-2-classics-1",
    title: "Back 2 The Classics Vol. 1",
    series: "Back 2 The Classics",
    year: "2023",
    bpm: 170,
    duration: "58:45",
    genres: ["Happy Hardcore", "Old Skool Classics", "UKHC"],
    description: "Taking ravers straight back to the golden era of 90s & 2000s hardcore anthems that defined the UK rave movement.",
    artwork: "/src/assets/images/dj_beano_studio_mixing_1790843091409.jpg",
    soundcloudUrl: "https://on.soundcloud.com/8nU8PB6ahZge4JL86",
    tracklist: [
      "Dougal & Gammer - Shoulder Lock",
      "Force & Styles - Heart of Gold (Classic)",
      "Brisk & Ham - Angel Eyes",
      "Hixxy & Re-Con - Power of Love",
      "Scott Brown - Elysium Anthem"
    ]
  },
  {
    id: "tra-mini-mix-160",
    title: "The Rave Alliance (TRA) Mini Mix",
    series: "The Rave Alliance Showcase",
    year: "2024",
    bpm: 160,
    duration: "32:15",
    genres: ["160BPM Hardcore", "Powerstomp"],
    description: "Fresh 160BPM heavy-hitting stomper mix recorded exclusively for The Rave Alliance faithful in Hereford.",
    artwork: "/src/assets/images/dj_beano_hero_rave_1790843080869.jpg",
    soundcloudUrl: "https://on.soundcloud.com/Cha7HEToVFJLk8rRA",
    tracklist: [
      "160 BPM Bounce Kick Opener",
      "Powerstomp Roller - Beano Edit",
      "Sub Heavy Driving Bassline",
      "The Final Stomp"
    ]
  },
  {
    id: "as-festival-comp",
    title: "Adrenaline Stompers Festival Comp Entry",
    series: "Competition Series",
    year: "2023",
    bpm: 175,
    duration: "45:00",
    genres: ["UK Hardcore", "Powerstomp"],
    description: "Official high-octane competition mix submitted for the Adrenaline Stompers Festival 2023 showcasing lightning-fast transitions.",
    artwork: "/src/assets/images/dj_beano_crowd_hands_1790843102717.jpg",
    soundcloudUrl: "https://on.soundcloud.com/tKmW4wHCkBSxgeqo6",
    tracklist: [
      "Klubfiller - Alien",
      "Relect - Tonight",
      "Esline - Way Way Back",
      "Nocturnal Stomp - Beano VIP"
    ]
  },
  {
    id: "born-2-collide-comp",
    title: "Born 2 Collide: The Return Comp Mix",
    series: "Born 2 Collide",
    year: "2021",
    bpm: 174,
    duration: "42:30",
    genres: ["UK Hardcore", "Vocal Hardcore"],
    description: "Heavyweight entry for Born 2 Collide featuring Dougal & Gammer, JTS, and Rescue.",
    artwork: "/src/assets/images/dj_beano_studio_mixing_1790843091409.jpg",
    soundcloudUrl: "https://on.soundcloud.com/WJdwtKUePsgbCtpH7",
    tracklist: [
      "Dougal & Gammer - Shoulder Lock",
      "JTS - Forever",
      "Rescue - Ode To Oi",
      "Rescue & V-Star - Shackles",
      "Audio Nitrate - Worth It"
    ]
  },
  {
    id: "stadiumfest-2022",
    title: "Stadiumfest Live Studio Re-Record",
    series: "Festival Sets",
    year: "2022",
    bpm: 165,
    duration: "60:10",
    genres: ["Bounce", "Hardcore Bounce"],
    description: "Beano's crowd-favorite harder bounce and festival set from Stadium Music Festival at Hereford Football Stadium.",
    artwork: "/src/assets/images/dj_beano_crowd_hands_1790843102717.jpg",
    soundcloudUrl: "https://on.soundcloud.com/PvAxVCAfEQgK3Lr97",
    tracklist: [
      "Bounce Kickoff Anthem",
      "Hard Bounce Festival Roller",
      "Stadium Horn Drop VIP",
      "Home Crowd Finale"
    ]
  }
];

export const GIG_EVENTS: GigEvent[] = [
  {
    id: "gig-babylon-lounge",
    title: "Sound Intentionz Return",
    venue: "Babylon Lounge",
    location: "Hereford, UK",
    date: "Dec 13",
    year: "2025",
    type: "Headline & B2B",
    lineup: ["DJ Beano b2b Hypo-Tinx DJ (1-2am)", "Rave Anywhere's DJC", "MC Jack", "Sound Intentionz Roster"],
    description: "Sound Intentionz makes its triumphant return to Babylon Lounge for a full-on night of hardcore music until 4am.",
    ticketPrice: "FREE ENTRY ALL NIGHT",
    highlight: "B2B with Hypo-Tinx 1:00 AM - 2:00 AM"
  },
  {
    id: "gig-satellite-city-atlantica",
    title: "Hardcore Technology 10 // Satellite City",
    venue: "Atlantica",
    location: "Newport, Wales",
    date: "Feb 22",
    year: "2025",
    type: "Club Night",
    lineup: ["DJ Hixxy (The B O double S of Hardcore)", "MC Wotsee (25th Anniversary)", "DJ Beano", "DubAntix"],
    description: "Celebrating 25 years of Wales' number one MC Wotsee alongside hardcore kingpin DJ Hixxy.",
    ticketPrice: "FREE ENTRY ALL NIGHT",
    highlight: "Supporting MC Wotsee 25th Anniversary"
  },
  {
    id: "gig-the-kerry-free-rave",
    title: "The Rave Alliance x The Kerry Bank Holiday Free Rave",
    venue: "The Kerry",
    location: "Hereford, UK",
    date: "Bank Holiday Sunday",
    year: "2024",
    type: "Festival",
    lineup: ["DJ Sy", "MC Energy", "DJ Beano", "The Rave Alliance Residents"],
    description: "Hereford's biggest free day-into-night rave across two arenas. Capacity crowd, high-energy festival atmosphere.",
    ticketPrice: "FREE Ticketed (Skiddle Sold Out)",
    highlight: "Day-into-Night Arena Slammer"
  },
  {
    id: "gig-beano-bday-bash",
    title: "TRA x Sound Intentionz: Beano's Birthday Bash",
    venue: "The Kerry / Secret Venue",
    location: "Hereford, UK",
    date: "June 28",
    year: "2024",
    type: "Headline & B2B",
    lineup: ["DJ Beano ft. MC Wotsee (Headline Set)", "The Rave Alliance Crew", "Sound Intentionz Selectas"],
    description: "Honoured birthday celebration set alongside legendary MC Wotsee on mic duties, delivering anthems from all angles.",
    ticketPrice: "£10 On The Door",
    highlight: "Beano on set with MC Wotsee"
  },
  {
    id: "gig-coalition-victory",
    title: "The Rave Alliance Presents: Coalition",
    venue: "The Victory",
    location: "Hereford, UK",
    date: "March 23",
    year: "2024",
    type: "Club Night",
    lineup: ["DJ Beano", "The Rave Alliance Artists", "Hereford Underground Collective"],
    description: "Bringing together the finest acts across the West Midlands dance underground under one roof.",
    ticketPrice: "£10 Advance",
    highlight: "Multi-genre Showcase"
  },
  {
    id: "gig-plough-xmas-bash",
    title: "The Rave Alliance Christmas Bash",
    venue: "The Plough Inn",
    location: "Hereford, UK",
    date: "December 22",
    year: "2023",
    type: "Club Night",
    lineup: ["Klubfiller", "MC Energy", "DJ Beano b2b Xplizit", "Billet Audio Soundsystem"],
    description: "An explosive festive gathering featuring the UK's number one Klubfiller and an unscripted off-the-cuff B2B with Xplizit.",
    ticketPrice: "Sold Out",
    highlight: "Beano b2b Xplizit following Klubfiller"
  },
  {
    id: "gig-sean-day-memorial",
    title: "Spunky Reunion in Memory of Mr Sean Day",
    venue: "The Buttermarket / The Plough Inn",
    location: "Shrewsbury / Hereford, UK",
    date: "September 29",
    year: "2023",
    type: "Charity Stream",
    lineup: ["DJ Beano", "MC Energy", "Ben Critic", "Spunky Originals"],
    description: "Emotional tribute event raising over £4,500+ for Sean Day's family and his young son Harley.",
    ticketPrice: "£10 Charity Donation",
    highlight: "£4,500+ Raised For Sean's Family"
  },
  {
    id: "gig-stompin-ground",
    title: "The Rave Alliance Presents: Stompin Ground",
    venue: "The Plough Inn",
    location: "Hereford, UK",
    date: "November 3",
    year: "2023",
    type: "Club Night",
    lineup: ["Rob IYF", "DJ Beano & MC Gary B (11:10 PM)", "The Rave Alliance"],
    description: "Wall-to-wall sold out stomper night introducing brand-new production and peak-hour energy to Hereford.",
    ticketPrice: "Sold Out",
    highlight: "Beano with MC Gary B"
  },
  {
    id: "gig-royal-rebellion",
    title: "The Rebellion Event #2: The Royal Rebellion",
    venue: "Suki10c / Club Arena",
    location: "Birmingham, UK",
    date: "June 3",
    year: "2022",
    type: "Headline & B2B",
    lineup: ["Klubfiller", "DJ Beano & MCs Stafford & Twist (1:00 AM)", "TIOS Digital Crew"],
    description: "Taking over the decks directly from Klubfiller for a 1am prime-time set of pure bars and UK hardcore anthems.",
    ticketPrice: "£12 Advance",
    highlight: "Decks Handover from Klubfiller"
  },
  {
    id: "gig-unity-in-sun-corfu",
    title: "Unity In The Sun (International)",
    venue: "Island Beach & Bamboo Pool Party",
    location: "Kavos, Corfu, Greece",
    date: "May 21-22",
    year: "2019 / 2022",
    type: "Festival",
    lineup: ["DJ Beano & MC Whizzkid", "Beano b2b DJ Tindle", "SIK Individual", "Billy Daniel Bunter"],
    description: "Beano took his signature sound international to the Mediterranean, rocking open-air pool parties and beachside night raves.",
    ticketPrice: "International Festival Pass",
    highlight: "On stage with MC Whizzkid"
  },
  {
    id: "gig-stadium-fest-hereford",
    title: "Stadium Music Festival (Hereford FC)",
    venue: "Edgar Street Football Ground",
    location: "Hereford, UK",
    date: "May 26",
    year: "2019",
    type: "Festival",
    lineup: ["Clubland Arena", "DJ Hixxy", "DJ Beano (1:00 PM)", "Clubland All-Stars"],
    description: "Representing his hometown on the colossal main stadium stage at Hereford FC's home ground.",
    ticketPrice: "Festival Ticket",
    highlight: "Performing on Hereford Stadium pitch"
  }
];

export const OFFICIAL_RELEASES: ReleaseTrack[] = [
  {
    id: "rel-find-me-in-the-pit",
    title: "Find Me In The Pit",
    artists: "Pez & Beano",
    label: "TIOS Digital",
    releaseDate: "2020",
    bpm: 175,
    beatportUrl: "https://www.beatport.com/release/find-me-in-the-pit/2812775",
    artworkUrl: "/src/assets/images/dj_beano_album_art_1790843114461.jpg",
    note: "Official Beatport release with DJ Pez. A ferocious 175 BPM dancefloor pit weapon supported across UK rave streams."
  },
  {
    id: "rel-just-miss-the-hit",
    title: "Just Miss The Hit",
    artists: "Pez & Beano",
    label: "TIOS Digital",
    releaseDate: "2021",
    bpm: 175,
    beatportUrl: "https://www.beatport.com/release/just-miss-the-hit/3241651",
    artworkUrl: "/src/assets/images/dj_beano_studio_mixing_1790843091409.jpg",
    note: "Second collaborative single on TIOS Digital, delivering crisp vocal cuts and high-impact powerstomp drops."
  },
  {
    id: "rel-no-good-remix",
    title: "No Good (Pez & Beano Remix)",
    artists: "The Prodigy (Pez & Beano Hardcore Rework)",
    label: "Underground / White Label",
    releaseDate: "2020",
    bpm: 175,
    soundcloudUrl: "https://soundcloud.com/beanodj",
    artworkUrl: "/src/assets/images/dj_beano_hero_rave_1790843080869.jpg",
    note: "Tribute remix to the legendary electronic pioneers The Prodigy, reworked with modern 175 BPM hardcore kick dynamics."
  },
  {
    id: "rel-spill-the-beanz-ep",
    title: "Spill The Beanz EP",
    artists: "DJ Beano",
    label: "Sound Intentionz / Self-Release",
    releaseDate: "2025",
    bpm: 172,
    soundcloudUrl: "https://on.soundcloud.com/5rTGVJdrhHfgyTHCA",
    artworkUrl: "/src/assets/images/dj_beano_album_art_1790843114461.jpg",
    note: "Artwork by SMC Designs. Explorations spanning peak trance, dark driving techno, and relentless hardcore."
  }
];

export const CHARITY_INITIATIVES = {
  title: "Charley's Beats & Mental Health Awareness",
  motto: "It's OK Not To Be OK · Don't Suffer In Silence · Stomp Out The Stigma",
  stats: [
    { label: "Community Reach", value: "200,000+" },
    { label: "Memorial Funds Raised", value: "£4,500+" },
    { label: "Charity Stream Hours", value: "150+ hrs" },
    { label: "Core Campaign", value: "#ItsOkNotToBeOk" }
  ],
  story: "Mental health awareness has been a deeply personal cornerstone of Luke's career. Through Charley's Beats (In Charley's Memory), Beano and fellow DJs united for 16-hour and 24-hour marathon broadcasts reaching over 200,000 ravers across the UK, creating an open space for conversation. In September 2023, following the tragic passing of local friend Sean Day, Luke and The Rave Alliance community rallied together for the Spunky Reunion at The Buttermarket and The Plough Inn, raising over £4,500 for Sean's family and his young son Harley."
};
