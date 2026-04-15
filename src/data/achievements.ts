export type AchievementCategory = "general" | "tarot" | "ai";

export interface Achievement {
  id: string;
  emoji: string;
  name: string;
  description: string;
  category: AchievementCategory;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── General ──────────────────────────────────────────────
  { id: "general-it-begins", emoji: "\u{1F689}", name: "It Begins", description: "Be at 18 o'clock at Eeklo station", category: "general" },
  { id: "general-mentalist", emoji: "\u{1F9E0}", name: "The Mentalist", description: "Make 5 people say the word \"duif\" without you saying it first", category: "general" },
  { id: "general-pyromaniac", emoji: "\u{1F525}", name: "Pyromaniac", description: "Start a fire", category: "general" },
  { id: "general-cleptomaniac", emoji: "\u{1F90F}", name: "Cleptomaniac", description: "Lend 5 items without the person knowing", category: "general" },
  { id: "general-backwards", emoji: "\u23EA", name: "sdrawkcab", description: "Walk for 5 minutes backwards", category: "general" },
  { id: "general-pile-up", emoji: "\u{1FAA8}", name: "Pile Up", description: "Place 12 natural objects on a person", category: "general" },
  { id: "general-stalker", emoji: "\u{1F4F8}", name: "Stalker", description: "Capture a picture of every person without them knowing", category: "general" },
  { id: "general-influencer", emoji: "\u{1F4F1}", name: "Influencer", description: "Get an Instagram-worthy photo for 5 people", category: "general" },
  { id: "general-monkey", emoji: "\u{1F412}", name: "Monkey", description: "Climb 5 things and convince someone to try the route", category: "general" },
  { id: "general-animal-lover", emoji: "\u{1F43E}", name: "Animal Lover", description: "Pet 7 different animals", category: "general" },
  { id: "general-farmer", emoji: "\u{1F331}", name: "Farmer", description: "Plant 5 seeds", category: "general" },
  { id: "general-leadership", emoji: "\u{1F5FA}", name: "Leadership", description: "Lead 5 people the wrong way", category: "general" },
  { id: "general-trump", emoji: "\u{1F925}", name: "Trump Achievement", description: "Convince 5 people that a certain plant is a spider plant for its spiderlike nature (other fake facts also apply)", category: "general" },
  { id: "general-mind-magic", emoji: "\u{1F52E}", name: "Mind Magic", description: "Do a tarot reading on someone", category: "general" },

  // ── Tarot ────────────────────────────────────────────────
  { id: "tarot-fool", emoji: "\u{1F3A0}", name: "The Fool", description: "Trick someone using \"magic\"", category: "tarot" },
  { id: "tarot-high-priestess", emoji: "\u{1F52E}", name: "The High Priestess", description: "Make someone do your bidding", category: "tarot" },
  { id: "tarot-empress", emoji: "\u{1F451}", name: "The Empress", description: "Craft a crown from natural materials and crown someone with it", category: "tarot" },
  { id: "tarot-emperor", emoji: "\u{1FAA8}", name: "The Emperor", description: "Build a throne from natural materials and get someone to bow before it", category: "tarot" },
  { id: "tarot-hierophant", emoji: "\u{1F4AC}", name: "The Hierophant", description: "Have a meaningful or deep conversation or give some genuine advice", category: "tarot" },
  { id: "tarot-lovers", emoji: "\u{1F498}", name: "The Lovers", description: "Get a stranger's phone number", category: "tarot" },
  { id: "tarot-chariot", emoji: "\u{1F697}", name: "The Chariot", description: "Hitch a free ride from a stranger", category: "tarot" },
  { id: "tarot-strength", emoji: "\u{1F4AA}", name: "Strength", description: "Witness feet", category: "tarot" },
  { id: "tarot-hermit", emoji: "\u{1F4B0}", name: "The Hermit", description: "Sell something to someone", category: "tarot" },
  { id: "tarot-wheel", emoji: "\u{1F3B0}", name: "The Wheel of Fortune", description: "Win a gamble", category: "tarot" },
  { id: "tarot-justice", emoji: "\u{1F694}", name: "Justice", description: "Something with police", category: "tarot" },
  { id: "tarot-hangman", emoji: "\u{1F9D7}", name: "The Hangman", description: "Hang on a tree or bar for 1 minute", category: "tarot" },
  { id: "tarot-death", emoji: "\u{1F691}", name: "Death", description: "Spot a hospital or ambulance", category: "tarot" },
  { id: "tarot-devil", emoji: "\u{1F608}", name: "The Devil", description: "Do something evil", category: "tarot" },
  { id: "tarot-tower", emoji: "\u{1F333}", name: "The Tower", description: "Climb a tree until someone says \"get down from there\" or \"be careful\"", category: "tarot" },
  { id: "tarot-star", emoji: "\u2B50", name: "The Star", description: "Make a wish at a water source by throwing in a coin", category: "tarot" },
  { id: "tarot-moon", emoji: "\u{1F319}", name: "The Moon", description: "Recognise and show someone a constellation", category: "tarot" },
  { id: "tarot-sun", emoji: "\u2600\uFE0F", name: "The Sun", description: "Make someone look into the sun", category: "tarot" },
  { id: "tarot-world", emoji: "\u{1F30D}", name: "The World", description: "Take a picture with 10 town signs", category: "tarot" },
  { id: "tarot-chaos", emoji: "\u{1F300}", name: "Chaos", description: "Get the entire group to do something spontaneous in a public place", category: "tarot" },

  // ── AI ───────────────────────────────────────────────────
  { id: "ai-portrait", emoji: "\u{1F5BC}", name: "AI Portrait", description: "Generate an AI portrait of someone and show it to them", category: "ai" },
  { id: "ai-translator", emoji: "\u{1F30D}", name: "Lost in Translation", description: "Use AI to translate a full conversation with a stranger in another language", category: "ai" },
  { id: "ai-recipe", emoji: "\u{1F373}", name: "Chef GPT", description: "Cook a meal using only a recipe generated by AI from ingredients you have", category: "ai" },
  { id: "ai-song", emoji: "\u{1F3B5}", name: "Synthesizer", description: "Generate a song about the trip and play it for the group", category: "ai" },
  { id: "ai-story", emoji: "\u{1F4D6}", name: "Storyteller", description: "Have AI write a bedtime story about the group and read it out loud", category: "ai" },
  { id: "ai-guide", emoji: "\u{1F9ED}", name: "Robo Guide", description: "Use AI as a tour guide for a place you're visiting", category: "ai" },
  { id: "ai-debate", emoji: "\u{1F5E3}", name: "Devil's Advocate", description: "Have a heated debate where one person uses AI to argue their side", category: "ai" },
  { id: "ai-identify", emoji: "\u{1F33F}", name: "Nature Scanner", description: "Identify 10 different plants or animals using AI image recognition", category: "ai" },
  { id: "ai-predict", emoji: "\u{1F52E}", name: "The Oracle", description: "Ask AI to predict what will happen today and check if it was right", category: "ai" },
  { id: "ai-pickup", emoji: "\u{1F48C}", name: "Smooth Operator", description: "Use an AI-generated pickup line on a stranger", category: "ai" },
  { id: "ai-art", emoji: "\u{1F3A8}", name: "Digital Canvas", description: "Generate AI art of a landmark or scenery you encounter", category: "ai" },
  { id: "ai-deepfake", emoji: "\u{1F3AD}", name: "Face Swap", description: "Create a face swap or deepfake photo of the group", category: "ai" },
  { id: "ai-roast", emoji: "\u{1F525}", name: "Roast Master", description: "Get AI to write a personalized roast of every person in the group", category: "ai" },
  { id: "ai-navigation", emoji: "\u{1F4CD}", name: "Blind Trust", description: "Navigate for 30 minutes using only AI directions (no maps app)", category: "ai" },
  { id: "ai-poem", emoji: "\u{1F4DC}", name: "Bard 2.0", description: "Write a poem with AI about something you see and recite it dramatically", category: "ai" },
  { id: "ai-trivia", emoji: "\u{1F9E0}", name: "Quiz Master", description: "Host an AI-generated trivia round about the places you visit", category: "ai" },
  { id: "ai-impression", emoji: "\u{1F916}", name: "Turing Test", description: "Have someone text with AI and convince them it's a real person", category: "ai" },
  { id: "ai-workout", emoji: "\u{1F3CB}", name: "Personal Trainer", description: "Do a full workout routine generated by AI in a public place", category: "ai" },
  { id: "ai-dare", emoji: "\u{1F3B2}", name: "AI Dare", description: "Ask AI for a dare and actually do it", category: "ai" },
  { id: "ai-conspiracy", emoji: "\u{1F47D}", name: "Conspiracy Theory", description: "Get AI to generate a conspiracy theory about a local landmark and tell it to a stranger as fact", category: "ai" },
  { id: "ai-accent", emoji: "\u{1F399}", name: "Voice Clone", description: "Use AI voice cloning to send a voice message as someone else", category: "ai" },
  { id: "ai-itinerary", emoji: "\u{1F5D3}", name: "Travel Agent", description: "Let AI plan an entire day's itinerary and follow it without question", category: "ai" },
  { id: "ai-compliment", emoji: "\u{1F970}", name: "Flattery Engine", description: "Give 10 people AI-generated compliments and record their reactions", category: "ai" },
  { id: "ai-survival", emoji: "\u{1F3D5}", name: "Survival Mode", description: "Ask AI for wilderness survival tips and demonstrate one", category: "ai" },
  { id: "ai-logo", emoji: "\u{1F3F7}", name: "Brand Builder", description: "Generate an AI logo for the trip and get everyone to use it", category: "ai" },
];

export const GENERAL_ACHIEVEMENTS = ACHIEVEMENTS.filter(a => a.category === "general");
export const TAROT_ACHIEVEMENTS = ACHIEVEMENTS.filter(a => a.category === "tarot");
export const AI_ACHIEVEMENTS = ACHIEVEMENTS.filter(a => a.category === "ai");
