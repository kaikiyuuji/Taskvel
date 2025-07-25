import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { List, CheckCircle, Clock, AlertCircle, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Props {
    stats?: {
        totalLists: number;
        totalTasks: number;
        completedTasks: number;
        pendingTasks: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({
stats = {
  totalLists: 0,
  totalTasks: 0,
  completedTasks: 0,
  pendingTasks: 0
}
}: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-6 bg-gradient-to-br from-background to-muted/20">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            ⚡ Taskvel
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Visão geral das suas tarefas e listas de tarefas.
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <Link href={route('lists.index')}>
                            <Button className="bg-primary hover:bg-primary/90 shadow-lg">
                                <List className="h-4 w-4 mr-2" />
                                Ver Listas
                            </Button>
                        </Link>

                        <Link href={route('tasks.index')}>
                            <Button className="bg-primary hover:bg-primary/90 shadow-lg">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Ver Tarefas
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {/* Card Total de Listas - Clicável */}
                    <Link href={route('lists.index')}>
                        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-blue-600/20 hover:border-blue-500/40 group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-blue-500 group-hover:text-blue-600 transition-colors">
                                    Total de Listas
                                </CardTitle>
                                <List className="h-4 w-4 text-blue-500 group-hover:text-blue-600 group-hover:scale-110 transition-all" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-blue-500 group-hover:text-blue-600 transition-colors">
                                    {stats.totalLists}
                                </div>
                                <p className="text-xs text-muted-foreground group-hover:text-blue-400 transition-colors">
                                    Suas listas de tarefas
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card Total de Tarefas - Clicável */}
                    <Link href={route('tasks.index')}>
                        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-green-500/20 hover:to-green-600/20 hover:border-green-500/40 group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-green-500 group-hover:text-green-600 transition-colors">
                                    Total de Tarefas
                                </CardTitle>
                                <CheckCircle className="h-4 w-4 text-green-500 group-hover:text-green-600 group-hover:scale-110 transition-all" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-green-500 group-hover:text-green-600 transition-colors">
                                    {stats.totalTasks}
                                </div>
                                <p className="text-xs text-muted-foreground group-hover:text-green-400 transition-colors">
                                    Todas as suas tarefas
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card Tarefas Pendentes - Clicável com filtro */}
                    <Link href={route('tasks.index', { filter: 'pending' })}>
                        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-yellow-500/20 hover:to-yellow-600/20 hover:border-yellow-500/40 group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-yellow-500 group-hover:text-yellow-600 transition-colors">
                                    Tarefas Pendentes
                                </CardTitle>
                                <Clock className="h-4 w-4 text-yellow-500 group-hover:text-yellow-600 group-hover:scale-110 transition-all" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-yellow-500 group-hover:text-yellow-600 transition-colors">
                                    {stats.pendingTasks}
                                </div>
                                <p className="text-xs text-muted-foreground group-hover:text-yellow-400 transition-colors">
                                    Tarefas a serem concluídas
                                </p>
                            </CardContent>
                        </Card>
                    </Link>

                    {/* Card Tarefas Concluídas - Clicável com filtro */}
                    <Link href={route('tasks.index', { filter: 'completed' })}>
                        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br hover:from-purple-500/20 hover:to-purple-600/20 hover:border-purple-500/40 group">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium text-purple-500 group-hover:text-purple-600 transition-colors">
                                    Tarefas Concluídas
                                </CardTitle>
                                <AlertCircle className="h-4 w-4 text-purple-500 group-hover:text-purple-600 group-hover:scale-110 transition-all" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-purple-500 group-hover:text-purple-600 transition-colors">
                                    {stats.completedTasks}
                                </div>
                                <p className="text-xs text-muted-foreground group-hover:text-purple-400 transition-colors">
                                    Tarefas finalizadas
                                </p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>

                {/* Action Cards */}
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Ações Rápidas
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4">
                                <Link href={route('lists.index')}>
                                    <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30 transition-all">
                                        <List className="mr-2 h-4 w-4" />
                                        Ver Todas as Listas
                                    </Button>
                                </Link>

                                <Link href={route('tasks.index')}>
                                    <Button variant="outline" className="w-full justify-start hover:bg-primary/10 hover:border-primary/30 transition-all">
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Ver Todas as Tarefas
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Atividade Recente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full bg-primary/10 p-2">
                                        <Plus className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">
                                            Bem-vindo ao Gerenciador de Tarefas
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Comece criando sua primeira lista ou tarefa
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
