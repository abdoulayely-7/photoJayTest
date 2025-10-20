import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middlewares/auth.middleware';
import { requireRole } from '../middlewares/rbac.middleware';

const router = Router();
const prisma = new PrismaClient();

// GET /api/categories - Récupérer toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' }
    });
    res.json(categories);
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST /api/categories - Créer une nouvelle catégorie (Admin seulement)
router.post('/', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { name, description, icon, color } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Le nom de la catégorie est requis' });
    }

    const category = await prisma.category.create({
      data: {
        name: name.trim(),
        description: description?.trim(),
        icon: icon?.trim(),
        color: color?.trim(),
        isActive: true
      }
    });

    res.status(201).json(category);
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// PUT /api/categories/:id - Modifier une catégorie (Admin seulement)
router.put('/:id', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon, color, isActive } = req.body;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Le nom de la catégorie est requis' });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name.trim(),
        description: description?.trim(),
        icon: icon?.trim(),
        color: color?.trim(),
        isActive: isActive ?? true
      }
    });

    res.json(category);
  } catch (error) {
    console.error('Erreur lors de la modification de la catégorie:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// DELETE /api/categories/:id - Supprimer une catégorie (Admin seulement)
router.delete('/:id', authenticateToken, requireRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Vérifier si la catégorie est utilisée par des produits
    const productsCount = await prisma.product.count({
      where: { categoryId: id }
    });

    if (productsCount > 0) {
      return res.status(400).json({
        error: 'Impossible de supprimer cette catégorie car elle contient des produits'
      });
    }

    await prisma.category.delete({
      where: { id }
    });

    res.json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie:', error);
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Catégorie non trouvée' });
    }
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

export default router;