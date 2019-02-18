import { NotFoundError } from 'navi'

const db = {
  hat: {
    emoji: '🧢',
    title: 'Hat',
    price: '$50.00',
  },
  flamethrower: {
    emoji: '🔥🔫',
    title: 'Not a flamethrower',
    price: '$500.00',
  },
}

export default {
  fetchProduct: async (id) => {
    await delay(100)
    let product = await db[id]
    if (!product) {
      throw new NotFoundError()
    }
    return product
  },
  fetchProducts: async () => {
    await delay(100)
    return db
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

