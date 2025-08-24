import bcrypt from 'bcryptjs'
import { prisma } from './utils/prisma.js'

async function main() {
  const email = process.env.SEED_STAFF_EMAIL || 'adarshan@rbc.ca'
  const password = process.env.SEED_STAFF_PASSWORD || 'adarshan'
  const rounds = Number(process.env.BCRYPT_ROUNDS || 10)

  const passwordHash = await bcrypt.hash(password, rounds)

  const user = await prisma.staffUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, role: 'analyst' },
  })

  console.log('Seeded staff user:', { email: user.email, role: user.role })
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
