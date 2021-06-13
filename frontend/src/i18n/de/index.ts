// This is just an example,
// so you can safely delete all default props below

export default {
  common: {
    title: 'Spieledatenbank',
    select: 'auswählen',
    add: 'hinzufügen',
    create: 'anlegen',
    edit: 'bearbeiten',
    delete: 'löschen',
    yes: 'Ja',
    no: 'Nein',
    open: 'öffnen',
    close: 'schließen',
    cancel: 'abbrechen',
    undefined: 'Egal',
    login: 'Login',
    logout: 'Logout',
    required: 'Pflichtfeld',
    details: 'Details',
  },
  login: {
    name: 'Name',
    password: 'Passwort',
    submit: 'Anmelden',
    wrongCredentials: 'Falsche Zugangsdaten',
  },
  dashboard: {
    label: 'Dashboard',
  },
  filter: {
    label: 'Filter',
    reset: 'Filter zurücksetzen',
  },
  sort: {
    label: 'Sortierung',
  },
  game: {
    label: 'Spiel | Spiele',
    name: 'Name',
    description: 'Beschreibung',
    countPlayersMin: 'Spieler (min)',
    countPlayersMax: 'Spieler (max)',
    minutesPlaytimeMin: 'Spielzeit (min)',
    minutesPlaytimeMax: 'Spielzeit (max)',
    isCoop: 'Koop',
    isDigital: 'Digital',
    complexity: 'Schwierigkeit',
    size: 'Größe',
    countPlayed: 'Spielhäufigkeit',
    timePlayed: 'Spielzeit',
    sizeFormatted: {
      0: 'klein',
      1: 'mittel',
      2: 'groß',
    },
    infoPlaytime: '{minutesPlaytimeMin} Minuten | {minutesPlaytimeMin} bis {minutesPlaytimeMax} Minuten',
    infoCountPlayers: '{countPlayersMin} Spieler | {countPlayersMin} bis {countPlayersMax} Spieler',
    digital: {
      label: 'Digitales Spiel | Digitale Spiele',
    },
    random: {
      select: 'Zufälliges Spiel auswählen',
    },
    filters: {
      name: 'Spielname',
      isCoop: '@:game.isCoop',
      countPlayers: 'Spieleranzahl',
      minutesPlaytimeMin: 'Spielzeit (min)',
      minutesPlaytimeMax: 'Spielzeit (max)',
    },
  },
  category: {
    label: 'Kategorie | Kategorien',
  },
  mechanism: {
    label: 'Mechanismus | Mechanismen',
  },
  mood: {
    label: 'Stimmung | Stimmungen',
  },
  player: {
    label: 'Spieler | Spieler',
    name: 'Name',
    filters: {
      name: 'Spielername',
    },
    confirm: {
      delete: "Soll der Spieler '{name}' wirklich gelöscht werden?",
    },
  },
  winner: {
    label: 'Gewinner | Gewinner',
  },
  image: {
    label: 'Bild | Bilder',
  },
  universe: {
    label: 'Universum | Universen',
    name: 'Name',
    confirm: {
      delete: "Soll das Universum '{name}' wirklich gelöscht werden?",
    },
  },
  session: {
    label: 'Session | Sessions',
    virtual: {
      label: 'Virtuelle Session | Virtuelle Sessions',
    },
    start: 'Start',
    pause: 'Pause',
    stop: 'Session beenden',
    continue: 'Weiter',
    comment: 'Kommentar',
    isChallenge: 'Herausforderung',
  },
  rating: {
    label: 'Bewertung | Bewertungen',
  },
  playtime: {
    label: 'Spielzeit | Spielzeiten',
    start: 'Anfang',
    end: 'Ende',
    pending: 'Laufende Spielzeit: ',
  },
  wishlist: {
    label: 'Wunschliste | Wunschlisten',
    extern: {
      label: 'Externe Wunschliste | Externe Wunschlisten',
    },
    item: {
      label: 'Wunsch | Wünsche',
    },
    headerInfo: '{header}{disclaimer}{content}{return}{classics}{nogos}',
    headerInfoHeader: 'Willkommen auf der Wunschliste von Liene und Kristof',
    headerInfoDisclaimer:
      'Du willst (oder musst) uns etwas schenken? Und du hast keine Idee was? Dann bist du hier genau richtig!',
    headerInfoContent:
      "Unten kannst du unsere Wünsche durchstöbern und wenn du ein Geschenk gefunden hast, kannst auf 'Verschenken' klicken. Dadurch wird der Wunsch von der Liste genommen.",
    headerInfoReturn:
      'Solltest du dich umentscheiden, kannst du das Produkt aber mit einem Klick wieder auf die Wunschliste zurücklegen. Bitte füge nur Geschenke wieder hinzu, die du selbst von der Wunschliste genommen hast!',
    headerInfoClassics:
      'Worüber wir uns immer freuen: Knusperflocken (a.k.a Entenärsche), Nutella und (herzhaftes) Knabberzeug.',
    headerInfoNogos:
      'Bitte schenkt uns keine Süßigkeiten (bis auf die oben genannten). Süßes essen wir nicht und müssen das sonst wegschmeißen.',
    name: 'Name',
    price: 'Preis',
    taken: 'Vergeben',
    description: 'Beschreibung',
    link: 'Link',
    giftFor: 'Geschenk für',
    priceRange: 'ca. {0}€',
    priceRangeUnknown: 'unbekannt',
    giftForWho: {
      0: 'Liene und Kristof',
      1: 'Liene',
      2: 'Kristof',
    },
    buy: 'mehr Infos',
    filters: {
      taken: 'Schon verschenkt',
      name: 'Name',
      price: 'Preis',
      giftFor: 'Geschenk für',
    },
    confirm: {
      take:
        'Soll dieses Produkt wirklich von der Wunschliste gestrichen werden?',
      giveBack:
        'Willst du dieses Produkt wirklich wieder zurück auf die Wunschliste stellen?',
    },
    take: 'Verschenken',
    giveBack: 'Zurück auf die Liste',
  },
  validator: {
    required: 'Das ist ein Pflichtfeld',
  },
};
