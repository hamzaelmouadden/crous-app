const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()
async function main() {
    const roomType = ["Studio", "T1", "T2", "Studette"];
    for (let index = 0; index < 20; index++) {
        const newRoom = await prisma.room.create({
            data: {
                number: index + 1,
                floor: Math.floor(Math.random() * 5),
                reserved: Math.floor(Math.random() * 10) % 2 === 0,
                type: roomType[Math.floor(Math.random() * roomType.length)],
            },
        })
        console.log(`Created new room: ${newRoom.number} (ID: ${newRoom.id})`)
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })