import 'package:dio/dio.dart';

import '../services/storage_service.dart';

class AuthInterceptor extends Interceptor {
  AuthInterceptor({required StorageService storageService})
    : _storageService = storageService;

  final StorageService _storageService;

  @override
  Future<void> onRequest(
    RequestOptions options,
    RequestInterceptorHandler handler,
  ) async {
    final token = await _storageService.readToken();

    if (token != null && token.isNotEmpty) {
      options.headers.putIfAbsent('Authorization', () => 'Bearer $token');
    }

    handler.next(options);
  }
}
