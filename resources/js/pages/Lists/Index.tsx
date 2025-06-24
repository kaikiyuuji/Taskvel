import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

// Types
interface List {
    id: number;
    title: string;
    description: string | null;
    tasks_count?: number;
}

interface Props {
    lists: List[];
    flash?: {
        success?: string;
        error?: string;
    };
}

// Constants
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Listas',
        href: '/lists',
    },
];

export default function ListsIndex({ lists, flash }: Props) {
    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [editingList, setEditingList] = useState<List | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState<'success' | 'error'>('success');

    // Form handling
    const { data, setData, post, put, processing, reset, delete: destroy } = useForm({
        title: '',
        description: '',
    });

    // Effects
    useEffect(() => {
        if (flash?.success) {
            setToastMessage(flash.success);
            setToastType('success');
            setShowToast(true);
        } else if (flash?.error) {
            setToastMessage(flash.error);
            setToastType('error');
            setShowToast(true);
        }
    }, [flash]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    // Event handlers
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (editingList) {
            put(route('lists.update', editingList.id), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setEditingList(null);
                },
            });
        } else {
            post(route('lists.store'), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (list: List) => {
        setEditingList(list);
        setData({
            title: list.title,
            description: list.description || '',
        });
        setIsOpen(true);
    };

    const handleDelete = (listId: number) => {
        destroy(route('lists.destroy', listId));
    };

    // Render components
    const renderToast = () => (
        showToast && (
            <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 rounded-lg p-4 shadow-lg ${
                toastType === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white animate-in fade-in slide-in-from-top-5`}>
                {toastType === 'success' ? (
                    <CheckCircle2 className="h-5 w-5" />
                ) : (
                    <XCircle className="h-5 w-5" />
                )}
                <span>{toastMessage}</span>
            </div>
        )
    );

    const renderHeader = () => (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Listas</h1>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger>
                    <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Nova Lista
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingList ? 'Editar Lista' : 'Criar Nova Lista'}
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Título</Label>
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Descrição</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                        </div>
                        <Button type="submit" disabled={processing}>
                            {editingList ? 'Atualizar' : 'Criar'}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );

    const renderListGrid = () => (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {lists.map((list) => (
                <Card key={list.id} className="hover:bg-accent/50 transition-colors">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-lg font-medium">
                            {list.title}
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(list)}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(list.id)}
                                className="text-destructive hover:text-destructive/90"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            {list.description || 'Sem descrição'}
                        </p>
                        {list.tasks_count !== undefined && (
                            <p className="text-sm text-muted-foreground mt-2">
                                {list.tasks_count} {list.tasks_count === 1 ? 'Tarefa' : 'Tarefas'}
                            </p>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );

    // Main render
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Listas" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {renderToast()}
                {renderHeader()}
                {renderListGrid()}
            </div>
        </AppLayout>
    );
}
