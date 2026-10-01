export interface GalleryItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  caption: string;
  category: string;
  date: string;
  venue: string;
  location: string;
  thumbnailUrl: string;
  mediaUrl?: string; // Video URL or full photo
  duration?: string;
  bpm?: number;
  highlight?: string;
  views?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "vid-babylon-lounge",
    type: "video",
    title: "Babylon Lounge Live B2B with Hypo-Tinx",
    caption: "Peak time 1-2am B2B business dropping high velocity 172 BPM hardcore slammers at Sound Intentionz Hereford.",
    category: "Club Performance",
    date: "Dec 13, 2025",
    venue: "Babylon Lounge",
    location: "Hereford, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_hero_rave_1790843080869.jpg",
    mediaUrl: "https://www.facebook.com/beanodj/videos/418756423976856/",
    duration: "03:45",
    bpm: 172,
    highlight: "B2B with Hypo-Tinx DJ",
    views: "3.2k views"
  },
  {
    id: "photo-festival-lasers",
    type: "photo",
    title: "Festival Mainstage Laser Canopy",
    caption: "Vibrant emerald and ultraviolet lasers slicing through stage haze over thousands of hardcore ravers.",
    category: "Festival Stage",
    date: "Aug 2024",
    venue: "The Kerry Festival Grounds",
    location: "Hereford, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_festival_stage_1790843440951.jpg",
    highlight: "10,000 Watt Laser Rig"
  },
  {
    id: "vid-stadiumfest-hereford",
    type: "video",
    title: "Clubland @ Stadium Music Festival Live",
    caption: "Performing on the massive stage at Hereford FC's home football ground with heavy bounce and hardcore slammers.",
    category: "Festival Performance",
    date: "June 4, 2022",
    venue: "Hereford FC Stadium",
    location: "Hereford, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_crowd_hands_1790843102717.jpg",
    mediaUrl: "https://www.facebook.com/beanodj/videos/837005133322158/",
    duration: "04:41",
    bpm: 165,
    highlight: "Stadium Arena with Clubland",
    views: "5.8k views"
  },
  {
    id: "photo-cdj-deck-action",
    type: "photo",
    title: "Pioneer CDJ-3000 Turntables in the Dark",
    caption: "Precision cueing and beat-matching at 175 BPM in the late-night studio booth.",
    category: "Gear & Studio",
    date: "Jan 2024",
    venue: "Sound Intentionz Studio",
    location: "Herefordshire, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_studio_mixing_1790843091409.jpg",
    highlight: "Hardware Console"
  },
  {
    id: "vid-royal-rebellion",
    type: "video",
    title: "The Royal Rebellion @ Suki10c Handover Set",
    caption: "Taking over the decks from the mighty Klubfiller at 1am with MCs Stafford & Twist dropping pure bars.",
    category: "Club Performance",
    date: "June 3, 2022",
    venue: "Suki10c",
    location: "Birmingham, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_backstage_booth_1790843453439.jpg",
    mediaUrl: "https://www.facebook.com/beanodj/videos/362163354423694/",
    duration: "02:02",
    bpm: 175,
    highlight: "Handover from Klubfiller",
    views: "2.1k views"
  },
  {
    id: "photo-crowd-euphoria",
    type: "photo",
    title: "Hands in the Air: Hereford Rave Alliance",
    caption: "Crowd euphoria during peak-hour drop at The Plough Inn stomping ground.",
    category: "Crowd & Atmosphere",
    date: "Nov 2023",
    venue: "The Plough Inn",
    location: "Hereford, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_crowd_hands_1790843102717.jpg",
    highlight: "Sold Out Event"
  },
  {
    id: "vid-mc-darkside-twitch",
    type: "video",
    title: "Twitch Raid Live Stream ft. MC Darkside",
    caption: "Studio stream train session blending classic hardcore drops with live freestyle bars from MC Darkside.",
    category: "Live Stream",
    date: "Jan 2022",
    venue: "Twitch Live Broadcast",
    location: "Online / UK",
    thumbnailUrl: "/src/assets/images/dj_beano_studio_mixing_1790843091409.jpg",
    mediaUrl: "https://www.facebook.com/beanodj/videos/913211699330860/",
    duration: "01:15",
    bpm: 170,
    highlight: "Stream Train Special",
    views: "1.4k views"
  },
  {
    id: "photo-vinyl-spill-beanz",
    type: "photo",
    title: "Spill The Beanz Vol. 1 Artwork Showcase",
    caption: "Official cover artwork designed by SMC Designs for Beano's multi-genre hardcore series.",
    category: "Artwork & Releases",
    date: "May 2025",
    venue: "TIOS Digital & SMC Designs",
    location: "UK",
    thumbnailUrl: "/src/assets/images/dj_beano_album_art_1790843114461.jpg",
    highlight: "Artwork by SMC Designs"
  },
  {
    id: "photo-dj-booth-mixing",
    type: "photo",
    title: "Live in the Mix: High EQ Filter Sweep",
    caption: "Sweeping the high-pass resonant filter right before a 175 BPM drop.",
    category: "DJ Action",
    date: "Feb 2024",
    venue: "The Victory",
    location: "Hereford, UK",
    thumbnailUrl: "/src/assets/images/dj_beano_backstage_booth_1790843453439.jpg",
    highlight: "Filter Drop Moment"
  }
];
