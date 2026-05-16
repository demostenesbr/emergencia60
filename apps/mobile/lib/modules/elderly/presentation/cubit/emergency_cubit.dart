import 'package:bloc/bloc.dart';

import '../../../alerts/data/alerts_repository.dart';
import 'emergency_state.dart';

class EmergencyCubit extends Cubit<EmergencyState> {
  EmergencyCubit({required AlertsRepository alertsRepository})
    : _alertsRepository = alertsRepository,
      super(const EmergencyInitial());

  final AlertsRepository _alertsRepository;

  Future<void> sendEmergency({
    String deviceId = 'ESP32-001',
    String type = 'EMERGENCY',
  }) async {
    emit(const EmergencyLoading());

    try {
      final alert = await _alertsRepository.sendAlert(
        deviceId: deviceId,
        type: type,
      );
      emit(EmergencySuccess(alert));
    } catch (error) {
      emit(EmergencyFailure(error.toString().replaceFirst('Exception: ', '')));
    }
  }
}
