import {
  Component,
  signal,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import Swal from 'sweetalert2';
import { LucideAngularModule, Camera, X, AlertCircle, CheckCircle, User, LogIn, Home, LogOut, Menu, Palette, LayoutDashboard, Package, Plus, Edit, Trash2, Calendar, Eye, Save, Image, Type, FileText, RotateCcw, Clock, Settings, Lock } from 'lucide-angular';
import { z } from 'zod';
import { Product, ProductStatus, Category } from '../../models/product.model';
import { productSchema } from '../../schemas/login.schema';

@Component({
  selector: 'app-sell',
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './sell.html',
  styleUrls: ['./sell.css'],
})
export class SellComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private apiService = inject(ApiService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  readonly Camera = Camera;
  readonly X = X;
  readonly AlertCircle = AlertCircle;
  readonly CheckCircle = CheckCircle;
  readonly User = User;
  readonly LogIn = LogIn;
  readonly Home = Home;
  readonly LogOut = LogOut;
  readonly Menu = Menu;
  readonly Palette = Palette;
  readonly LayoutDashboard = LayoutDashboard;
  readonly Package = Package;
  readonly Plus = Plus;
  readonly Edit = Edit;
  readonly Trash2 = Trash2;
  readonly Calendar = Calendar;
  readonly Eye = Eye;
  readonly Save = Save;
  readonly Image = Image;
  readonly Type = Type;
  readonly FileText = FileText;
  readonly RotateCcw = RotateCcw;
  readonly Clock = Clock;
  readonly Settings = Settings;
  readonly Lock = Lock;

  isAuthenticated = signal<boolean>(false);
  currentUser = signal<any>(null);

  photos = signal<File[]>([]);
  photoPreviewUrls = signal<string[]>([]);
  maxPhotos = 5;

  title = signal<string>('');
  description = signal<string>('');
  price = signal<number>(0);
  selectedCategoryId = signal<string>('');

  categories = signal<Category[]>([]);

  // Informations vendeur (éditables)
  sellerFirstName = signal<string>('');
  sellerLastName = signal<string>('');
  sellerEmail = signal<string>('');
  sellerPhone = signal<string>('');

  submitting = signal<boolean>(false);
  showCamera = signal<boolean>(false);
  mobileMenuOpen = signal<boolean>(false);
  currentView = signal<'sell' | 'dashboard' | 'profile'>('sell');
  sellerProducts = signal<Product[]>([]);
  selectedStatusFilter = signal<string>('ALL');
  selectedProduct = signal<Product | null>(null);
  showProductModal = signal<boolean>(false);
  stream: MediaStream | null = null;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      if (token && user) {
        // Vérifier la validité du token côté serveur
        this.apiService.getCurrentUser().subscribe({
          next: (userData) => {
            this.isAuthenticated.set(true);
            this.currentUser.set(userData);

            // Initialiser les informations vendeur avec les données utilisateur
            this.sellerFirstName.set(userData.firstName || '');
            this.sellerLastName.set(userData.lastName || '');
            this.sellerEmail.set(userData.email || '');
            this.sellerPhone.set('');

            // Charger les catégories et les produits du vendeur
            this.loadCategories();
            this.loadSellerProducts();
          },
          error: () => {
            // Token invalide ou expiré
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            this.toastService.warning('Votre session a expiré. Veuillez vous reconnecter.');
            this.router.navigate(['/seller-auth']);
          }
        });
      } else {
        this.toastService.warning('Vous devez être connecté pour accéder à votre espace vendeur');
        this.router.navigate(['/seller-auth']);
      }
    }
  }

  ngOnDestroy(): void {
    this.closeCamera();
  }

  setView(view: 'sell' | 'dashboard' | 'profile'): void {
    this.currentView.set(view);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  loadCategories(): void {
    this.apiService.getCategories().subscribe({
      next: (categories: Category[]) => {
        this.categories.set(categories);
      },
      error: (error: any) => {
        console.error('Erreur lors du chargement des catégories:', error);
        this.toastService.error('Erreur lors du chargement des catégories');
      }
    });
  }

  loadSellerProducts(): void {
    this.apiService.getSellerProducts().subscribe({
      next: (products: Product[]) => {
        this.sellerProducts.set(products);
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
        this.toastService.error('Erreur lors du chargement de vos produits');
      }
    });
  }

  getStatusLabel(status: string): string {
    const statusMap: { [key: string]: string } = {
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté'
    };
    return statusMap[status] || status;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  getActiveProductsCount(): number {
    return this.sellerProducts().filter(p => p.status === ProductStatus.APPROVED).length;
  }

  getTotalViews(): number {
    return this.sellerProducts().reduce((total, product) => total + (product.views || 0), 0);
  }

  setStatusFilter(status: string): void {
    this.selectedStatusFilter.set(status);
  }

  getProductsByStatus(status: string): Product[] {
    if (status === 'ALL') {
      return this.sellerProducts();
    }
    return this.sellerProducts().filter(product => product.status === status);
  }

  getFilteredProducts(): Product[] {
    const filter = this.selectedStatusFilter();
    return this.getProductsByStatus(filter);
  }

  // trackBy function for ngFor to improve rendering performance
  trackByProductId(_: number, product: Product): string | number {
    return product.id ?? _;
  }

  viewProductDetails(product: Product): void {
    this.selectedProduct.set(product);
    this.showProductModal.set(true);
  }

  closeProductModal(): void {
    this.showProductModal.set(false);
    this.selectedProduct.set(null);
  }

  resetForm(): void {
    this.title.set('');
    this.description.set('');
    this.price.set(0);
    this.selectedCategoryId.set('');
    this.photos.set([]);
    this.photoPreviewUrls.set([]);
    this.toastService.info('Formulaire réinitialisé');
  }

  updateProfile(): void {
    // Ici on pourrait implémenter la mise à jour du profil vendeur
    this.toastService.success('Profil mis à jour avec succès');
  }

  editProduct(): void {
    // Ici on pourrait implémenter l'édition d'un produit
    this.toastService.info('Fonctionnalité d\'édition à venir');
  }

  deleteProduct(product: Product): void {
    Swal.fire({
      title: 'Supprimer le produit',
      text: `Êtes-vous sûr de vouloir supprimer "${product.title}" ? Cette action est irréversible.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Temporairement désactivé jusqu'à implémentation de l'API
        Swal.fire({
          title: 'Fonctionnalité à venir',
          text: 'La suppression de produits sera bientôt disponible',
          icon: 'info'
        });
      }
    });
  }

  async openCamera(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.photos().length >= this.maxPhotos) {
      this.toastService.warning(`Maximum ${this.maxPhotos} photos autorisées`);
      return;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });

      this.showCamera.set(true);

      setTimeout(() => {
        if (this.videoElement?.nativeElement) {
          this.videoElement.nativeElement.srcObject = this.stream;
        }
      }, 100);
    } catch (error) {
      console.error('Erreur accès caméra:', error);
      this.toastService.error(
        "Impossible d'accéder à la caméra. Veuillez autoriser l'accès à la caméra dans les paramètres de votre navigateur."
      );
    }
  }

  capturePhoto(): void {
    if (!this.videoElement?.nativeElement || !this.canvasElement?.nativeElement) return;

    const video = this.videoElement.nativeElement;
    const canvas = this.canvasElement.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });

          const newPhotos = [...this.photos(), file];
          this.photos.set(newPhotos);

          const reader = new FileReader();
          reader.onload = (e) => {
            const newUrls = [...this.photoPreviewUrls(), e.target?.result as string];
            this.photoPreviewUrls.set(newUrls);
          };
          reader.readAsDataURL(file);

          this.closeCamera();
        }
      },
      'image/jpeg',
      0.9
    );
  }

  closeCamera(): void {
    if (this.stream) {
      this.stream.getTracks().forEach((track: MediaStreamTrack) => track.stop());
      this.stream = null;
    }
    this.showCamera.set(false);
  }

  removePhoto(index: number): void {
    const photos = this.photos().filter((_, i) => i !== index);
    const urls = this.photoPreviewUrls().filter((_, i) => i !== index);
    this.photos.set(photos);
    this.photoPreviewUrls.set(urls);
  }

  onSubmit(): void {
    const validationResult = productSchema.safeParse({
      title: this.title(),
      description: this.description(),
      price: this.price(),
      categoryId: this.selectedCategoryId(),
      photos: this.photos(),
      sellerFirstName: this.sellerFirstName(),
      sellerLastName: this.sellerLastName(),
      sellerEmail: this.sellerEmail(),
      sellerPhone: this.sellerPhone(),
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      this.toastService.error(firstError.message);
      return;
    }

    // Vérifier que l'utilisateur est toujours authentifié
    if (!this.isAuthenticated()) {
      this.toastService.error('Vous devez être connecté pour publier un produit');
      this.router.navigate(['/seller-auth']);
      return;
    }

    this.submitting.set(true);

    const formData = new FormData();
    formData.append('title', this.title());
    formData.append('description', this.description());
    formData.append('price', this.price().toString());
    formData.append('categoryId', this.selectedCategoryId());

    // Ajouter les informations vendeur
    formData.append('sellerFirstName', this.sellerFirstName());
    formData.append('sellerLastName', this.sellerLastName());
    formData.append('sellerEmail', this.sellerEmail());
    formData.append('sellerPhone', this.sellerPhone());

    this.photos().forEach((photo) => {
      formData.append('photos', photo);
    });

    this.apiService.createProduct(formData).subscribe({
      next: () => {
        this.toastService.success('Produit publié avec succès! Il sera visible après modération.');
        this.resetForm();
        // Recharger les produits pour mettre à jour le dashboard
        this.loadSellerProducts();
        // Basculer vers le dashboard pour voir le nouveau produit
        this.setView('dashboard');
      },
      error: (error: any) => {
        console.error('Erreur:', error);
        this.toastService.error(
          'Erreur lors de la publication: ' + (error.error?.error || error.message)
        );
        this.submitting.set(false);
      },
    });
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.toastService.success('Déconnexion réussie');
      this.router.navigate(['/']);
    }
  }
}
