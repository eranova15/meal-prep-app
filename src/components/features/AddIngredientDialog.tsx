import React, { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { COMMON_INGREDIENTS, UNITS, type Ingredient } from '@/types/ingredients';

interface AddIngredientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (ingredient: Ingredient) => void;
}

export function AddIngredientDialog({ isOpen, onClose, onAdd }: AddIngredientDialogProps) {
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('pieces');
  const [expiryDays, setExpiryDays] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const commonIngredient = COMMON_INGREDIENTS.find(i => i.id === selectedIngredient);
    if (!commonIngredient) return;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));

    const newIngredient: Ingredient = {
      id: `${selectedIngredient}-${Date.now()}`,
      name: commonIngredient.name,
      category: commonIngredient.category,
      imageUrl: commonIngredient.imageUrl,
      quantity: parseInt(quantity),
      unit: unit as typeof UNITS[number],
      expiryDate,
      addedDate: new Date()
    };

    onAdd(newIngredient);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Ingredient">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {COMMON_INGREDIENTS.map((ingredient) => (
            <div
              key={ingredient.id}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedIngredient === ingredient.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedIngredient(ingredient.id)}
            >
              <img
                src={ingredient.imageUrl}
                alt={ingredient.name}
                className="w-full h-32 object-cover rounded-md mb-2"
              />
              <p className="text-center font-medium">{ingredient.name}</p>
            </div>
          ))}
        </div>

        <Input
          label="Quantity"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />

        <Select
          label="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          options={UNITS.map(unit => ({ value: unit, label: unit }))}
        />

        <Input
          label="Days until expiry"
          type="number"
          value={expiryDays}
          onChange={(e) => setExpiryDays(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Ingredient
          </Button>
        </div>
      </form>
    </Modal>
  );
}