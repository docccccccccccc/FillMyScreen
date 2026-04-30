// Define word types first
export enum WordType {
  Acception = 'acc',
  Accompaniment = 'acco',
  Affirmation = 'aff',
  Appreciation = 'app',
  Encouragement = 'enc',
  SelfCompassion = 'scom',
  Soothing = 'soo',
}

// Then add labels
export const allWordTypeWithLabels = [
  {
    // 无条件的接纳
    label: 'Acception',
    value: WordType.Acception,
  },
  {
    // 陪伴
    label: 'Accompaniment',
    value: WordType.Accompaniment,
  },
  {
    // 自我价值肯定
    label: 'Affirmation',
    value: WordType.Affirmation,
  },
  {
    // 特质欣赏
    label: 'Appreciation',
    value: WordType.Appreciation,
  },
  {
    // 鼓励行动
    label: 'Encouragement',
    value: WordType.Encouragement,
  },
  {
    // 自我关怀
    label: 'Self-Compassion',
    value: WordType.SelfCompassion,
  },
  {
    // 情绪安抚
    label: 'Soothing',
    value: WordType.Soothing,
  },
]

// Then define an interface, with content and types
interface WordInfo {
  content: string
  types?: WordType[]
}

export const wordsWithWarmth: WordInfo[] = [
  {
    content: "I'm always here with you.",
    types: [WordType.Accompaniment],
  },
  {
    content: "You've done really great, truly.",
    types: [WordType.Affirmation],
  },
  {
    content: "No matter what, I think you're amazing.",
    types: [WordType.Affirmation],
  },
  {
    content: "You know? You look really charming when you're serious.",
    types: [WordType.Appreciation],
  },
  {
    content: "Rest is productive too. You're not a machine.",
    types: [WordType.SelfCompassion],
  },
  {
    content: "No matter what, I think you're amazing.",
    types: [WordType.Affirmation],
  },
]
