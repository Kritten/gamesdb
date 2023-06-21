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
        confirm: 'Bestätigen',
        open: 'öffnen',
        close: 'schließen',
        cancel: 'abbrechen',
        undefined: 'Egal',
        login: 'Login',
        logout: 'Logout',
        required: 'Pflichtfeld',
        details: 'Details',
        count: 'Anzahl',
        notSpecified: 'Keine Angabe',
        date: 'Datum',
    },
    login: {
        name: 'Name',
        password: 'Passwort',
        submit: 'Anmelden',
        wrongCredentials: 'Falsche Zugangsdaten',
        gamesList: 'Spieleliste',
    },
    dashboard: {
        label: 'Dashboard',
        game: {
            mostPlayedAnalog: 'Meist gespielte analoge Spiele',
            mostPlayedDigital: 'Meist gespielte digitale Spiele',
            longestPlayedAnalog: 'Am längsten gespielte analoge Spiele',
            longestPlayedDigital: 'Am längsten gespielte digitale Spiele',
            bestRatedAnalog: 'Bestbewertetste analoge Spiele',
            bestRatedDigital: 'Bestbewertetste digitale Spiele',
            playtimesPerDayAnalog: 'Spielzeit pro Tag (Analog)',
            playtimesPerDayDigital: 'Spielzeit pro Tag (Digital)',
            lastSessionAnalog: 'Zuletzt gespielt (Analog)',
            lastSessionDigital: 'Zuletzt gespielt (Digital)',
            lastPlayedAnalog: 'Zuletzt gespielt (Analog)',
            lastPlayedDigital: 'Zuletzt gespielt (Digital)',
        },
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
        idBGG: 'BGG ID',
        name: 'Name',
        description: 'Beschreibung',
        countPlayersMin: 'Spieler (min)',
        countPlayersMax: 'Spieler (max)',
        minutesPlaytimeMin: 'Spielzeit (min)',
        minutesPlaytimeMax: 'Spielzeit (max)',
        isCoop: 'Koop',
        isDigital: 'Digital',
        complexity: 'Schwierigkeit',
        ratingBGG: 'Bewertung von BGG',
        size: 'Größe',
        countPlayed: 'Spielhäufigkeit',
        timePlayed: 'Spielzeit',
        sizeFormatted: {
            0: 'klein',
            1: 'mittel',
            2: 'groß',
        },
        complexityFormatted: {
            0: '1 (einfach)',
            1: '2',
            2: '3',
            3: '4',
            4: '5 (schwer)',
        },
        infoPlaytime:
            '{minutesPlaytimeMin} Minuten | {minutesPlaytimeMin} bis {minutesPlaytimeMax} Minuten',
        infoCountPlayers:
            '{countPlayersMin} Spieler | {countPlayersMin} bis {countPlayersMax} Spieler',
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
            universes: 'Universen',
            moods: 'Stimmungen',
            categories: 'Kategorien',
            mechanisms: 'Mechanism',
        },
        confirm: {
            delete: "Soll das Spiel '{name}' wirklich gelöscht werden?",
        },
        list: {
            sort: {
                lastSession: 'Zuletzt gespielt',
            },
        },
    },
    category: {
        label: 'Kategorie | Kategorien',
        name: 'Name',
        confirm: {
            delete: "Soll die Kategorie '{name}' wirklich gelöscht werden?",
        },
    },
    mechanism: {
        label: 'Mechanismus | Mechanismen',
        name: 'Name',
        confirm: {
            delete: "Soll der Mechanismus '{name}' wirklich gelöscht werden?",
        },
    },
    mood: {
        label: 'Stimmung | Stimmungen',
        name: 'Name',
        confirm: {
            delete: "Soll die Stimmung '{name}' wirklich gelöscht werden?",
        },
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
        new: 'Neues Bild',
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
            label: 'Laufende Session | Laufende Sessions',
        },
        start: 'Start',
        pause: 'Pause',
        stop: 'Session beenden',
        continue: 'Weiter',
        comment: 'Kommentar',
        isChallenge: 'Herausforderung',
        confirm: {
            delete: 'Soll die Session wirklich gelöscht werden?',
        },
    },
    rating: {
        label: 'Bewertung | Bewertungen',
        none: 'Keine Bewertungen',
        confirm: {
            delete: 'Soll die Bewertung wirklich gelöscht werden?',
        },
    },
    playtime: {
        label: 'Spielzeit | Spielzeiten',
        start: 'Anfang',
        end: 'Ende',
        pending: 'Laufende Spielzeit seit ',
        unplayed: 'Ungespielt',
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
        headerInfoHeader:
            'Willkommen auf der Wunschliste von Liene und Kristof',
        headerInfoDisclaimer:
            'Du willst (oder musst) uns etwas schenken? Und du hast keine Idee was? Dann bist du hier genau richtig!',
        headerInfoContent:
            "Unten kannst du unsere Wünsche durchstöbern und wenn du ein Geschenk gefunden hast kannst auf 'Verschenken' klicken. Dadurch wird der Wunsch von der Liste genommen.",
        headerInfoReturn:
            'Solltest du dich umentscheiden kannst du das Produkt aber mit einem Klick wieder auf die Wunschliste zurücklegen. Bitte füge nur Geschenke wieder hinzu, die du selbst von der Wunschliste genommen hast!',
        headerInfoClassics:
            'Worüber wir uns immer freuen: Knusperflocken (a.k.a Entenärsche) und (herzhaftes) Knabberzeug.',
        headerInfoNogos: 'Bitte schenkt uns ansonsten keine Süßigkeiten.',
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
            3: 'Cirilla',
        },
        buy: 'mehr Infos',
        filters: {
            taken: 'Schon verschenkt',
            name: 'Name',
            price: 'Preis',
            giftFor: 'Geschenk für',
        },
        confirm: {
            delete: 'Soll der Wunschlisteneintrag wirklich gelöscht werden?',
            take: 'Soll dieses Produkt wirklich von der Wunschliste gestrichen werden?',
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
