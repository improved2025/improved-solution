export const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

export const fade = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.9,
      ease,
    },
  },
};

export const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};
