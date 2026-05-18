import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'core/config/routes.dart';
import 'core/network/dio_client.dart';
import 'core/services/api_service.dart';
import 'core/services/storage_service.dart';
import 'modules/alerts/data/alerts_repository.dart';
import 'modules/alerts/presentation/cubit/alerts_cubit.dart';
import 'modules/alerts/presentation/pages/dashboard_page.dart';
import 'modules/auth/data/auth_repository.dart';
import 'modules/auth/presentation/cubit/auth_cubit.dart';
import 'modules/auth/presentation/cubit/auth_state.dart';
import 'modules/auth/presentation/pages/login_page.dart';
import 'modules/elderly/presentation/cubit/emergency_cubit.dart';
import 'modules/elderly/presentation/pages/emergency_page.dart';
import 'shared/widgets/loading_widget.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const EmergencyApp());
}

class EmergencyApp extends StatelessWidget {
  const EmergencyApp({super.key});

  static const Color brandRed = Color(0xFFE53734);

  @override
  Widget build(BuildContext context) {
    final storageService = StorageService.instance;
    final apiService = ApiService(
      dio: DioClient(storageService: storageService).dio,
    );

    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider<StorageService>.value(value: storageService),
        RepositoryProvider<ApiService>.value(value: apiService),
        RepositoryProvider<AuthRepository>(
          create: (_) => AuthRepository(
            apiService: apiService,
            storageService: storageService,
          ),
        ),
        RepositoryProvider<AlertsRepository>(
          create: (_) => AlertsRepository(apiService: apiService),
        ),
      ],
      child: MultiBlocProvider(
        providers: [
          BlocProvider<AuthCubit>(
            create: (context) =>
                AuthCubit(authRepository: context.read<AuthRepository>())
                  ..restoreSession(),
          ),
          BlocProvider<AlertsCubit>(
            create: (context) =>
                AlertsCubit(alertsRepository: context.read<AlertsRepository>()),
          ),
          BlocProvider<EmergencyCubit>(
            create: (context) => EmergencyCubit(
              alertsRepository: context.read<AlertsRepository>(),
            ),
          ),
        ],
        child: MaterialApp(
          debugShowCheckedModeBanner: false,
          title: 'Emergência 60+',
          theme: ThemeData(
            useMaterial3: true,
            colorScheme: ColorScheme.fromSeed(
              seedColor: brandRed,
              brightness: Brightness.light,
            ),
            filledButtonTheme: FilledButtonThemeData(
              style: FilledButton.styleFrom(
                backgroundColor: brandRed,
                foregroundColor: Colors.white,
              ),
            ),
            elevatedButtonTheme: ElevatedButtonThemeData(
              style: ElevatedButton.styleFrom(
                backgroundColor: brandRed,
                foregroundColor: Colors.white,
              ),
            ),
            textButtonTheme: TextButtonThemeData(
              style: TextButton.styleFrom(foregroundColor: brandRed),
            ),
            outlinedButtonTheme: OutlinedButtonThemeData(
              style: OutlinedButton.styleFrom(
                foregroundColor: brandRed,
                side: const BorderSide(color: brandRed),
              ),
            ),
            floatingActionButtonTheme: const FloatingActionButtonThemeData(
              backgroundColor: brandRed,
              foregroundColor: Colors.white,
            ),
            scaffoldBackgroundColor: const Color(0xFFF8F6F1),
            appBarTheme: const AppBarTheme(
              centerTitle: true,
              backgroundColor: brandRed,
              foregroundColor: Colors.white,
              elevation: 0,
            ),
            textTheme: ThemeData.light().textTheme.apply(
              bodyColor: const Color(0xFF1F1F1F),
              displayColor: const Color(0xFF1F1F1F),
            ),
          ),
          routes: {AppRoutes.emergency: (_) => const EmergencyPage()},
          home: const _AuthGate(),
        ),
      ),
    );
  }
}

class _AuthGate extends StatelessWidget {
  const _AuthGate();

  @override
  Widget build(BuildContext context) {
    return BlocBuilder<AuthCubit, AuthState>(
      builder: (context, state) {
        if (state is AuthLoading) {
          return const Scaffold(
            body: LoadingWidget(message: 'Carregando acesso...'),
          );
        }

        if (state is AuthAuthenticated) {
          return const DashboardPage();
        }

        return const LoginPage();
      },
    );
  }
}
