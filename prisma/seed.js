import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function seedAdmins() {
    console.log('🔵 Iniciando seed de administradores...');
    console.log('Conectando a la base de datos:', process.env.DATABASE_URL);

    try {
        const password1 = await bcrypt.hash('Boladecarne1', saltRounds);
        const password2 = await bcrypt.hash('Boladecarne5', saltRounds);
        console.log('🔑 Contraseñas hasheadas correctamente');

        const result = await prisma.admin.createMany({
            data: [
                {
                    email: 'adrianfrancoavila1995@gmail.com',
                    password: password1,
                },
                {
                    email: 'bookink@gmail.com',
                    password: password2,
                }
            ],
            skipDuplicates: true,
        });

        console.log('✅ Administradores creados exitosamente. Registros insertados:', result.count);
        
        // Verificación adicional
        const admins = await prisma.admin.findMany();
        console.log('👥 Administradores en la base de datos:', admins);
    } catch (error) {
        console.error('❌ Error creando administradores:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
        console.log('🔴 Conexión a Prisma cerrada');
    }
}

seedAdmins();