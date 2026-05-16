import 'package:dio/dio.dart';

import '../services/storage_service.dart';
import 'auth_interceptor.dart';

class DioClient {
  DioClient({StorageService? storageService})
    : _storageService = storageService ?? StorageService.instance,
      _dio = Dio(
        BaseOptions(
          baseUrl: 'http://localhost:3000/api/v1',
          connectTimeout: const Duration(seconds: 15),
          receiveTimeout: const Duration(seconds: 15),
          sendTimeout: const Duration(seconds: 15),
          headers: const {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        ),
      ) {
    _dio.interceptors.add(AuthInterceptor(storageService: _storageService));
  }

  final StorageService _storageService;
  final Dio _dio;

  Dio get dio => _dio;
}
