// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const saltRounds = 10;

async function seedAdmins() {
    try {
        // Hashear contraseñas
        const password1 = await bcrypt.hash('Boladecarne1', saltRounds);
        const password2 = await bcrypt.hash('Boladecarne5', saltRounds);

        // Crear administradores
        await prisma.admin.createMany({
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
            skipDuplicates: true, // Evita duplicados por email
        });

        console.log('✅ Administradores creados exitosamente');
    } catch (error) {
        console.error('❌ Error creando administradores:', error);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

seedAdmins();