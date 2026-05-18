import '../../../core/services/api_service.dart';
import '../../../core/services/storage_service.dart';
import '../../../shared/models/user_model.dart';

class AuthRepository {
  AuthRepository({
    required ApiService apiService,
    required StorageService storageService,
  }) : _apiService = apiService,
       _storageService = storageService;

  final ApiService _apiService;
  final StorageService _storageService;

  Future<UserModel> login({
    required String email,
    required String password,
  }) async {
    final response = await _apiService.post(
      '/auth/login',
      data: {'email': email, 'password': password},
    );

    final data = response.data;
    final json = data is Map<String, dynamic>
        ? data
        : <String, dynamic>{'token': data?.toString() ?? ''};
    final user = UserModel.fromJson(json);

    if (user.token.isEmpty) {
      throw Exception('O backend não retornou um token válido.');
    }

    await _storageService.saveToken(user.token);
    return user;
  }

  Future<String?> currentToken() {
    return _storageService.readToken();
  }

  Future<void> logout() {
    return _storageService.clearToken();
  }
}
