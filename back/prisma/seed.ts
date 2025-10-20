import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Vérifier si un admin existe déjà
  const existingAdmin = await prisma.user.findFirst({
    where: { role: 'ADMIN' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 12);

  // Créer un utilisateur admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@fotoljay.com',
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'FOTOLJAY',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created successfully:', admin.email);

  // Créer un utilisateur modérateur
  const hashedPasswordMod = await bcrypt.hash('moderator123', 12);
  const moderator = await prisma.user.create({
    data: {
      email: 'moderator@fotoljay.com',
      password: hashedPasswordMod,
      firstName: 'Moderator',
      lastName: 'FOTOLJAY',
      role: 'MODERATOR',
    },
  });

  console.log('✅ Moderator user created successfully:', moderator.email);

  // Créer un vendeur de test
  const hashedPasswordSeller = await bcrypt.hash('vendeur123', 12);
  const seller = await prisma.user.create({
    data: {
      email: 'vendeur@vendeur.com',
      password: hashedPasswordSeller,
      firstName: 'Jean',
      lastName: 'Dupont',
      role: 'SELLER',
    },
  });

  console.log('✅ Seller user created successfully:', seller.email);

  // Créer quelques catégories de test
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Téléphones',
        description: 'Smartphones et mobiles',
        icon: 'Smartphone',
        color: '#3b82f6',
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Ordinateurs',
        description: 'Ordinateurs portables et fixes',
        icon: 'Monitor',
        color: '#10b981',
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Électronique',
        description: 'Appareils électroniques divers',
        icon: 'Zap',
        color: '#f59e0b',
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Vêtements',
        description: 'Vêtements et accessoires',
        icon: 'Shirt',
        color: '#ef4444',
        isActive: true
      }
    }),
    prisma.category.create({
      data: {
        name: 'Maison & Jardin',
        description: 'Articles pour la maison et le jardin',
        icon: 'Home',
        color: '#8b5cf6',
        isActive: true
      }
    })
  ]);

  console.log('✅ Categories created successfully');

  // Créer quelques produits de test pour le vendeur
  const product1 = await prisma.product.create({
    data: {
      title: 'iPhone 12 Pro 128GB',
      description: 'Excellent état, comme neuf. Vendu avec boîte et accessoires.',
      price: 599.99,
      categoryId: categories[0].id, // Téléphones
      sellerId: seller.id,
      status: 'PENDING',
      photos: {
        create: [
          { url: 'https://via.placeholder.com/400x400?text=Photo+1', publicId: 'test1' },
          { url: 'https://via.placeholder.com/400x400?text=Photo+2', publicId: 'test2' },
        ],
      },
    },
  });

  const product2 = await prisma.product.create({
    data: {
      title: 'MacBook Pro M1 13"',
      description: 'Ordinateur portable Apple en parfait état. Idéal pour le travail et les études.',
      price: 1299.99,
      categoryId: categories[1].id, // Ordinateurs
      sellerId: seller.id,
      status: 'APPROVED',
      publishedAt: new Date(),
      photos: {
        create: [
          { url: 'https://via.placeholder.com/400x400?text=MacBook+1', publicId: 'mac1', isPrimary: true },
          { url: 'https://via.placeholder.com/400x400?text=MacBook+2', publicId: 'mac2' },
        ],
      },
    },
  });

  const product3 = await prisma.product.create({
    data: {
      title: 'Samsung Galaxy S21',
      description: 'Smartphone Samsung en très bon état. Batterie 95%.',
      price: 349.99,
      categoryId: categories[0].id, // Téléphones
      sellerId: seller.id,
      status: 'REJECTED',
      photos: {
        create: [
          { url: 'https://via.placeholder.com/400x400?text=Samsung+1', publicId: 'samsung1' },
        ],
      },
    },
  });

  console.log('✅ Test products created successfully');

  console.log('\n📋 Résumé des utilisateurs créés:');
  console.log('================================');
  console.log('Admin: admin@fotoljay.com / admin123');
  console.log('Moderator: moderator@fotoljay.com / moderator123');
  console.log('Seller: vendeur@vendeur.com / vendeur123');
  console.log('\n📦 Produits de test créés:');
  console.log('- iPhone 12 Pro (En attente)');
  console.log('- MacBook Pro (Approuvé)');
  console.log('- Samsung Galaxy (Rejeté)');
  console.log('\n💡 Note: Les vendeurs publient sans compte!');
  console.log('Les acheteurs consultent sans connexion!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });