export interface Ingredient {
    id: string;
    name: string;
    category: 'vegetables' | 'fruits' | 'meat' | 'dairy' | 'grains' | 'other';
    imageUrl: string;
    quantity: number;
    unit: 'grams' | 'pieces' | 'cups' | 'ml' | 'kg';
    expiryDate: Date;
    addedDate: Date;
  }
  
  export const UNITS = ['grams', 'pieces', 'cups', 'ml', 'kg'] as const;
  
  export const CATEGORIES = [
    'vegetables',
    'fruits',
    'meat',
    'dairy',
    'grains',
    'other'
  ] as const;
  
  // Common ingredients with images
  export const COMMON_INGREDIENTS = [
    {
      id: 'tomato',
      name: 'Tomato',
      category: 'vegetables',
      imageUrl: '/api/placeholder/200/200', // Placeholder for now
      defaultUnit: 'pieces'
    },
    {
      id: 'potato',
      name: 'Potato',
      category: 'vegetables',
      imageUrl: '/api/placeholder/200/200',
      defaultUnit: 'pieces'
    },
    // Add more common ingredients here
  ] as const;