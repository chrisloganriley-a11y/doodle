// The launch lineup. Paths are copied as drawn from brand/assets/drawings/.
// Tasting notes are placeholders until the roaster picks the beans.

export type Roast = {
  id: "daydream" | "the-usual" | "late-show";
  name: string;
  level: string;
  moment: string;
  tastesLike: string;
  bestFor: string;
  drawingLabel: string;
  drawing: string;
};

export const roasts: Roast[] = [
  {
    id: "daydream",
    name: "daydream",
    level: "light-medium roast, always rotating",
    moment:
      "The one that wanders. A new light-medium coffee every few months, wherever the beans take us next. Same bird, different sky. Brew it slowly and let your mind go somewhere.",
    tastesLike: "changes with each new coffee. usually bright, a little sweet, sometimes floral. the bag tells you which one you got.",
    bestFor: "drip, pour-over",
    drawingLabel: "a bird in flight, drawn in one line",
    drawing:
      "M 10 106 C 26 102, 40 104, 48 110 C 54 115, 50 122, 44 119 C 38 116, 46 108, 58 108 C 74 108, 84 122, 104 114 C 114 110, 118 100, 124 95 C 130 90, 140 92, 140 99 C 144 100, 147 101, 150 103 C 146 104, 142 105, 139 105 C 134 108, 126 104, 124 98 C 116 84, 110 54, 122 20 C 104 44, 98 72, 102 100 C 92 80, 70 58, 40 50 C 54 72, 70 92, 86 104",
  },
  {
    id: "the-usual",
    name: "the usual",
    level: "house blend",
    moment:
      "The one you don't have to think about. Chocolatey and steady, good on its own or under a lot of milk.",
    tastesLike: "milk chocolate, hazelnut, caramel",
    bestFor: "espresso on its own, or in a latte",
    drawingLabel: "a mug with looping steam, drawn in one line",
    drawing:
      "M 70 62 C 60 52, 80 46, 70 36 C 62 28, 74 18, 84 22 C 92 26, 86 36, 80 32 C 76 28, 82 20, 92 18 M 70 62 C 60 64, 46 64, 36 66 C 34 90, 36 116, 48 130 C 66 134, 92 134, 108 130 C 116 118, 120 96, 118 70 C 104 66, 86 64, 70 62 M 118 80 C 136 74, 146 104, 116 108 M 20 138 C 50 134, 110 134, 140 138",
  },
  {
    id: "late-show",
    name: "late show",
    level: "decaf",
    moment:
      "The late cup that still lets you sleep. All of the coffee, none of the buzz.",
    tastesLike: "whatever the beans turn out to be, minus the caffeine. notes soon.",
    bestFor: "after dinner, or whenever you want one more",
    drawingLabel: "a crescent moon and a star, drawn in one line",
    drawing:
      "M 96 26 C 60 30, 40 64, 52 98 C 62 126, 98 138, 124 120 C 96 122, 74 100, 76 72 C 78 52, 86 38, 96 26 C 100 22, 106 24, 104 30 C 102 34, 96 32, 98 28 M 118 46 C 120 54, 122 58, 130 60 C 122 62, 120 66, 118 74 C 116 66, 114 62, 106 60 C 114 58, 116 54, 118 46",
  },
];
