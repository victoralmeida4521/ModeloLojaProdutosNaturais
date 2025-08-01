// Ensure window.PRODUCTS is defined before any scripts try to use it
window.PRODUCTS = [
    {
      id: 'oleo-lavanda',
      name: 'Óleo Essencial de Lavanda',
      description: '100% puro e natural',
      price: 89.90,
      weight: 100,
      category: 'oleos',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cha-verde',
      name: 'Chá Verde Orgânico',
      description: 'Antioxidantes naturais',
      price: 45.90,
      weight: 250,
      category: 'chas',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'mel-silvestre',
      name: 'Mel Silvestre',
      description: 'Puro e orgânico',
      price: 35.90,
      weight: 500,
      category: 'mel',
      image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sabonete-artesanal',
      name: 'Sabonete Artesanal',
      description: 'Com ingredientes naturais',
      price: 25.90,
      weight: 100,
      category: 'cosmeticos',
      image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'shampoo-natural',
      name: 'Shampoo Natural',
      description: 'Livre de químicos',
      price: 42.90,
      weight: 300,
      category: 'cosmeticos',
      image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'creme-hidratante',
      name: 'Creme Hidratante',
      description: 'Com manteiga de karité',
      price: 55.90,
      weight: 200,
      category: 'cosmeticos',
      image: 'https://images.unsplash.com/photo-1556229181-695de8c22df0?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'oleo-tea-tree',
      name: 'Óleo Essencial de Tea Tree',
      description: 'Propriedades antisépticas',
      price: 65.90,
      weight: 100,
      category: 'oleos',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cha-camomila',
      name: 'Chá de Camomila',
      description: 'Calmante natural',
      price: 32.90,
      weight: 200,
      category: 'chas',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'mel-eucalipto',
      name: 'Mel de Eucalipto',
      description: 'Rico em propriedades medicinais',
      price: 42.90,
      weight: 500,
      category: 'mel',
      image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sabonete-rosa',
      name: 'Sabonete de Rosa',
      description: 'Pétalas naturais',
      price: 28.90,
      weight: 100,
      category: 'cosmeticos',
      image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'oleo-eucalipto',
      name: 'Óleo Essencial de Eucalipto',
      description: 'Purificante natural',
      price: 59.90,
      weight: 100,
      category: 'oleos',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cha-hibisco',
      name: 'Chá de Hibisco',
      description: 'Rico em antioxidantes',
      price: 38.90,
      weight: 200,
      category: 'chas',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'oleo-alecrim',
      name: 'Óleo Essencial de Alecrim',
      description: 'Estimulante natural',
      price: 62.90,
      weight: 100,
      category: 'oleos',
      image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'cha-hortelã',
      name: 'Chá de Hortelã',
      description: 'Refrescante e digestivo',
      price: 34.90,
      weight: 200,
      category: 'chas',
      image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'mel-laranjeira',
      name: 'Mel de Laranjeira',
      description: 'Doce e aromático',
      price: 39.90,
      weight: 500,
      category: 'mel',
      image: 'https://images.unsplash.com/photo-1601055283742-8b27e81b5553?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'sabonete-calendula',
      name: 'Sabonete de Calêndula',
      description: 'Suave e hidratante',
      price: 27.90,
      weight: 100,
      category: 'cosmeticos',
      image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&w=600&q=80'
    }
  ];
  
  // Notify when products are loaded
  document.dispatchEvent(new Event('productsLoaded'));