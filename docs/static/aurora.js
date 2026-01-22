// docs/static/aurora.js
// Aurora background effect (vanilla JS) — no React, no npm.
// Uses OGL via CDN. Requires WebGL2 for the #version 300 es shaders.

import { Renderer, Program, Mesh, Color, Triangle } from 'https://cdn.jsdelivr.net/npm/ogl@1.0.11/dist/ogl.mjs';

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform float uAmplitude;
uniform vec3 uColorStops[3];
uniform vec2 uResolution;
uniform float uBlend;
uniform float uOpacity;

out vec4 fragColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v){
  const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
      -0.577350269189626, 0.024390243902439
  );
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);

  vec3 p = permute(
      permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0)
  );

  vec3 m = max(
      0.5 - vec3(
          dot(x0, x0),
          dot(x12.xy, x12.xy),
          dot(x12.zw, x12.zw)
      ),
      0.0
  );
  m = m * m;
  m = m * m;

  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);

  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

struct ColorStop {
  vec3 color;
  float position;
};

#define COLOR_RAMP(colors, factor, finalColor) {              \
  int index = 0;                                              \
  for (int i = 0; i < 2; i++) {                               \
     ColorStop currentColor = colors[i];                      \
     bool isInBetween = currentColor.position <= factor;      \
     index = int(mix(float(index), float(i), float(isInBetween))); \
  }                                                           \
  ColorStop currentColor = colors[index];                     \
  ColorStop nextColor = colors[index + 1];                    \
  float range = nextColor.position - currentColor.position;   \
  float lerpFactor = (factor - currentColor.position) / range; \
  finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;

  ColorStop colors[3];
  colors[0] = ColorStop(uColorStops[0], 0.0);
  colors[1] = ColorStop(uColorStops[1], 0.5);
  colors[2] = ColorStop(uColorStops[2], 1.0);

  vec3 rampColor;
  COLOR_RAMP(colors, uv.x, rampColor);

  // Base shape
  float height = snoise(vec2(uv.x * 2.0 + uTime * 0.1, uTime * 0.25)) * 0.5 * uAmplitude;
  height = exp(height);
  height = (uv.y * 2.0 - height + 0.2);

  // More visible / "ReactBits-like" glow
  float intensity = 1.25 * height;
  float midPoint = 0.12;
  float auroraAlpha = smoothstep(midPoint - uBlend * 0.5, midPoint + uBlend * 0.5, intensity);

  float glow = pow(clamp(intensity, 0.0, 1.2), 1.35);
  vec3 auroraColor = glow * rampColor;

  auroraAlpha *= uOpacity;
  fragColor = vec4(auroraColor * auroraAlpha, auroraAlpha);
}
`;

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function stopsForTheme() {
  // Match your beach palette via CSS vars
  // Light: ocean + seafoam + sand
  // Dark:  ocean + seafoam + moonlight
  const isDark = document.documentElement.classList.contains('dark');
  const a1 = cssVar('--accent') || '#0B5C6B';
  const a2 = cssVar('--accent2') || '#73D7C6';
  return isDark ? [a1, a2, '#F8FAFF'] : [a1, a2, '#F0D6A5'];
}

function toRGB(hex) {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}

export function mountAurora(targetId = 'aurora', opts = {}) {
  const ctn = document.getElementById(targetId);
  if (!ctn) return () => {};

  // WebGL2 required because shader uses #version 300 es
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl2', {
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    preserveDrawingBuffer: false,
  });

  if (!gl) {
    console.warn('[Aurora] WebGL2 not available.');
    return () => {};
  }

  const renderer = new Renderer({
    canvas,
    context: gl,
    alpha: true,
    premultipliedAlpha: true,
    antialias: true,
    dpr: Math.min(2, window.devicePixelRatio || 1),
  });

  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  canvas.style.backgroundColor = 'transparent';

  const geometry = new Triangle(gl);
  if (geometry.attributes.uv) delete geometry.attributes.uv;

  let program;

  function buildStops() {
    const explicit = Array.isArray(opts.colorStops) && opts.colorStops.length >= 3;
    const stops = explicit ? opts.colorStops.slice(0, 3) : stopsForTheme();
    return stops.map(toRGB);
  }

  function resize() {
    const width = ctn.clientWidth;
    const height = ctn.clientHeight;
    renderer.setSize(width, height);
    if (program) program.uniforms.uResolution.value = [width, height];
  }
  window.addEventListener('resize', resize);

  program = new Program(gl, {
    vertex: VERT,
    fragment: FRAG,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: opts.amplitude ?? 1.35 },
      uColorStops: { value: buildStops() },
      uResolution: { value: [ctn.clientWidth, ctn.clientHeight] },
      uBlend: { value: opts.blend ?? 0.75 },
      uOpacity: { value: opts.opacity ?? 0.85 },
    },
  });

  const mesh = new Mesh(gl, { geometry, program });
  ctn.appendChild(canvas);

  const speed = opts.speed ?? 0.85;
  let raf = 0;

  const tick = (t) => {
    raf = requestAnimationFrame(tick);
    program.uniforms.uTime.value = (t * 0.001) * speed;
    renderer.render({ scene: mesh });
  };
  raf = requestAnimationFrame(tick);

  resize();

  // If your theme toggle flips the `dark` class, update colors automatically
  const observer = new MutationObserver(() => {
    program.uniforms.uColorStops.value = buildStops();
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  return () => {
    cancelAnimationFrame(raf);
    observer.disconnect();
    window.removeEventListener('resize', resize);
    if (ctn && canvas.parentNode === ctn) ctn.removeChild(canvas);
    gl.getExtension('WEBGL_lose_context')?.loseContext();
  };
}