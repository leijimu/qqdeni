export interface Message {
  id: string;
  to: string;
  content: string; // The private content
  from: string; // "Anonymous" or nickname
  timestamp: number;
  style: number; // 0-5 for random variations (rotation/color nuance)
  isPlaceholder?: boolean; // If true, it's a pre-filled "other user" message (content hidden)
}

// Form data can have optional 'from' which defaults to "Anonymous" on save
export interface MessageFormData {
  to: string;
  content: string;
  from?: string;
}
