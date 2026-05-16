import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../core/config/routes.dart';
import '../../../../shared/widgets/loading_widget.dart';
import '../../../auth/presentation/cubit/auth_cubit.dart';
import '../cubit/alerts_cubit.dart';
import '../cubit/alerts_state.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage> {
  static const Color brandRed = Color(0xFFE53734);

  @override
  void initState() {
    super.initState();
    context.read<AlertsCubit>().loadAlerts();
  }

  String _formatDate(DateTime dateTime) {
    final day = dateTime.day.toString().padLeft(2, '0');
    final month = dateTime.month.toString().padLeft(2, '0');
    final year = dateTime.year.toString();
    final hour = dateTime.hour.toString().padLeft(2, '0');
    final minute = dateTime.minute.toString().padLeft(2, '0');
    return '$day/$month/$year $hour:$minute';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Painel de alertas'),
        actions: [
          IconButton(
            onPressed: () => context.read<AuthCubit>().logout(),
            tooltip: 'Sair',
            icon: const Icon(Icons.logout),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        backgroundColor: brandRed,
        foregroundColor: Colors.white,
        onPressed: () {
          Navigator.of(context).pushNamed(AppRoutes.emergency);
        },
        icon: const Icon(Icons.warning_amber_rounded),
        label: const Text('SOS'),
      ),
      body: BlocBuilder<AlertsCubit, AlertsState>(
        builder: (context, state) {
          if (state is AlertsLoading || state is AlertsInitial) {
            return const LoadingWidget(message: 'Buscando alertas...');
          }

          if (state is AlertsFailure) {
            return Center(
              child: Padding(
                padding: const EdgeInsets.all(24),
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    const Icon(
                      Icons.error_outline,
                      size: 56,
                      color: Colors.red,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      state.message,
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.titleLarge?.copyWith(
                        fontSize: 20,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    const SizedBox(height: 20),
                    FilledButton(
                      onPressed: () => context.read<AlertsCubit>().loadAlerts(),
                      child: const Text('Tentar novamente'),
                    ),
                  ],
                ),
              ),
            );
          }

          final alerts = state is AlertsLoaded ? state.alerts : const [];

          if (alerts.isEmpty) {
            return RefreshIndicator(
              onRefresh: () => context.read<AlertsCubit>().loadAlerts(),
              child: ListView(
                physics: const AlwaysScrollableScrollPhysics(),
                padding: const EdgeInsets.all(24),
                children: [
                  const SizedBox(height: 80),
                  Icon(
                    Icons.notifications_none,
                    size: 72,
                    color: Colors.grey.shade500,
                  ),
                  const SizedBox(height: 16),
                  Text(
                    'Nenhum alerta encontrado.',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Puxe para atualizar ou use o botão SOS para enviar um alerta.',
                    textAlign: TextAlign.center,
                    style: Theme.of(
                      context,
                    ).textTheme.bodyLarge?.copyWith(fontSize: 18),
                  ),
                ],
              ),
            );
          }

          return RefreshIndicator(
            onRefresh: () => context.read<AlertsCubit>().loadAlerts(),
            child: ListView.separated(
              padding: const EdgeInsets.all(20),
              itemCount: alerts.length,
              separatorBuilder: (context, _) => const SizedBox(height: 12),
              itemBuilder: (context, index) {
                final alert = alerts[index];
                return Card(
                  elevation: 2,
                  child: ListTile(
                    contentPadding: const EdgeInsets.symmetric(
                      horizontal: 18,
                      vertical: 14,
                    ),
                    leading: CircleAvatar(
                      backgroundColor: brandRed,
                      foregroundColor: Colors.white,
                      child: Text('${index + 1}'),
                    ),
                    title: Text(
                      alert.type,
                      style: const TextStyle(
                        fontSize: 18,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                    subtitle: Padding(
                      padding: const EdgeInsets.only(top: 6),
                      child: Text(
                        'Data: ${_formatDate(alert.createdAt)}\nStatus: ${alert.status}',
                        style: const TextStyle(fontSize: 18),
                      ),
                    ),
                    isThreeLine: true,
                  ),
                );
              },
            ),
          );
        },
      ),
    );
  }
}
