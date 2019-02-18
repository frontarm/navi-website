import React from 'react'
import { mount, route } from 'navi'
import api from './api'

export default mount({
  '/:id': route({
    async getView(request) {
      let product = await api.fetchProduct(request.params.id)
      return <Product product={product} />
    }
  })
})

function Product({ product }) {
  return (
    <article className='Product'>
      <span className='Product-emoji'>{product.emoji}</span>
      <h1>{product.title}</h1>
      <span>{product.price}</span>
    </article>
  )
}