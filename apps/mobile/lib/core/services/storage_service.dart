import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class StorageService {
  StorageService._(this._storage);

  static final StorageService instance = StorageService._(
    const FlutterSecureStorage(),
  );

  static const String _tokenKey = 'auth_token';

  final FlutterSecureStorage _storage;

  Future<void> saveToken(String token) {
    return _storage.write(key: _tokenKey, value: token);
  }

  Future<String?> readToken() {
    return _storage.read(key: _tokenKey);
  }

  Future<void> clearToken() {
    return _storage.delete(key: _tokenKey);
  }
}
