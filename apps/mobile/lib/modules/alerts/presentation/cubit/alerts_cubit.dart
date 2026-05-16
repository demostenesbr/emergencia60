import 'package:bloc/bloc.dart';

import '../../data/alerts_repository.dart';
import 'alerts_state.dart';

class AlertsCubit extends Cubit<AlertsState> {
  AlertsCubit({required AlertsRepository alertsRepository})
    : _alertsRepository = alertsRepository,
      super(const AlertsInitial());

  final AlertsRepository _alertsRepository;

  Future<void> loadAlerts() async {
    emit(const AlertsLoading());

    try {
      final alerts = await _alertsRepository.fetchAlerts();
      emit(AlertsLoaded(alerts));
    } catch (error) {
      emit(AlertsFailure(error.toString().replaceFirst('Exception: ', '')));
    }
  }
}
