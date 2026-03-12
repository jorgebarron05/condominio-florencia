# Condominio Florencia — Sitio Web

Sitio web estático para la venta y alquiler de departamentos en **Condominio Florencia**, Santa Cruz de la Sierra, Bolivia.

## Estructura del Proyecto

```
├── index.html          ← Página principal (landing)
├── galeria.html        ← Galería de fotos con filtros y lightbox
├── contacto.html       ← Página de contacto con mapa interactivo
├── css/
│   └── style.css       ← Estilos (paleta marrón/blanco/dorado del logo)
├── js/
│   └── main.js         ← Navegación móvil, lightbox, mapa Leaflet
├── img/                ← Fotos del departamento y amenidades
│   ├── logo-florencia.jpg
│   ├── banner-hero.png
│   ├── piscina.jpg
│   ├── cocina.jpg
│   ├── dormitorio-principal.jpg
│   ├── dormitorio-segundo.jpg
│   ├── dormitorio-infantil.jpg
│   ├── living-comedor.jpg
│   ├── living-vista-panoramica.jpg
│   ├── sala-estar-nocturna.jpg
│   ├── sala-familiar.jpg
│   ├── entrada-tv.jpg
│   ├── balcon-vista-frase.jpg
│   ├── balcon-living-decorado.jpg
│   ├── mapa-ubicacion.jpg
│   └── mapa-zona-amplio.jpg
└── .gitignore
```

## Cómo Usar

Abrir `index.html` en cualquier navegador. No requiere servidor, build tools, ni instalación.

El mapa interactivo (Leaflet + OpenStreetMap) requiere conexión a internet para cargar los tiles.

## Personalización

- **Contacto**: Editar los placeholders en `contacto.html` (buscar `TODO:`)
- **Coordenadas del mapa**: Ajustar `lat` y `lng` en `js/main.js` línea ~110
- **Colores**: Variables CSS en `css/style.css` (`:root`)

## Tecnologías

- HTML5, CSS3, JavaScript vanilla
- [Leaflet](https://leafletjs.com/) — mapa interactivo (sin API key)
- [Google Fonts](https://fonts.google.com/) — Playfair Display + Inter
