import '../../../../shared/models/alert_model.dart';

abstract class AlertsState {
  const AlertsState();
}

class AlertsInitial extends AlertsState {
  const AlertsInitial();
}

class AlertsLoading extends AlertsState {
  const AlertsLoading();
}

class AlertsLoaded extends AlertsState {
  const AlertsLoaded(this.alerts);

  final List<AlertModel> alerts;
}

class AlertsFailure extends AlertsState {
  const AlertsFailure(this.message);

  final String message;
}
