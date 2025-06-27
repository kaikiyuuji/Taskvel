import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Users, Clock, Zap, ArrowRight, Star, Target, Calendar } from 'lucide-react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    const features = [
        {
            icon: <Target className="h-6 w-6" />,
            title: "Organização Inteligente",
            description: "Organize suas tarefas por listas personalizadas e mantenha tudo sob controle."
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "Gestão de Tempo",
            description: "Acompanhe prazos e prioridades para nunca mais perder um deadline importante."
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Colaboração",
            description: "Trabalhe em equipe de forma eficiente com ferramentas de colaboração integradas."
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Produtividade",
            description: "Aumente sua produtividade com recursos avançados de automação e lembretes."
        }
    ];

    const testimonials = [
        {
            name: "Maria Silva",
            role: "Gerente de Projetos",
            content: "O Taskvel transformou completamente a forma como gerencio meus projetos. Simples e eficiente!",
            rating: 5
        },
        {
            name: "João Santos",
            role: "Desenvolvedor",
            content: "Interface limpa e intuitiva. Finalmente encontrei um gerenciador de tarefas que funciona de verdade.",
            rating: 5
        },
        {
            name: "Ana Costa",
            role: "Designer",
            content: "Adoro a simplicidade do Taskvel. Me ajuda a manter o foco no que realmente importa.",
            rating: 5
        }
    ];

    return (
        <>
            <Head title="Taskvel - Gerencie suas tarefas com simplicidade">
                <meta name="description" content="Taskvel é a solução perfeita para organizar suas tarefas e aumentar sua produtividade. Simples, eficiente e poderoso." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
                {/* Header */}
                <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b">
                    <div className="container mx-auto px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-5 w-5 text-primary-foreground" />
                                </div>
                                <span className="text-xl font-bold text-foreground">Taskvel</span>
                            </div>
                            
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Button asChild>
                                        <Link href={route('dashboard')}>
                                            Ir para Dashboard
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <div className="flex items-center space-x-3">
                                        <Button variant="ghost" asChild>
                                            <Link href={route('login')}>Entrar</Link>
                                        </Button>
                                        <Button asChild>
                                            <Link href={route('register')}>Começar Grátis</Link>
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-20 px-6">
                    <div className="container mx-auto text-center">
                        <Badge variant="secondary" className="mb-6">
                            ✨ Novo: Interface redesenhada
                        </Badge>
                        
                        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Gerencie suas tarefas
                            <br />
                            <span className="text-primary">com simplicidade</span>
                        </h1>
                        
                        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                            Organize, priorize e conclua suas tarefas de forma eficiente. 
                            O Taskvel oferece tudo que você precisa para ser mais produtivo.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Button size="lg" asChild className="text-lg px-8 py-6">
                                    <Link href={route('dashboard')}>
                                        Acessar Dashboard
                                        <ArrowRight className="ml-2 h-5 w-5" />
                                    </Link>
                                </Button>
                            ) : (
                                <>
                                    <Button size="lg" asChild className="text-lg px-8 py-6">
                                        <Link href={route('register')}>
                                            Começar Grátis
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                                        <Link href={route('login')}>
                                            Já tenho conta
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Por que escolher o Taskvel?
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Descubra como nossa plataforma pode revolucionar sua forma de trabalhar
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                                            <div className="text-primary">
                                                {feature.icon}
                                            </div>
                                        </div>
                                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base">
                                            {feature.description}
                                        </CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                <div className="text-muted-foreground">Gratuito para uso pessoal</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                                <div className="text-muted-foreground">Disponibilidade garantida</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                <div className="text-muted-foreground">Acesso ilimitado</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="py-20 px-6 bg-muted/30">
                    <div className="container mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                O que nossos usuários dizem
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Veja como o Taskvel está transformando a produtividade de pessoas como você
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                                    <CardHeader>
                                        <div className="flex items-center space-x-1 mb-2">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                                            ))}
                                        </div>
                                        <CardDescription className="text-base italic">
                                            "{testimonial.content}"
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <div className="font-semibold text-foreground">{testimonial.name}</div>
                                            <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-6">
                    <div className="container mx-auto text-center">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Pronto para ser mais produtivo?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Junte-se a milhares de usuários que já transformaram sua produtividade com o Taskvel
                            </p>
                            
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button size="lg" asChild className="text-lg px-8 py-6">
                                        <Link href={route('register')}>
                                            Criar Conta Grátis
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </Button>
                                    <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                                        <Link href={route('login')}>
                                            Fazer Login
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t py-12 px-6">
                    <div className="container mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center space-x-2 mb-4 md:mb-0">
                                <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                                </div>
                                <span className="text-lg font-semibold text-foreground">Taskvel</span>
                            </div>
                            
                            <div className="text-sm text-muted-foreground">
                                © 2024 Taskvel. Todos os direitos reservados.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
