export interface CalendarGig {
  id: string;
  title: string;
  venue: string;
  city: string;
  dateStr: string; // ISO date 'YYYY-MM-DD'
  displayDate: string;
  doorTime: string;
  setTime: string;
  curfew: string;
  type: 'Club Night' | 'Festival' | 'B2B Special' | 'Charity Marathon';
  ticketStatus: 'Tickets On Sale' | 'Selling Fast' | 'Free Entry' | 'Sold Out';
  ticketPrice: string;
  ticketLink?: string;
  lineup: string[];
  description: string;
  soundSystem: string;
  attendeesCount: number;
  lineup_short?: string;
}

export const UPCOMING_CALENDAR_GIGS: CalendarGig[] = [
  {
    id: "gig-2026-10-09",
    title: "Sound Intentionz: Autumn Hardcore Storm",
    venue: "Babylon Lounge",
    city: "Hereford, UK",
    dateStr: "2026-10-09",
    displayDate: "Friday, 9 October 2026",
    doorTime: "21:00",
    setTime: "01:00 - 02:30",
    curfew: "04:00",
    type: "Club Night",
    ticketStatus: "Tickets On Sale",
    ticketPrice: "£10.00 Advance / £12 OTD",
    ticketLink: "https://www.skiddle.com",
    lineup: ["DJ Beano (Headline 90m Set)", "Hypo-Tinx DJ", "MC Wotsee", "Double Damage", "Sound Intentionz All-Stars"],
    description: "The official Autumn stomper in Hereford. Beano returns to Babylon Lounge for a thunderous 90-minute headline set backed by MC Wotsee.",
    soundSystem: "Funktion-One Sound Rig",
    attendeesCount: 218
  },
  {
    id: "gig-2026-10-17",
    title: "Hardcore Technology: Wales Invasion",
    venue: "Atlantica Club",
    city: "Newport, Wales",
    dateStr: "2026-10-17",
    displayDate: "Saturday, 17 October 2026",
    doorTime: "20:00",
    setTime: "23:45 - 01:00",
    curfew: "04:00",
    type: "Club Night",
    ticketStatus: "Selling Fast",
    ticketPrice: "£12.50 Advance",
    ticketLink: "https://www.skiddle.com",
    lineup: ["DJ Hixxy", "MC Wotsee", "DJ Beano", "Rob IYF", "MC Jack"],
    description: "A colossal night across the Welsh border. Beano sets the floor ablaze right before hardcore boss DJ Hixxy.",
    soundSystem: "Void Acoustics Incubus System",
    attendeesCount: 384
  },
  {
    id: "gig-2026-10-25",
    title: "Charley's Beats: 24-Hour Mental Health Stream",
    venue: "Charley's Beats Online & Twitch",
    city: "Online Broadcast",
    dateStr: "2026-10-25",
    displayDate: "Sunday, 25 October 2026",
    doorTime: "12:00",
    setTime: "18:00 - 19:30",
    curfew: "23:59",
    type: "Charity Marathon",
    ticketStatus: "Free Entry",
    ticketPrice: "Free / Voluntary Donation to MIND",
    ticketLink: "https://www.twitch.tv/beano_dj",
    lineup: ["DJ Beano", "BenAddikt", "DJ Pez", "MC Messy", "Charley's Warriors"],
    description: "Annual Autumn 24-hour marathon charity broadcast spreading mental health awareness (#ItsOkNotToBeOk) across the rave community.",
    soundSystem: "Studio Digital Broadcast Stream",
    attendeesCount: 512
  },
  {
    id: "gig-2026-10-31",
    title: "The Rave Alliance: Halloween Fright Stomp",
    venue: "The Kerry",
    city: "Hereford, UK",
    dateStr: "2026-10-31",
    displayDate: "Saturday, 31 October 2026",
    doorTime: "20:00",
    setTime: "00:00 - 01:30",
    curfew: "03:30",
    type: "Club Night",
    ticketStatus: "Selling Fast",
    ticketPrice: "£10.00 Advance (Fancy Dress)",
    ticketLink: "https://www.skiddle.com",
    lineup: ["DJ Beano b2b DJ Pez (Midnight Special)", "MC Energy", "The Rave Alliance Residents"],
    description: "Midnight witching-hour B2B set with longtime partner DJ Pez dropping high-impact 175 BPM powerstomp and hardcore classics.",
    soundSystem: "Billet Audio Custom System",
    attendeesCount: 295
  },
  {
    id: "gig-2026-11-06",
    title: "Diverse Audio: Bristol Underground Chapter",
    venue: "Basement 45",
    city: "Bristol, UK",
    dateStr: "2026-11-06",
    displayDate: "Friday, 6 November 2026",
    doorTime: "22:00",
    setTime: "01:30 - 03:00",
    curfew: "05:00",
    type: "B2B Special",
    lineup: ["DJ Beano b2b Hypo-Tinx", "MC Double-D", "Pez & Summit", "Diverse Audio Roster"],
    description: "Multi-genre heavy subterranean night in Bristol's historic vaulted basement venue across 2 rooms of sound.",
    ticketStatus: "Tickets On Sale",
    ticketPrice: "£8 Early Bird / £12 Standard",
    ticketLink: "https://www.skiddle.com",
    lineup_short: "Beano b2b Hypo-Tinx ft. Double-D",
    soundSystem: "Full Funktion-One Ground Stack",
    attendeesCount: 180
  },
  {
    id: "gig-2026-11-20",
    title: "Spunky Legends Reunion & Sean Day Tribute",
    venue: "The Buttermarket",
    city: "Shrewsbury, UK",
    dateStr: "2026-11-20",
    displayDate: "Friday, 20 November 2026",
    doorTime: "20:00",
    setTime: "23:00 - 00:30",
    curfew: "03:30",
    type: "Festival",
    ticketStatus: "Tickets On Sale",
    ticketPrice: "£15.00 (Proceeds to Sean Day Trust)",
    ticketLink: "https://www.skiddle.com",
    lineup: ["DJ Beano", "MC Energy", "Ben Critic", "Joey Riot", "Spunky Old-Skool Residents"],
    description: "Uniting the West Midlands rave community for an evening of memories, uplifting hardcore anthems, and charity support.",
    soundSystem: "Festival Line Array",
    attendeesCount: 420
  },
  {
    id: "gig-2026-12-18",
    title: "The Rave Alliance Christmas Bash 2026",
    venue: "The Plough Inn",
    city: "Hereford, UK",
    dateStr: "2026-12-18",
    displayDate: "Friday, 18 December 2026",
    doorTime: "19:00",
    setTime: "00:30 - 02:00",
    curfew: "03:30",
    type: "Club Night",
    ticketStatus: "Selling Fast",
    ticketPrice: "£10.00 Advance (Strict 150 Cap)",
    ticketLink: "https://www.skiddle.com",
    lineup: ["Klubfiller", "MC Energy", "DJ Beano", "MC Gary B", "The Rave Alliance Crew"],
    description: "The annual sold-out festive pilgrimage in Hereford with UK #1 Klubfiller and Beano delivering peak Christmas energy.",
    soundSystem: "Custom High-Power Club Rig",
    attendeesCount: 148
  },
  {
    id: "gig-2026-12-31",
    title: "One Big Bash: NYE 2027 Countdown Rave",
    venue: "Beaver Works",
    city: "Leeds, UK",
    dateStr: "2026-12-31",
    displayDate: "Thursday, 31 December 2026",
    doorTime: "20:00",
    setTime: "01:00 - 02:30",
    curfew: "06:00",
    type: "Festival",
    ticketStatus: "Tickets On Sale",
    ticketPrice: "£20.00 Advance Tier 1",
    ticketLink: "https://www.skiddle.com",
    lineup: ["One Big Bash All-Stars", "DJ Beano ft. MC Dandy", "Dougal & Gammer", "Klubfiller", "Hixxy"],
    description: "Welcome 2027 at the legendary Beaver Works complex in Leeds with multi-room insanity and Beano & Dandy's signature show.",
    soundSystem: "Multi-Room Funktion-One & Void Rigs",
    attendeesCount: 890
  }
];
