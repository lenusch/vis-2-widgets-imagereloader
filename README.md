# VIS-2 Image Reloader Widget

Ein VIS-2 Widget, das automatisch Bilder in konfigurierbaren Intervallen neu lädt.

## Features

- ✅ Automatisches Neuladen von Bildern alle 1000ms (konfigurierbar)
- ✅ Cache-Busting durch Timestamps
- ✅ Konfigurierbare Bildgröße und Anpassungsmodi
- ✅ Fehlerbehandlung und Ladestatus
- ✅ Responsive Design
- ✅ Anpassbare Rahmen und Hintergrundfarben

## Installation

```bash
# Widget-Set installieren
iobroker url https://github.com/lenusch/vis-2-widgets-imagereloader.git

# Widgets für VIS-2 hochladen
iobroker upload vis-2-widgets-imagereloader vis-2 1

# VIS-2 neu starten
iobroker restart vis-2.0
```

## Konfiguration

### Attribute

- **Image Path**: Pfad zum Bild (URL oder lokaler Pfad)
- **Width**: Breite des Widgets in Pixeln (Standard: 200px)
- **Height**: Höhe des Widgets in Pixeln (Standard: 150px)
- **Reload Interval**: Intervall für das Neuladen in Millisekunden (Standard: 1000ms)
- **Fit Mode**: Wie das Bild skaliert wird (contain, cover, fill, scale-down, none)
- **Border Radius**: Eckenradius in Pixeln
- **Show Border**: Rahmen anzeigen (true/false)
- **Border Color**: Farbe des Rahmens
- **Background Color**: Hintergrundfarbe des Widgets

### Beispiel-Konfiguration

```
Image Path: http://192.168.1.100/webcam/image.jpg
Width: 400px
Height: 300px
Reload Interval: 1000ms
Fit Mode: contain
```

## Verwendung

1. Widget aus der Palette "Image Reloader" auswählen
2. Bildpfad konfigurieren
3. Gewünschte Größe und Intervall einstellen
4. Widget platzieren

Das Widget lädt das Bild automatisch alle 1000ms (oder dem konfigurierten Intervall) neu und verhindert durch Cache-Busting, dass veraltete Bilder angezeigt werden.

## Technische Details

- Kompatibel mit VIS-2
- Verwendet moderne JavaScript ES6+ Features
- Automatische Cleanup-Funktionen
- Fehlerbehandlung und Logging
- Responsive CSS-Design

## Lizenz

MIT License

## Changelog

### 1.0.0
- Erste Version
- Automatisches Bild-Neuladen
- Konfigurierbare Intervalle
- Responsive Design
