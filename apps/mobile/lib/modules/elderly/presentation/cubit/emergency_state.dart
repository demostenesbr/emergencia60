import '../../../../shared/models/alert_model.dart';

abstract class EmergencyState {
  const EmergencyState();
}

class EmergencyInitial extends EmergencyState {
  const EmergencyInitial();
}

class EmergencyLoading extends EmergencyState {
  const EmergencyLoading();
}

class EmergencySuccess extends EmergencyState {
  const EmergencySuccess(this.alert);

  final AlertModel alert;
}

class EmergencyFailure extends EmergencyState {
  const EmergencyFailure(this.message);

  final String message;
}
