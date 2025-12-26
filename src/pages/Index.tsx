import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  category: 'clothes' | 'jewelry';
  image: string;
  description: string;
}

interface Tailor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  image: string;
  rating: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState('home');

  const products: Product[] = [
    { id: 1, name: 'Стильная куртка', price: 8500, category: 'clothes', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/771303f0-544d-44e8-afcf-adfee8994fc6.jpg', description: 'Яркая куртка с современным дизайном' },
    { id: 2, name: 'Дизайнерское платье', price: 12000, category: 'clothes', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/771303f0-544d-44e8-afcf-adfee8994fc6.jpg', description: 'Элегантное вечернее платье' },
    { id: 3, name: 'Колье "Сияние"', price: 3500, category: 'jewelry', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/211e8de2-5df1-43cc-b374-8cd7a932b6e6.jpg', description: 'Handmade украшение с камнями' },
    { id: 4, name: 'Серьги "Радуга"', price: 2200, category: 'jewelry', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/211e8de2-5df1-43cc-b374-8cd7a932b6e6.jpg', description: 'Яркие серьги ручной работы' },
    { id: 5, name: 'Брюки прямого кроя', price: 5500, category: 'clothes', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/771303f0-544d-44e8-afcf-adfee8994fc6.jpg', description: 'Классические брюки на заказ' },
    { id: 6, name: 'Браслет "Лето"', price: 1800, category: 'jewelry', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/211e8de2-5df1-43cc-b374-8cd7a932b6e6.jpg', description: 'Легкий летний браслет' },
  ];

  const tailors: Tailor[] = [
    { id: 1, name: 'Анна Королёва', specialty: 'Вечерние платья', experience: '12 лет', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/2a4bf535-92f4-4066-9309-9598e6c5def6.jpg', rating: 5 },
    { id: 2, name: 'Дмитрий Васильев', specialty: 'Мужские костюмы', experience: '15 лет', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/2a4bf535-92f4-4066-9309-9598e6c5def6.jpg', rating: 5 },
    { id: 3, name: 'Елена Смирнова', specialty: 'Повседневная одежда', experience: '8 лет', image: 'https://cdn.poehali.dev/projects/c6c90082-1460-4dd5-8d60-c7caa9ac9710/files/2a4bf535-92f4-4066-9309-9598e6c5def6.jpg', rating: 4 },
  ];

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-4xl">🦖</div>
              <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Ликазавр
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveSection('home')} className="font-medium hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('catalog')} className="font-medium hover:text-primary transition-colors">Каталог</button>
              <button onClick={() => setActiveSection('tailors')} className="font-medium hover:text-primary transition-colors">Портные</button>
              <button onClick={() => setActiveSection('about')} className="font-medium hover:text-primary transition-colors">О нас</button>
              <button onClick={() => setActiveSection('contacts')} className="font-medium hover:text-primary transition-colors">Контакты</button>
            </nav>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                  <Icon name="ShoppingCart" size={20} />
                  {cartItemsCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-secondary">
                      {cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg animate-slide-in-right">
                <SheetHeader>
                  <SheetTitle className="text-2xl font-display">Корзина</SheetTitle>
                </SheetHeader>
                <div className="mt-8 space-y-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="ShoppingBag" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Корзина пуста</p>
                    </div>
                  ) : (
                    <>
                      {cart.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                          <div className="flex gap-4 p-4">
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                            <div className="flex-1">
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                  <Icon name="Plus" size={14} />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.id)} className="ml-auto text-destructive">
                                  <Icon name="Trash2" size={14} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                      <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between text-lg font-bold">
                          <span>Итого:</span>
                          <span className="text-primary">{totalPrice} ₽</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 transition-opacity text-lg py-6">
                          Оформить заказ
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-accent p-12 md:p-20 text-white">
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-scale-in">
                  Мода, которая говорит
                </h2>
                <p className="text-xl md:text-2xl mb-8 text-white/90">
                  Уникальная одежда и украшения ручной работы. Создай свой стиль с Ликазавром!
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => setActiveSection('catalog')}>
                    <Icon name="Sparkles" size={20} className="mr-2" />
                    Смотреть каталог
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg px-8 bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => setActiveSection('tailors')}>
                    <Icon name="Users" size={20} className="mr-2" />
                    Наши портные
                  </Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
                <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-32 w-48 h-48 bg-white rounded-full blur-3xl"></div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-display font-bold">Новинки коллекции</h3>
                <Button variant="ghost" onClick={() => setActiveSection('catalog')}>
                  Все товары
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.slice(0, 3).map((product, index) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    <div className="aspect-square overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <Badge variant="secondary">{product.category === 'clothes' ? 'Одежда' : 'Украшения'}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </CardHeader>
                    <CardFooter className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">{product.price} ₽</span>
                      <Button onClick={() => addToCart(product)} className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Icon name="Plus" size={18} className="mr-2" />
                        В корзину
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-4xl font-display font-bold">Каталог</h2>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="clothes">Одежда</TabsTrigger>
                <TabsTrigger value="jewelry">Украшения</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{animationDelay: `${index * 50}ms`}}>
                      <div className="aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="clothes" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.filter(p => p.category === 'clothes').map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{animationDelay: `${index * 50}ms`}}>
                      <div className="aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="jewelry" className="mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.filter(p => p.category === 'jewelry').map((product, index) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-scale-in" style={{animationDelay: `${index * 50}ms`}}>
                      <div className="aspect-square overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-lg">{product.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                      </CardHeader>
                      <CardFooter className="flex items-center justify-between">
                        <span className="text-xl font-bold text-primary">{product.price} ₽</span>
                        <Button size="sm" onClick={() => addToCart(product)}>
                          <Icon name="Plus" size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === 'tailors' && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-4xl font-display font-bold mb-4">Наши портные</h2>
              <p className="text-xl text-muted-foreground">Мастера своего дела создадут для вас уникальную одежду</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {tailors.map((tailor, index) => (
                <Card key={tailor.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="aspect-square overflow-hidden">
                    <img src={tailor.image} alt={tailor.name} className="w-full h-full object-cover" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-2xl">{tailor.name}</CardTitle>
                    <div className="flex items-center gap-1 text-yellow-500">
                      {Array.from({ length: tailor.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="fill-current" />
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Scissors" size={18} />
                      <span>{tailor.specialty}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Award" size={18} />
                      <span>Опыт: {tailor.experience}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                      <Icon name="MessageCircle" size={18} className="mr-2" />
                      Заказать пошив
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-display font-bold">О нас</h2>
            <Card className="p-8">
              <div className="space-y-6 text-lg">
                <p>
                  <span className="font-bold text-primary">Ликазавр</span> — это магазин, где мода встречается с искусством. Мы создаем уникальную одежду и украшения, которые подчеркивают вашу индивидуальность.
                </p>
                <p>
                  Наша команда профессиональных портных работает с лучшими материалами и следит за актуальными трендами, чтобы предложить вам стильные и качественные изделия.
                </p>
                <p>
                  Мы предлагаем не просто одежду — мы создаем образы, которые говорят о вашей личности и стиле жизни.
                </p>
                <div className="grid grid-cols-3 gap-6 pt-6 border-t">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">500+</div>
                    <div className="text-muted-foreground">Довольных клиентов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-secondary mb-2">15+</div>
                    <div className="text-muted-foreground">Лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                    <div className="text-muted-foreground">Изделий создано</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-4xl font-display font-bold">Контакты</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Адрес</div>
                    <div className="text-muted-foreground">г. Москва, ул. Модная, д. 12</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-secondary/10">
                    <Icon name="Phone" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Телефон</div>
                    <div className="text-muted-foreground">+7 (495) 123-45-67</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-accent/10">
                    <Icon name="Mail" size={24} className="text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <div className="text-muted-foreground">info@likazavr.ru</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10">
                    <Icon name="Clock" size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Время работы</div>
                    <div className="text-muted-foreground">Пн-Пт: 10:00 - 20:00<br />Сб-Вс: 11:00 - 18:00</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>

      <footer className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border-t mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">🦖</div>
                <h3 className="text-2xl font-display font-bold">Ликазавр</h3>
              </div>
              <p className="text-muted-foreground">
                Создаем уникальную моду для уникальных людей
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <div className="space-y-2">
                <button onClick={() => setActiveSection('home')} className="block text-muted-foreground hover:text-primary transition-colors">Главная</button>
                <button onClick={() => setActiveSection('catalog')} className="block text-muted-foreground hover:text-primary transition-colors">Каталог</button>
                <button onClick={() => setActiveSection('tailors')} className="block text-muted-foreground hover:text-primary transition-colors">Портные</button>
                <button onClick={() => setActiveSection('about')} className="block text-muted-foreground hover:text-primary transition-colors">О нас</button>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-primary hover:text-white transition-colors">
                  <Icon name="Twitter" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>© 2024 Ликазавр. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
