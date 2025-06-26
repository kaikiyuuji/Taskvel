<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class TaskListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userId = 1;
        $now = Carbon::now();

        // Criar listas
        $lists = [
            [
                'title' => 'Trabalho',
                'description' => 'Tarefas relacionadas ao trabalho e projetos profissionais',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Casa',
                'description' => 'Tarefas domésticas e manutenção da casa',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Estudos',
                'description' => 'Atividades de aprendizado e desenvolvimento pessoal',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Saúde e Exercícios',
                'description' => 'Cuidados com a saúde e atividades físicas',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Compras',
                'description' => 'Lista de compras e itens necessários',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Viagens',
                'description' => 'Planejamento e preparação para viagens',
                'user_id' => $userId,
                'created_at' => $now,
                'updated_at' => $now,
            ]
        ];

        // Inserir listas e obter IDs
        foreach ($lists as $list) {
            DB::table('lists')->insert($list);
        }

        // Obter IDs das listas criadas
        $listIds = DB::table('lists')->where('user_id', $userId)->pluck('id', 'title');

        // Criar tarefas para cada lista
        $tasks = [
            // Tarefas de Trabalho
            [
                'title' => 'Finalizar relatório mensal',
                'description' => 'Completar o relatório de vendas do mês de junho',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(3),
                'list_id' => $listIds['Trabalho'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Reunião com cliente',
                'description' => 'Apresentar proposta de novo projeto',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(1),
                'list_id' => $listIds['Trabalho'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Revisar código do projeto X',
                'description' => 'Code review das funcionalidades implementadas',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(1),
                'list_id' => $listIds['Trabalho'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Atualizar documentação',
                'description' => 'Documentar novas APIs desenvolvidas',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(5),
                'list_id' => $listIds['Trabalho'],
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Tarefas de Casa
            [
                'title' => 'Limpar a garagem',
                'description' => 'Organizar e limpar a garagem',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(7),
                'list_id' => $listIds['Casa'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Consertar torneira da cozinha',
                'description' => 'Chamar encanador ou tentar consertar',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(2),
                'list_id' => $listIds['Casa'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Pagar contas do mês',
                'description' => 'Luz, água, internet e telefone',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(5),
                'list_id' => $listIds['Casa'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Plantar flores no jardim',
                'description' => 'Comprar mudas e plantar no canteiro',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(10),
                'list_id' => $listIds['Casa'],
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Tarefas de Estudos
            [
                'title' => 'Estudar Laravel 12',
                'description' => 'Aprender novas funcionalidades da versão 12',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(14),
                'list_id' => $listIds['Estudos'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Curso de Vue.js',
                'description' => 'Completar módulos 3 e 4 do curso online',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(6),
                'list_id' => $listIds['Estudos'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Ler livro sobre Clean Code',
                'description' => 'Terminar de ler os capítulos 5-8',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(3),
                'list_id' => $listIds['Estudos'],
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Tarefas de Saúde e Exercícios
            [
                'title' => 'Academia - Treino de pernas',
                'description' => 'Sessão de treino focada em membros inferiores',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(1),
                'list_id' => $listIds['Saúde e Exercícios'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Consulta médica',
                'description' => 'Exame de rotina com clínico geral',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(4),
                'list_id' => $listIds['Saúde e Exercícios'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Caminhada no parque',
                'description' => 'Caminhada de 30 minutos no parque da cidade',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(1),
                'list_id' => $listIds['Saúde e Exercícios'],
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Tarefas de Compras
            [
                'title' => 'Comprar ingredientes para jantar',
                'description' => 'Carne, legumes e temperos para o jantar de domingo',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(2),
                'list_id' => $listIds['Compras'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Comprar presente de aniversário',
                'description' => 'Presente para aniversário da irmã',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(8),
                'list_id' => $listIds['Compras'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Produtos de limpeza',
                'description' => 'Detergente, desinfetante e papel higiênico',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(2),
                'list_id' => $listIds['Compras'],
                'created_at' => $now,
                'updated_at' => $now,
            ],

            // Tarefas de Viagens
            [
                'title' => 'Reservar hotel para férias',
                'description' => 'Pesquisar e reservar hotel em Salvador',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(15),
                'list_id' => $listIds['Viagens'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Renovar passaporte',
                'description' => 'Agendar e renovar passaporte na Polícia Federal',
                'is_completed' => false,
                'due_date' => $now->copy()->addDays(30),
                'list_id' => $listIds['Viagens'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Pesquisar passagens aéreas',
                'description' => 'Comparar preços e horários de voos',
                'is_completed' => true,
                'due_date' => $now->copy()->subDays(4),
                'list_id' => $listIds['Viagens'],
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        // Inserir todas as tarefas
        DB::table('tasks')->insert($tasks);

        $this->command->info('Listas e tarefas criadas com sucesso para o usuário ID: ' . $userId);
        $this->command->info('Total de listas criadas: ' . count($lists));
        $this->command->info('Total de tarefas criadas: ' . count($tasks));
    }
}
