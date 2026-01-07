import fs from 'fs';
import path from 'path';

// Accurate JSON restored from backup and updated with new entries
const couponsData = {
  "project": "DeltaCoupons",
  "last_updated": "2026-01-07",
  "coupons": [
    { "id": 7, "name": "Nintendo eShop", "bg": "background_nintendo_eshop.jpg", "icon": "icon_15_nintendo.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 19, "name": "Xbox Game Pass", "bg": "background_xbox_game_pass.jpg", "icon": "icon_30_xbox_gamepass.jpg", "cat": "Subscriptions", "multi": true },
    { "id": 22, "name": "PlayStation Plus", "bg": "background_playstation_plus.jpg", "icon": "icon_31_playstation_plus.jpg", "cat": "Subscriptions", "multi": true },
    { "id": 23, "name": "Spotify Premium", "bg": "background_spotify_premium.jpg", "icon": "icon_32_spotify.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 24, "name": "Civilization VII", "bg": "background_civilization_vii.jpg", "icon": "icon_33_civilization_vii.jpg", "cat": "Game Keys", "multi": true },
    { "id": 25, "name": "Fortnite V-Bucks", "bg": "background_fortnite_vbucks.jpg", "icon": "icon_34_fortnite.jpg", "cat": "Currency", "multi": true },
    { "id": 26, "name": "Marvel Rivals", "bg": "background_marvel_rivals.jpg", "icon": "icon_35_marvel_rivals.jpg", "cat": "Game Keys", "multi": true },
    { "id": 27, "name": "Elden Ring: Nightreign", "bg": "background_elden_ring_nightreign.jpg", "icon": "icon_36_elden_ring_nightreign.jpg", "cat": "Game Keys", "multi": true },
    { "id": 28, "name": "Crunchyroll", "bg": "background_crunchyroll.jpg", "icon": "icon_38_crunchyroll.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 29, "name": "Steam Wallet", "bg": "background_steam_wallet.jpg", "icon": "icon_39_steam.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 30, "name": "Amazon Card", "bg": "background_amazon_card.jpg", "icon": "icon_40_amazon.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 31, "name": "Monster Hunter Wilds", "bg": "background_monster_hunter_wilds.jpg", "icon": "icon_41_monster_hunter.jpg", "cat": "Game Keys", "multi": true },
    { "id": 32, "name": "SHEIN Card", "bg": "background_shein_card.jpg", "icon": "icon_42_shein.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 33, "name": "R.E.P.O", "bg": "background_repo.jpg", "icon": "icon_43_repo.jpg", "cat": "Game Keys", "multi": false },
    { "id": 34, "name": "Split Fiction", "bg": "background_split_fiction.jpg", "icon": "icon_44_split_fiction.jpg", "cat": "Game Keys", "multi": true },
    { "id": 35, "name": "AC Shadows", "bg": "background_assassins_creed_shadows.jpg", "icon": "icon_45_assassin_creed_shadows.jpg", "cat": "Game Keys", "multi": true },
    { "id": 36, "name": "Sims 4 All DLC", "bg": "background_the_sims_4.jpg", "icon": "icon_46_sims4.jpg", "cat": "Game Keys", "multi": true },
    { "id": 37, "name": "Khazan", "bg": "background_khazan.jpg", "icon": "icon_47_khazan.jpg", "cat": "Game Keys", "multi": true },
    { "id": 38, "name": "Schedule I", "bg": "background_schedule_i.jpg", "icon": "icon_48_schedule.jpg", "cat": "Game Keys", "multi": false },
    { "id": 39, "name": "Rust", "bg": "background_rust.jpg", "icon": "icon_49_rust.jpg", "cat": "Game Keys", "multi": true },
    { "id": 41, "name": "GTA V", "bg": "background_gta_v.jpg", "icon": "icon_51_gta5.jpg", "cat": "Game Keys", "multi": true },
    { "id": 42, "name": "X Premium", "bg": "background_x_premium.jpg", "icon": "icon_57_x_premuim.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 43, "name": "DragonWilds", "bg": "background_dragonwilds.jpg", "icon": "icon_58_dragonwilds_runescape.jpg", "cat": "Game Keys", "multi": false },
    { "id": 44, "name": "Destiny 2", "bg": "background_destiny_2.jpg", "icon": "icon_59_destiny_2.jpg", "cat": "Game Keys", "multi": true },
    { "id": 45, "name": "Oblivion Remaster", "bg": "background_oblivion_remastered.jpg", "icon": "icon_60_oblivion_remastered.jpg", "cat": "Game Keys", "multi": true },
    { "id": 48, "name": "Expedition 33", "bg": "background_expedition_33.jpg", "icon": "icon_63_expedtion_33.jpg", "cat": "Game Keys", "multi": true },
    { "id": 49, "name": "HBO Max", "bg": "background_hbo_max.jpg", "icon": "icon_64_hbo_max.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 50, "name": "Doom: Dark Ages", "bg": "background_doom_dark_ages.jpg", "icon": "icon_65_doom_of_the_dark_age.jpg", "cat": "Game Keys", "multi": true },
    { "id": 52, "name": "PSN 50$ Card", "bg": "background_52_psn_50$.jpg", "icon": "icon_31_playstation_plus.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 54, "name": "Mario Kart World", "bg": "background_mario_kart_world.jpg", "icon": "icon_68_mario_kart_world.jpg", "cat": "Game Keys", "multi": false },
    { "id": 55, "name": "Peak", "bg": "background_peak.jpg", "icon": "icon_69_peak.jpg", "cat": "Apps", "multi": false },
    { "id": 56, "name": "Death Stranding 2", "bg": "background_death_stranding_2.jpg", "icon": "icon_70_death_stranding_2.jpg", "cat": "Game Keys", "multi": true },
    { "id": 59, "name": "DoorDash Card", "bg": "background_doordash.jpg", "icon": "icon_74_doordash.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 61, "name": "MGS Delta", "bg": "background_mgs_delta.jpg", "icon": "icon_77_metal_gear_solid.jpg", "cat": "Game Keys", "multi": true },
    { "id": 62, "name": "Tinder Gold", "bg": "background_tinder_gold.webp", "icon": "icon_78_tinder.webp", "cat": "Subscriptions", "multi": false },
    { "id": 63, "name": "NBA 2K26", "bg": "background_nba_2k26.jpg", "icon": "icon_79_nba_2k26.jpg", "cat": "Game Keys", "multi": true },
    { "id": 64, "name": "Silksong", "bg": "background_hollow_knight_silksong.jpg", "icon": "icon_80_hollow_knight_silksong.jpg", "cat": "Game Keys", "multi": true },
    { "id": 65, "name": "Borderlands 4", "bg": "background_borderlands_4.jpg", "icon": "icon_81_borderlands_4.jpg", "cat": "Game Keys", "multi": true },
    { "id": 66, "name": "Helldivers II", "bg": "background_helldivers_ii.jpg", "icon": "icon_82_helldivers.webp", "cat": "Game Keys", "multi": true },
    { "id": 67, "name": "Roblox Robux", "bg": "background_roblox_robux.jpg", "icon": "icon_71_roblox.jpg", "cat": "Currency", "multi": false },
    { "id": 69, "name": "Dying Light Beast", "bg": "background_dying_light_beast.webp", "icon": "icon_82_helldivers.webp", "cat": "Game Keys", "multi": true },
    { "id": 70, "name": "Silent Hill f", "bg": "background_silent_hill_f.jpg", "icon": "icon_87_silent_hill.jpg", "cat": "Game Keys", "multi": true },
    { "id": 72, "name": "Ghost of Yotei", "bg": "background_ghost_of_yotei.jpg", "icon": "icon_90_ghost_of_yotei.jpg", "cat": "Game Keys", "multi": false },
    { "id": 73, "name": "Battlefield 6", "bg": "background_battlefield_6.jpg", "icon": "icon_91_battlefield_6.webp", "cat": "Game Keys", "multi": true },
    { "id": 74, "name": "Jurassic World 3", "bg": "background_jurassic_world_3.jpg", "icon": "icon_92_jurassic_evolution_3.jpg", "cat": "Game Keys", "multi": true },
    { "id": 75, "name": "Dispatch", "bg": "background_dispatch.jpg", "icon": "icon_93_dispacth.jpg", "cat": "Game Keys", "multi": false },
    { "id": 76, "name": "Arc Raiders", "bg": "background_arc_raiders.jpg", "icon": "icon_94_arc_raiders.webp", "cat": "Game Keys", "multi": true },
    { "id": 78, "name": "CoD: Black Ops 7", "bg": "background_black_ops_7.jpg", "icon": "icon_96_black_ops7.jpg", "cat": "Game Keys", "multi": true },
    { "id": 79, "name": "Ashes of Creation", "bg": "background_ashes_of_creation.jpg", "icon": "icon_97_ashesh_of_creation.jpg", "cat": "Game Keys", "multi": true },
    { "id": 80, "name": "ChatGPT Plus", "bg": "chatgpt_background.jpg", "icon": "icon_1_year_chatgpt_plus.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 81, "name": "Gemini Pro", "bg": "gemini_background.jpg", "icon": "icon_1_year_gemini_pro.png", "cat": "Subscriptions", "multi": false },
    { "id": 82, "name": "Binance Card", "bg": "binance_background.png", "icon": "icon_binance_gift_card.png", "cat": "Gift Cards", "multi": false },
    { "id": 83, "name": "KFC Gift Card", "bg": "kfc_background.jpg", "icon": "icon_kfc.png", "cat": "Gift Cards", "multi": false },
    { "id": 84, "name": "EA Sports FC 26", "bg": "background_68_fifa_26.webp", "icon": "icon_84_fc_26.webp", "cat": "Game Keys", "multi": true },
    { "id": 85, "name": "McDonalds Card", "bg": "macdonald_background.jpg", "icon": "icon_macdonalds.png", "cat": "Gift Cards", "multi": false },
    { "id": 86, "name": "Pizza Hut Card", "bg": "pizzahut_background.jpg", "icon": "icon_pizzahut.png", "cat": "Gift Cards", "multi": false },
    { "id": 87, "name": "Walmart Card", "bg": "walmart_background.webp", "icon": "icon_walmart.png", "cat": "Gift Cards", "multi": false },
    { "id": 88, "name": "Genshin Impact", "bg": "background_46_genshin_impact.jpg", "icon": "icon_61_genshin_impact.jpg", "cat": "Currency", "multi": true },
    { "id": 89, "name": "Canva Pro", "bg": "background_47_canva.jpg", "icon": "icon_62_canva_pro.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 90, "name": "CapCut Pro", "bg": "background_51_capcut.jpg", "icon": "icon_66_capcut.jpg", "cat": "Subscriptions", "multi": false },
    { "id": 91, "name": "Dune Awakening", "bg": "background_53_dune_awakening.jpg", "icon": "icon_67_duns_awakening.jpg", "cat": "Game Keys", "multi": true },
    { "id": 92, "name": "Microsoft Rewards", "bg": "background_77_Microsoft_Rewards.jpg", "icon": "icon_95_medal_gold_reward_microsoft.jpg", "cat": "Gift Cards", "multi": false },
    { "id": 93, "name": "Sonic Racing", "bg": "background_71_sonic_racing.jpg", "icon": "logo.png", "cat": "Game Keys", "multi": true },
    { "id": 94, "name": "Donkey Kong Bananza", "bg": "background_58_Donkey_Kong_Bananza.webp", "icon": "logo.png", "cat": "Game Keys", "multi": false }
  ]
};

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
  let platforms = c.multi ? ["PC", "PS5", "Xbox"] : ["PC"];
  if (c.name.includes("Nintendo")) platforms = ["Nintendo Switch"];
  if (c.name.includes("PlayStation") || c.name.includes("PSN")) platforms = ["PS4", "PS5"];
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
    background_file: "${c.bg}",
    description: "Verified digital coupon for ${c.name}.",
    external_url: "https://google.com",
    icon: "${c.icon}"
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
    discount: "FREE",
    cta: "CLAIM NOW"
  },
  {
    id: 2,
    image: "background_fortnite_vbucks.jpg",
    title: "Fortnite V-Bucks",
    subtitle: "2800 V-Bucks",
    description: "Get skins and battle pass for free.",
    discount: "FREE",
    cta: "CLAIM NOW"
  },
  {
    id: 3,
    image: "background_xbox_game_pass.jpg",
    title: "Xbox Game Pass",
    subtitle: "Ultimate Membership",
    description: "Play hundreds of high-quality games.",
    discount: "FREE",
    cta: "CLAIM NOW"
  }
];
`;

fs.writeFileSync('src/data/coupons.ts', tsContent);
console.log('Successfully updated coupons.ts and preserved all original data.');
