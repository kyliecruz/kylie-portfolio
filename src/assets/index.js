// ── Image assets ─────────────────────────────────────────────────────────────
// All icons/images used across the site are imported here and re-exported
// so pages only need one import line, e.g.:
//   import { imgTealHibiscus, imgPurpleRocket } from "../assets"
//
// Naming convention:
//   imgTeal___   → coloured teal version (used in Beach/light mode)
//   imgPurple___ → coloured purple version (used in Space/dark mode)
//   img___       → original/uncoloured version (mostly unused in UI)
//
// To add a new icon:
//   1. Drop the .png file into src/assets/beach/, space/, or contact/
//   2. Add an export line below following the same pattern
//   3. Import it by name wherever you need it

// ── Beach icons (teal versions used in light mode) ────────────────────────────
export { default as imgSun }           from "./beach/sun.png";
export { default as imgHibiscus }      from "./beach/hibiscus.png";
export { default as imgWave }          from "./beach/wave.png";
export { default as imgSeashell }      from "./beach/seashell.png";
export { default as imgIsland }        from "./beach/island.png";
export { default as imgTurtle }        from "./beach/turtle.png";
export { default as imgDolphin }       from "./beach/dolphin.png";
export { default as imgTealMoon }      from "./beach/teal moon.png";
export { default as imgTealSun }       from "./beach/teal sun.png";
export { default as imgTealHibiscus }  from "./beach/teal hibiscus.png";
export { default as imgTealWave }      from "./beach/teal wave.png";
export { default as imgTealSeashell }  from "./beach/teal seashell.png";
export { default as imgTealIsland }    from "./beach/teal island.png";
export { default as imgTealTurtle }    from "./beach/teal turtle.png";
export { default as imgTealDolphin }   from "./beach/teal dolphin.png";

// ── Space icons (purple versions used in dark mode) ───────────────────────────
export { default as imgPurpleSun }          from "./space/purple sun.png";
export { default as imgMoon }               from "./space/moon.png";
export { default as imgPurpleMoon }         from "./space/purple moon.png";
export { default as imgPlanet }             from "./space/planet.png";
export { default as imgPurplePlanet }       from "./space/purple planet.png";
export { default as imgRocket }             from "./space/rocket.png";
export { default as imgPurpleRocket }       from "./space/purple rocket.png";
export { default as imgShootingStar }       from "./space/shooting star.png";
export { default as imgPurpleShootingStar } from "./space/purple shooting star.png";
export { default as imgSparkle }            from "./space/sparkle.png";
export { default as imgPurpleSparkle }      from "./space/purple sparkle.png";
export { default as imgStar }               from "./space/star.png";
export { default as imgPurpleStar }         from "./space/purple star.png";
export { default as imgUfo }                from "./space/ufo.png";
export { default as imgPurpleUfo }          from "./space/purple ufo.png";

// ── Contact icons ─────────────────────────────────────────────────────────────
export { default as imgEmail }          from "./contact/email.png";
export { default as imgTealEmail }      from "./contact/teal email.png";
export { default as imgPurpleEmail }    from "./contact/purple email.png";
export { default as imgLinkedin }       from "./contact/linkedin.png";
export { default as imgTealLinkedin }   from "./contact/teal linkedin.png";
export { default as imgPurpleLinkedin } from "./contact/purple linkedin.png";
export { default as imgGithub }         from "./contact/github.png";
export { default as imgTealGithub }     from "./contact/teal github.png";
export { default as imgPurpleGithub }   from "./contact/purple github.png";
