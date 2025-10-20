import { z } from 'zod';

// Schéma de validation pour le formulaire de connexion
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Format d\'email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères')
    .max(100, 'Le mot de passe ne peut pas dépasser 100 caractères')
});

// Schéma de validation pour le formulaire de création de produit
export const productSchema = z.object({
  title: z
    .string()
    .min(3, 'Le titre doit contenir au moins 3 caractères')
    .max(100, 'Le titre ne peut pas dépasser 100 caractères'),
  description: z
    .string()
    .min(10, 'La description doit contenir au moins 10 caractères')
    .max(1000, 'La description ne peut pas dépasser 1000 caractères'),
  price: z
    .number()
    .min(0.01, 'Le prix doit être supérieur à 0')
    .max(999999.99, 'Le prix ne peut pas dépasser 999 999,99 €'),
  categoryId: z
    .string()
    .min(1, 'Veuillez sélectionner une catégorie'),
  photos: z
    .array(z.any())
    .min(1, 'Au moins une photo est requise')
    .max(5, 'Maximum 5 photos autorisées'),
  sellerFirstName: z
    .string()
    .min(1, 'Le prénom du vendeur est requis')
    .max(50, 'Le prénom ne peut pas dépasser 50 caractères'),
  sellerLastName: z
    .string()
    .min(1, 'Le nom du vendeur est requis')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  sellerEmail: z
    .string()
    .min(1, 'L\'email du vendeur est requis')
    .email('Format d\'email invalide')
    .max(255, 'L\'email ne peut pas dépasser 255 caractères'),
  sellerPhone: z
    .string()
    .max(20, 'Le téléphone ne peut pas dépasser 20 caractères')
    .optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
