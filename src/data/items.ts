export type KitItem = {
  id: string
  label: string
}

export const KIT_ITEMS: KitItem[] = [
  { id: 'adhesive-bandages', label: 'Adhesive bandages (assorted sizes)' },
  { id: 'sterile-gauze', label: 'Sterile gauze pads' },
  { id: 'medical-tape', label: 'Adhesive medical tape' },
  { id: 'antiseptic-wipes', label: 'Antiseptic wipes' },
  { id: 'antibiotic-ointment', label: 'Antibiotic ointment' },
  { id: 'alcohol-prep', label: 'Alcohol prep pads' },
  { id: 'disposable-gloves', label: 'Disposable medical gloves (nitrile or latex-free)' },
  { id: 'elastic-bandage', label: 'Elastic bandage (ACE wrap)' },
  { id: 'tweezers', label: 'Tweezers' },
  { id: 'small-scissors', label: 'Small scissors' },
  { id: 'cold-pack', label: 'Instant cold pack' },
  { id: 'cotton', label: 'Cotton balls or cotton swabs' },
  { id: 'pain-relievers', label: 'Pain relievers (acetaminophen or ibuprofen)' },
  { id: 'antihistamine', label: 'Antihistamine tablets' },
  { id: 'hydrocortisone', label: 'Hydrocortisone cream' },
  { id: 'burn-relief', label: 'Burn relief gel or ointment' },
  { id: 'eye-wash', label: 'Eye wash or saline solution' },
  { id: 'cpr-mask', label: 'CPR face shield or mask' },
  { id: 'thermometer', label: 'Digital or disposable thermometer' },
  { id: 'safety-pins', label: 'Safety pins' },
  { id: 'finger-splint', label: 'Finger splint' },
  { id: 'blister-treatment', label: 'Blister treatment (moleskin or blister pads)' },
  { id: 'sting-relief', label: 'Sting relief wipes' },
  { id: 'instruction-booklet', label: 'First aid instruction booklet' },
  { id: 'emergency-contact', label: 'Emergency contact card or notepad' },
]

export const NOTES_MAX_LENGTH = 84
