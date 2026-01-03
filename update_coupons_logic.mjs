import fs from 'fs';
import path from 'path';

// Accurate JSON provided by USER (Step 398)
const couponsData = {
  "project": "DeltaCoupons",
  "last_updated": "2026-01-03",
  "coupons": [
    { "id": 7, "name": "Nintendo eShop", "bg": "background_nintendo_eshop", "icon": "icon_15_nintendo", "cat": "Gift Cards", "multi": false, "url": "https://nintendo.com" },
    { "id": 19, "name": "Xbox Game Pass", "bg": "background_xbox_game_pass", "icon": "icon_30_xbox", "cat": "Subscriptions", "multi": true, "url": "https://xbox.com" },
    { "id": 22, "name": "PlayStation Plus", "bg": "background_playstation_plus", "icon": "icon_31_psplus", "cat": "Subscriptions", "multi": true, "url": "https://playstation.com" },
    { "id": 23, "name": "Spotify Premium", "bg": "background_spotify_premium", "icon": "icon_32_spotify", "cat": "Gift Cards", "multi": false, "url": "https://spotify.com" },
    { "id": 24, "name": "Civilization VII", "bg": "background_civilization_vii", "icon": "icon_33_civ7", "cat": "Game Keys", "multi": true, "url": "https://civilization.com" },
    { "id": 25, "name": "Fortnite V-Bucks", "bg": "background_fortnite_vbucks", "icon": "icon_34_fortnite", "cat": "Currency", "multi": true, "url": "https://fortnite.com" },
    { "id": 26, "name": "Marvel Rivals", "bg": "background_marvel_rivals", "icon": "icon_35_marvel", "cat": "Game Keys", "multi": true, "url": "https://marvelrivals.com" },
    { "id": 27, "name": "Elden Ring: Nightreign", "bg": "background_elden_ring_nightreign", "icon": "icon_36_elden", "cat": "Game Keys", "multi": true, "url": "https://bandainamco.com" },
    { "id": 28, "name": "Crunchyroll", "bg": "background_crunchyroll", "icon": "icon_38_crunchy", "cat": "Subscriptions", "multi": false, "url": "https://crunchyroll.com" },
    { "id": 29, "name": "Steam Wallet", "bg": "background_steam_wallet", "icon": "icon_39_steam", "cat": "Gift Cards", "multi": false, "url": "https://steampowered.com" },
    { "id": 30, "name": "Amazon Card", "bg": "background_amazon_card", "icon": "icon_40_amazon", "cat": "Gift Cards", "multi": false, "url": "https://amazon.com" },
    { "id": 31, "name": "Monster Hunter Wilds", "bg": "background_monster_hunter_wilds", "icon": "icon_41_monhun", "cat": "Game Keys", "multi": true, "url": "https://capcom.com" },
    { "id": 32, "name": "SHEIN Card", "bg": "background_shein_card", "icon": "icon_62_shein", "cat": "Gift Cards", "multi": false, "url": "https://shein.com" },
    { "id": 33, "name": "R.E.P.O", "bg": "background_repo", "icon": "icon_43_repo", "cat": "Game Keys", "multi": true, "url": "https://store.steampowered.com" },
    { "id": 34, "name": "Split Fiction", "bg": "background_split_fiction", "icon": "icon_44_split", "cat": "Game Keys", "multi": true, "url": "https://splitfiction.com" },
    { "id": 35, "name": "AC Shadows", "bg": "background_assassins_creed_shadows", "icon": "icon_45_acshadows", "cat": "Game Keys", "multi": true, "url": "https://ubisoft.com" },
    { "id": 36, "name": "The Sims 4", "bg": "background_the_sims_4", "icon": "icon_46_sims", "cat": "Game Keys", "multi": true, "url": "https://ea.com" },
    { "id": 37, "name": "Khazan", "bg": "background_khazan", "icon": "icon_47_khazan", "cat": "Game Keys", "multi": true, "url": "https://nexon.com" },
    { "id": 38, "name": "Schedule I", "bg": "background_schedule_i", "icon": "icon_48_sch1", "cat": "Game Keys", "multi": false, "url": "https://schedule1.com" },
    { "id": 39, "name": "Rust", "bg": "background_rust", "icon": "icon_49_rust", "cat": "Game Keys", "multi": true, "url": "https://rust.facepunch.com" },
    { "id": 41, "name": "GTA V", "bg": "background_gta_v", "icon": "icon_51_gta5", "cat": "Game Keys", "multi": true, "url": "https://rockstargames.com" },
    { "id": 42, "name": "X Premium", "bg": "background_x_premium", "icon": "icon_57_x", "cat": "Subscriptions", "multi": false, "url": "https://x.com" },
    { "id": 43, "name": "DragonWilds", "bg": "background_dragonwilds", "icon": "icon_58_dwilds", "cat": "Game Keys", "multi": false, "url": "https://dragonwilds.com" },
    { "id": 44, "name": "Destiny 2", "bg": "background_destiny_2", "icon": "icon_59_destiny2", "cat": "Game Keys", "multi": true, "url": "https://bungie.net" },
    { "id": 45, "name": "Oblivion Remaster", "bg": "background_oblivion_remastered", "icon": "icon_60_oblivion", "cat": "Game Keys", "multi": true, "url": "https://bethesda.net" },
    { "id": 48, "name": "Expedition 33", "bg": "background_expedition_33", "icon": "icon_63_exp33", "cat": "Game Keys", "multi": true, "url": "https://expedition33.com" },
    { "id": 49, "name": "HBO Max", "bg": "background_hbo_max", "icon": "icon_64_hbo", "cat": "Subscriptions", "multi": false, "url": "https://max.com" },
    { "id": 50, "name": "Doom: Dark Ages", "bg": "background_doom_dark_ages", "icon": "icon_65_doom", "cat": "Game Keys", "multi": true, "url": "https://bethesda.net" },
    { "id": 54, "name": "Mario Kart World", "bg": "background_mario_kart_world", "icon": "icon_68_mkart", "cat": "Game Keys", "multi": false, "url": "https://nintendo.com" },
    { "id": 55, "name": "Peak", "bg": "background_peak", "icon": "icon_69_peak", "cat": "Apps", "multi": false, "url": "https://peak.com" },
    { "id": 56, "name": "Death Stranding 2", "bg": "background_death_stranding_2", "icon": "icon_70_ds2", "cat": "Game Keys", "multi": true, "url": "https://kojimaproductions.jp" },
    { "id": 59, "name": "DoorDash Card", "bg": "background_doordash", "icon": "icon_74_doordash", "cat": "Gift Cards", "multi": false, "url": "https://doordash.com" },
    { "id": 61, "name": "MGS Delta", "bg": "background_mgs_delta", "icon": "icon_77_mgs", "cat": "Game Keys", "multi": true, "url": "https://konami.com" },
    { "id": 62, "name": "Tinder Gold", "bg": "background_tinder_gold", "icon": "icon_78_tinder", "cat": "Subscriptions", "multi": false, "url": "https://tinder.com" },
    { "id": 63, "name": "NBA 2K26", "bg": "background_nba_2k26", "icon": "icon_79_nba", "cat": "Game Keys", "multi": true, "url": "https://2k.com" },
    { "id": 64, "name": "Silksong", "bg": "background_hollow_knight_silksong", "icon": "icon_80_hollow", "cat": "Game Keys", "multi": true, "url": "https://teamcherry.com" },
    { "id": 65, "name": "Borderlands 4", "bg": "background_borderlands_4", "icon": "icon_81_border4", "cat": "Game Keys", "multi": true, "url": "https://borderlands.com" },
    { "id": 66, "name": "Helldivers II", "bg": "background_helldivers_ii", "icon": "icon_82_helldivers", "cat": "Game Keys", "multi": true, "url": "https://playstation.com" },
    { "id": 67, "name": "Roblox Robux", "bg": "background_roblox_robux", "icon": "icon_71_roblox", "cat": "Currency", "multi": false, "url": "https://roblox.com" },
    { "id": 69, "name": "Dying Light Beast", "bg": "background_dying_light_beast", "icon": "icon_84_dlbeast", "cat": "Game Keys", "multi": true, "url": "https://techland.net" },
    { "id": 70, "name": "Silent Hill f", "bg": "background_silent_hill_f", "icon": "icon_87_shill", "cat": "Game Keys", "multi": true, "url": "https://konami.com" },
    { "id": 72, "name": "Ghost of Yotei", "bg": "background_ghost_of_yotei", "icon": "icon_90_ghost", "cat": "Game Keys", "multi": true, "url": "https://playstation.com" },
    { "id": 73, "name": "Battlefield 6", "bg": "background_battlefield_6", "icon": "icon_91_bf6", "cat": "Game Keys", "multi": true, "url": "https://ea.com" },
    { "id": 74, "name": "Jurassic World 3", "bg": "background_jurassic_world_3", "icon": "icon_92_jurassic", "cat": "Game Keys", "multi": true, "url": "https://frontier.co.uk" },
    { "id": 75, "name": "Dispatch", "bg": "background_dispatch", "icon": "icon_93_dispatch", "cat": "Game Keys", "multi": false, "url": "https://dispatchgame.com" },
    { "id": 76, "name": "Arc Raiders", "bg": "background_arc_raiders", "icon": "icon_94_arcraiders", "cat": "Game Keys", "multi": true, "url": "https://embark-studios.com" },
    { "id": 78, "name": "CoD: Black Ops 6", "bg": "background_black_ops_6", "icon": "icon_96_bo6", "cat": "Game Keys", "multi": true, "url": "https://callofduty.com" },
    { "id": 79, "name": "Ashes of Creation", "bg": "background_ashes_of_creation", "icon": "icon_97_ashes", "cat": "Game Keys", "multi": true, "url": "https://ashesofcreation.com" }
  ]
};

// Helper: Find exact fuzzy matching file in assets
function findFile(assetsList, nameStr) {
  // 1. Try exact exact
  if (assetsList.includes(nameStr)) return nameStr;

  // 2. Try exact + extension
  const extensions = ['.jpg', '.png', '.webp', '.jpeg'];
  for (const ext of extensions) {
    if (assetsList.includes(nameStr + ext)) return nameStr + ext;
  }

  // 3. Fuzzy search for Renamed Files
  // "background_19_coupon.jpg" mapped to "background_xbox_game_pass"
  // Logic: Iterate all assets. If file starts with "background_" and contains "19" -> match.
  // OR: If file name is "background_xbox_game_pass.jpg" -> match.

  // A - Check if file exists exactly as requested (plus extension)
  // This handles the case where USER renamed files to "background_xbox_game_pass.jpg"
  const directMatch = assetsList.find(f => f.startsWith(nameStr + '.'));
  if (directMatch) return directMatch;

  // B - Fallback: The user provided JSON has "background_xbox_game_pass" but the file on disk is still "background_19_coupon.jpg"
  // We need to map the ID-based filename to this new fancy string.
  // We can't easily guess "xbox_game_pass" <-> "19" without the old ID.
  // BUT the coupon object has the ID!
  // So we will execute this find logic inside the loop, where we have the ID.

  return null;
}

// Read assets directory
const assetsDir = 'public/assets';
let assetsFiles = [];
try {
  assetsFiles = fs.readdirSync(assetsDir);
} catch (e) {
  console.error("Could not read assets dir:", e);
  process.exit(1);
}

// Function to rename files if they don't match the new fancy names
function ensureFileRenamed(oldPatternId, newNameBase) {
  // 1. Find the old file: directly look for background_{id}_coupon.jpg (or other extensions)
  // The previous regex was expecting extra characters after 'coupon'.
  const idRegex = new RegExp(`^${oldPatternId}\\.(jpg|png|webp|jpeg)$`, 'i');
  const oldFile = assetsFiles.find(f => idRegex.test(f));

  if (oldFile) {
    const ext = path.extname(oldFile);
    const newFileName = newNameBase + ext;

    // Don't rename if already correct
    if (oldFile === newFileName) return newFileName;

    try {
      fs.renameSync(path.join(assetsDir, oldFile), path.join(assetsDir, newFileName));
      console.log(`Renamed: ${oldFile} -> ${newFileName}`);
      return newFileName;
    } catch (e) {
      console.error(`Error renaming ${oldFile}:`, e);
      return oldFile; // sticky fallback
    }
  }

  // If old file not found, maybe it's completely different?
  // Try finding by keyword?
  // Let's rely on finding file by expected new name first.
  const alreadyRenamed = assetsFiles.find(f => f.startsWith(newNameBase + '.'));
  if (alreadyRenamed) return alreadyRenamed;

  return null;
}


let tsContent = `export interface Coupon {
  id: number;
  item_name: string;
  category: string;
  multi_platform: boolean;
  platforms: string[];
  discount: string;
  expires: string;
  verified: boolean;
  background_file?: string;
  description?: string;
  external_url?: string;
  icon?: string;
}

export const coupons: Coupon[] = [
`;

couponsData.coupons.forEach((c, index) => {
  // RENAME LOGIC:
  // The user wants the files ON DISK to match these new names.
  // We need to find the file that matches the ID (e.g. background_19_coupon.jpg)
  // and rename it to "background_xbox_game_pass.jpg"

  // Background renaming
  let bgFile = ensureFileRenamed(`background_${c.id}_coupon`, c.bg);
  if (!bgFile) {
    // Fallback: If we couldn't find "background_19_coupon", try finding just by fuzzy name match from before
    bgFile = findFile(assetsFiles, c.bg);
  }
  if (!bgFile) bgFile = c.bg + ".jpg"; // Ultimate fallback

  // Icon renaming is NOT requested, but let's be safe.
  // User request: "rename the background images like on the json names"
  // User mentions they corrected "icob_42"

  // Let's try to map icon from assets using the string provided
  let iconFile = findFile(assetsFiles, c.icon);

  // Fallback logic for icons
  if (!iconFile) {
    // Try finding by ID logic "icon_30_..."
    const idPattern = `icon_${c.id}_`;
    iconFile = assetsFiles.find(f => f.startsWith(idPattern));
  }

  if (!iconFile) iconFile = "icon_75_bombcoupons.png";

  // Platforms
  let platforms = c.multi ? ["PC", "PS5", "Xbox"] : ["PC"];
  if (c.name.includes("Nintendo")) platforms = ["Nintendo Switch"];
  if (c.name.includes("PlayStation")) platforms = ["PS4", "PS5"];
  if (c.name.includes("Xbox")) platforms = ["Xbox", "PC"];
  if (c.cat === "Currency" && c.multi) platforms = ["PC", "Mobile", "Console"];

  tsContent += `  {
    id: ${c.id},
    item_name: "${c.name}",
    category: "${c.cat}",
    multi_platform: ${c.multi},
    platforms: ${JSON.stringify(platforms)},
    discount: "FREE",
    expires: "Dec 31, 2026",
    verified: true,
    background_file: "${bgFile}",
    description: "Verified digital coupon for ${c.name}.",
    external_url: "${c.url}",
    icon: "${iconFile}"
  }${index < couponsData.coupons.length - 1 ? ',' : ''}\n`;
});

tsContent += `];

export const heroSlides = [
  {
    id: 1,
    image: "background_assassins_creed_shadows.jpg", 
    title: "Assassin's Creed Shadows",
    subtitle: "Digital Key",
    description: "Experience the latest installment in the saga.",
    discount: "FREE"
  },
  {
    id: 2,
    image: "background_fortnite_vbucks.jpg",
    title: "Fortnite V-Bucks",
    subtitle: "2800 V-Bucks",
    description: "Get skins and battle pass for free.",
    discount: "FREE"
  },
  {
    id: 3,
    image: "background_xbox_game_pass.jpg",
    title: "Valorant Points",
    subtitle: "Riot Points",
    description: "Unlock new agents and weapon skins.",
    discount: "FREE"
  }
];
`;

fs.writeFileSync('src/data/coupons.ts', tsContent);
console.log('Successfully updated coupons.ts and renamed background files.');
