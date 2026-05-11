export type KitItem = {
  id: string
  label: string
}

export type KitCategory = {
  id: string
  title: string
  items: KitItem[]
}

/** Grouped checklist — expand each section to select items. */
export const KIT_CATEGORIES: KitCategory[] = [
  {
    id: 'bandages-wraps',
    title: 'Bandages & wraps',
    items: [
      { id: 'adhesive-bandages', label: 'Adhesive bandages (assorted sizes)' },
      { id: 'sterile-gauze', label: 'Sterile gauze pads' },
      { id: 'medical-tape', label: 'Adhesive medical tape' },
      { id: 'elastic-bandage', label: 'Elastic bandage (ACE wrap)' },
    ],
  },
  {
    id: 'antiseptics-cleansing',
    title: 'Antiseptics & cleansing',
    items: [
      { id: 'antiseptic-wipes', label: 'Antiseptic wipes' },
      { id: 'alcohol-prep', label: 'Alcohol prep pads' },
      { id: 'antibiotic-ointment', label: 'Antibiotic ointment' },
      { id: 'eye-wash', label: 'Eye wash or saline solution' },
    ],
  },
  {
    id: 'topical-treatments',
    title: 'Topical treatments',
    items: [
      { id: 'hydrocortisone', label: 'Hydrocortisone cream' },
      { id: 'burn-relief', label: 'Burn relief gel or ointment' },
      { id: 'blister-treatment', label: 'Blister treatment (moleskin or blister pads)' },
      { id: 'sting-relief', label: 'Sting relief wipes' },
    ],
  },
  {
    id: 'oral-medications',
    title: 'Oral medications',
    items: [
      { id: 'pain-relievers', label: 'Pain relievers (acetaminophen or ibuprofen)' },
      { id: 'antihistamine', label: 'Antihistamine tablets' },
    ],
  },
  {
    id: 'tools-protection',
    title: 'Tools & protection',
    items: [
      { id: 'disposable-gloves', label: 'Disposable medical gloves (nitrile or latex-free)' },
      { id: 'tweezers', label: 'Tweezers' },
      { id: 'small-scissors', label: 'Small scissors' },
      { id: 'thermometer', label: 'Digital or disposable thermometer' },
      { id: 'safety-pins', label: 'Safety pins' },
      { id: 'cpr-mask', label: 'CPR face shield or mask' },
    ],
  },
  {
    id: 'comfort-support',
    title: 'Comfort & support',
    items: [
      { id: 'cold-pack', label: 'Instant cold pack' },
      { id: 'cotton', label: 'Cotton balls or cotton swabs' },
      { id: 'finger-splint', label: 'Finger splint' },
    ],
  },
  {
    id: 'reference',
    title: 'Reference',
    items: [
      { id: 'instruction-booklet', label: 'First aid instruction booklet' },
      { id: 'emergency-contact', label: 'Emergency contact card or notepad' },
    ],
  },
]

/** Flat list of every item (e.g. Select all). */
export const ALL_KIT_ITEMS: KitItem[] = KIT_CATEGORIES.flatMap((c) => c.items)

export const NOTES_MAX_LENGTH = 84
