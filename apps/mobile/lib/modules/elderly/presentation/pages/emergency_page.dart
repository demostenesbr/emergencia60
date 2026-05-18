import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../shared/widgets/loading_widget.dart';
import '../../../alerts/presentation/cubit/alerts_cubit.dart';
import '../cubit/emergency_cubit.dart';
import '../cubit/emergency_state.dart';

class EmergencyPage extends StatelessWidget {
  const EmergencyPage({super.key});

  static const Color brandRed = Color(0xFFE53734);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Emergência')),
      body: BlocConsumer<EmergencyCubit, EmergencyState>(
        listener: (context, state) {
          if (state is EmergencySuccess) {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(
                content: Text('Alerta enviado com sucesso.'),
                backgroundColor: Colors.green,
              ),
            );
            context.read<AlertsCubit>().loadAlerts();
          }

          if (state is EmergencyFailure) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: Text(state.message),
                backgroundColor: Colors.red,
              ),
            );
          }
        },
        builder: (context, state) {
          if (state is EmergencyLoading) {
            return const LoadingWidget(
              message: 'Enviando alerta de emergência...',
            );
          }

          return Center(
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Toque apenas em caso de necessidade real',
                    textAlign: TextAlign.center,
                    style: Theme.of(context).textTheme.titleLarge?.copyWith(
                      fontSize: 22,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: 28),
                  SizedBox(
                    width: 200,
                    height: 200,
                    child: Material(
                      color: Colors.transparent,
                      shape: const CircleBorder(),
                      child: InkWell(
                        customBorder: const CircleBorder(),
                        onTap: () {
                          context.read<EmergencyCubit>().sendEmergency();
                        },
                        child: Ink(
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                            color: brandRed,
                            boxShadow: [
                              BoxShadow(
                                color: Color(0x55E53734),
                                blurRadius: 12,
                                spreadRadius: 4,
                              ),
                            ],
                          ),
                          child: const Center(
                            child: Text(
                              'SOS',
                              style: TextStyle(
                                color: Colors.white,
                                fontSize: 44,
                                fontWeight: FontWeight.w900,
                                letterSpacing: 2,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),
                  Text(
                    'O alerta será enviado ao backend imediatamente.',
                    textAlign: TextAlign.center,
                    style: Theme.of(
                      context,
                    ).textTheme.bodyLarge?.copyWith(fontSize: 18),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
