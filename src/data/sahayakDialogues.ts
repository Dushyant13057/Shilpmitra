import { SahayakMessage } from "@/types";

export const initialSahayakMessages: SahayakMessage[] = [
  {
    id: "m1",
    sender: "sahayak",
    text: "Namaskar! Aapke terracotta pottery ka naya order aaya hai. Kya aapke paas stock ready hai?",
    audioDuration: "0:04",
  },
  {
    id: "m2",
    sender: "artisan",
    text: "Haan, bilkul available hai. 2 pieces ready hain.",
    audioDuration: "0:03",
  },
  {
    id: "m3",
    sender: "sahayak",
    text: "Bahut badhiya! Product ko bubble wrap packing mein ready rakhiye. Hamara delivery partner kal subah 10 baje collect karega.",
    audioDuration: "0:06",
  },
];

export const regionalGreetings = [
  { lang: "Hindi", text: "नमस्ते, आज क्या मदद चाहिए?", audio: "Namaste" },
  { lang: "Bengali", text: "নমস্কার, আজ কীভাবে সাহায্য করতে পারি?", audio: "Nomoshkar" },
  { lang: "Telugu", text: "నమస్కారం, ఈరోజు ఎలా సహాయపడగలను?", audio: "Namaskaram" },
  { lang: "Tamil", text: "வணக்கம், இன்று நான் எவ்வாறு உதவ முடியும்?", audio: "Vanakkam" },
  { lang: "Marathi", text: "नमस्कार, आज कशी मदत करू शकतो?", audio: "Namaskar" },
];
