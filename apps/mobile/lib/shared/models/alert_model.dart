class AlertModel {
  const AlertModel({
    this.id,
    required this.deviceId,
    required this.type,
    required this.status,
    required this.createdAt,
  });

  final String? id;
  final String deviceId;
  final String type;
  final String status;
  final DateTime createdAt;

  factory AlertModel.fromJson(Map<String, dynamic> json) {
    return AlertModel(
      id: json['id']?.toString(),
      deviceId: (json['deviceId'] ?? json['device_id'] ?? 'ESP32-001')
          .toString(),
      type: (json['type'] ?? 'EMERGENCY').toString(),
      status: (json['status'] ?? json['state'] ?? 'PENDING').toString(),
      createdAt:
          _parseDate(json['createdAt'] ?? json['created_at']) ?? DateTime.now(),
    );
  }

  static DateTime? _parseDate(Object? value) {
    if (value is DateTime) {
      return value;
    }

    final text = value?.toString();
    if (text == null || text.isEmpty) {
      return null;
    }

    return DateTime.tryParse(text);
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'deviceId': deviceId,
      'type': type,
      'status': status,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}
