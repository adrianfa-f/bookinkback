import bcrypt from 'bcrypt';

const password = 'password'; // Cambia esto por la contraseña que quieres cifrar
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    console.log("generando hash....")
    if (err) {
        console.error('Error al generar el hash:', err);
        return;
    }
    console.log('Hash generado:', hash);
});