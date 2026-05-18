import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

async function main() {
  const prisma = new PrismaClient();

  try {
    console.log('🌱 Iniciando seed do banco de dados...');

    // Limpar dados antigos (opcional)
    console.log('🗑️  Limpando dados antigos...');
    await prisma.notification.deleteMany();
    await prisma.alert.deleteMany();
    await prisma.device.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.elderly.deleteMany();
    await prisma.user.deleteMany();

    // Hash da senha: "senha123"
    const passwordHash = await bcrypt.hash('senha123', 10);

    // Usuário 1: Idoso (João Silva)
    console.log('👴 Criando usuário idoso...');
    const elderlyUser = await prisma.user.create({
      data: {
        name: 'João Silva',
        email: 'joao.silva@example.com',
        password: passwordHash,
        role: 'FAMILY',
        phone: '+55 11 98765-4321',
        profileImage: null,
      },
    });

    // Criar perfil Elderly para João
    const elderlyProfile = await prisma.elderly.create({
      data: {
        userId: elderlyUser.id,
        name: 'João Silva',
        birthDate: new Date('1960-03-15'), // 64 anos (maior de 60)
        notes: 'Paciente com hipertensão controlada',
        address: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        emergencyPhone: '+55 11 98765-4321',
      },
    });

    // Usuário 2: Cuidador/Familiar (Maria Santos)
    console.log('👩‍⚕️ Criando usuário cuidador...');
    const caregiverUser = await prisma.user.create({
      data: {
        name: 'Maria Santos',
        email: 'maria.santos@example.com',
        password: passwordHash,
        role: 'CAREGIVER',
        phone: '+55 11 99876-5432',
        profileImage: null,
      },
    });

    // Criar contato de emergência
    console.log('📞 Criando contato de emergência...');
    await prisma.contact.create({
      data: {
        elderlyId: elderlyProfile.id,
        name: 'Maria Santos',
        relationship: 'Filha',
        phone: '+55 11 99876-5432',
        email: 'maria.santos@example.com',
        priority: 1,
        receiveSms: true,
        receivePush: true,
        receiveEmail: true,
      },
    });

    // Criar dispositivo de teste
    console.log('📱 Criando dispositivo de teste...');
    await prisma.device.create({
      data: {
        elderlyId: elderlyProfile.id,
        serialNumber: 'ESP32-001-TEST',
        apiKey: 'test-api-key-' + Math.random().toString(36).substring(7),
        firmwareVersion: '1.0.0',
        macAddress: 'AA:BB:CC:DD:EE:FF',
        batteryLevel: 85,
        signalStrength: -60,
        status: 'ONLINE',
        lastHeartbeat: new Date(),
      },
    });

    console.log('✅ Seed concluído com sucesso!');
    console.log('\n📋 Credenciais criadas:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('👴 USUÁRIO IDOSO:');
    console.log(`   Email: ${elderlyUser.email}`);
    console.log(`   Senha: senha123`);
    console.log(`   Role: ${elderlyUser.role}`);
    console.log(`   Idade: 64 anos`);
    console.log('');
    console.log('👩‍⚕️ USUÁRIO CUIDADOR:');
    console.log(`   Email: ${caregiverUser.email}`);
    console.log(`   Senha: senha123`);
    console.log(`   Role: ${caregiverUser.role}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (e) {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
