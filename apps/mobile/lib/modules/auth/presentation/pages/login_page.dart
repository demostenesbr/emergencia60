import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../../../shared/widgets/loading_widget.dart';
import '../cubit/auth_cubit.dart';
import '../cubit/auth_state.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();

  static const Color brandRed = Color(0xFFE53734);
  static const Color titleBlue = Color(0xFF044679);
  static const Color subTitleGrey = Color(0xFF64748B);
  // static const Color brandBlue = Color(0xFFF7F9F9);

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) {
      return;
    }

    await context.read<AuthCubit>().login(
      email: _emailController.text.trim(),
      password: _passwordController.text,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: BlocConsumer<AuthCubit, AuthState>(
          listener: (context, state) {
            if (state is AuthFailure) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(state.message),
                  backgroundColor: brandRed,
                ),
              );
            }
          },
          builder: (context, state) {
            if (state is AuthLoading) {
              return const LoadingWidget(message: 'Entrando no sistema...');
            }

            return Center(
              child: SingleChildScrollView(
                padding: const EdgeInsets.all(24),
                child: ConstrainedBox(
                  constraints: const BoxConstraints(maxWidth: 520),
                  child: Card(
                    elevation: 4,
                    child: Padding(
                      padding: const EdgeInsets.all(24),
                      child: Form(
                        key: _formKey,
                        child: AutofillGroup(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.stretch,
                            children: [
                              Builder(
                                builder: (context) {
                                  final borderRadius = BorderRadius.circular(
                                    20,
                                  );
                                  final boxShadow = [
                                    BoxShadow(
                                      color: Colors.grey,
                                      blurRadius: 5,
                                      offset: const Offset(0, 2),
                                    ),
                                  ];

                                  Widget inner;
                                  if (kIsWeb) {
                                    inner = Image.network(
                                      '/icons/Icon-512.png',
                                      width: 72,
                                      height: 72,
                                      fit: BoxFit.cover,
                                      errorBuilder:
                                          (context, error, stackTrace) {
                                            return const Icon(
                                              Icons.health_and_safety,
                                              size: 72,
                                              color: brandRed,
                                            );
                                          },
                                    );
                                  } else {
                                    inner = const Icon(
                                      Icons.health_and_safety,
                                      size: 72,
                                      color: brandRed,
                                    );
                                  }

                                  return Container(
                                    width: 88,
                                    height: 88,
                                    decoration: BoxDecoration(
                                      color: Colors.white,
                                      borderRadius: borderRadius,
                                      boxShadow: boxShadow,
                                    ),
                                    child: ClipRRect(
                                      borderRadius: borderRadius,
                                      child: Center(child: inner),
                                    ),
                                  );
                                },
                              ),
                              const SizedBox(height: 12),
                              Text(
                                'Emergência 60+',
                                textAlign: TextAlign.center,
                                style: Theme.of(context)
                                    .textTheme
                                    .headlineMedium
                                    ?.copyWith(
                                      fontSize: 28,
                                      fontWeight: FontWeight.w800,
                                      color: titleBlue,
                                    ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                'Serviços de resposta rápida'.toUpperCase(),
                                textAlign: TextAlign.center,
                                style: Theme.of(context).textTheme.bodyLarge
                                    ?.copyWith(
                                      fontSize: 18,
                                      color: subTitleGrey,
                                    ),
                              ),
                              const SizedBox(height: 28),
                              TextFormField(
                                controller: _emailController,
                                keyboardType: TextInputType.emailAddress,
                                autofillHints: const [AutofillHints.username],
                                style: const TextStyle(fontSize: 18),
                                decoration: InputDecoration(
                                  labelText: 'Email',
                                  border: const OutlineInputBorder(),
                                  filled: true,
                                  fillColor: const Color(0xFFF7F9F9),
                                ),
                                validator: (value) {
                                  if (value == null || value.trim().isEmpty) {
                                    return 'Informe o email';
                                  }
                                  if (!value.contains('@')) {
                                    return 'Informe um email válido';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 18),
                              TextFormField(
                                controller: _passwordController,
                                obscureText: true,
                                autofillHints: const [AutofillHints.password],
                                style: const TextStyle(fontSize: 18),
                                decoration: InputDecoration(
                                  labelText: 'Senha',
                                  border: const OutlineInputBorder(),
                                  filled: true,
                                  fillColor: const Color(0xFFF7F9F9),
                                ),
                                validator: (value) {
                                  if (value == null || value.isEmpty) {
                                    return 'Informe a senha';
                                  }
                                  if (value.length < 4) {
                                    return 'Senha muito curta';
                                  }
                                  return null;
                                },
                              ),
                              const SizedBox(height: 24),
                              SizedBox(
                                height: 60,
                                child: FilledButton(
                                  onPressed: _submit,
                                  child: const Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        'Entrar',
                                        style: TextStyle(fontSize: 20),
                                      ),
                                      SizedBox(width: 10),
                                      Icon(Icons.arrow_forward_rounded),
                                      Padding(
                                        padding: EdgeInsets.only(bottom: 2),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
