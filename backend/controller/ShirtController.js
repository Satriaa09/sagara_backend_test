import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const getShirts = async (req, res) => {
    try {
        const response = await prisma.shirt.findMany();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getShirtsById = async (req, res) => {
    try {
        const response = await prisma.shirt.findUnique({
            where:{
                id: Number(req.params.id)
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const createShirts = async (req, res) => {
    const { warna, ukuran, harga, stok } = req.body;

    try {
        const existingShirt = await prisma.shirt.findFirst({
            where: {
                warna: warna,
                ukuran: ukuran
            }
        });

        if (existingShirt) {
            const updatedShirt = await prisma.shirt.update({
                where: {
                    id: existingShirt.id
                },
                data: {
                    stok: existingShirt.stok + stok
                }
            });
            return res.status(200).json(updatedShirt);
        } else {
            const newShirt = await prisma.shirt.create({
                data: {
                    warna: warna,
                    ukuran: ukuran,
                    harga: harga,
                    stok: stok
                }
            });
            return res.status(201).json(newShirt);
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}


export const updateShirts = async (req, res) => {
    const { warna, ukuran, harga, stok } = req.body;
    const { id } = req.params;

    if (isNaN(harga) || isNaN(stok)) {
        return res.status(400).json({ msg: 'Harga dan stok harus berupa angka' });
    }

    try {
        const shirt = await prisma.shirt.update({
            where: {
                id: Number(id)
            },
            data: {
                warna: warna || undefined,
                ukuran: ukuran || undefined, 
                harga: harga !== undefined ? Number(harga) : undefined, 
                stok: stok !== undefined ? Number(stok) : undefined  
            }
        });
        res.status(200).json(shirt);
    } catch (error) {
        
        if (error.code === 'P2025') {
            return res.status(404).json({ msg: 'Shirt not found' });
        }
        res.status(400).json({ msg: error.message });
    }
}


export const deleteShirts = async (req, res) => {
    const { id } = req.params;

    try {
        if (isNaN(id)) {
            return res.status(400).json({ msg: 'Invalid ID format' });
        }

        const shirt = await prisma.shirt.delete({
            where: {
                id: Number(id)
            },
        });

        res.status(200).json({ msg: 'Shirt deleted successfully', shirt });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ msg: 'Shirt not found' });
        }
        res.status(500).json({ msg: error.message });
    }
}
