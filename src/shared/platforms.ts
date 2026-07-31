import type { PlatformDef } from './types'

/** Plataformas com ROMs/ISOs - Batocera es_systems + ScreenScraper IDs (fonte unica). */
export const PLATFORMS: PlatformDef[] = [
  {
    id: 'pc',
    name: "PC",
    family: "PC",
    extensions: [".exe",".lnk",".bat",".cmd",".url"],
    screenscraperId: 135,
    pathHints: ["pc games","windows","pc"]
  },
  {
    id: 'snes',
    name: "Super Nintendo Entertainment System",
    family: "Nintendo",
    extensions: [".smc",".fig",".sfc",".gd3",".gd7",".dx2",".bsx",".swc",".zip",".7z"],
    defaultCore: "cores\\snes9x_libretro.dll",
    screenscraperId: 4,
    pathHints: ["snes","super nintendo entertainment system"]
  },
  {
    id: 'snes-msu1',
    name: "Super Disc System (MSU1)",
    family: "Nintendo",
    extensions: [".smc",".sfc",".squashfs"],
    defaultCore: "cores\\snes9x_libretro.dll",
    screenscraperId: 210,
    pathHints: ["snes-msu1","super disc system (msu1)"]
  },
  {
    id: 'c64',
    name: "Commodore 64",
    family: "Commodore",
    extensions: [".d64",".d71",".d81",".crt",".prg",".tap",".t64",".m3u",".nib",".g64",".zip",".7z"],
    defaultCore: "cores\\vice_x64_libretro.dll",
    screenscraperId: 66,
    pathHints: ["c64","commodore 64"]
  },
  {
    id: 'cplus4',
    name: "Commodore Plus4",
    family: "Commodore",
    extensions: [".d64",".prg",".tap",".m3u",".zip",".7z"],
    defaultCore: "cores\\vice_xplus4_libretro.dll",
    screenscraperId: 99,
    pathHints: ["cplus4","commodore plus4"]
  },
  {
    id: 'c128',
    name: "Commodore 128",
    family: "Commodore",
    extensions: [".d64",".d81",".prg",".lnx",".m3u",".zip",".7z"],
    defaultCore: "cores\\vice_x128_libretro.dll",
    screenscraperId: 66,
    pathHints: ["c128","commodore 128"]
  },
  {
    id: 'c20',
    name: "Commodore VIC-20",
    family: "Commodore",
    extensions: [".20",".40",".60",".rom",".a0",".b0",".crt",".d64",".d81",".prg",".tap",".t64",".m3u",".zip",".7z"],
    screenscraperId: 73,
    pathHints: ["c20","commodore vic-20"]
  },
  {
    id: 'pet',
    name: "Commodore PET",
    family: "Commodore",
    extensions: [".a0",".b0",".crt",".d64",".d81",".prg",".tap",".t64",".m3u",".zip",".7z"],
    screenscraperId: 240,
    pathHints: ["pet","commodore pet"]
  },
  {
    id: 'amiga',
    name: "Amiga OCS/ECS",
    family: "Commodore",
    extensions: [".adf",".uae",".ipf",".dms",".dmz",".adz",".lha",".hdf",".exe",".m3u",".raw",".scp",".zip"],
    defaultCore: "cores\\puae_libretro.dll",
    screenscraperId: 64,
    pathHints: ["amiga500","amiga ocs/ecs","amiga"]
  },
  {
    id: 'amiga1200',
    name: "Amiga AGA",
    family: "Commodore",
    extensions: [".adf",".uae",".ipf",".dms",".dmz",".adz",".lha",".hdf",".exe",".m3u",".raw",".scp",".zip"],
    screenscraperId: 64,
    pathHints: ["amiga1200","amiga aga"]
  },
  {
    id: 'amigacd32',
    name: "Amiga CD32",
    family: "Commodore",
    extensions: [".bin",".cue",".iso",".chd"],
    screenscraperId: 130,
    pathHints: ["amigacd32","amiga cd32"]
  },
  {
    id: 'amigacdtv',
    name: "Amiga CDTV",
    family: "Commodore",
    extensions: [".bin",".cue",".iso",".chd",".m3u"],
    screenscraperId: 129,
    pathHints: ["amigacdtv","amiga cdtv"]
  },
  {
    id: 'nes',
    name: "Nintendo Entertainment System",
    family: "Nintendo",
    extensions: [".nes",".unif",".unf",".zip",".7z"],
    defaultCore: "cores\\fceumm_libretro.dll",
    screenscraperId: 3,
    pathHints: ["nes","nintendo entertainment system"]
  },
  {
    id: 'n64',
    name: "Nintendo 64",
    family: "Nintendo",
    extensions: [".z64",".n64",".v64",".zip",".7z"],
    defaultCore: "cores\\mupen64plus_next_libretro.dll",
    screenscraperId: 14,
    pathHints: ["n64","nintendo 64"]
  },
  {
    id: 'gba',
    name: "Game Boy Advance",
    family: "Nintendo",
    extensions: [".gba",".tar",".zip",".7z"],
    defaultCore: "cores\\mgba_libretro.dll",
    screenscraperId: 12,
    pathHints: ["gba","game boy advance"]
  },
  {
    id: 'gbc',
    name: "Game Boy Color",
    family: "Nintendo",
    extensions: [".gbc",".zip",".7z"],
    defaultCore: "cores\\gambatte_libretro.dll",
    screenscraperId: 10,
    pathHints: ["gbc","game boy color"]
  },
  {
    id: 'gb',
    name: "Game Boy",
    family: "Nintendo",
    extensions: [".gb",".zip",".7z"],
    defaultCore: "cores\\gambatte_libretro.dll",
    screenscraperId: 9,
    pathHints: ["gb","game boy"]
  },
  {
    id: 'sgb',
    name: "Super Game Boy",
    family: "Nintendo",
    extensions: [".gb",".gbc",".zip",".7z"],
    defaultCore: "cores\\mgba_libretro.dll",
    screenscraperId: 127,
    pathHints: ["sgb","super game boy"]
  },
  {
    id: 'sgb-msu1',
    name: "Super Game Boy MSU1",
    family: "Nintendo",
    extensions: [".gb",".gbc",".zip",".7z"],
    pathHints: ["sgb-msu1","super game boy msu1"]
  },
  {
    id: 'gbc2players',
    name: "Game Boy Color (2 players)",
    family: "Nintendo",
    extensions: [".gbc",".gb2",".gbc2",".zip",".7z"],
    pathHints: ["gbc2players","game boy color (2 players)"]
  },
  {
    id: 'gb2players',
    name: "Game Boy (2 players)",
    family: "Nintendo",
    extensions: [".gb",".gb2",".gbc2",".zip",".7z"],
    pathHints: ["gb2players","game boy (2 players)"]
  },
  {
    id: 'nds',
    name: "Nintendo DS",
    family: "Nintendo",
    extensions: [".nds",".bin",".zip",".7z"],
    defaultCore: "cores\\melonds_libretro.dll",
    screenscraperId: 15,
    pathHints: ["nds","nintendo ds"]
  },
  {
    id: 'fds',
    name: "Family Computer Disk System",
    family: "Nintendo",
    extensions: [".fds",".zip",".7z"],
    defaultCore: "cores\\fceumm_libretro.dll",
    screenscraperId: 106,
    pathHints: ["fds","family computer disk system"]
  },
  {
    id: 'virtualboy',
    name: "Virtual Boy",
    family: "Nintendo",
    extensions: [".vb",".zip",".7z"],
    defaultCore: "cores\\beetle_vb_libretro.dll",
    screenscraperId: 11,
    pathHints: ["virtualboy","virtual boy"]
  },
  {
    id: 'lcdgames',
    name: "LCD Games",
    family: "Various",
    extensions: [".mgw",".zip",".7z"],
    pathHints: ["lcdgames","lcd games"]
  },
  {
    id: 'gameandwatch',
    name: "Game and Watch",
    family: "Nintendo",
    extensions: [".mgw",".zip",".7z"],
    screenscraperId: 52,
    pathHints: ["gameandwatch","game and watch"]
  },
  {
    id: 'dreamcast',
    name: "Dreamcast",
    family: "Sega",
    extensions: [".cdi",".cue",".gdi",".chd",".m3u"],
    defaultCore: "cores\\flycast_libretro.dll",
    screenscraperId: 23,
    pathHints: ["dreamcast"]
  },
  {
    id: 'naomi',
    name: "Naomi",
    family: "Sega",
    extensions: [".lst",".bin",".dat",".zip",".7z"],
    defaultCore: "cores\\flycast_libretro.dll",
    screenscraperId: 56,
    pathHints: ["naomi"]
  },
  {
    id: 'atomiswave',
    name: "Atomiswave",
    family: "Sammy",
    extensions: [".lst",".bin",".dat",".zip",".7z"],
    defaultCore: "cores\\flycast_libretro.dll",
    screenscraperId: 53,
    pathHints: ["atomiswave"]
  },
  {
    id: 'systemsp',
    name: "Sega System SP",
    family: "Sega",
    extensions: [".lst",".bin",".dat",".zip",".7z"],
    pathHints: ["systemsp","sega system sp"]
  },
  {
    id: 'genesis',
    name: "Mega Drive",
    family: "Sega",
    extensions: [".bin",".gen",".md",".sg",".smd",".zip",".7z"],
    defaultCore: "cores\\genesis_plus_gx_libretro.dll",
    screenscraperId: 1,
    pathHints: ["megadrive","mega drive","genesis"]
  },
  {
    id: 'segacd',
    name: "Mega CD",
    family: "Sega",
    extensions: [".cue",".iso",".chd",".m3u"],
    defaultCore: "cores\\genesis_plus_gx_libretro.dll",
    screenscraperId: 20,
    pathHints: ["megacd","mega cd","segacd"]
  },
  {
    id: 'sega32x',
    name: "32x",
    family: "Sega",
    extensions: [".32x",".chd",".smd",".bin",".md",".zip",".7z"],
    defaultCore: "cores\\picodrive_libretro.dll",
    screenscraperId: 19,
    pathHints: ["sega32x","32x"]
  },
  {
    id: 'megadrive-msu',
    name: "MSU-MD",
    family: "Sega",
    extensions: [".md",".zip",".7z"],
    pathHints: ["megadrive-msu","msu-md"]
  },
  {
    id: 'mastersystem',
    name: "Master System",
    family: "Sega",
    extensions: [".bin",".sms",".zip",".7z"],
    defaultCore: "cores\\genesis_plus_gx_libretro.dll",
    screenscraperId: 2,
    pathHints: ["mastersystem","master system"]
  },
  {
    id: 'pico',
    name: "Sega Pico",
    family: "Sega",
    extensions: [".bin",".md",".zip",".7z"],
    screenscraperId: 250,
    pathHints: ["pico","sega pico"]
  },
  {
    id: 'gamegear',
    name: "Game Gear",
    family: "Sega",
    extensions: [".bin",".gg",".zip",".7z"],
    defaultCore: "cores\\genesis_plus_gx_libretro.dll",
    screenscraperId: 21,
    pathHints: ["gamegear","game gear"]
  },
  {
    id: 'sg1000',
    name: "SG-1000",
    family: "Sega",
    extensions: [".bin",".sg",".zip",".7z"],
    defaultCore: "cores\\genesis_plus_gx_libretro.dll",
    screenscraperId: 109,
    pathHints: ["sg1000","sg-1000"]
  },
  {
    id: 'multivision',
    name: "Othello Multivision",
    family: "Tsukuda Original",
    extensions: [".bin",".sg",".zip",".7z"],
    pathHints: ["multivision","othello multivision"]
  },
  {
    id: 'sc3000',
    name: "SC-3000",
    family: "Sega",
    extensions: [".bin",".sg",".wav",".cas",".bit",".zip",".7z"],
    pathHints: ["sc3000","sc-3000"]
  },
  {
    id: 'segaai',
    name: "Sega AI Computer",
    family: "Sega",
    extensions: [".bin",".wav",".flac",".cas",".zip",".7z"],
    pathHints: ["segaai","sega ai computer"]
  },
  {
    id: 'beena',
    name: "Advanced Pico Beena",
    family: "Sega",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["beena","advanced pico beena"]
  },
  {
    id: 'psp',
    name: "PlayStation Portable",
    family: "Sony",
    extensions: [".iso",".cso",".pbp",".chd",".zip"],
    defaultCore: "cores\\ppsspp_libretro.dll",
    screenscraperId: 61,
    pathHints: ["psp","playstation portable"]
  },
  {
    id: 'ps1',
    name: "PlayStation",
    family: "Sony",
    extensions: [".cue",".img",".mdf",".pbp",".toc",".cbn",".m3u",".ccd",".chd",".iso"],
    defaultCore: "cores\\pcsx_rearmed_libretro.dll",
    screenscraperId: 57,
    pathHints: ["psx","playstation","ps1"]
  },
  {
    id: 'pcengine',
    name: "PC Engine",
    family: "NEC",
    extensions: [".pce",".bin",".zip",".7z"],
    defaultCore: "cores\\mednafen_pce_fast_libretro.dll",
    screenscraperId: 31,
    pathHints: ["pcengine","pc engine"]
  },
  {
    id: 'pcenginecd',
    name: "PC Engine CD",
    family: "NEC",
    extensions: [".pce",".cue",".ccd",".iso",".img",".chd"],
    defaultCore: "cores\\mednafen_pce_libretro.dll",
    screenscraperId: 114,
    pathHints: ["pcenginecd","pc engine cd"]
  },
  {
    id: 'supergrafx',
    name: "Supergrafx",
    family: "NEC",
    extensions: [".pce",".sgx",".cue",".ccd",".chd",".zip",".7z"],
    defaultCore: "cores\\mednafen_supergrafx_libretro.dll",
    screenscraperId: 105,
    pathHints: ["supergrafx"]
  },
  {
    id: 'pcfx',
    name: "PC-FX",
    family: "NEC",
    extensions: [".cue",".ccd",".toc",".chd",".m3u",".zip",".7z"],
    defaultCore: "cores\\mednafen_pcfx_libretro.dll",
    screenscraperId: 72,
    pathHints: ["pcfx","pc-fx"]
  },
  {
    id: 'scummvm',
    name: "ScummVM",
    family: "LucasArts",
    extensions: [".scummvm",".squashfs"],
    defaultCore: "cores\\scummvm_libretro.dll",
    screenscraperId: 123,
    pathHints: ["scummvm"]
  },
  {
    id: 'dos',
    name: "Dos (x86)",
    family: "Microsoft",
    extensions: [".pc",".dos",".dosz",".m3u",".iso",".cue",".zip",".squashfs"],
    defaultCore: "cores\\dosbox_pure_libretro.dll",
    screenscraperId: 135,
    pathHints: ["dos","dos (x86)"]
  },
  {
    id: 'devilutionx',
    name: "Diablo",
    family: "Ports",
    extensions: [".mpq"],
    pathHints: ["devilutionx","diablo"]
  },
  {
    id: 'arcade',
    name: "Final Burn Neo",
    family: "Arcade",
    extensions: [".zip",".7z"],
    defaultCore: "cores\\fbneo_libretro.dll",
    screenscraperId: 75,
    pathHints: ["fbneo","final burn neo","arcade","mame"]
  },
  {
    id: 'neogeo',
    name: "Neo-Geo",
    family: "SNK",
    extensions: [".7z",".zip"],
    defaultCore: "cores\\fbneo_libretro.dll",
    screenscraperId: 142,
    pathHints: ["neogeo","neo-geo"]
  },
  {
    id: 'neogeocd',
    name: "Neo-Geo CD",
    family: "SNK",
    extensions: [".cue",".iso",".chd"],
    defaultCore: "cores\\neocd_libretro.dll",
    screenscraperId: 70,
    pathHints: ["neogeocd","neo-geo cd"]
  },
  {
    id: 'colecovision',
    name: "ColecoVision",
    family: "Coleco",
    extensions: [".bin",".col",".rom",".zip",".7z"],
    defaultCore: "cores\\bluemsx_libretro.dll",
    screenscraperId: 48,
    pathHints: ["colecovision"]
  },
  {
    id: 'atari800',
    name: "Atari 800",
    family: "Atari",
    extensions: [".rom",".xfd",".atr",".atx",".cdm",".cas",".car",".bin",".a52",".xex",".m3u",".zip",".7z"],
    defaultCore: "cores\\atari800_libretro.dll",
    screenscraperId: 43,
    pathHints: ["atari800","atari 800"]
  },
  {
    id: 'xegs',
    name: "Atari XE Game System",
    family: "Atari",
    extensions: [".atr",".dsk",".xfd",".bin",".rom",".car",".zip",".7z"],
    pathHints: ["xegs","atari xe game system"]
  },
  {
    id: 'atari2600',
    name: "Atari 2600",
    family: "Atari",
    extensions: [".a26",".bin",".zip",".7z"],
    defaultCore: "cores\\stella_libretro.dll",
    screenscraperId: 26,
    pathHints: ["atari2600","atari 2600"]
  },
  {
    id: 'atari5200',
    name: "Atari 5200",
    family: "Atari",
    extensions: [".rom",".xfd",".atr",".atx",".cdm",".cas",".car",".bin",".a52",".xex",".zip",".7z"],
    defaultCore: "cores\\atari800_libretro.dll",
    screenscraperId: 40,
    pathHints: ["atari5200","atari 5200"]
  },
  {
    id: 'atari7800',
    name: "Atari 7800",
    family: "Atari",
    extensions: [".a78",".bin",".zip",".7z"],
    defaultCore: "cores\\prosystem_libretro.dll",
    screenscraperId: 41,
    pathHints: ["atari7800","atari 7800"]
  },
  {
    id: 'lynx',
    name: "Atari Lynx",
    family: "Atari",
    extensions: [".bll",".lnx",".lyx",".o",".zip",".7z"],
    defaultCore: "cores\\handy_libretro.dll",
    screenscraperId: 28,
    pathHints: ["lynx","atari lynx"]
  },
  {
    id: 'neogeopocket',
    name: "Neo-Geo Pocket",
    family: "SNK",
    extensions: [".ngp",".zip",".7z"],
    defaultCore: "cores\\mednafen_ngp_libretro.dll",
    screenscraperId: 25,
    pathHints: ["ngp","neo-geo pocket","neogeopocket"]
  },
  {
    id: 'ngpc',
    name: "Neo-Geo Pocket Color",
    family: "SNK",
    extensions: [".ngc",".zip",".7z"],
    defaultCore: "cores\\mednafen_ngp_libretro.dll",
    screenscraperId: 82,
    pathHints: ["ngpc","neo-geo pocket color"]
  },
  {
    id: 'wonderswan',
    name: "WonderSwan",
    family: "Bandai",
    extensions: [".ws",".zip",".7z"],
    defaultCore: "cores\\mednafen_wswan_libretro.dll",
    screenscraperId: 45,
    pathHints: ["wswan","wonderswan"]
  },
  {
    id: 'wonderswancolor',
    name: "WonderSwan Color",
    family: "Bandai",
    extensions: [".wsc",".zip",".7z"],
    defaultCore: "cores\\mednafen_wswan_libretro.dll",
    screenscraperId: 46,
    pathHints: ["wswanc","wonderswan color","wonderswancolor"]
  },
  {
    id: 'prboom',
    name: "PrBoom",
    family: "Ports",
    extensions: [".wad",".iwad",".pwad"],
    screenscraperId: 135,
    pathHints: ["prboom"]
  },
  {
    id: 'quake',
    name: "Quake",
    family: "Ports",
    extensions: [".quake"],
    pathHints: ["quake"]
  },
  {
    id: 'mrboom',
    name: "MrBoom",
    family: "Ports",
    extensions: [".libretro"],
    pathHints: ["mrboom"]
  },
  {
    id: 'tic80',
    name: "TIC-80",
    family: "Fantasy",
    extensions: [".tic"],
    defaultCore: "cores\\tic80_libretro.dll",
    screenscraperId: 222,
    pathHints: ["tic80","tic-80"]
  },
  {
    id: 'pico8',
    name: "Pico-8",
    family: "Fantasy",
    extensions: [".p8",".png",".m3u"],
    defaultCore: "cores\\pico8_libretro.dll",
    screenscraperId: 234,
    pathHints: ["pico8","pico-8"]
  },
  {
    id: 'lowresnx',
    name: "Lowres NX",
    family: "Fantasy",
    extensions: [".nx",".zip",".7z"],
    screenscraperId: 244,
    pathHints: ["lowresnx","lowres nx"]
  },
  {
    id: 'wasm4',
    name: "wasm4",
    family: "Fantasy",
    extensions: [".wasm"],
    defaultCore: "cores\\wasm4_libretro.dll",
    screenscraperId: 262,
    pathHints: ["wasm4"]
  },
  {
    id: 'pyxel',
    name: "pyxel",
    family: "Fantasy",
    extensions: [".py",".pyxapp"],
    pathHints: ["pyxel"]
  },
  {
    id: 'vircon32',
    name: "vircon32",
    family: "Fantasy",
    extensions: [".v32",".zip"],
    screenscraperId: 272,
    pathHints: ["vircon32"]
  },
  {
    id: 'channelf',
    name: "Channel-F",
    family: "Fairchild",
    extensions: [".rom",".bin",".chf",".zip"],
    screenscraperId: 80,
    pathHints: ["channelf","channel-f"]
  },
  {
    id: 'cannonball',
    name: "Cannonball",
    family: "Ports",
    extensions: [".cannonball"],
    pathHints: ["cannonball"]
  },
  {
    id: 'sdlpop',
    name: "SdlPop",
    family: "Ports",
    extensions: [".sdlpop"],
    pathHints: ["sdlpop"]
  },
  {
    id: 'vectrex',
    name: "Vectrex",
    family: "MB",
    extensions: [".bin",".gam",".vec",".zip",".7z"],
    defaultCore: "cores\\vecx_libretro.dll",
    screenscraperId: 102,
    pathHints: ["vectrex"]
  },
  {
    id: 'lutro',
    name: "Lutro",
    family: "Ports",
    extensions: [".lutro",".zip",".7z"],
    screenscraperId: 206,
    pathHints: ["lutro"]
  },
  {
    id: 'cavestory',
    name: "Cave Story",
    family: "Daisuke \"Pixel\" Amaya",
    extensions: [".exe"],
    screenscraperId: 135,
    pathHints: ["cavestory","cave story"]
  },
  {
    id: 'atarist',
    name: "Atari ST",
    family: "Atari",
    extensions: [".st",".msa",".stx",".dim",".ipf",".m3u",".hd",".gemdos",".zip",".7z"],
    defaultCore: "cores\\hatari_libretro.dll",
    screenscraperId: 42,
    pathHints: ["atarist","atari st"]
  },
  {
    id: 'amstradcpc',
    name: "Amstrad CPC",
    family: "Amstrad",
    extensions: [".dsk",".sna",".tap",".cdt",".voc",".m3u",".zip",".7z"],
    defaultCore: "cores\\cap32_libretro.dll",
    screenscraperId: 65,
    pathHints: ["amstradcpc","amstrad cpc"]
  },
  {
    id: 'pcw',
    name: "Amstrad PCW",
    family: "Amstrad",
    extensions: [".mfi",".dfi",".mfm",".td0",".imd",".86f",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".zip",".7z"],
    pathHints: ["pcw","amstrad pcw"]
  },
  {
    id: 'msx',
    name: "MSX1",
    family: "Microsoft",
    extensions: [".dsk",".mx1",".rom",".cas",".m3u",".ogv",".openmsx",".zip",".7z",".mx2"],
    defaultCore: "cores\\bluemsx_libretro.dll",
    screenscraperId: 113,
    pathHints: ["msx1","msx"]
  },
  {
    id: 'msx2',
    name: "MSX2",
    family: "Microsoft",
    extensions: [".dsk",".mx2",".rom",".cas",".m3u",".ogv",".openmsx",".zip",".7z"],
    defaultCore: "cores\\bluemsx_libretro.dll",
    screenscraperId: 116,
    pathHints: ["msx2"]
  },
  {
    id: 'msx2plus',
    name: "MSX2+",
    family: "Microsoft",
    extensions: [".dsk",".mx2",".rom",".cas",".m3u",".openmsx",".zip",".7z"],
    screenscraperId: 117,
    pathHints: ["msx2+","msx2plus"]
  },
  {
    id: 'msxturbor',
    name: "MSX Turbo-R",
    family: "Microsoft",
    extensions: [".dsk",".mx2",".rom",".openmsx",".m3u",".zip",".7z"],
    screenscraperId: 118,
    pathHints: ["msxturbor","msx turbo-r"]
  },
  {
    id: 'mz2000',
    name: "Sharp MZ-2000",
    family: "Sharp",
    extensions: [".mzf",".mzt",".m12",".wav",".d88",".dsk",".zip",".7z"],
    pathHints: ["mz2000","sharp mz-2000"]
  },
  {
    id: 'mz2500',
    name: "Sharp MZ-2500",
    family: "Sharp",
    extensions: [".d88",".dsk",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".1dd",".cqm",".cqi",".zip",".7z"],
    pathHints: ["mz2500","sharp mz-2500"]
  },
  {
    id: 'mz700',
    name: "Sharp MZ-700",
    family: "Sharp",
    extensions: [".mzf",".mzt",".m12",".wav",".zip",".7z"],
    pathHints: ["mz700","sharp mz-700"]
  },
  {
    id: 'mz800',
    name: "Sharp MZ-800",
    family: "Sharp",
    extensions: [".mzf",".mzt",".m12",".wav",".zip",".7z"],
    pathHints: ["mz800","sharp mz-800"]
  },
  {
    id: 'mz80k',
    name: "Sharp MZ-80K",
    family: "Sharp",
    extensions: [".mzf",".mzt",".m12",".wav",".zip",".7z"],
    pathHints: ["mz80k","sharp mz-80k"]
  },
  {
    id: 'odyssey2',
    name: "Odyssey2",
    family: "Magnavox - Philips",
    extensions: [".bin",".zip",".7z"],
    screenscraperId: 104,
    pathHints: ["odyssey2"]
  },
  {
    id: 'videopacplus',
    name: "Videopac+ G7400",
    family: "Philips",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["videopacplus","videopac+ g7400"]
  },
  {
    id: 'zx81',
    name: "ZX81",
    family: "Sinclair",
    extensions: [".tzx",".p",".zip",".7z"],
    screenscraperId: 77,
    pathHints: ["zx81"]
  },
  {
    id: 'bk',
    name: "Elektronika BK",
    family: "Elektronika",
    extensions: [".bin",".img",".dsk",".bkd",".zip",".7z"],
    pathHints: ["bk","elektronika bk"]
  },
  {
    id: 'zxspectrum',
    name: "ZX Spectrum",
    family: "Sinclair",
    extensions: [".tzx",".tap",".z80",".rzx",".scl",".trd",".dsk",".zip",".7z"],
    defaultCore: "cores\\fuse_libretro.dll",
    screenscraperId: 76,
    pathHints: ["zxspectrum","zx spectrum"]
  },
  {
    id: 'moonlight',
    name: "Moonlight",
    family: "Misc. System",
    extensions: [".moonlight"],
    screenscraperId: 138,
    pathHints: ["moonlight"]
  },
  {
    id: 'apple2',
    name: "Apple II",
    family: "Apple",
    extensions: [".nib",".do",".po",".dsk",".mfi",".dfi",".rti",".edd",".woz",".wav",".chd",".hdv",".2mg",".zip",".7z"],
    screenscraperId: 86,
    pathHints: ["apple2","apple ii"]
  },
  {
    id: 'saturn',
    name: "Saturn",
    family: "Sega",
    extensions: [".cue",".ccd",".m3u",".chd",".iso",".mds",".zip"],
    defaultCore: "cores\\mednafen_saturn_libretro.dll",
    screenscraperId: 22,
    pathHints: ["saturn"]
  },
  {
    id: 'jaguar',
    name: "Jaguar",
    family: "Atari",
    extensions: [".j64",".jag",".cof",".abs",".rom",".zip",".7z"],
    defaultCore: "cores\\virtualjaguar_libretro.dll",
    screenscraperId: 27,
    pathHints: ["jaguar"]
  },
  {
    id: 'jaguarcd',
    name: "Jaguar CD",
    family: "Atari",
    extensions: [".cue",".cdi",".bigpimg"],
    screenscraperId: 171,
    pathHints: ["jaguarcd","jaguar cd"]
  },
  {
    id: 'gamecube',
    name: "GameCube",
    family: "Nintendo",
    extensions: [".gcm",".iso",".gcz",".ciso",".wbfs",".rvz",".elf",".dol",".m3u",".json"],
    defaultCore: "cores\\dolphin_libretro.dll",
    screenscraperId: 13,
    pathHints: ["gamecube"]
  },
  {
    id: 'triforce',
    name: "Triforce",
    family: "Namco, Sega, Nintendo",
    extensions: [".iso",".rvz"],
    pathHints: ["triforce"]
  },
  {
    id: 'wii',
    name: "Wii",
    family: "Nintendo",
    extensions: [".gcm",".iso",".gcz",".ciso",".wbfs",".wad",".rvz",".elf",".dol",".m3u",".json"],
    defaultCore: "cores\\dolphin_libretro.dll",
    screenscraperId: 16,
    pathHints: ["wii"]
  },
  {
    id: 'ps2',
    name: "PlayStation 2",
    family: "Sony",
    extensions: [".iso",".mdf",".nrg",".bin",".img",".dump",".gz",".cso",".chd",".m3u",".zso"],
    defaultCore: "cores\\pcsx2_libretro.dll",
    screenscraperId: 58,
    pathHints: ["ps2","playstation 2"]
  },
  {
    id: 'ps3',
    name: "PlayStation 3",
    family: "Sony",
    extensions: [".ps3",".psn",".iso",".squashfs"],
    screenscraperId: 59,
    pathHints: ["ps3","playstation 3"]
  },
  {
    id: '3do',
    name: "3DO Interactive Multiplayer",
    family: "Panasonic - Sanyo - Goldstar",
    extensions: [".iso",".chd",".cue"],
    defaultCore: "cores\\opera_libretro.dll",
    screenscraperId: 29,
    pathHints: ["3do","3do interactive multiplayer"]
  },
  {
    id: 'intellivision',
    name: "Mattel Intellivision",
    family: "Mattel",
    extensions: [".int",".bin",".rom",".zip",".7z"],
    defaultCore: "cores\\freeintv_libretro.dll",
    screenscraperId: 115,
    pathHints: ["intellivision","mattel intellivision"]
  },
  {
    id: 'x68000',
    name: "Sharp X68000",
    family: "Sharp",
    extensions: [".dim",".img",".d88",".88d",".hdm",".dup",".2hd",".xdf",".hdf",".cmd",".m3u",".zip",".7z"],
    defaultCore: "cores\\px68k_libretro.dll",
    screenscraperId: 79,
    pathHints: ["x68000","sharp x68000"]
  },
  {
    id: 'x1',
    name: "Sharp X1",
    family: "Sharp",
    extensions: [".dx1",".2d",".2hd",".tfd",".d88",".88d",".hdm",".xdf",".dup",".cmd",".zip",".7z"],
    screenscraperId: 220,
    pathHints: ["x1","sharp x1"]
  },
  {
    id: '3ds',
    name: "3DS",
    family: "Nintendo",
    extensions: [".3ds",".cci",".cxi",".cia",".axf",".elf",".app",".zcci",".zcia",".zcxi",".squashfs"],
    defaultCore: "cores\\citra_libretro.dll",
    screenscraperId: 17,
    pathHints: ["3ds"]
  },
  {
    id: 'openbor',
    name: "OpenBOR",
    family: "Ports",
    extensions: [".pak"],
    screenscraperId: 214,
    pathHints: ["openbor"]
  },
  {
    id: 'satellaview',
    name: "Satellaview",
    family: "Nintendo",
    extensions: [".bs",".smc",".sfc",".zip",".7z"],
    screenscraperId: 107,
    pathHints: ["satellaview"]
  },
  {
    id: 'sufami',
    name: "SuFami Turbo",
    family: "Bandai",
    extensions: [".st",".fig",".bs",".smc",".sfc",".zip",".7z"],
    screenscraperId: 108,
    pathHints: ["sufami","sufami turbo"]
  },
  {
    id: 'pokemini',
    name: "Pokemon Mini",
    family: "Nintendo",
    extensions: [".min",".zip",".7z"],
    defaultCore: "cores\\pokemini_libretro.dll",
    screenscraperId: 211,
    pathHints: ["pokemini","pokemon mini"]
  },
  {
    id: 'gx4000',
    name: "GX4000",
    family: "Amstrad",
    extensions: [".dsk",".m3u",".cpr",".zip",".7z"],
    screenscraperId: 87,
    pathHints: ["gx4000"]
  },
  {
    id: 'daphne',
    name: "Daphne",
    family: "Arcade",
    extensions: [".daphne",".squashfs"],
    screenscraperId: 49,
    pathHints: ["daphne"]
  },
  {
    id: 'singe',
    name: "Singe",
    family: "Arcade",
    extensions: [".daphne",".squashfs"],
    pathHints: ["singe"]
  },
  {
    id: 'dice',
    name: "DICE",
    family: "Arcade",
    extensions: [".dmy",".zip"],
    pathHints: ["dice"]
  },
  {
    id: 'thextech',
    name: "TheXTech",
    family: "Wohlstand",
    extensions: [".smbx",".squashfs"],
    pathHints: ["thextech"]
  },
  {
    id: 'thomson',
    name: "Thomson - MO/TO (Theodore)",
    family: "Thomson",
    extensions: [".fd",".sap",".k7",".m7",".m5",".rom",".zip"],
    screenscraperId: 141,
    pathHints: ["thomson","thomson - mo/to (theodore)"]
  },
  {
    id: 'pc88',
    name: "PC-8800",
    family: "NEC",
    extensions: [".cmt",".d88",".u88",".m3u"],
    screenscraperId: 221,
    pathHints: ["pc88","pc-8800"]
  },
  {
    id: 'pc98',
    name: "PC-9800",
    family: "NEC",
    extensions: [".d98",".98d",".fdi",".fdd",".2hd",".tfd",".d88",".88d",".hdm",".xdf",".dup",".cmd",".hdi",".thd",".nhd",".hdd",".hdn",".m3u",".zip"],
    defaultCore: "cores\\np2kai_libretro.dll",
    screenscraperId: 208,
    pathHints: ["pc98","pc-9800"]
  },
  {
    id: 'fmtowns',
    name: "FM-TOWNS",
    family: "Fujitsu",
    extensions: [".bin",".m3u",".cue",".d88",".d77",".xdf",".iso",".chd",".toc",".nrg",".gdi",".cdr",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".1dd",".cqm",".cqi",".dsk",".zip",".7z"],
    screenscraperId: 253,
    pathHints: ["fmtowns","fm-towns"]
  },
  {
    id: 'ports',
    name: "Ports",
    family: "Ports",
    extensions: [".sh",".squashfs"],
    pathHints: ["ports"]
  },
  {
    id: 'windows_installers',
    name: "Install a new Windows game",
    family: "Microsoft",
    extensions: [".exe",".iso",".msi"],
    pathHints: ["windows_installers","install a new windows game"]
  },
  {
    id: 'halflife',
    name: "Half-Life 1",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["halflife","half-life 1"]
  },
  {
    id: 'wiiu',
    name: "Wii U",
    family: "Nintendo",
    extensions: [".wua",".wup",".wud",".wux",".rpx",".wuhb",".squashfs"],
    screenscraperId: 18,
    pathHints: ["wiiu","wii u"]
  },
  {
    id: 'solarus',
    name: "Solarus",
    family: "Solarus Team",
    extensions: [".solarus",".zip"],
    screenscraperId: 223,
    pathHints: ["solarus"]
  },
  {
    id: 'easyrpg',
    name: "EasyRPG",
    family: "EasyRPG Team",
    extensions: [".easyrpg",".squashfs",".zip"],
    screenscraperId: 231,
    pathHints: ["easyrpg"]
  },
  {
    id: 'cgenius',
    name: "Commander Genius",
    family: "The Commander Genius Team",
    extensions: [".cgenius"],
    pathHints: ["cgenius","commander genius"]
  },
  {
    id: 'pygame',
    name: "Pygame",
    family: "Pygame Team",
    extensions: [".pygame"],
    pathHints: ["pygame"]
  },
  {
    id: 'imageviewer',
    name: "Screenshots",
    family: "Misc. System",
    extensions: [".jpg",".jpeg",".png",".bmp",".psd",".tga",".gif",".hdr",".pic",".ppm",".pgm",".mkv",".pdf",".mp4",".avi",".webm"],
    pathHints: ["imageviewer","screenshots"]
  },
  {
    id: 'recordings',
    name: "Recordings",
    family: "Misc. System",
    extensions: [".mkv",".mp4",".avi",".webm",".mp3",".wav",".ogg",".flac"],
    pathHints: ["recordings"]
  },
  {
    id: 'library',
    name: "Library",
    family: "Misc. System",
    extensions: [".jpg",".jpeg",".png",".bmp",".psd",".tga",".gif",".hdr",".pic",".ppm",".pgm",".mkv",".pdf",".mp4",".avi",".webm",".cbz",".mp3",".wav",".ogg",".flac",".mod",".xm",".stm"],
    pathHints: ["library"]
  },
  {
    id: 'model3',
    name: "Model 3",
    family: "Sega",
    extensions: [".zip"],
    screenscraperId: 55,
    pathHints: ["model3","model 3"]
  },
  {
    id: 'mugen',
    name: "MUGEN",
    family: "Elecbyte",
    extensions: [".pc"],
    pathHints: ["mugen"]
  },
  {
    id: 'ikemen',
    name: "IKEMEN",
    family: "Elecbyte",
    extensions: [".ikemen",".pc"],
    pathHints: ["ikemen"]
  },
  {
    id: 'flash',
    name: "Flash Player",
    family: "Adobe",
    extensions: [".swf"],
    pathHints: ["flash","flash player"]
  },
  {
    id: 'xbox',
    name: "Xbox",
    family: "Microsoft",
    extensions: [".iso",".squashfs"],
    screenscraperId: 32,
    pathHints: ["xbox"]
  },
  {
    id: 'flatpak',
    name: "Applications",
    family: "Other",
    extensions: [".flatpak"],
    pathHints: ["flatpak","applications"]
  },
  {
    id: 'steam',
    name: "Steam",
    family: "Valve",
    extensions: [".steam"],
    pathHints: ["steam"]
  },
  {
    id: 'supervision',
    name: "Supervision",
    family: "Watara",
    extensions: [".sv",".zip",".7z"],
    defaultCore: "cores\\potator_libretro.dll",
    screenscraperId: 207,
    pathHints: ["supervision"]
  },
  {
    id: 'gong',
    name: "Pong",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["gong","pong"]
  },
  {
    id: 'ecwolf',
    name: "ECWolf",
    family: "Ports",
    extensions: [".ecwolf",".pk3",".squashfs"],
    pathHints: ["ecwolf"]
  },
  {
    id: 'cassettevision',
    name: "Cassette Vision",
    family: "Epoch",
    extensions: [".bin777",".zip"],
    screenscraperId: 300,
    pathHints: ["cassettevision","cassette vision"]
  },
  {
    id: 'sonicretro',
    name: "Sonic Retro Engine",
    family: "Sega",
    extensions: [".son",".scd"],
    pathHints: ["sonicretro","sonic retro engine"]
  },
  {
    id: 'model2',
    name: "Model 2",
    family: "Sega",
    extensions: [".zip"],
    screenscraperId: 54,
    pathHints: ["model2","model 2"]
  },
  {
    id: 'scv',
    name: "Super Cassette Vision",
    family: "Epoch",
    extensions: [".bin",".\"0\"",".zip"],
    screenscraperId: 67,
    pathHints: ["scv","super cassette vision"]
  },
  {
    id: 'apple2gs',
    name: "Apple IIGS",
    family: "Apple",
    extensions: [".2mg",".do",".nib",".po",".dsk"],
    screenscraperId: 217,
    pathHints: ["apple2gs","apple iigs"]
  },
  {
    id: 'uzebox',
    name: "Uzebox",
    family: "Atmel",
    extensions: [".uze",".bin",".zip"],
    screenscraperId: 216,
    pathHints: ["uzebox"]
  },
  {
    id: 'cdi',
    name: "CD-i",
    family: "Philips",
    extensions: [".chd",".cue",".toc",".nrg",".gdi",".iso",".cdr"],
    screenscraperId: 133,
    pathHints: ["cdi","cd-i"]
  },
  {
    id: 'advision',
    name: "Adventure Vision",
    family: "Entex",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["advision","adventure vision"]
  },
  {
    id: 'tvgames',
    name: "Plug and Play TV Games",
    family: "Various",
    extensions: [".zip",".7z"],
    pathHints: ["tvgames","plug and play tv games"]
  },
  {
    id: 'megaduck',
    name: "Mega Duck / Cougar Boy",
    family: "Welback Holdings",
    extensions: [".bin",".zip",".7z"],
    screenscraperId: 90,
    pathHints: ["megaduck","mega duck / cougar boy"]
  },
  {
    id: 'pv1000',
    name: "PV-1000",
    family: "Casio",
    extensions: [".bin",".zip",".7z"],
    screenscraperId: 74,
    pathHints: ["pv1000","pv-1000"]
  },
  {
    id: 'pv2000',
    name: "PV-2000",
    family: "Casio",
    extensions: [".bin",".cas",".zip",".7z"],
    pathHints: ["pv2000","pv-2000"]
  },
  {
    id: 'pc80',
    name: "PC-8001",
    family: "NEC",
    extensions: [".d77",".d88",".1dd",".dsk",".n80",".bin",".zip",".7z"],
    pathHints: ["pc80","pc-8001"]
  },
  {
    id: 'gamate',
    name: "Gamate",
    family: "Bitcorp",
    extensions: [".bin",".zip",".7z"],
    screenscraperId: 266,
    pathHints: ["gamate"]
  },
  {
    id: 'crvision',
    name: "CreatiVision",
    family: "VTech",
    extensions: [".bin",".rom",".zip",".7z"],
    pathHints: ["crvision","creativision"]
  },
  {
    id: 'ctvboy',
    name: "Compact Vision TV Boy",
    family: "Gakken",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["ctvboy","compact vision tv boy"]
  },
  {
    id: 'laser310',
    name: "Laser 310",
    family: "VTech",
    extensions: [".vz",".wav",".cas",".zip",".7z"],
    pathHints: ["laser310","laser 310"]
  },
  {
    id: 'socrates',
    name: "Socrates",
    family: "VTech",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["socrates"]
  },
  {
    id: 'vsmile',
    name: "V.Smile",
    family: "VTech",
    extensions: [".u1",".u3",".bin",".zip",".7z"],
    screenscraperId: 120,
    pathHints: ["vsmile","v.smile"]
  },
  {
    id: 'supracan',
    name: "Super A'Can",
    family: "Funtech Entertainment",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["supracan","super a'can"]
  },
  {
    id: 'gamecom',
    name: "Game.com",
    family: "Tiger Electronics",
    extensions: [".bin",".tgc",".zip",".7z"],
    screenscraperId: 121,
    pathHints: ["gamecom","game.com"]
  },
  {
    id: 'gamepock',
    name: "Game Pocket Computer",
    family: "Epoch",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["gamepock","game pocket computer"]
  },
  {
    id: 'fm7',
    name: "FM-7",
    family: "Fujitsu",
    extensions: [".wav",".t77",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".zip",".7z"],
    screenscraperId: 97,
    pathHints: ["fm7","fm-7"]
  },
  {
    id: 'archimedes',
    name: "Archimedes",
    family: "Acorn Computers",
    extensions: [".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".ima",".img",".ufi",".360",".ipf",".adf",".apd",".jfd",".ads",".adm",".adl",".ssd"],
    screenscraperId: 84,
    pathHints: ["archimedes"]
  },
  {
    id: 'atom',
    name: "Atom",
    family: "Acorn Computers",
    extensions: [".wav",".tap",".csw",".uef",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".40t",".atm",".bin",".rom",".zip",".7z"],
    screenscraperId: 36,
    pathHints: ["atom"]
  },
  {
    id: 'electron',
    name: "Electron",
    family: "Acorn Computers",
    extensions: [".wav",".csw",".uef",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".ssd",".bbc",".img",".dsd",".adf",".ads",".adm",".adl",".rom"],
    screenscraperId: 85,
    pathHints: ["electron"]
  },
  {
    id: 'apfm1000',
    name: "M-1000",
    family: "APF Electronics",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["apfm1000","m-1000"]
  },
  {
    id: 'bbcmicro',
    name: "BBC Micro",
    family: "Acorn Computers",
    extensions: [".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".ima",".img",".ufi",".360",".ipf",".ssd",".bbc",".dsd",".adf",".ads",".adm",".adl"],
    screenscraperId: 37,
    pathHints: ["bbcmicro","bbc micro"]
  },
  {
    id: 'camplynx',
    name: "Camputers Lynx",
    family: "Camputers",
    extensions: [".wav",".tap",".ldf",".zip",".7z"],
    pathHints: ["camplynx","camputers lynx"]
  },
  {
    id: 'adam',
    name: "ADAM",
    family: "Coleco",
    extensions: [".wav",".ddp",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".rom",".col",".bin",".zip",".7z"],
    screenscraperId: 89,
    pathHints: ["adam"]
  },
  {
    id: 'arcadia',
    name: "Arcadia 2001",
    family: "Emerson",
    extensions: [".bin",".zip",".7z"],
    screenscraperId: 94,
    pathHints: ["arcadia","arcadia 2001"]
  },
  {
    id: 'sv8000',
    name: "Super Vision 8000",
    family: "Bandai",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["sv8000","super vision 8000"]
  },
  {
    id: 'gmaster',
    name: "Game Master",
    family: "Hartung",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["gmaster","game master"]
  },
  {
    id: 'astrocade',
    name: "Astrocade",
    family: "Bally",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["astrocade"]
  },
  {
    id: 'ti99',
    name: "TI-99",
    family: "Texas Instruments",
    extensions: [".rpk",".wav",".zip",".7z"],
    screenscraperId: 205,
    pathHints: ["ti99","ti-99"]
  },
  {
    id: 'tutor',
    name: "Tutor",
    family: "Tomy",
    extensions: [".bin",".wav",".zip",".7z"],
    pathHints: ["tutor"]
  },
  {
    id: 'coco',
    name: "Color Computer",
    family: "Tandy Radio Shack",
    extensions: [".wav",".cas",".dsk",".ccc",".rom",".zip",".7z"],
    pathHints: ["coco","color computer"]
  },
  {
    id: 'cgenie',
    name: "Colour Genie",
    family: "EACA",
    extensions: [".cas",".wav",".zip",".7z"],
    pathHints: ["cgenie","colour genie"]
  },
  {
    id: 'dragon64',
    name: "Dragon 64",
    family: "Dragon Data",
    extensions: [".wav",".cas",".dsk",".dmk",".ccc",".rom",".bin",".zip",".7z"],
    pathHints: ["dragon64","dragon 64"]
  },
  {
    id: 'mc10',
    name: "MC-10",
    family: "Tandy Radio Shack",
    extensions: [".wav",".cas",".rom",".bin",".zip",".7z"],
    pathHints: ["mc10","mc-10"]
  },
  {
    id: 'trs80',
    name: "TRS-80",
    family: "Tandy Radio Shack",
    extensions: [".cmd",".cas",".dsk",".dmk",".bas",".wav",".zip",".7z"],
    pathHints: ["trs80","trs-80"]
  },
  {
    id: 'vc4000',
    name: "VC 4000",
    family: "Interton",
    extensions: [".bin",".rom",".pgm",".tvc",".zip",".7z"],
    screenscraperId: 281,
    pathHints: ["vc4000","vc 4000"]
  },
  {
    id: 'vgmplay',
    name: "Video Game Music Player",
    family: "Various",
    extensions: [".vgm",".vgz",".zip",".7z"],
    pathHints: ["vgmplay","video game music player"]
  },
  {
    id: 'superbroswar',
    name: "Super Mario War",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["superbroswar","super mario war"]
  },
  {
    id: 'quake2',
    name: "Quake II",
    family: "Ports",
    extensions: [".quake2",".7zip",".zip"],
    pathHints: ["quake2","quake ii"]
  },
  {
    id: 'j2me',
    name: "Java 2 MicroEdition",
    family: "Sun",
    extensions: [".jar"],
    pathHints: ["j2me","java 2 microedition"]
  },
  {
    id: 'zc210',
    name: "Zelda Classic",
    family: "Ports",
    extensions: [".qst"],
    pathHints: ["zc210","zelda classic"]
  },
  {
    id: 'vemulator',
    name: "Dreamcast VMU",
    family: "Sega",
    extensions: [".vms",".dci",".bin"],
    pathHints: ["vemulator","dreamcast vmu"]
  },
  {
    id: 'openjazz',
    name: "Jazz Jackrabbit",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["openjazz","jazz jackrabbit"]
  },
  {
    id: 'tyrian',
    name: "Tyrian",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["tyrian"]
  },
  {
    id: 'hurrican',
    name: "Hurrican",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["hurrican"]
  },
  {
    id: 'hcl',
    name: "Hydra Castle Labyrinth",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["hcl","hydra castle labyrinth"]
  },
  {
    id: 'samcoupe',
    name: "SAM Coupé",
    family: "Miles Gordon Technology",
    extensions: [".cpm",".dsk",".sad",".mgt",".sdf",".td0",".sbt",".zip"],
    screenscraperId: 213,
    pathHints: ["samcoupe","sam coupé"]
  },
  {
    id: 'abuse',
    name: "Abuse",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["abuse"]
  },
  {
    id: 'cdogs',
    name: "C-Dogs SDL",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["cdogs","c-dogs sdl"]
  },
  {
    id: 'xrick',
    name: "xrick",
    family: "Ports",
    extensions: [".zip"],
    pathHints: ["xrick"]
  },
  {
    id: 'macintosh',
    name: "Macintosh",
    family: "Apple",
    extensions: [".dsk",".mfi",".dfi",".hfe",".mfm",".td0",".imd",".d77",".d88",".1dd",".cqm",".cqi",".dsk",".ima",".img",".ufi",".ipf",".dc42",".woz",".2mg",".360",".chd",".cue",".toc"],
    screenscraperId: 146,
    pathHints: ["macintosh"]
  },
  {
    id: 'naomi2',
    name: "Naomi 2",
    family: "Sega",
    extensions: [".zip",".7z"],
    screenscraperId: 230,
    pathHints: ["naomi2","naomi 2"]
  },
  {
    id: 'hikaru',
    name: "Hikaru",
    family: "Sega",
    extensions: [".zip",".7z"],
    pathHints: ["hikaru"]
  },
  {
    id: 'gaelco',
    name: "Gaelco",
    family: "Sega",
    extensions: [".zip",".7z"],
    pathHints: ["gaelco"]
  },
  {
    id: 'cave3rd',
    name: "Cave CV1000",
    family: "Sega",
    extensions: [".zip",".7z"],
    pathHints: ["cave3rd","cave cv1000"]
  },
  {
    id: 'pdp1',
    name: "PDP-1",
    family: "Digital Equipment Corporation",
    extensions: [".tap",".rim",".drm",".zip",".7z"],
    pathHints: ["pdp1","pdp-1"]
  },
  {
    id: 'xbox360',
    name: "Xbox 360",
    family: "Microsoft",
    extensions: [".iso",".xex",".xbox360",".zar"],
    screenscraperId: 33,
    pathHints: ["xbox360","xbox 360"]
  },
  {
    id: 'ngage',
    name: "N-Gage",
    family: "Nokia",
    extensions: [".n-gage",".sisx",".sis",".zip"],
    screenscraperId: 30,
    pathHints: ["ngage","n-gage"]
  },
  {
    id: 'odcommander',
    name: "OD-Commander",
    family: "Ports",
    extensions: [".odc"],
    pathHints: ["odcommander","od-commander"]
  },
  {
    id: 'gp32',
    name: "GP32",
    family: "GamePark",
    extensions: [".smc",".zip",".7z"],
    screenscraperId: 101,
    pathHints: ["gp32"]
  },
  {
    id: 'arduboy',
    name: "Arduboy",
    family: "Kevin Bates",
    extensions: [".hex",".zip",".7z"],
    defaultCore: "cores\\arduous_libretro.dll",
    screenscraperId: 263,
    pathHints: ["arduboy"]
  },
  {
    id: 'gzdoom',
    name: "GZDoom",
    family: "Ports",
    extensions: [".wad",".iwad",".pwad",".gzdoom"],
    pathHints: ["gzdoom"]
  },
  {
    id: 'corsixth',
    name: "CorsixTH",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["corsixth"]
  },
  {
    id: 'eduke32',
    name: "EDuke32",
    family: "Ports",
    extensions: [".eduke32"],
    pathHints: ["eduke32"]
  },
  {
    id: 'fury',
    name: "Ion Fury",
    family: "Ports",
    extensions: [".grp"],
    pathHints: ["fury","ion fury"]
  },
  {
    id: 'raze',
    name: "Raze",
    family: "Ports",
    extensions: [".raze"],
    pathHints: ["raze"]
  },
  {
    id: 'psvita',
    name: "PlayStation Vita",
    family: "Sony",
    extensions: [".psvita",".zip"],
    screenscraperId: 62,
    pathHints: ["psvita","playstation vita"]
  },
  {
    id: 'doom3',
    name: "Doom 3",
    family: "Ports",
    extensions: [".d3"],
    pathHints: ["doom3","doom 3"]
  },
  {
    id: 'reminiscence',
    name: "REminiscence",
    family: "Ports",
    extensions: [".rem"],
    pathHints: ["reminiscence"]
  },
  {
    id: 'traider',
    name: "Tomb Raider I, II & III",
    family: "Core Design",
    extensions: [".croft"],
    pathHints: ["traider","tomb raider i, ii & iii"]
  },
  {
    id: 'quake3',
    name: "Quake III",
    family: "Ports",
    extensions: [".quake3"],
    pathHints: ["quake3","quake iii"]
  },
  {
    id: 'namco2x6',
    name: "Namco System 246/256",
    family: "Sony / Namco",
    extensions: [".acgame"],
    pathHints: ["namco2x6","namco system 246/256"]
  },
  {
    id: 'namco3xx',
    name: "Namco 3xx",
    family: "Namco",
    extensions: [".squashfs"],
    pathHints: ["namco3xx","namco 3xx"]
  },
  {
    id: 'vis',
    name: "Tandy Video Information System",
    family: "Tandy / Memorex",
    extensions: [".chd",".cue",".toc",".nrg",".gdi",".iso",".cdr"],
    pathHints: ["vis","tandy video information system"]
  },
  {
    id: 'vpinball',
    name: "Visual Pinball X",
    family: "Randy Davis",
    extensions: [".vpx"],
    pathHints: ["vpinball","visual pinball x"]
  },
  {
    id: 'spectravideo',
    name: "Spectravideo SV-328",
    family: "Spectravideo",
    extensions: [".cas",".zip",".7z"],
    screenscraperId: 218,
    pathHints: ["spectravideo","spectravideo sv-328"]
  },
  {
    id: 'theforceengine',
    name: "The Force Engine",
    family: "Ports",
    extensions: [".tfe"],
    pathHints: ["theforceengine","the force engine"]
  },
  {
    id: 'rtcw',
    name: "Return To Castle Wolfenstein",
    family: "Ports",
    extensions: [".rtcw"],
    pathHints: ["rtcw","return to castle wolfenstein"]
  },
  {
    id: 'fallout1-ce',
    name: "Fallout Community Edition",
    family: "Ports",
    extensions: [".f1ce"],
    pathHints: ["fallout1-ce","fallout community edition"]
  },
  {
    id: 'fallout2-ce',
    name: "Fallout 2 Community Edition",
    family: "Ports",
    extensions: [".f2ce"],
    pathHints: ["fallout2-ce","fallout 2 community edition"]
  },
  {
    id: 'dxx-rebirth',
    name: "DXX Rebirth",
    family: "Ports",
    extensions: [".d1x",".d2x"],
    pathHints: ["dxx-rebirth","dxx rebirth"]
  },
  {
    id: 'etlegacy',
    name: "Wolfenstein - Enemy Territory",
    family: "Ports",
    extensions: [".etl"],
    pathHints: ["etlegacy","wolfenstein - enemy territory"]
  },
  {
    id: 'sonic3-air',
    name: "Sonic 3 A.I.R.",
    family: "Sega",
    extensions: [".s3air"],
    pathHints: ["sonic3-air","sonic 3 a.i.r."]
  },
  {
    id: 'sonic-mania',
    name: "Sonic Mania",
    family: "Sega",
    extensions: [".sman"],
    pathHints: ["sonic-mania","sonic mania"]
  },
  {
    id: 'uqm',
    name: "Ur-Quan Masters",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["uqm","ur-quan masters"]
  },
  {
    id: 'chihiro',
    name: "Sega Chihiro",
    family: "Sega & Microsoft",
    extensions: [".iso"],
    pathHints: ["chihiro","sega chihiro"]
  },
  {
    id: 'rott',
    name: "Rise of the Triad",
    family: "Ports",
    extensions: [".rott"],
    pathHints: ["rott","rise of the triad"]
  },
  {
    id: 'rx78',
    name: "RX-78",
    family: "Bandai",
    extensions: [".bin",".zip",".7z"],
    pathHints: ["rx78","rx-78"]
  },
  {
    id: 'commanderx16',
    name: "Commander X16",
    family: "The 8-Bit Guy",
    extensions: [".bas",".img",".prg"],
    pathHints: ["commanderx16","commander x16"]
  },
  {
    id: 'ps4',
    name: "PlayStation 4",
    family: "Sony",
    extensions: [".ps4"],
    screenscraperId: 60,
    pathHints: ["ps4","playstation 4"]
  },
  {
    id: 'jazz2',
    name: "Jazz Jackrabbit 2",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["jazz2","jazz jackrabbit 2"]
  },
  {
    id: 'catacomb',
    name: "CatacombGL",
    family: "Ports",
    extensions: [".game"],
    pathHints: ["catacomb","catacombgl"]
  },
  {
    id: 'lindbergh',
    name: "Sega Lindbergh",
    family: "Sega",
    extensions: [".game"],
    pathHints: ["lindbergh","sega lindbergh"]
  },
  {
    id: 'oricatmos',
    name: "Oric Atmos",
    family: "Tangerine Computer Systems",
    extensions: [".tap",".dsk",".zip"],
    pathHints: ["oricatmos","oric atmos"]
  },
  {
    id: 'bstone',
    name: "Blake Stone",
    family: "Ports",
    extensions: [".bstone"],
    pathHints: ["bstone","blake stone"]
  },
  {
    id: 'jkdf2',
    name: "Jedi Knight - Dark Forces 2",
    family: "Ports",
    extensions: [".jedi"],
    pathHints: ["jkdf2","jedi knight - dark forces 2"]
  },
  {
    id: 'jknight',
    name: "Star Wars - Jedi Academy",
    family: "Ports",
    extensions: [".jedi"],
    pathHints: ["jknight","star wars - jedi academy"]
  },
  {
    id: 'mohaa',
    name: "Medal Of Honor - Allied Assault",
    family: "Ports",
    extensions: [".mohaa"],
    pathHints: ["mohaa","medal of honor - allied assault"]
  },
  {
    id: 'namco22',
    name: "Namco System 22",
    family: "Namco",
    extensions: [".zip",".7z"],
    pathHints: ["namco22","namco system 22"]
  },
  {
    id: 'bennugd',
    name: "Bennu Game Development",
    family: "SplinterGU",
    extensions: [".dcb",".dat"],
    pathHints: ["bennugd","bennu game development"]
  },
  {
    id: 'loopy',
    name: "Casio Loopy",
    family: "Casio",
    extensions: [".bin",".ic1",".zip",".7z"],
    screenscraperId: 98,
    pathHints: ["loopy","casio loopy"]
  },
  {
    id: 'pc60',
    name: "PC-6000",
    family: "NEC",
    extensions: [".bin",".cas",".p6",".d77",".d88",".dsk",".1dd",".mfi",".dfi",".mfm",".td0",".imd",".cqm",".cqi",".xdf",".hdm",".2hd",".fdi",".zip",".7z"],
    pathHints: ["pc60","pc-6000"]
  },
  {
    id: 'enterprise',
    name: "Enterprise",
    family: "Enterprise Computers",
    extensions: [".bas",".com",".img",".dsk",".tap",".dtf",".trn",".128",".cas",".cdt",".tzx",".zip"],
    pathHints: ["enterprise"]
  },
  {
    id: 'tvc',
    name: "Videoton TVC",
    family: "Videoton",
    extensions: [".cas",".tap",".dsk",".img",".zip"],
    pathHints: ["tvc","videoton tvc"]
  },
  {
    id: 'switch',
    name: "Nintendo Switch",
    family: "Nintendo",
    extensions: [".xci",".nsp",".nca",".nro"],
    screenscraperId: 225,
    pathHints: ["switch","yuzu","ryujinx"]
  },
  {
    id: 'other',
    name: "Outros",
    family: "Outros",
    extensions: [],
    pathHints: ["other"]
  }
]

/** Extensoes unicas (so uma plataforma) — prioridade na deteccao */
const UNIQUE_EXT_PLATFORM: Record<string, string> = {
  '."0"': 'scv',
  '.128': 'enterprise',
  '.20': 'c20',
  '.2d': 'x1',
  '.32x': 'sega32x',
  '.3ds': '3ds',
  '.40': 'c20',
  '.40t': 'atom',
  '.60': 'c20',
  '.7zip': 'quake2',
  '.86f': 'pcw',
  '.98d': 'pc98',
  '.a26': 'atari2600',
  '.a78': 'atari7800',
  '.abs': 'jaguar',
  '.acgame': 'namco2x6',
  '.apd': 'archimedes',
  '.app': '3ds',
  '.atm': 'atom',
  '.axf': '3ds',
  '.bigpimg': 'jaguarcd',
  '.bin777': 'cassettevision',
  '.bit': 'sc3000',
  '.bkd': 'bk',
  '.bll': 'lynx',
  '.bstone': 'bstone',
  '.bsx': 'snes',
  '.cannonball': 'cannonball',
  '.cbn': 'ps1',
  '.cbz': 'library',
  '.cci': '3ds',
  '.cgenius': 'cgenius',
  '.chf': 'channelf',
  '.cia': '3ds',
  '.cmt': 'pc88',
  '.cof': 'jaguar',
  '.com': 'enterprise',
  '.cpm': 'samcoupe',
  '.cpr': 'gx4000',
  '.croft': 'traider',
  '.cxi': '3ds',
  '.d1x': 'dxx-rebirth',
  '.d2x': 'dxx-rebirth',
  '.d3': 'doom3',
  '.d71': 'c64',
  '.d98': 'pc98',
  '.dc42': 'macintosh',
  '.dcb': 'bennugd',
  '.dci': 'vemulator',
  '.ddp': 'adam',
  '.dmy': 'dice',
  '.dos': 'dos',
  '.dosz': 'dos',
  '.drm': 'pdp1',
  '.dtf': 'enterprise',
  '.dump': 'ps2',
  '.dx1': 'x1',
  '.dx2': 'snes',
  '.easyrpg': 'easyrpg',
  '.ecwolf': 'ecwolf',
  '.edd': 'apple2',
  '.eduke32': 'eduke32',
  '.etl': 'etlegacy',
  '.f1ce': 'fallout1-ce',
  '.f2ce': 'fallout2-ce',
  '.fd': 'thomson',
  '.fdd': 'pc98',
  '.fds': 'fds',
  '.flatpak': 'flatpak',
  '.g64': 'c64',
  '.gam': 'vectrex',
  '.gba': 'gba',
  '.gd3': 'snes',
  '.gd7': 'snes',
  '.gemdos': 'atarist',
  '.gen': 'genesis',
  '.gg': 'gamegear',
  '.grp': 'fury',
  '.gz': 'ps2',
  '.gzdoom': 'gzdoom',
  '.hd': 'atarist',
  '.hdd': 'pc98',
  '.hdi': 'pc98',
  '.hdn': 'pc98',
  '.hdv': 'apple2',
  '.hex': 'arduboy',
  '.ic1': 'loopy',
  '.ikemen': 'ikemen',
  '.int': 'intellivision',
  '.j64': 'jaguar',
  '.jag': 'jaguar',
  '.jar': 'j2me',
  '.jfd': 'archimedes',
  '.k7': 'thomson',
  '.ldf': 'camplynx',
  '.libretro': 'mrboom',
  '.lutro': 'lutro',
  '.lyx': 'lynx',
  '.m5': 'thomson',
  '.m7': 'thomson',
  '.mgt': 'samcoupe',
  '.min': 'pokemini',
  '.mod': 'library',
  '.mohaa': 'mohaa',
  '.moonlight': 'moonlight',
  '.mpq': 'devilutionx',
  '.msa': 'atarist',
  '.msi': 'windows_installers',
  '.mx1': 'msx',
  '.n-gage': 'ngage',
  '.n64': 'n64',
  '.n80': 'pc80',
  '.nca': 'switch',
  '.nds': 'nds',
  '.nes': 'nes',
  '.ngc': 'ngpc',
  '.ngp': 'neogeopocket',
  '.nhd': 'pc98',
  '.nro': 'switch',
  '.nsp': 'switch',
  '.nx': 'lowresnx',
  '.o': 'lynx',
  '.odc': 'odcommander',
  '.p': 'zx81',
  '.p6': 'pc60',
  '.p8': 'pico8',
  '.pak': 'openbor',
  '.pk3': 'ecwolf',
  '.ps3': 'ps3',
  '.ps4': 'ps4',
  '.psn': 'ps3',
  '.psvita': 'psvita',
  '.py': 'pyxel',
  '.pygame': 'pygame',
  '.pyxapp': 'pyxel',
  '.qst': 'zc210',
  '.quake': 'quake',
  '.quake2': 'quake2',
  '.quake3': 'quake3',
  '.raze': 'raze',
  '.rem': 'reminiscence',
  '.rim': 'pdp1',
  '.rott': 'rott',
  '.rpk': 'ti99',
  '.rpx': 'wiiu',
  '.rtcw': 'rtcw',
  '.rti': 'apple2',
  '.rzx': 'zxspectrum',
  '.s3air': 'sonic3-air',
  '.sad': 'samcoupe',
  '.sap': 'thomson',
  '.sbt': 'samcoupe',
  '.scd': 'sonicretro',
  '.scl': 'zxspectrum',
  '.scummvm': 'scummvm',
  '.sdf': 'samcoupe',
  '.sdlpop': 'sdlpop',
  '.sgx': 'supergrafx',
  '.sh': 'ports',
  '.sis': 'ngage',
  '.sisx': 'ngage',
  '.sman': 'sonic-mania',
  '.smbx': 'thextech',
  '.sms': 'mastersystem',
  '.sna': 'amstradcpc',
  '.solarus': 'solarus',
  '.son': 'sonicretro',
  '.steam': 'steam',
  '.stm': 'library',
  '.stx': 'atarist',
  '.sv': 'supervision',
  '.swc': 'snes',
  '.swf': 'flash',
  '.t77': 'fm7',
  '.tar': 'gba',
  '.tfe': 'theforceengine',
  '.tgc': 'gamecom',
  '.thd': 'pc98',
  '.tic': 'tic80',
  '.trd': 'zxspectrum',
  '.trn': 'enterprise',
  '.tvc': 'vc4000',
  '.u1': 'vsmile',
  '.u3': 'vsmile',
  '.u88': 'pc88',
  '.unf': 'nes',
  '.unif': 'nes',
  '.uze': 'uzebox',
  '.v32': 'vircon32',
  '.v64': 'n64',
  '.vb': 'virtualboy',
  '.vec': 'vectrex',
  '.vgm': 'vgmplay',
  '.vgz': 'vgmplay',
  '.vms': 'vemulator',
  '.voc': 'amstradcpc',
  '.vpx': 'vpinball',
  '.vz': 'laser310',
  '.wasm': 'wasm4',
  '.ws': 'wonderswan',
  '.wsc': 'wonderswancolor',
  '.wua': 'wiiu',
  '.wud': 'wiiu',
  '.wuhb': 'wiiu',
  '.wup': 'wiiu',
  '.wux': 'wiiu',
  '.xbox360': 'xbox360',
  '.xci': 'switch',
  '.xm': 'library',
  '.z64': 'n64',
  '.z80': 'zxspectrum',
  '.zar': 'xbox360',
  '.zcci': '3ds',
  '.zcia': '3ds',
  '.zcxi': '3ds',
  '.zso': 'ps2',
}

function hintScore(filePath: string, platform: PlatformDef): number {
  const lower = filePath.toLowerCase().replace(/\//g, '\\')
  let score = 0
  for (const hint of platform.pathHints ?? []) {
    if (lower.includes(hint.toLowerCase())) score += hint.length
  }
  return score
}

export function detectPlatform(filePath: string): string {
  const lower = filePath.toLowerCase()
  const ext = lower.slice(lower.lastIndexOf('.'))

  if (['.lnk', '.url'].includes(ext)) return 'pc'
  if (['.exe', '.bat', '.cmd'].includes(ext)) {
    const dos = PLATFORMS.find((p) => p.id === 'dos')
    if (dos && hintScore(filePath, dos) > 0) return 'dos'
    return 'pc'
  }

  if (UNIQUE_EXT_PLATFORM[ext]) return UNIQUE_EXT_PLATFORM[ext]

  const ambiguousExts = ['.iso', '.bin', '.chd', '.cue', '.zip', '.7z', '.cso', '.img', '.ccd', '.mds', '.nrg', '.m3u']
  if (ambiguousExts.includes(ext)) {
    let best = 'other'
    let bestScore = 0
    for (const p of PLATFORMS) {
      if (p.id === 'pc' || p.id === 'other') continue
      if (!p.extensions.includes(ext) && !ambiguousExts.includes(ext)) continue
      const s = hintScore(filePath, p)
      if (s > bestScore) {
        bestScore = s
        best = p.id
      }
    }
    if (bestScore > 0) return best

    if (ext === '.cue' || ext === '.pbp') return 'ps1'
    if (ext === '.zip' || ext === '.7z') return 'arcade'
    if (ext === '.iso' || ext === '.bin' || ext === '.chd') return 'ps1'
  }

  for (const p of PLATFORMS) {
    if (p.extensions.includes(ext)) return p.id
  }

  return 'other'
}

export function titleFromFilename(filePath: string): string {
  const base = filePath.replace(/^.*[\\/]/, '')
  return base
    .replace(/\.[^.]+$/, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export const ALL_EXTENSIONS = Array.from(new Set(PLATFORMS.flatMap((p) => p.extensions)))

export const PLATFORM_FAMILIES = Array.from(
  new Set(PLATFORMS.filter((p) => p.id !== 'other').map((p) => p.family))
)

export function getPlatform(id: string): PlatformDef | undefined {
  return PLATFORMS.find((p) => p.id === id)
}
