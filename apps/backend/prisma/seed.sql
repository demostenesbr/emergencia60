-- Limpar dados existentes
DELETE FROM notifications;
DELETE FROM alerts;
DELETE FROM devices;
DELETE FROM emergency_contacts;
DELETE FROM elderly_profiles;
DELETE FROM users;

-- Inserir usuário idoso (João Silva)
-- Senha: "senha123"
INSERT INTO users (id, name, email, password, role, phone, "profileImage", "refreshTokenHash", "createdAt", "updatedAt")
VALUES (
  '550e8400-e29b-41d4-a716-446655440001',
  'João Silva',
  'joao.silva@example.com',
  '$2b$10$z31SyHCZxvfgLKYi9v3QU.CefxZON4QkL7.roh651PwOgwhWdw8Je',
  'FAMILY',
  '+55 11 98765-4321',
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Inserir perfil Elderly para João
INSERT INTO elderly_profiles (id, "userId", name, "birthDate", notes, address, city, state, "emergencyPhone", "createdAt", "updatedAt")
VALUES (
  '550e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  'João Silva',
  '1960-03-15',
  'Paciente com hipertensão controlada',
  'Rua das Flores, 123',
  'São Paulo',
  'SP',
  '+55 11 98765-4321',
  NOW(),
  NOW()
);

-- Inserir dispositivo de teste
INSERT INTO devices (id, "elderlyId", "serialNumber", "apiKey", "firmwareVersion", "macAddress", "batteryLevel", "signalStrength", status, "lastHeartbeat", "createdAt", "updatedAt")
VALUES (
  '550e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440002',
  'ESP32-001-TEST',
  'test-api-key-abc123',
  '1.0.0',
  'AA:BB:CC:DD:EE:FF',
  85,
  -60,
  'ONLINE',
  NOW(),
  NOW(),
  NOW()
);

-- Inserir contato de emergência
INSERT INTO emergency_contacts (id, "elderlyId", name, relationship, phone, email, priority, "receiveSms", "receivePush", "receiveEmail", "createdAt", "updatedAt")
VALUES (
  '550e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440002',
  'Maria Santos',
  'Filha',
  '+55 11 99876-5432',
  'maria.santos@example.com',
  1,
  true,
  true,
  true,
  NOW(),
  NOW()
);

-- Inserir usuário cuidador (Maria Santos)
INSERT INTO users (id, name, email, password, role, phone, "profileImage", "refreshTokenHash", "createdAt", "updatedAt")
VALUES (
  '550e8400-e29b-41d4-a716-446655440005',
  'Maria Santos',
  'maria.santos@example.com',
  '$2b$10$z31SyHCZxvfgLKYi9v3QU.CefxZON4QkL7.roh651PwOgwhWdw8Je',
  'CAREGIVER',
  '+55 11 99876-5432',
  NULL,
  NULL,
  NOW(),
  NOW()
);

-- Confirmação
SELECT COUNT(*) as "total_users" FROM users;
SELECT COUNT(*) as "total_elderly" FROM elderly_profiles;
