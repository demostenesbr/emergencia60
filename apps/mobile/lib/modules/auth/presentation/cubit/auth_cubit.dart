import 'package:bloc/bloc.dart';

import '../../data/auth_repository.dart';
import '../../../../shared/models/user_model.dart';
import 'auth_state.dart';

class AuthCubit extends Cubit<AuthState> {
  AuthCubit({required AuthRepository authRepository})
    : _authRepository = authRepository,
      super(const AuthInitial());

  final AuthRepository _authRepository;

  Future<void> restoreSession() async {
    emit(const AuthLoading());
    final token = await _authRepository.currentToken();

    if (token == null || token.isEmpty) {
      emit(const AuthUnauthenticated());
      return;
    }

    emit(AuthAuthenticated(UserModel(email: '', token: token)));
  }

  Future<void> login({required String email, required String password}) async {
    emit(const AuthLoading());

    try {
      final user = await _authRepository.login(
        email: email,
        password: password,
      );
      emit(AuthAuthenticated(user));
    } catch (error) {
      emit(AuthFailure(error.toString().replaceFirst('Exception: ', '')));
    }
  }

  Future<void> logout() async {
    await _authRepository.logout();
    emit(const AuthUnauthenticated());
  }
}
