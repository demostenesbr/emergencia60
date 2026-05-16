import '../../../core/services/api_service.dart';
import '../../../shared/models/alert_model.dart';

class AlertsRepository {
  AlertsRepository({required ApiService apiService}) : _apiService = apiService;

  final ApiService _apiService;

  Future<List<AlertModel>> fetchAlerts() async {
    final response = await _apiService.get('/alerts');
    final data = response.data;

    if (data is List) {
      return data
          .whereType<Map<String, dynamic>>()
          .map(AlertModel.fromJson)
          .toList();
    }

    if (data is Map<String, dynamic>) {
      final rawItems = data['alerts'] ?? data['items'] ?? data['data'];
      if (rawItems is List) {
        return rawItems
            .whereType<Map<String, dynamic>>()
            .map(AlertModel.fromJson)
            .toList();
      }
    }

    return const [];
  }

  Future<AlertModel> sendAlert({
    required String deviceId,
    required String type,
  }) async {
    final response = await _apiService.post(
      '/alerts',
      data: {'deviceId': deviceId, 'type': type},
    );

    final data = response.data;
    if (data is Map<String, dynamic>) {
      final rawAlert = data['alert'];
      if (rawAlert is Map<String, dynamic>) {
        return AlertModel.fromJson(rawAlert);
      }

      return AlertModel.fromJson(data);
    }

    return AlertModel(
      deviceId: deviceId,
      type: type,
      status: 'SENT',
      createdAt: DateTime.now(),
    );
  }
}
