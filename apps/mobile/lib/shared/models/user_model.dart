class UserModel {
  const UserModel({
    this.id,
    required this.email,
    this.name,
    required this.token,
  });

  final String? id;
  final String email;
  final String? name;
  final String token;

  factory UserModel.fromJson(Map<String, dynamic> json) {
    return UserModel(
      id: json['id']?.toString() ?? json['userId']?.toString(),
      email: (json['email'] ?? '').toString(),
      name: json['name']?.toString() ?? json['fullName']?.toString(),
      token: (json['token'] ?? json['accessToken'] ?? json['jwt'] ?? '')
          .toString(),
    );
  }

  Map<String, dynamic> toJson() {
    return {'id': id, 'email': email, 'name': name, 'token': token};
  }

  UserModel copyWith({String? id, String? email, String? name, String? token}) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      name: name ?? this.name,
      token: token ?? this.token,
    );
  }
}
