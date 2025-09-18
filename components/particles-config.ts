// src/components/particles-config.ts

import type { ISourceOptions } from "@tsparticles/engine";

const particlesConfig: ISourceOptions = {
  fullScreen: {
    enable: false,
    zIndex: 0,
  },
  particles: {
    number: {
      value: 150, // Um valor base
      density: {
        enable: true, // Apenas habilitamos, o cálculo é automático
      },
      limit: {
        value: 300, // Limita o número MÁXIMO de partículas na tela
      },
    },
    color: {
      value: "#00f6ff",
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: { min: 0.1, max: 0.5 },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: { // CORRIGIDO de 'line_linked' para 'links'
      enable: true,
      distance: 150,
      color: "#008b94",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1,
      direction: "none",
      outModes: { // CORRIGIDO de 'out_mode'
        default: "out",
      },
    },
  },
  interactivity: {
    detectsOn: "canvas", // CORRIGIDO de 'detect_on'
    events: {
      onHover: { // CORRIGIDO de 'onhover'
        enable: true,
        mode: "connect",
      },
      onClick: { // CORRIGIDO de 'onclick'
        enable: true,
        mode: "push",
      },
    },
    modes: {
      repulse: {
        distance: 100,
      },
    },
  },
  retina_detect: true,
};

export default particlesConfig;